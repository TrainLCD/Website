import { NextRequest, NextResponse } from 'next/server';
import { timingSafeEqual } from 'crypto';
import { nanoid } from 'nanoid';
import type { StatusType, LocaleText } from '@/server/types';
import { prisma } from '@/server/lib/prisma';
import { redis, isRedisAvailable } from '@/server/lib/redis';
import { getServices, getStatusLabel } from '@/server/repo/serviceRepository';
import { getIncidentHistories } from '@/server/repo/incidentRepository';

// リクエストペイロード型定義
type ServiceEventPayload = {
  serviceId: string;
  status: StatusType;
  summary: LocaleText;
  statusSince?: string;
};

type IncidentUpdatePayload = {
  id?: string;
  status: StatusType;
  body: LocaleText;
  createdAt?: string;
};

type IncidentEventPayload = {
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

type StatusEventPayload = {
  services?: ServiceEventPayload[];
  incidents?: IncidentEventPayload[];
};

// バリデーション制限
const MAX_STRING_LENGTH = 10000;
const MAX_ARRAY_SIZE = 100;
const MAX_SERVICES = 50;
const MAX_INCIDENTS = 50;
const MAX_UPDATES_PER_INCIDENT = 100;

// バリデーション関数
const VALID_STATUS_TYPES: StatusType[] = [
  'operational',
  'maintenance',
  'partiallyMaintenance',
  'degraded',
  'partiallyDegraded',
  'outage',
  'unknown',
];

function isValidStatusType(status: unknown): status is StatusType {
  return typeof status === 'string' && VALID_STATUS_TYPES.includes(status as StatusType);
}

function isValidLocaleText(text: unknown): text is LocaleText {
  if (
    typeof text !== 'object' ||
    text === null ||
    !('ja' in text) ||
    !('en' in text) ||
    typeof (text as LocaleText).ja !== 'string' ||
    typeof (text as LocaleText).en !== 'string'
  ) {
    return false;
  }
  
  const { ja, en } = text as LocaleText;
  return ja.length <= MAX_STRING_LENGTH && en.length <= MAX_STRING_LENGTH;
}

function isValidISODate(dateStr: string): boolean {
  if (!dateStr || typeof dateStr !== 'string') return false;
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
    return parsedUrl.protocol === 'http:' || parsedUrl.protocol === 'https:';
  } catch {
    return false;
  }
}

function validateServicePayload(service: unknown): service is ServiceEventPayload {
  if (typeof service !== 'object' || service === null) {
    return false;
  }
  const s = service as Record<string, unknown>;
  
  if (typeof s.serviceId !== 'string' || !s.serviceId || s.serviceId.length > MAX_STRING_LENGTH) {
    return false;
  }
  if (!isValidStatusType(s.status)) {
    return false;
  }
  if (!isValidLocaleText(s.summary)) {
    return false;
  }
  if (s.statusSince !== undefined && (typeof s.statusSince !== 'string' || !isValidISODate(s.statusSince))) {
    return false;
  }
  
  return true;
}

function validateIncidentUpdatePayload(update: unknown): update is IncidentUpdatePayload {
  if (typeof update !== 'object' || update === null) {
    return false;
  }
  const u = update as Record<string, unknown>;
  
  if (!isValidStatusType(u.status)) {
    return false;
  }
  if (!isValidLocaleText(u.body)) {
    return false;
  }
  if (u.id !== undefined && (typeof u.id !== 'string' || u.id.length > MAX_STRING_LENGTH)) {
    return false;
  }
  if (u.createdAt !== undefined && (typeof u.createdAt !== 'string' || !isValidISODate(u.createdAt))) {
    return false;
  }
  
  return true;
}

