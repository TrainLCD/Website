import { createClient, type EdgeConfigClient } from "@vercel/edge-config";
import type { Service, IncidentHistory } from "../types";
import type { Locale } from "./locale";

/**
 * Edge Config integration.
 *
 * 公開ステータスページの読み取りは「現在のサービス状態 + インシデント一覧」という
 * 小さく・読み取りが多く・更新が稀なスナップショットなので、Vercel Edge Config の
 * 設計意図に合致する。Edge Config をエッジの読み取り層として使うことで、Neon Free の
 * scale-to-zero によるコールドスタート遅延を読み取りホットパスから排除する。
 *
 * - 読み取り: `@vercel/edge-config` SDK（接続文字列 `EDGE_CONFIG` を使用）
 * - 書き込み: Vercel REST API（読み取り用トークンでは書き込めないため、別途
 *   `VERCEL_API_TOKEN` と Edge Config ID が必要）。書き込みは `events` API
 *   からのみ行う（レート制限があるため読み取りパスからは書き込まない）。
 *
 * 環境変数が未設定なら全関数が no-op / null を返し、既存の Redis/DB 経路に
 * フォールバックする（後方互換）。
 */

// ---- 読み取り側 ----

const connectionString = process.env.EDGE_CONFIG;

const edgeConfigClient: EdgeConfigClient | null = connectionString
  ? createClient(connectionString)
  : null;

export function isEdgeConfigReadAvailable(): boolean {
  return edgeConfigClient !== null;
}

// Edge Config のキーは [A-Za-z0-9_-] のみ許可（コロン不可）
const servicesKey = (locale: Locale): string => `status_services_${locale}`;
const incidentsKey = (locale: Locale): string => `status_incidents_${locale}`;

export async function readServicesFromEdgeConfig(
  locale: Locale
): Promise<Service[] | null> {
  if (!edgeConfigClient) return null;
  try {
    const value = await edgeConfigClient.get<Service[]>(servicesKey(locale));
    return value ?? null;
  } catch (err) {
    console.warn(
      "[EdgeConfig] サービスの読み取りに失敗しました:",
      err instanceof Error ? err.message : err
    );
    return null;
  }
}

export async function readIncidentsFromEdgeConfig(
  locale: Locale
): Promise<IncidentHistory[] | null> {
  if (!edgeConfigClient) return null;
  try {
    const value = await edgeConfigClient.get<IncidentHistory[]>(
      incidentsKey(locale)
    );
    return value ?? null;
  } catch (err) {
    console.warn(
      "[EdgeConfig] インシデントの読み取りに失敗しました:",
      err instanceof Error ? err.message : err
    );
    return null;
  }
}

// ---- 書き込み側 ----

/**
 * 接続文字列 `https://edge-config.vercel.com/ecfg_xxx?token=yyy` から
 * Edge Config ID (`ecfg_xxx`) を抽出する。`EDGE_CONFIG_ID` が明示指定されていれば
 * そちらを優先する。
 */
function resolveEdgeConfigId(): string | undefined {
  if (process.env.EDGE_CONFIG_ID) return process.env.EDGE_CONFIG_ID;
  if (!connectionString) return undefined;
  const match = connectionString.match(
    /edge-config\.vercel\.com\/(ecfg_[^/?]+)/
  );
  return match?.[1];
}

const EDGE_CONFIG_ID = resolveEdgeConfigId();
const VERCEL_API_TOKEN = process.env.VERCEL_API_TOKEN;
const VERCEL_TEAM_ID = process.env.VERCEL_TEAM_ID;

export function isEdgeConfigWriteAvailable(): boolean {
  return !!EDGE_CONFIG_ID && !!VERCEL_API_TOKEN;
}

export type LocaleSnapshot = {
  locale: Locale;
  services: Service[];
  incidents: IncidentHistory[];
};

/**
 * 各ロケールのスナップショットを Edge Config へ upsert する。
 * 書き込み用の環境変数が無い場合は何もしない。
 * サイズ上限超過などで失敗した場合は例外を投げる（呼び出し側で best-effort 扱い）。
 */
export async function writeSnapshotsToEdgeConfig(
  snapshots: LocaleSnapshot[]
): Promise<void> {
  if (!isEdgeConfigWriteAvailable()) return;

  const items = snapshots.flatMap((snapshot) => [
    {
      operation: "upsert" as const,
      key: servicesKey(snapshot.locale),
      value: snapshot.services,
    },
    {
      operation: "upsert" as const,
      key: incidentsKey(snapshot.locale),
      value: snapshot.incidents,
    },
  ]);

  const url = new URL(
    `https://api.vercel.com/v1/edge-config/${EDGE_CONFIG_ID}/items`
  );
  if (VERCEL_TEAM_ID) {
    url.searchParams.set("teamId", VERCEL_TEAM_ID);
  }

  const res = await fetch(url, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${VERCEL_API_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ items }),
  });

  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    throw new Error(
      `Edge Config への書き込みに失敗しました: ${res.status} ${detail}`
    );
  }
}
