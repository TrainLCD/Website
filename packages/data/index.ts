export type StatusType =
  | "operational"
  | "maintenance"
  | "degraded"
  | "outage"
  | "unknown";

type Service = {
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
    statusSince: "2013-12-15T00:00:00.000Z",
    updatedAt: "2013-12-15T00:00:00.000Z",
  },
  {
    id: 2,
    name: "API",
    status: "maintenance",
    descriptionEn: "Operation is temporarily suspended",
    descriptionJa: "一時的に稼働を休止しております。再開日時は未定です。",
    statusSince: "2013-12-15T00:00:00.000Z",
    updatedAt: "2013-12-15T00:00:00.000Z",
  },
];