function validateIncidentPayload(incident: unknown): incident is IncidentEventPayload {
  if (typeof incident !== 'object' || incident === null) {
    return false;
  }
  const i = incident as Record<string, unknown>;
  
  if (!isValidStatusType(i.impact)) {
    return false;
  }
  if (!Array.isArray(i.affectedServiceIds) || i.affectedServiceIds.length === 0 || i.affectedServiceIds.length > MAX_ARRAY_SIZE) {
    return false;
  }
  if (!i.affectedServiceIds.every((id: unknown) => typeof id === 'string' && id.length <= MAX_STRING_LENGTH)) {
    return false;
  }
  if (!isValidLocaleText(i.title)) {
    return false;
  }
  if (!isValidLocaleText(i.description)) {
    return false;
  }
  if (typeof i.startedAt !== 'string' || !i.startedAt || !isValidISODate(i.startedAt)) {
    return false;
  }
  
  // オプショナルフィールドのバリデーション
  if (i.id !== undefined && (typeof i.id !== 'string' || i.id.length > MAX_STRING_LENGTH)) {
    return false;
  }
  if (i.slug !== undefined && (typeof i.slug !== 'string' || i.slug.length > MAX_STRING_LENGTH)) {
    return false;
  }
  if (i.resolvedAt !== undefined && i.resolvedAt !== null && (typeof i.resolvedAt !== 'string' || !isValidISODate(i.resolvedAt))) {
    return false;
  }
  if (i.cause !== undefined && i.cause !== null && !isValidLocaleText(i.cause)) {
    return false;
  }
  if (i.externalLink !== undefined && i.externalLink !== null && (typeof i.externalLink !== 'string' || i.externalLink.length > MAX_STRING_LENGTH || !isValidUrl(i.externalLink))) {
    return false;
  }
  if (i.updates !== undefined) {
    if (!Array.isArray(i.updates) || i.updates.length > MAX_UPDATES_PER_INCIDENT) {
      return false;
    }
    if (!i.updates.every(validateIncidentUpdatePayload)) {
      return false;
    }
  }
  
  return true;
}

function validatePayload(body: unknown): { valid: true; data: StatusEventPayload } | { valid: false; error: string } {
  if (typeof body !== 'object' || body === null) {
    return { valid: false, error: 'リクエストボディはオブジェクトである必要があります' };
  }
  
  const payload = body as Record<string, unknown>;
  
  // services または incidents の少なくとも一方は必要
  if (!payload.services && !payload.incidents) {
    return { valid: false, error: 'services または incidents の少なくとも一方を指定してください' };
  }
  
  // services のバリデーション
  if (payload.services !== undefined) {
    if (!Array.isArray(payload.services)) {
      return { valid: false, error: 'services は配列である必要があります' };
    }
    if (payload.services.length > MAX_SERVICES) {
      return { valid: false, error: `services の配列は最大 ${MAX_SERVICES} 個までです` };
    }
    for (const service of payload.services) {
      if (!validateServicePayload(service)) {
        return { valid: false, error: 'services の形式が正しくありません' };
      }
    }
  }
  
  // incidents のバリデーション
  if (payload.incidents !== undefined) {
    if (!Array.isArray(payload.incidents)) {
      return { valid: false, error: 'incidents は配列である必要があります' };
    }
    if (payload.incidents.length > MAX_INCIDENTS) {
      return { valid: false, error: `incidents の配列は最大 ${MAX_INCIDENTS} 個までです` };
    }
    for (const incident of payload.incidents) {
      if (!validateIncidentPayload(incident)) {
        return { valid: false, error: 'incidents の形式が正しくありません' };
      }
    }
  }
  
  return { valid: true, data: payload as StatusEventPayload };
}

// ユニークIDの生成
function generateId(): string {
  return nanoid();
}

// スラッグの生成
function generateSlug(title: string): string {
  // タイトルから基本的なスラッグを生成（ASCIIのみ許可、ダイアクリティクス除去）
  const baseSlug = title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // ダイアクリティクス除去
    .replace(/[^a-z0-9\s-]/g, '') // a-z, 0-9, スペース, ハイフンのみ許可
    .replace(/\s+/g, '-') // スペースをハイフンに
    .replace(/-+/g, '-') // ハイフン連続を1つに
    .replace(/^-|-$/g, '') // 先頭・末尾のハイフン除去
    .substring(0, 50);
  
  // baseSlugが空の場合は'incident'を使用
  return `${baseSlug || 'incident'}-${nanoid(10)}`;
}

