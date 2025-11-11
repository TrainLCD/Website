import { prisma } from '../lib/prisma';
import { redis } from '../lib/redis';
import type { IncidentHistory, StatusType } from '../types';
import type { Prisma } from '@prisma/client';

const CACHE_TTL = 60; // 60 seconds cache
const INCIDENTS_CACHE_KEY = 'incidents:all';

type IncidentWithRelations = Prisma.IncidentHistoryGetPayload<{
  include: {
    updates: true;
    affectedServices: {
      select: {
        serviceId: true;
      };
    };
  };
}>;

/**
 * Fetches all incident histories with their updates.
 * Checks Redis cache first, then falls back to PostgreSQL.
 */
export async function getIncidentHistories(): Promise<IncidentHistory[]> {
  try {
    // Try Redis cache first if connected
    if (redis.status === 'ready') {
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

    const incidentHistories: IncidentHistory[] = incidents.map((incident: IncidentWithRelations) => ({
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
    if (redis.status === 'ready') {
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
