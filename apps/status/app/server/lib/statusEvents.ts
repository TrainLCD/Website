import { nanoid } from "nanoid";
import type { StatusType, LocaleText } from "../types";
import { prisma } from "./prisma";
import { getServices } from "../repo/serviceRepository";
import { getIncidentHistories } from "../repo/incidentRepository";
import { writeSnapshotsToEdgeConfig } from "./edgeConfig";

/**
 * ステータスイベント（サービス状態 / インシデント）の適用ロジック。
 *
 * `POST /api/status/events` と管理画面 API(`/api/admin/events`) の両方から使う
 * 共有コア。検証・DB 書き込み・Edge Config 再同期をここに集約し、エンドポイント側は
 * 認証とペイロード組み立てに専念する。
 */

// ---- リクエストペイロード型定義 ----

export type ServiceEventPayload = {
  serviceId: string;
  status: StatusType;
  summary: LocaleText;
  statusSince?: string;
};

export type IncidentUpdatePayload = {
  id?: string;
  status: StatusType;
  body: LocaleText;
  createdAt?: string;
};

export type IncidentEventPayload = {
  id?: string;
  slug?: string;
  impact: StatusType;
  affectedServiceIds: string[];
  title: LocaleText;
  description: LocaleText;
  startedAt: string;
  resolvedAt?: string | null;
  cause?: LocaleText | null;
  externalLink?: string | null;
  updates?: IncidentUpdatePayload[];
};

export type StatusEventPayload = {
  services?: ServiceEventPayload[];
  incidents?: IncidentEventPayload[];
};

// ---- バリデーション制限 ----

const MAX_STRING_LENGTH = 10000;
const MAX_ARRAY_SIZE = 100;
const MAX_SERVICES = 50;
const MAX_INCIDENTS = 50;
const MAX_UPDATES_PER_INCIDENT = 100;

// Edge Config 反映の最大待機時間（best-effort）。これを超えても DB は正本なので応答を返す。
const EDGE_CONFIG_REFRESH_TIMEOUT_MS = 5_000;

// ---- バリデーション関数 ----

const VALID_STATUS_TYPES: StatusType[] = [
  "operational",
  "maintenance",
  "partiallyMaintenance",
  "degraded",
  "partiallyDegraded",
  "outage",
  "unknown",
];

function isValidStatusType(status: unknown): status is StatusType {
  return (
    typeof status === "string" &&
    VALID_STATUS_TYPES.includes(status as StatusType)
  );
}

function isValidLocaleText(text: unknown): text is LocaleText {
  if (
    typeof text !== "object" ||
    text === null ||
    !("ja" in text) ||
    !("en" in text) ||
    typeof (text as LocaleText).ja !== "string" ||
    typeof (text as LocaleText).en !== "string"
  ) {
    return false;
  }

  const { ja, en } = text as LocaleText;
  return ja.length <= MAX_STRING_LENGTH && en.length <= MAX_STRING_LENGTH;
}

function isValidISODate(dateStr: string): boolean {
  if (!dateStr || typeof dateStr !== "string") return false;
  // Check for basic ISO 8601 format (YYYY-MM-DD or full timestamp)
  const iso8601Regex = /^\d{4}-\d{2}-\d{2}(T\d{2}:\d{2}:\d{2}(\.\d{3})?Z?)?$/;
  if (!iso8601Regex.test(dateStr)) return false;
  const date = new Date(dateStr);
  return !isNaN(date.getTime());
}

function isValidUrl(url: string): boolean {
  try {
    const parsedUrl = new URL(url);
    // Only allow http and https protocols
    return parsedUrl.protocol === "http:" || parsedUrl.protocol === "https:";
  } catch {
    return false;
  }
}

function validateServicePayload(
  service: unknown
): service is ServiceEventPayload {
  if (typeof service !== "object" || service === null) {
    return false;
  }
  const s = service as Record<string, unknown>;

  if (
    typeof s.serviceId !== "string" ||
    !s.serviceId ||
    s.serviceId.length > MAX_STRING_LENGTH
  ) {
    return false;
  }
  if (!isValidStatusType(s.status)) {
    return false;
  }
  if (!isValidLocaleText(s.summary)) {
    return false;
  }
  if (
    s.statusSince !== undefined &&
    (typeof s.statusSince !== "string" || !isValidISODate(s.statusSince))
  ) {
    return false;
  }

  return true;
}

