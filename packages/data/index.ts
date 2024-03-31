export type StatusType =
  | "operational"
  | "maintenance"
  | "degraded"
  | "outage"
  | "unknown";

export type Service = {
  id: number;
  name: string;
  status: StatusType;
  descriptionEn: string;
  descriptionJa: string;
  statusSince: string;
  updatedAt: string;
};

export const services: Service[] = [
  {
    id: 1,
    name: "モバイルアプリ",
    status: "degraded",
    descriptionEn: "We are partially resuming service on a trial basis.",
    descriptionJa: "試験的にサービスを一部再開しております。",
    statusSince: "2023-12-15T00:00:00.000Z",
    updatedAt: "2024-04-01T00:00:00.000Z",
  },
  {
    id: 2,
    name: "API",
    status: "degraded",
    descriptionEn: "We are partially resuming service on a trial basis.",
    descriptionJa: "試験的にサービスを一部再開しております。",
    statusSince: "2023-12-15T00:00:00.000Z",
    updatedAt: "2024-04-01T00:00:00.000Z",
  },
];

export type IncidentHistory = {
  id: string;
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
  updatedAt: string;
  resolvedAt: string | null;
  estimatedResolveDate: string | null;
  incidentImpact: StatusType;
};

export const incidentHistories: IncidentHistory[] = [
  {
    id: "urn:uuid:3f00fc27-b12e-4cef-9899-ab6f63b46444",
    slug: "2",
    title: "TrainLCD一部サービスの提供再開",
    description:
      "試験的にTrainLCDのサービスを一部再開しております。サービス全面再開ではございませんので、フィードバックと自動アナウンス機能はご利用になれません。また予期しないバグが発生する可能性がございます。",
    publishedAt: "2024-04-01T00:00:00.000Z",
    updatedAt: "2024-04-01T00:00:00.000Z",
    resolvedAt: null,
    estimatedResolveDate: null,
    incidentImpact: "degraded",
  },
  {
    id: "urn:uuid:ef88d24e-baa9-4694-a662-a4e116cc4a7c",
    slug: "1",
    title: "TrainLCD開発者都合によるサービス全面休止",
    description:
      "TrainLCD開発者の一身上の都合で一時的にサービスを全面休止しております。再開見込みは4月中旬です。",
    publishedAt: "2023-12-15T00:00:00.000Z",
    updatedAt: "2023-12-15T00:00:00.000Z",
    resolvedAt: "2024-04-01T00:00:00.000Z",
    estimatedResolveDate: null,
    incidentImpact: "maintenance",
  },
];

export const isOperational = (() =>
  services.every((d) => d.status === "operational"))();
export const hasUnderMaintenanceService = (() =>
  services.some((d) => d.status === "maintenance"))();
export const hasDegradedService = (() =>
  services.some((d) => d.status === "degraded"))();
export const hasOutage = (() => services.some((d) => d.status === "outage"))();
export const statusLabel = ((): StatusType => {
  if (hasUnderMaintenanceService) {
    return "maintenance";
  }
  if (hasDegradedService) {
    return "degraded";
  }
  if (hasOutage) {
    return "outage";
  }
  if (isOperational) {
    return "operational";
  }

  return "unknown";
})();