// サービスステータスの更新
async function updateServices(services: ServiceEventPayload[]): Promise<void> {
  await prisma.$transaction(async (tx) => {
    await Promise.all(
      services.map(async (service) => {
        const statusSince = service.statusSince ? new Date(service.statusSince) : new Date();
        
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
          orderBy: { createdAt: 'desc' },
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
async function updateIncidents(incidents: IncidentEventPayload[]): Promise<void> {
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
              resolvedAt: incident.resolvedAt ? new Date(incident.resolvedAt) : null,
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
              resolvedAt: incident.resolvedAt ? new Date(incident.resolvedAt) : null,
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
            const createdAt = update.createdAt ? new Date(update.createdAt) : now;
            
            // 既存の更新があれば更新、なければ作成
            if (update.id) {
              const existingUpdate = await tx.incidentUpdate.findUnique({
                where: { id: update.id },
              });
              
              if (existingUpdate) {
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

// Redisキャッシュの更新とSSEイベントの配信
async function updateCacheAndNotify(): Promise<void> {
  // 更新されたデータを取得
  const [statusLabel, services, incidents] = await Promise.all([
    getStatusLabel(),
    getServices(),
    getIncidentHistories(),
  ]);
  
  const snapshot = {
    statusLabel,
    services,
    incidents,
  };
  
  if (isRedisAvailable()) {
    try {
      // 各ロケール用のキャッシュを並列更新
      const locales = ['ja', 'en'] as const;
      await Promise.all(
        locales.map(async (locale) => {
          const [localeServices, localeIncidents] = await Promise.all([
            getServices(locale),
            getIncidentHistories(locale),
          ]);
          
          // キャッシュを更新
          await redis.setex(`services:all:${locale}`, 600, JSON.stringify(localeServices));
          await redis.setex(`incidents:all:${locale}`, 600, JSON.stringify(localeIncidents));
        })
      );
      
      // SSEイベントを配信
      await redis.publish('status:updates', JSON.stringify(snapshot));
      
      console.log('[StatusEvents] キャッシュ更新とSSEイベント配信が完了しました');
    } catch (error) {
      console.error('[StatusEvents] Redisの更新に失敗しました:', error);
      console.error('[StatusEvents] 注意: データベースは既に更新されていますが、キャッシュの更新またはSSEイベント配信に失敗しました。オペレーターはキャッシュの手動無効化や再配信を検討してください。');
      throw error;
    }
  }
}

export async function POST(request: NextRequest) {
  try {
    // API キー認証チェック（タイミング攻撃対策）
    const apiKey = request.headers.get('x-api-key');
    const expectedApiKey = process.env.STATUS_UPDATE_API_KEY;
    
    if (expectedApiKey) {
      if (!apiKey) {
        return NextResponse.json(
          { error: '認証に失敗しました' },
          { status: 401 }
        );
      }
      
      // タイミング攻撃を防ぐために timingSafeEqual を使用
      const apiKeyBuffer = Buffer.from(apiKey);
      const expectedKeyBuffer = Buffer.from(expectedApiKey);
      
      // バッファの長さを同じにする（timingSafeEqual の要件）
      if (apiKeyBuffer.length !== expectedKeyBuffer.length) {
        return NextResponse.json(
          { error: '認証に失敗しました' },
          { status: 401 }
        );
      }
      
      if (!timingSafeEqual(apiKeyBuffer, expectedKeyBuffer)) {
        return NextResponse.json(
          { error: '認証に失敗しました' },
          { status: 401 }
        );
      }
    }
    
    // リクエストボディの取得とバリデーション
    const body = await request.json();
    const validation = validatePayload(body);
    
    if (!validation.valid) {
      return NextResponse.json(
        { error: validation.error },
        { status: 400 }
      );
    }
    
    const payload = validation.data;
    
    // データベース更新を実行
    // サービスステータスの更新
    if (payload.services && payload.services.length > 0) {
      await updateServices(payload.services);
    }
    
    // インシデントの更新
    if (payload.incidents && payload.incidents.length > 0) {
      await updateIncidents(payload.incidents);
    }
    
    // Redisキャッシュの更新とSSEイベントの配信
    await updateCacheAndNotify();
    
    return NextResponse.json(
      {
        success: true,
        message: 'ステータスが正常に更新されました',
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('[StatusEvents] エラーが発生しました:', error);
    
    // 本番環境では詳細なエラーメッセージを隠す
    const isDevelopment = process.env.NODE_ENV === 'development';
    
    return NextResponse.json(
      {
        error: 'サーバーエラーが発生しました',
        ...(isDevelopment && { details: error instanceof Error ? error.message : String(error) }),
      },
      { status: 500 }
    );
  }
}