function validateIncidentUpdatePayload(
  update: unknown
): update is IncidentUpdatePayload {
  if (typeof update !== "object" || update === null) {
    return false;
  }
  const u = update as Record<string, unknown>;

  if (!isValidStatusType(u.status)) {
    return false;
  }
  if (!isValidLocaleText(u.body)) {
    return false;
  }
  if (
    u.id !== undefined &&
    (typeof u.id !== "string" || u.id.length > MAX_STRING_LENGTH)
  ) {
    return false;
  }
  if (
    u.createdAt !== undefined &&
    (typeof u.createdAt !== "string" || !isValidISODate(u.createdAt))
  ) {
    return false;
  }

  return true;
}

function validateIncidentPayload(
  incident: unknown
): incident is IncidentEventPayload {
  if (typeof incident !== "object" || incident === null) {
    return false;
  }
  const i = incident as Record<string, unknown>;

  if (!isValidStatusType(i.impact)) {
    return false;
  }
  if (
    !Array.isArray(i.affectedServiceIds) ||
    i.affectedServiceIds.length === 0 ||
    i.affectedServiceIds.length > MAX_ARRAY_SIZE
  ) {
    return false;
  }
  if (
    !i.affectedServiceIds.every(
      (id: unknown) => typeof id === "string" && id.length <= MAX_STRING_LENGTH
    )
  ) {
    return false;
  }
  if (!isValidLocaleText(i.title)) {
    return false;
  }
  if (!isValidLocaleText(i.description)) {
    return false;
  }
  if (
    typeof i.startedAt !== "string" ||
    !i.startedAt ||
    !isValidISODate(i.startedAt)
  ) {
    return false;
  }

  // オプショナルフィールドのバリデーション
  if (
    i.id !== undefined &&
    (typeof i.id !== "string" || i.id.length > MAX_STRING_LENGTH)
  ) {
    return false;
  }
  if (
    i.slug !== undefined &&
    (typeof i.slug !== "string" || i.slug.length > MAX_STRING_LENGTH)
  ) {
    return false;
  }
  if (
    i.resolvedAt !== undefined &&
    i.resolvedAt !== null &&
    (typeof i.resolvedAt !== "string" || !isValidISODate(i.resolvedAt))
  ) {
    return false;
  }
  if (i.cause !== undefined && i.cause !== null && !isValidLocaleText(i.cause)) {
    return false;
  }
  if (
    i.externalLink !== undefined &&
    i.externalLink !== null &&
    (typeof i.externalLink !== "string" ||
      i.externalLink.length > MAX_STRING_LENGTH ||
      !isValidUrl(i.externalLink))
  ) {
    return false;
  }
  if (i.updates !== undefined) {
    if (
      !Array.isArray(i.updates) ||
      i.updates.length > MAX_UPDATES_PER_INCIDENT
    ) {
      return false;
    }
    if (!i.updates.every(validateIncidentUpdatePayload)) {
      return false;
    }
  }

  return true;
}

export function validatePayload(
  body: unknown
):
  | { valid: true; data: StatusEventPayload }
  | { valid: false; error: string } {
  if (typeof body !== "object" || body === null) {
    return {
      valid: false,
      error: "リクエストボディはオブジェクトである必要があります",
    };
  }

  const payload = body as Record<string, unknown>;

  // services または incidents の少なくとも一方は必要
  if (!payload.services && !payload.incidents) {
    return {
      valid: false,
      error: "services または incidents の少なくとも一方を指定してください",
    };
  }

  // services のバリデーション
  if (payload.services !== undefined) {
    if (!Array.isArray(payload.services)) {
      return { valid: false, error: "services は配列である必要があります" };
    }
    if (payload.services.length > MAX_SERVICES) {
      return {
        valid: false,
        error: `services の配列は最大 ${MAX_SERVICES} 個までです`,
      };
    }
    for (const service of payload.services) {
      if (!validateServicePayload(service)) {
        return { valid: false, error: "services の形式が正しくありません" };
      }
    }
  }

  // incidents のバリデーション
  if (payload.incidents !== undefined) {
    if (!Array.isArray(payload.incidents)) {
      return { valid: false, error: "incidents は配列である必要があります" };
    }
    if (payload.incidents.length > MAX_INCIDENTS) {
      return {
        valid: false,
        error: `incidents の配列は最大 ${MAX_INCIDENTS} 個までです`,
      };
    }
    for (const incident of payload.incidents) {
      if (!validateIncidentPayload(incident)) {
        return { valid: false, error: "incidents の形式が正しくありません" };
      }
    }
  }

  return { valid: true, data: payload as StatusEventPayload };
}

