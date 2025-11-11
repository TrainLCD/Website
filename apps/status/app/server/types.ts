// Types mirroring the data package structure

export type StatusType =
  | "operational"
  | "maintenance"
  | "partiallyMaintenance"
  | "degraded"
  | "partiallyDegraded"
  | "outage"
  | "unknown";

export type LocaleText = {
  ja: string;
  en: string;
};

export type ServiceCategory = "application" | "api" | "platform" | "support";

export type ServiceDefinition = {
  id: string;
  category: ServiceCategory;
  label: LocaleText;
  description: LocaleText;
};

export type ServiceStatusSnapshot = {
  serviceId: string;
  status: StatusType;
  summary: LocaleText;
  statusSince: string;
  updatedAt: string;
};

export type Service = {
  id: string;
  category: ServiceCategory;
  label: LocaleText;
  description: LocaleText;
  statusSummary: LocaleText;
  status: StatusType;
  statusSince: string;
  updatedAt: string;
};

export type IncidentUpdate = {
  id: string;
  status: StatusType;
  body: LocaleText;
  createdAt: string;
};

export type IncidentHistory = {
  id: string;
  slug: string;
  incidentImpact: StatusType;
  affectedServiceIds: string[];
  title: LocaleText;
  description: LocaleText;
  publishedAt: string;
  startedAt: string;
  updatedAt: string;
  resolvedAt: string | null;
  estimatedResolveDate: string | null;
  cause: LocaleText | null;
  externalLink: string | null;
  updates: IncidentUpdate[];
  lastNotifiedAt: string | null;
};
