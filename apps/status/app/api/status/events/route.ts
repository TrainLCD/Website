import { NextRequest, NextResponse } from 'next/server';
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
  return (
    typeof text === 'object' &&
    text !== null &&
    'ja' in text &&
    'en' in text &&
    typeof (text as LocaleText).ja === 'string' &&
    typeof (text as LocaleText).en === 'string'
  );
}

function validateServicePayload(service: unknown): service is ServiceEventPayload {
  if (typeof service !== 'object' || service === null) {
    return false;
  }
  const s = service as Record<string, unknown>;
  
  if (typeof s.serviceId !== 'string' || !s.serviceId) {
    return false;
  }
  if (!isValidStatusType(s.status)) {
    return false;
  }
  if (!isValidLocaleText(s.summary)) {
    return false;
  }
  if (s.statusSince !== undefined && typeof s.statusSince !== 'string') {
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
  if (u.id !== undefined && typeof u.id !== 'string') {
    return false;
  }
  if (u.createdAt !== undefined && typeof u.createdAt !== 'string') {
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
  if (!Array.isArray(i.affectedServiceIds) || i.affectedServiceIds.length === 0) {
    return false;
  }
  if (!i.affectedServiceIds.every((id: unknown) => typeof id === 'string')) {
    return false;
  }
  if (!isValidLocaleText(i.title)) {
    return false;
  }
  if (!isValidLocaleText(i.description)) {
    return false;
  }
  if (typeof i.startedAt !== 'string' || !i.startedAt) {
    return false;
  }
  
  // オプショナルフィールドのバリデーション
  if (i.id !== undefined && typeof i.id !== 'string') {
    return false;
  }
  if (i.slug !== undefined && typeof i.slug !== 'string') {
    return false;
  }
  if (i.resolvedAt !== undefined && i.resolvedAt !== null && typeof i.resolvedAt !== 'string') {
    return false;
  }
  if (i.cause !== undefined && i.cause !== null && !isValidLocaleText(i.cause)) {
    return false;
  }
  if (i.externalLink !== undefined && i.externalLink !== null && typeof i.externalLink !== 'string') {
    return false;
  }
  if (i.updates !== undefined) {
    if (!Array.isArray(i.updates)) {
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
  return `${Date.now()}-${Math.random().toString(36).substring(2, 11)}`;
}

// スラッグの生成（タイトルから）
function generateSlug(title: string): string {
  const timestamp = Date.now().toString(36);
  const randomStr = Math.random().toString(36).substring(2, 7);
  return `incident-${timestamp}-${randomStr}`;
}

// サービスステータスの更新
async function updateServices(services: ServiceEventPayload[]): Promise<void> {
  for (const service of services) {
    const statusSince = service.statusSince ? new Date(service.statusSince) : new Date();
    
    // サービス定義が存在することを確認
    const serviceDefinition = await prisma.serviceDefinition.findUnique({
      where: { id: service.serviceId },
    });
    
    if (!serviceDefinition) {
      throw new Error(`サービスID ${service.serviceId} が見つかりません`);
    }
    
    // 既存のスナップショットを取得
    const existingSnapshot = await prisma.serviceStatusSnapshot.findFirst({
      where: { serviceId: service.serviceId },
      orderBy: { createdAt: 'desc' },
    });
    
    // 新しいスナップショットを作成（ステータスが変更された場合のみ）
    if (!existingSnapshot || existingSnapshot.status !== service.status) {
      await prisma.serviceStatusSnapshot.create({
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
      await prisma.serviceStatusSnapshot.update({
        where: { id: existingSnapshot.id },
        data: {
          summaryJa: service.summary.ja,
          summaryEn: service.summary.en,
        },
      });
    }
  }
}

// インシデントの更新
async function updateIncidents(incidents: IncidentEventPayload[]): Promise<void> {
  for (const incident of incidents) {
    const incidentId = incident.id || generateId();
    const slug = incident.slug || generateSlug(incident.title.ja);
    const now = new Date();
    
    // インシデントのupsert
    const existingIncident = incident.id
      ? await prisma.incidentHistory.findUnique({ where: { id: incident.id } })
      : null;
    
    if (existingIncident) {
      // 既存インシデントの更新
      await prisma.incidentHistory.update({
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
      await prisma.incidentHistory.create({
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
    await prisma.affectedService.deleteMany({
      where: { incidentId: incidentId },
    });
    
    for (const serviceId of incident.affectedServiceIds) {
      await prisma.affectedService.create({
        data: {
          incidentId: incidentId,
          serviceId: serviceId,
        },
      });
    }
    
    // インシデント更新の追加
    if (incident.updates && incident.updates.length > 0) {
      for (const update of incident.updates) {
        const updateId = update.id || generateId();
        const createdAt = update.createdAt ? new Date(update.createdAt) : now;
        
        // 既存の更新があれば更新、なければ作成
        if (update.id) {
          const existingUpdate = await prisma.incidentUpdate.findUnique({
            where: { id: update.id },
          });
          
          if (existingUpdate) {
            await prisma.incidentUpdate.update({
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
        await prisma.incidentUpdate.create({
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
  }
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
      // 各ロケール用のキャッシュを更新
      const locales = ['ja', 'en'] as const;
      for (const locale of locales) {
        const [localeStatusLabel, localeServices, localeIncidents] = await Promise.all([
          getStatusLabel(locale),
          getServices(locale),
          getIncidentHistories(locale),
        ]);
        
        const localeSnapshot = {
          statusLabel: localeStatusLabel,
          services: localeServices,
          incidents: localeIncidents,
        };
        
        // キャッシュを更新
        await redis.setex(`services:all:${locale}`, 600, JSON.stringify(localeServices));
        await redis.setex(`incidents:all:${locale}`, 600, JSON.stringify(localeIncidents));
      }
      
      // SSEイベントを配信
      await redis.publish('status:updates', JSON.stringify(snapshot));
      
      console.log('[StatusEvents] キャッシュ更新とSSEイベント配信が完了しました');
    } catch (error) {
      console.error('[StatusEvents] Redisの更新に失敗しました:', error);
      throw error;
    }
  }
}

export async function POST(request: NextRequest) {
  try {
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
    
    return NextResponse.json(
      {
        error: 'サーバーエラーが発生しました',
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
