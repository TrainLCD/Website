import { prisma } from '../lib/prisma';
import { redis } from '../lib/redis';
import type { Service, StatusType } from '../types';

const CACHE_TTL = 60; // 60 seconds cache
const SERVICES_CACHE_KEY = 'services:all';

/**
 * Fetches all services with their current status.
 * Checks Redis cache first, then falls back to PostgreSQL.
 */
export async function getServices(): Promise<Service[]> {
  try {
    // Try Redis cache first if connected
    if (redis.status === 'ready') {
      const cached = await redis.get(SERVICES_CACHE_KEY);
      if (cached) {
        console.log('[ServiceRepository] Cache HIT for services');
        return JSON.parse(cached);
      }
      console.log('[ServiceRepository] Cache MISS for services, fetching from DB');
    }

    // Fetch from PostgreSQL using Prisma
    const serviceDefinitions = await prisma.serviceDefinition.findMany({
      include: {
        statusSnapshots: {
          orderBy: {
            createdAt: 'desc',
          },
          take: 1,
        },
      },
    });

    const services: Service[] = serviceDefinitions.map((def) => {
      const snapshot = def.statusSnapshots[0];
      if (!snapshot) {
        throw new Error(`Missing status snapshot for service ${def.id}`);
      }

      return {
        id: def.id,
        category: def.category as Service['category'],
        label: {
          ja: def.labelJa,
          en: def.labelEn,
        },
        description: {
          ja: def.descriptionJa,
          en: def.descriptionEn,
        },
        statusSummary: {
          ja: snapshot.summaryJa,
          en: snapshot.summaryEn,
        },
        status: snapshot.status as StatusType,
        statusSince: snapshot.statusSince.toISOString(),
        updatedAt: snapshot.updatedAt.toISOString(),
      };
    });

    // Cache in Redis if connected
    if (redis.status === 'ready') {
      await redis.setex(SERVICES_CACHE_KEY, CACHE_TTL, JSON.stringify(services)).catch((err) => {
        console.warn('[ServiceRepository] Failed to cache services:', err.message);
      });
    }

    return services;
  } catch (error) {
    console.error('[ServiceRepository] Error fetching services:', error);
    throw error;
  }
}

/**
 * Calculates the overall status label based on service statuses.
 */
export async function getStatusLabel(): Promise<StatusType> {
  const services = await getServices();
  
  const underMaintenanceServices = services.filter(
    (service) => service.status === 'maintenance'
  );
  const degradedServices = services.filter(
    (service) => service.status === 'degraded'
  );
  const hasOutage = services.some((service) => service.status === 'outage');
  const isOperational = services.every(
    (service) => service.status === 'operational'
  );

  if (underMaintenanceServices.length > 0) {
    if (underMaintenanceServices.length === services.length) {
      return 'maintenance';
    }
    return 'partiallyMaintenance';
  }
  if (degradedServices.length > 0) {
    if (degradedServices.length === services.length) {
      return 'degraded';
    }
    return 'partiallyDegraded';
  }
  if (hasOutage) {
    return 'outage';
  }
  if (isOperational) {
    return 'operational';
  }

  return 'unknown';
}
