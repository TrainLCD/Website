import { prisma } from '../lib/prisma';
import { redis } from '../lib/redis';
import type { IncidentHistory, StatusType } from '../types';

const CACHE_TTL = 60; // 60 seconds cache
const INCIDENTS_CACHE_KEY = 'incidents:all';
const INCIDENT_CACHE_KEY_PREFIX = 'incident:';

/**
 * Fetches all incident histories with their updates.
 * Checks Redis cache first, then falls back to PostgreSQL.
 */
export async function getIncidentHistories(): Promise<IncidentHistory[]> {
  try {
    // Try Redis cache first if connected
    if (isRedisAvailable()) {
      const cached = await redis.get(INCIDENTS_CACHE_KEY);
      if (cached) {
        console.log('[IncidentRepository] Cache HIT for incidents');
        return JSON.parse(cached);
      }
      console.log('[IncidentRepository] Cache MISS for incidents, fetching from DB');
    }

    // Fetch from PostgreSQL using Prisma
    const incidents = await prisma.incidentHistory.findMany({
      include: {
        updates: {
          orderBy: {
            createdAt: 'asc',
          },
        },
        affectedServices: {
          select: {
            serviceId: true,
          },
        },
      },
      orderBy: {
        publishedAt: 'desc',
      },
    });

    type PrismaIncident = {
      id: string;
      slug: string;
      incidentImpact: string;
      affectedServices: { serviceId: string }[];
      titleJa: string;
      titleEn: string;
      descriptionJa: string;
      descriptionEn: string;
      publishedAt: Date;
      startedAt: Date;
      updatedAt: Date;
      resolvedAt: Date | null;
      estimatedResolveDate: Date | null;
      causeJa: string | null;
      causeEn: string | null;
      externalLink: string | null;
      lastNotifiedAt: Date | null;
      updates: {
        id: string;
        status: string;
        bodyJa: string;
        bodyEn: string;
        createdAt: Date;
      }[];
    };

    const incidentHistories: IncidentHistory[] = incidents.map((incident: PrismaIncident) => ({
      id: incident.id,
      slug: incident.slug,
      incidentImpact: incident.incidentImpact as StatusType,
      affectedServiceIds: incident.affectedServices.map((as) => as.serviceId),
      title: {
        ja: incident.titleJa,
        en: incident.titleEn,
      },
      description: {
        ja: incident.descriptionJa,
        en: incident.descriptionEn,
      },
      publishedAt: incident.publishedAt.toISOString(),
      startedAt: incident.startedAt.toISOString(),
      updatedAt: incident.updatedAt.toISOString(),
      resolvedAt: incident.resolvedAt?.toISOString() ?? null,
      estimatedResolveDate: incident.estimatedResolveDate?.toISOString() ?? null,
      cause: incident.causeJa && incident.causeEn
        ? {
            ja: incident.causeJa,
            en: incident.causeEn,
          }
        : null,
      externalLink: incident.externalLink,
      updates: incident.updates.map((update) => ({
        id: update.id,
        status: update.status as StatusType,
        body: {
          ja: update.bodyJa,
          en: update.bodyEn,
        },
        createdAt: update.createdAt.toISOString(),
      })),
      lastNotifiedAt: incident.lastNotifiedAt?.toISOString() ?? null,
    }));

    // Cache in Redis if connected
    if (isRedisAvailable()) {
      await redis.setex(
        INCIDENTS_CACHE_KEY,
        CACHE_TTL,
        JSON.stringify(incidentHistories)
      ).catch((err: Error) => {
        console.warn('[IncidentRepository] Failed to cache incidents:', err.message);
      });
    }

    return incidentHistories;
  } catch (error) {
    console.error('[IncidentRepository] Error fetching incidents:', error);
    throw error;
  }
}

/**
 * Fetches a single incident by slug with its updates.
 * Checks Redis cache first, then falls back to PostgreSQL.
 */
export async function getIncidentBySlug(slug: string): Promise<IncidentHistory | null> {
  try {
    const cacheKey = `${INCIDENT_CACHE_KEY_PREFIX}${slug}`;
    
    // Try Redis cache first if connected
    if (isRedisAvailable()) {
      const cached = await redis.get(cacheKey);
      if (cached) {
        console.log(`[IncidentRepository] Cache HIT for incident ${slug}`);
        return JSON.parse(cached);
      }
      console.log(`[IncidentRepository] Cache MISS for incident ${slug}, fetching from DB`);
    }

    // Fetch from PostgreSQL using Prisma
    const incident = await prisma.incidentHistory.findUnique({
      where: {
        slug,
      },
      include: {
        updates: {
          orderBy: {
            createdAt: 'asc',
          },
        },
        affectedServices: {
          select: {
            serviceId: true,
          },
        },
      },
    });

    if (!incident) {
      return null;
    }

    type PrismaIncidentDetail = {
      id: string;
      slug: string;
      incidentImpact: string;
      affectedServices: { serviceId: string }[];
      titleJa: string;
      titleEn: string;
      descriptionJa: string;
      descriptionEn: string;
      publishedAt: Date;
      startedAt: Date;
      updatedAt: Date;
      resolvedAt: Date | null;
      estimatedResolveDate: Date | null;
      causeJa: string | null;
      causeEn: string | null;
      externalLink: string | null;
      lastNotifiedAt: Date | null;
      updates: {
        id: string;
        status: string;
        bodyJa: string;
        bodyEn: string;
        createdAt: Date;
      }[];
    };

    const incidentHistory: IncidentHistory = {
      id: incident.id,
      slug: incident.slug,
      incidentImpact: incident.incidentImpact as StatusType,
      affectedServiceIds: (incident as PrismaIncidentDetail).affectedServices.map((as) => as.serviceId),
      title: {
        ja: incident.titleJa,
        en: incident.titleEn,
      },
      description: {
        ja: incident.descriptionJa,
        en: incident.descriptionEn,
      },
      publishedAt: incident.publishedAt.toISOString(),
      startedAt: incident.startedAt.toISOString(),
      updatedAt: incident.updatedAt.toISOString(),
      resolvedAt: incident.resolvedAt?.toISOString() ?? null,
      estimatedResolveDate: incident.estimatedResolveDate?.toISOString() ?? null,
      cause: incident.causeJa && incident.causeEn
        ? {
            ja: incident.causeJa,
            en: incident.causeEn,
          }
        : null,
      externalLink: incident.externalLink,
      updates: incident.updates.map((update) => ({
        id: update.id,
        status: update.status as StatusType,
        body: {
          ja: update.bodyJa,
          en: update.bodyEn,
        },
        createdAt: update.createdAt.toISOString(),
      })),
      lastNotifiedAt: incident.lastNotifiedAt?.toISOString() ?? null,
    };

    // Cache in Redis if connected
    if (isRedisAvailable()) {
      await redis.setex(
        cacheKey,
        CACHE_TTL,
        JSON.stringify(incidentHistory)
      ).catch((err: Error) => {
        console.warn(`[IncidentRepository] Failed to cache incident ${slug}:`, err.message);
      });
    }

    return incidentHistory;
  } catch (error) {
    console.error(`[IncidentRepository] Error fetching incident ${slug}:`, error);
    throw error;
  }
}
