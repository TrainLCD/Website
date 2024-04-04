export type StatusType =
  | "operational"
  | "maintenance"
  | "partiallyMaintenance"
  | "degraded"
  | "partiallyDegraded"
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
    name: "モバイルアプリ(iOS/iPadOS)",
    status: "maintenance",
    descriptionEn: "We are partially resuming service on a trial basis.",
    descriptionJa:
      "フィードバック機能はメンテナンスのためご利用になれません。他のサービスはすべて現在正常に稼働しております。",
    statusSince: "2024-04-04T00:00:00.000Z",
    updatedAt: "2024-04-04T00:00:00.000Z",
  },
  {
    id: 2,
    name: "モバイルアプリ(Android)",
    status: "maintenance",
    descriptionEn: "We are partially resuming service on a trial basis.",
    descriptionJa:
      "フィードバック機能はメンテナンスのためご利用になれません。他のサービスはすべて現在正常に稼働しております。",
    statusSince: "2024-04-04T00:00:00.000Z",
    updatedAt: "2024-04-04T00:00:00.000Z",
  },
  {
    id: 3,
    name: "API",
    status: "operational",
    descriptionEn: "The system is currently operating normally.",
    descriptionJa: "現在正常に稼働しております。",
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
export const underMaintenanceServices = (() =>
  services.filter((d) => d.status === "maintenance"))();
export const degradedServices = (() =>
  services.filter((d) => d.status === "degraded"))();
export const hasOutage = (() => services.some((d) => d.status === "outage"))();
export const statusLabel = ((): StatusType => {
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
})();