// ---- ID / スラッグ生成 ----

function generateId(): string {
  return nanoid();
}

function generateSlug(title: string): string {
  // タイトルから基本的なスラッグを生成（ASCIIのみ許可、ダイアクリティクス除去）
  const baseSlug = title
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // ダイアクリティクス除去
    .replace(/[^a-z0-9\s-]/g, "") // a-z, 0-9, スペース, ハイフンのみ許可
    .replace(/\s+/g, "-") // スペースをハイフンに
    .replace(/-+/g, "-") // ハイフン連続を1つに
    .replace(/^-|-$/g, "") // 先頭・末尾のハイフン除去
    .substring(0, 50);

  // baseSlugが空の場合は'incident'を使用
  return `${baseSlug || "incident"}-${nanoid(10)}`;
}

// ---- DB 更新 ----

// サービスステータスの更新
export async function updateServices(
  services: ServiceEventPayload[]
): Promise<void> {
  await prisma.$transaction(async (tx) => {
    await Promise.all(
      services.map(async (service) => {
        const statusSince = service.statusSince
          ? new Date(service.statusSince)
          : new Date();

        // サービス定義が存在することを確認
        const serviceDefinition = await tx.serviceDefinition.findUnique({
          where: { id: service.serviceId },
        });

        if (!serviceDefinition) {
          throw new Error(`サービスID ${service.serviceId} が見つかりません`);
        }

        // 既存のスナップショットを取得
        const existingSnapshot = await tx.serviceStatusSnapshot.findFirst({
          where: { serviceId: service.serviceId },
          orderBy: { createdAt: "desc" },
        });

        // 新しいスナップショットを作成（ステータスが変更された場合のみ）
        if (!existingSnapshot || existingSnapshot.status !== service.status) {
          await tx.serviceStatusSnapshot.create({
            data: {
              serviceId: service.serviceId,
              status: service.status,
              summaryJa: service.summary.ja,
              summaryEn: service.summary.en,
              statusSince: statusSince,
            },
          });
        } else {
          // ステータスが同じ場合はサマリーのみ更新
          await tx.serviceStatusSnapshot.update({
            where: { id: existingSnapshot.id },
            data: {
              summaryJa: service.summary.ja,
              summaryEn: service.summary.en,
            },
          });
        }
      })
    );
  });
}

