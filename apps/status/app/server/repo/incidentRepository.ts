import { prisma } from "../lib/prisma";
import {
  isEdgeConfigReadAvailable,
  readIncidentsFromEdgeConfig,
} from "../lib/edgeConfig";
import type { RepoReadOptions } from "./serviceRepository";
import type { IncidentHistory, StatusType } from "../types";
import type { Locale } from "../lib/locale";

/**
 * Edge Config に載せ、公開一覧・フィードで表示する直近インシデント件数。
 * Edge Config のサイズ上限を避けるため、ここで件数を絞る。
 * これより古いインシデントは Neon（`getIncidentBySlug` のフォールバック）から
 * 取得する。`STATUS_RECENT_INCIDENTS_LIMIT` で上書き可能。
 */
const RECENT_INCIDENTS_LIMIT = (() => {
  const n = Number(process.env.STATUS_RECENT_INCIDENTS_LIMIT);
  return Number.isFinite(n) && n > 0 ? n : 20;
})();

/**
 * Fetches the most recent incident histories (≤ RECENT_INCIDENTS_LIMIT) with
 * their updates, ordered by publishedAt desc.
 * Read priority: Edge Config (edge snapshot) -> PostgreSQL (source of truth).
 * 古いインシデントはここには含まれず、詳細ページ（getIncidentBySlug）経由で
 * Neon から取得される。
 */
export async function getIncidentHistories(
  locale: Locale = "ja",
  options: RepoReadOptions = {}
): Promise<IncidentHistory[]> {
  const { skipCache = false } = options;
  try {
    // Try Edge Config first (edge read, no DB cold start) unless skipping caches.
    // Edge Config には直近 RECENT_INCIDENTS_LIMIT 件のみが入っている。
    if (!skipCache && isEdgeConfigReadAvailable()) {
      const fromEdge = await readIncidentsFromEdgeConfig(locale);
      if (fromEdge) {
        console.log("[IncidentRepository] Edge Config HIT for incidents");
        return fromEdge;
      }
    }

    // Fall back to PostgreSQL using Prisma（直近 N 件のみ）
    const incidents = await prisma.incidentHistory.findMany({
      include: {
        updates: {
          orderBy: {
            createdAt: "asc",
          },
        },
        affectedServices: {
          select: {
            serviceId: true,
          },
        },
      },
      orderBy: {
        publishedAt: "desc",
      },
      take: RECENT_INCIDENTS_LIMIT,
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

    const incidentHistories: IncidentHistory[] = incidents.map(
      (incident: PrismaIncident) => ({
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
        estimatedResolveDate:
          incident.estimatedResolveDate?.toISOString() ?? null,
        cause:
          incident.causeJa && incident.causeEn
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
      })
    );

    return incidentHistories;
  } catch (error) {
    console.error("[IncidentRepository] Error fetching incidents:", error);
    throw error;
  }
}

/**
 * Fetches a single incident by slug with its updates.
 * Read priority: Edge Config (edge snapshot) -> PostgreSQL (source of truth).
 */
export async function getIncidentBySlug(
  slug: string,
  locale: Locale = "ja"
): Promise<IncidentHistory | null> {
  try {
    // Try Edge Config first: derive from the incidents snapshot.
    // If the slug is not present (e.g. archived out of Edge Config), fall
    // through to the DB instead of treating it as not-found.
    if (isEdgeConfigReadAvailable()) {
      const fromEdge = await readIncidentsFromEdgeConfig(locale);
      if (fromEdge) {
        const match = fromEdge.find((incident) => incident.slug === slug);
        if (match) {
          console.log(
            `[IncidentRepository] Edge Config HIT for incident ${slug}`
          );
          return match;
        }
      }
    }

    // Fall back to PostgreSQL using Prisma
    const incident = await prisma.incidentHistory.findUnique({
      where: {
        slug,
      },
      include: {
        updates: {
          orderBy: {
            createdAt: "asc",
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
      affectedServiceIds: (
        incident as PrismaIncidentDetail
      ).affectedServices.map((as) => as.serviceId),
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
      estimatedResolveDate:
        incident.estimatedResolveDate?.toISOString() ?? null,
      cause:
        incident.causeJa && incident.causeEn
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

    return incidentHistory;
  } catch (error) {
    console.error(
      `[IncidentRepository] Error fetching incident ${slug}:`,
      error
    );
    throw error;
  }
}
