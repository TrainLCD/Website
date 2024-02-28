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
    status: "maintenance",
    descriptionEn: "We are temporarily suspending all services.",
    descriptionJa:
      "一時的にサービスを全面休止しております。再開日時は未定です。",
    statusSince: "2023-12-15T00:00:00.000Z",
    updatedAt: "2023-12-15T00:00:00.000Z",
  },
  {
    id: 2,
    name: "API",
    status: "maintenance",
    descriptionEn: "Operation is temporarily suspended",
    descriptionJa: "一時的に稼働を休止しております。再開日時は未定です。",
    statusSince: "2023-12-15T00:00:00.000Z",
    updatedAt: "2023-12-15T00:00:00.000Z",
  },
];

export type IncidentHistory = {
  id: string;
  title: string;
  description: string;
  publishedAt: string;
  updatedAt: string;
  incidentLink: string;
};

export const incidentHistories: IncidentHistory[] = [
  {
    id: "urn:uuid:ef88d24e-baa9-4694-a662-a4e116cc4a7c",
    title: "TrainLCD開発者都合によるサービス全面休止",
    description:
      "TrainLCD開発者の一身上の都合で一時的にサービスを全面休止しております。再開日時は未定です。",
    publishedAt: "2023-12-15T00:00:00.000Z",
    updatedAt: "2023-12-15T00:00:00.000Z",
    incidentLink: "https://status.trainlcd.app/incidents/1",
  },
];