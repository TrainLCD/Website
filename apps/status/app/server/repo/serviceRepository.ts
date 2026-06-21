import { prisma } from "../lib/prisma";
import {
  isEdgeConfigReadAvailable,
  readServicesFromEdgeConfig,
} from "../lib/edgeConfig";
import type { Service, StatusType, ServiceCategory } from "../types";
import type { ServiceDefinition, ServiceStatusSnapshot } from "@prisma/client";
import type { Locale } from "../lib/locale";

type PrismaServiceDefinition = ServiceDefinition & {
  statusSnapshots: ServiceStatusSnapshot[];
};

export type RepoReadOptions = {
  /**
   * Edge Config のスナップショットを無視して常に DB から取得する。
   * 書き込み直後にスナップショットを再構築する用途で使用する。
   */
  skipCache?: boolean;
};

/**
 * Fetches all services with their current status.
 * Read priority: Edge Config (edge snapshot) -> PostgreSQL (source of truth).
 */
export async function getServices(
  locale: Locale = "ja",
  options: RepoReadOptions = {}
): Promise<Service[]> {
  const { skipCache = false } = options;
  try {
    // Try Edge Config first (edge read, no DB cold start) unless skipping caches
    if (!skipCache && isEdgeConfigReadAvailable()) {
      const fromEdge = await readServicesFromEdgeConfig(locale);
      if (fromEdge) {
        console.log("[ServiceRepository] Edge Config HIT for services");
        return fromEdge;
      }
    }

    // Fall back to PostgreSQL using Prisma
    const serviceDefinitions = await prisma.serviceDefinition.findMany({
      include: {
        statusSnapshots: {
          orderBy: {
            createdAt: "desc",
          },
          take: 1,
        },
      },
    });

    const services: Service[] = serviceDefinitions.map(
      (def: PrismaServiceDefinition) => {
        const snapshot = def.statusSnapshots[0];
        if (!snapshot) {
          throw new Error(`Missing status snapshot for service ${def.id}`);
        }

        return {
          id: def.id,
          category: def.category as Service["category"],
          label: {
            ja: def.labelJa,
            en: def.labelEn,
          },
          description: {
            ja: def.descriptionJa,
            en: def.descriptionEn,
          },
          statusSummary: {
            ja: snapshot.summaryJa || "",
            en: snapshot.summaryEn || "",
          },
          status: snapshot.status as StatusType,
          statusSince: snapshot.statusSince.toISOString(),
          updatedAt: snapshot.updatedAt.toISOString(),
        };
      }
    );

    return services;
  } catch (error) {
    if (error instanceof Error) {
      console.error(
        "[ServiceRepository] Database error fetching services:",
        error.message
      );
    } else {
      console.error(
        "[ServiceRepository] Unknown error fetching services:",
        error
      );
    }
    throw error;
  }
}

/**
 * Calculates the overall status label from a list of services (pure function).
 * Extracted so the write path can derive a fresh label from freshly-fetched
 * services without going through the cache.
 */
export function computeStatusLabel(services: Service[]): StatusType {
  const underMaintenanceServices = services.filter(
    (service) => service.status === "maintenance"
  );
  const degradedServices = services.filter(
    (service) => service.status === "degraded"
  );
  const hasOutage = services.some((service) => service.status === "outage");
  const isOperational = services.every(
    (service) => service.status === "operational"
  );

  if (underMaintenanceServices.length > 0) {
    if (underMaintenanceServices.length === services.length) {
      return "maintenance";
    }
    return "partiallyMaintenance";
  }
  if (degradedServices.length > 0) {
    if (degradedServices.length === services.length) {
      return "degraded";
    }
    return "partiallyDegraded";
  }
  if (hasOutage) {
    return "outage";
  }
  if (isOperational) {
    return "operational";
  }

  return "unknown";
}

/**
 * Calculates the overall status label based on current service statuses.
 */
export async function getStatusLabel(
  locale: Locale = "ja"
): Promise<StatusType> {
  const services = await getServices(locale);
  return computeStatusLabel(services);
}