// インシデントの更新
export async function updateIncidents(
  incidents: IncidentEventPayload[]
): Promise<void> {
  await Promise.all(
    incidents.map(async (incident) => {
      await prisma.$transaction(async (tx) => {
        const incidentId = incident.id || generateId();
        const slug = incident.slug || generateSlug(incident.title.ja);
        const now = new Date();

        // インシデントのupsert
        const existingIncident = incident.id
          ? await tx.incidentHistory.findUnique({ where: { id: incident.id } })
          : null;

        if (existingIncident) {
          // 既存インシデントの更新
          await tx.incidentHistory.update({
            where: { id: incidentId },
            data: {
              incidentImpact: incident.impact,
              titleJa: incident.title.ja,
              titleEn: incident.title.en,
              descriptionJa: incident.description.ja,
              descriptionEn: incident.description.en,
              startedAt: new Date(incident.startedAt),
              resolvedAt: incident.resolvedAt
                ? new Date(incident.resolvedAt)
                : null,
              causeJa: incident.cause?.ja || null,
              causeEn: incident.cause?.en || null,
              externalLink: incident.externalLink || null,
              lastNotifiedAt: now,
            },
          });
        } else {
          // 新規インシデントの作成
          await tx.incidentHistory.create({
            data: {
              id: incidentId,
              slug: slug,
              incidentImpact: incident.impact,
              titleJa: incident.title.ja,
              titleEn: incident.title.en,
              descriptionJa: incident.description.ja,
              descriptionEn: incident.description.en,
              publishedAt: now,
              startedAt: new Date(incident.startedAt),
              resolvedAt: incident.resolvedAt
                ? new Date(incident.resolvedAt)
                : null,
              causeJa: incident.cause?.ja || null,
              causeEn: incident.cause?.en || null,
              externalLink: incident.externalLink || null,
              lastNotifiedAt: now,
            },
          });
        }

        // 影響を受けるサービスの更新
        // 既存の関連付けを削除して新しく作成
        await tx.affectedService.deleteMany({
          where: { incidentId: incidentId },
        });

        if (incident.affectedServiceIds.length > 0) {
          await tx.affectedService.createMany({
            data: incident.affectedServiceIds.map((serviceId) => ({
              incidentId: incidentId,
              serviceId: serviceId,
            })),
            skipDuplicates: true,
          });
        }

        // インシデント更新の追加
        if (incident.updates && incident.updates.length > 0) {
          for (const update of incident.updates) {
            const updateId = update.id || generateId();
            const createdAt = update.createdAt
              ? new Date(update.createdAt)
              : now;

            // 既存の更新があれば更新、なければ作成
            if (update.id) {
              const existingUpdate = await tx.incidentUpdate.findUnique({
                where: { id: update.id },
                select: { incidentId: true },
              });

              if (existingUpdate) {
                // 別インシデントに属する update.id で他履歴を書き換えられないようにする
                if (existingUpdate.incidentId !== incidentId) {
                  throw new Error("別インシデントの更新 ID は使用できません");
                }
                await tx.incidentUpdate.update({
                  where: { id: updateId },
                  data: {
                    status: update.status,
                    bodyJa: update.body.ja,
                    bodyEn: update.body.en,
                  },
                });
                continue;
              }
            }

            // 新規更新の作成
            await tx.incidentUpdate.create({
              data: {
                id: updateId,
                incidentId: incidentId,
                status: update.status,
                bodyJa: update.body.ja,
                bodyEn: update.body.en,
                createdAt: createdAt,
              },
            });
          }
        }
      });
    })
  );
}

// DB の最新状態から各ロケールのスナップショットを再構築し、Edge Config へ反映する。
// 公開ページはこの Edge Config スナップショットを読む（ポーリング）ため、
// 障害更新の内容がここで読み取り層へ反映される。
export async function refreshEdgeConfigSnapshots(): Promise<void> {
  const locales = ["ja", "en"] as const;

  // DB から最新データを取得（Edge Config キャッシュをバイパス）
  const snapshots = await Promise.all(
    locales.map(async (locale) => {
      const [services, incidents] = await Promise.all([
        getServices(locale, { skipCache: true }),
        getIncidentHistories(locale, { skipCache: true }),
      ]);
      return { locale, services, incidents };
    })
  );

  await writeSnapshotsToEdgeConfig(snapshots);
  console.log("[StatusEvents] Edge Config のスナップショットを更新しました");
}

/**
 * 検証済みペイロードを適用する: DB を更新し、読み取り層(Edge Config)へ反映する。
 *
 * DB は正本なので、Edge Config への反映失敗・遅延はリクエスト全体を失敗させない
 * （best-effort + タイムアウト）。DB 更新自体が失敗した場合は例外を送出する。
 */
export async function applyStatusEvents(
  payload: StatusEventPayload
): Promise<void> {
  // サービスステータスの更新
  if (payload.services && payload.services.length > 0) {
    await updateServices(payload.services);
  }

  // インシデントの更新
  if (payload.incidents && payload.incidents.length > 0) {
    await updateIncidents(payload.incidents);
  }

  // 読み取り層(Edge Config)へ反映。DB は既に更新済み（正本）なので、
  // Edge Config への反映失敗・遅延はリクエスト全体を失敗させない。
  let refreshTimer: ReturnType<typeof setTimeout> | undefined;
  try {
    await Promise.race([
      refreshEdgeConfigSnapshots(),
      new Promise<never>((_, reject) => {
        refreshTimer = setTimeout(
          () => reject(new Error("Edge Config refresh timeout")),
          EDGE_CONFIG_REFRESH_TIMEOUT_MS
        );
      }),
    ]);
  } catch (error) {
    console.error(
      '[StatusEvents] Edge Config の更新に失敗しました（DB は更新済み。`{"refresh":true}` で再同期可能）:',
      error
    );
  } finally {
    clearTimeout(refreshTimer);
  }
}
