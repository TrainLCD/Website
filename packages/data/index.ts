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
        status: "operational",
        descriptionEn:
            "At this time, we do not have any information on the failure of the mobile application.",
        descriptionJa:
            "現時点においてモバイルアプリについての障害情報はございません。",
        statusSince: "2024-04-04T00:00:00.000Z",
        updatedAt: "2024-04-05T00:00:00.000Z",
    },
    {
        id: 2,
        name: "モバイルアプリ(Android)",
        status: "operational",
        descriptionEn:
            "At this time, we do not have any information on the failure of the mobile application.",
        descriptionJa:
            "現時点においてモバイルアプリについての障害情報はございません。",
        statusSince: "2024-04-04T00:00:00.000Z",
        updatedAt: "2024-04-05T00:00:00.000Z",
    },
    {
        id: 3,
        name: "フィードバックシステム",
        status: "operational",
        descriptionEn: "The feedback function is currently working properly.",
        descriptionJa: "フィードバック機能は現在正常にご利用いただけます。",
        statusSince: "2024-04-09T00:00:00.000Z",
        updatedAt: "2024-04-09T00:00:00.000Z",
    },
    {
        id: 4,
        name: "自動アナウンス機能(TTS)",
        status: "operational",
        descriptionEn:
            "The automatic announcement function is currently working properly.",
        descriptionJa: "自動アナウンス機能は現在正常にご利用いただけます。",
        statusSince: "2024-04-05T00:00:00.000Z",
        updatedAt: "2024-04-05T00:00:00.000Z",
    },
    {
        id: 5,
        name: "StationAPI",
        status: "operational",
        descriptionEn: "The system is currently operating normally.",
        descriptionJa: "現在正常に稼働しております。",
        statusSince: "2023-12-15T00:00:00.000Z",
        updatedAt: "2024-04-05T00:00:00.000Z",
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
    cause: string;
};

export const incidentHistories: IncidentHistory[] = [
    {
        id: "urn:uuid:936e0961-0cbf-4ccd-a80c-facd88b8c052",
        slug: "2024-04-17-tts-incident",
        title:
            "TrainLCDアプリ バージョン7.1.0にて自動アナウンス機能が断続的に使用不可",
        description:
            "日本時間2024年4月17日 17時から同日19時にかけてTrainLCD バージョン7.1.0にて断続的に自動アナウンス機能が動作しない障害が発生しておりましたが、現在は復旧しております。原因はサービス基盤の設定不備でございます。利用者の方々にご迷惑をおかけしたことをお詫び申し上げます。",
        publishedAt: "2024-04-17T10:00:00.000Z",
        updatedAt: "2024-04-17T10:00:00.000Z",
        resolvedAt: "2024-04-17T10:00:00.000Z",
        estimatedResolveDate: null,
        incidentImpact: "degraded",
        cause: "サービス基盤の設定不備",
    },
    {
        id: "urn:uuid:e0f56f6e-1855-4ddf-8bc6-d218871d441c",
        slug: "2024-04-09-operational",
        title: "TrainLCD全サービスの提供再開",
        description:
            "2024年4月9日現在より自動アナウンス機能、フィードバック機能どちらとも使用可能となり、TrainLCDサービスの全面再開となりました。ご不便ご迷惑をおかけして申し訳ございませんでした。また皆様のメンテナンスへのご理解ご協力を心より感謝致します。",
        publishedAt: "2024-04-09T00:00:00.000Z",
        updatedAt: "2024-04-09T00:00:00.000Z",
        resolvedAt: "2024-04-09T00:00:00.000Z",
        estimatedResolveDate: null,
        incidentImpact: "operational",
        cause: "TrainLCD全サービス提供休止の影響",
    },
    {
        id: "urn:uuid:3f00fc27-b12e-4cef-9899-ab6f63b46444",
        slug: "2",
        title: "TrainLCD一部サービスの提供再開",
        description:
            "試験的にTrainLCDのサービスを一部再開しております。サービス全面再開ではございませんので、フィードバックと自動アナウンス機能はご利用になれません。また予期しないバグが発生する可能性がございます。",
        publishedAt: "2024-04-01T00:00:00.000Z",
        updatedAt: "2024-04-01T00:00:00.000Z",
        resolvedAt: "2024-04-09T00:00:00.000Z",
        estimatedResolveDate: null,
        incidentImpact: "degraded",
        cause: "TrainLCD全サービス提供休止の影響",
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
        cause: "TrainLCD開発者の一身上の都合",
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
