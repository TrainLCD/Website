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

const serviceCatalog: ServiceDefinition[] = [
  {
    id: "mobile-ios",
    category: "application",
    label: {
      ja: "モバイルアプリ(iOS/iPadOS)",
      en: "Mobile App (iOS/iPadOS)",
    },
    description: {
      ja: "現時点においてモバイルアプリについての障害情報はございません。",
      en: "At this time, we do not have any information on the failure of the mobile application.",
    },
  },
  {
    id: "mobile-android",
    category: "application",
    label: {
      ja: "モバイルアプリ(Android)",
      en: "Mobile App (Android)",
    },
    description: {
      ja: "現時点においてモバイルアプリについての障害情報はございません。",
      en: "At this time, we do not have any information on the failure of the mobile application.",
    },
  },
  {
    id: "feedback",
    category: "support",
    label: {
      ja: "フィードバックシステム",
      en: "Feedback System",
    },
    description: {
      ja: "フィードバック機能は現在正常にご利用いただけます。",
      en: "The feedback function is currently working properly.",
    },
  },
  {
    id: "tts",
    category: "platform",
    label: {
      ja: "自動アナウンス機能(TTS)",
      en: "Automated Announcements (TTS)",
    },
    description: {
      ja: "現在正常に稼働しております。",
      en: "The system is currently operating normally.",
    },
  },
  {
    id: "station-api",
    category: "api",
    label: {
      ja: "StationAPI",
      en: "StationAPI",
    },
    description: {
      ja: "現在正常に稼働しております。",
      en: "The system is currently operating normally.",
    },
  },
];

const serviceStatusSnapshots: ServiceStatusSnapshot[] = [
  {
    serviceId: "mobile-ios",
    status: "operational",
    summary: {
      ja: "現時点においてモバイルアプリについての障害情報はございません。",
      en: "At this time, we do not have any information on the failure of the mobile application.",
    },
    statusSince: "2024-04-04T00:00:00+09:00",
    updatedAt: "2024-04-05T00:00:00+09:00",
  },
  {
    serviceId: "mobile-android",
    status: "operational",
    summary: {
      ja: "現時点においてモバイルアプリについての障害情報はございません。",
      en: "At this time, we do not have any information on the failure of the mobile application.",
    },
    statusSince: "2024-04-04T00:00:00+09:00",
    updatedAt: "2024-04-05T00:00:00+09:00",
  },
  {
    serviceId: "feedback",
    status: "operational",
    summary: {
      ja: "フィードバック機能は現在正常にご利用いただけます。",
      en: "The feedback function is currently working properly.",
    },
    statusSince: "2024-04-09T00:00:00+09:00",
    updatedAt: "2024-04-09T00:00:00+09:00",
  },
  {
    serviceId: "tts",
    status: "operational",
    summary: {
      ja: "現在正常に稼働しております。",
      en: "The system is currently operating normally.",
    },
    statusSince: "2025-01-20T00:11:00+09:00",
    updatedAt: "2025-01-20T00:11:00+09:00",
  },
  {
    serviceId: "station-api",
    status: "operational",
    summary: {
      ja: "現在正常に稼働しております。",
      en: "The system is currently operating normally.",
    },
    statusSince: "2023-12-15T00:00:00+09:00",
    updatedAt: "2024-04-05T00:00:00+09:00",
  },
];

const serviceStatusById = new Map<string, ServiceStatusSnapshot>(
  serviceStatusSnapshots.map((snapshot) => [snapshot.serviceId, snapshot])
);

export const services: Service[] = serviceCatalog.map((service) => {
  const snapshot = serviceStatusById.get(service.id);
  if (!snapshot) {
    throw new Error(`Missing status for service ${service.id}`);
  }

  return {
    id: service.id,
    category: service.category,
    label: service.label,
    description: service.description,
    statusSummary: snapshot.summary,
    status: snapshot.status,
    statusSince: snapshot.statusSince,
    updatedAt: snapshot.updatedAt,
  };
});

type IncidentSeed = Omit<IncidentHistory, "updatedAt"> & {
  updatedAt?: string;
};

const incidentSeed: IncidentSeed[] = [
  {
    id: "urn:uuid:974a2140-0b20-4d74-82aa-e98b1b6240ab",
    slug: "2024-11-01-tts-outage",
    incidentImpact: "outage",
    affectedServiceIds: ["tts"],
    title: {
      ja: "自動アナウンス機能の一時的な使用不可について",
      en: "Temporary unavailability of TTS announcements",
    },
    description: {
      ja: "開発者の個人的な都合により自動アナウンス機能の運用を取りやめておりましたが、2024年11月16日 14時15分現在自動アナウンス機能の提供を再開致しました。\nこの復旧作業においての音質の変更はありません。利用者の方々にご迷惑をおかけしたことをお詫び申し上げます。",
      en: "Service for the TTS announcements resumed at 14:15 JST on 16 Nov 2024 with no change in audio quality. We apologise for the disruption caused while the operator was unavailable.",
    },
    publishedAt: "2024-11-16T00:36:00.000",
    startedAt: "2024-11-16T00:36:00.000",
    resolvedAt: "2024-11-16T14:15:00.000",
    estimatedResolveDate: null,
    cause: {
      ja: "開発者の個人的な都合",
      en: "Personal circumstances of the maintainer",
    },
    externalLink: null,
    updates: [
      {
        id: "974a2140-post-1",
        status: "outage",
        body: {
          ja: "当面の間、TTS 機能を停止いたします。再開時期は未定です。",
          en: "The TTS feature is suspended until further notice.",
        },
        createdAt: "2024-11-16T00:36:00.000",
      },
      {
        body: {
          ja: "開発者の個人的な都合により自動アナウンス機能の運用を取りやめておりましたが、2024年11月16日 14時15分現在自動アナウンス機能の提供を再開致しました。\nこの復旧作業においての音質の変更はありません。利用者の方々にご迷惑をおかけしたことをお詫び申し上げます。",
          en: "Service for the TTS announcements resumed at 14:15 JST on 16 Nov 2024 with no change in audio quality. We apologise for the disruption caused while the operator was unavailable.",
        },
        createdAt: "2024-11-16T14:15:00.000",
        id: "974a2140-post-2",
        status: "operational",
      },
    ],
    lastNotifiedAt: "2024-11-16T00:36:00.000",
  },
  {
    id: "urn:uuid:d054fa44-faf9-42d0-a0d6-6c062cfe344c",
    slug: "2024-11-01-tts-degradation",
    incidentImpact: "degraded",
    affectedServiceIds: ["tts"],
    title: {
      ja: "自動アナウンス機能日本語音声のコスト削減について",
      en: "Cost optimisation for Japanese TTS audio",
    },
    description: {
      ja: "音質を落とした形で自動アナウンス機能を提供しておりましたが、現在は通常音質で提供しております。",
      en: "We had been providing TTS with reduced audio fidelity, but it is now available at normal quality.",
    },
    publishedAt: "2024-11-07T00:00:00.000",
    startedAt: "2024-11-07T00:00:00.000",
    resolvedAt: "2025-01-16T00:00:00.000",
    estimatedResolveDate: null,
    cause: {
      ja: "開発者の個人的な都合",
      en: "Personal circumstances of the maintainer",
    },
    externalLink: null,
    updates: [
      {
        id: "d054fa44-post-1",
        status: "degraded",
        body: {
          ja: "音質を落とした形でTTSを継続提供いたします。",
          en: "We continue to provide TTS with reduced audio fidelity.",
        },
        createdAt: "2024-11-07T00:00:00.000",
      },
      {
        id: "d054fa44-post-2",
        status: "operational",
        body: {
          ja: "音質を落とした形で自動アナウンス機能を提供しておりましたが、現在は通常音質で提供しております。",
          en: "We had been providing TTS with reduced audio fidelity, but it is now available at normal quality.",
        },
        createdAt: "2025-01-16T00:00:00.000",
      },
    ],
    lastNotifiedAt: "2025-01-16T00:00:00.000",
  },
  {
    id: "urn:uuid:936e0961-0cbf-4ccd-a80c-facd88b8c052",
    slug: "2024-04-17-tts-incident",
    incidentImpact: "degraded",
    affectedServiceIds: ["tts"],
    title: {
      ja: "TrainLCDアプリ バージョン7.1.0にて自動アナウンス機能が断続的に使用不可",
      en: "Intermittent failures of TTS on TrainLCD v7.1.0",
    },
    description: {
      ja: "日本時間2024年4月17日 17時から同日19時にかけてTrainLCD バージョン7.1.0にて断続的に自動アナウンス機能が動作しない障害が発生しておりましたが、現在は復旧しております。原因はサービス基盤の設定不備でございます。利用者の方々にご迷惑をおかけしたことをお詫び申し上げます。",
      en: "Between 17:00 and 19:00 JST on 17 Apr 2024, TrainLCD v7.1.0 intermittently failed to play TTS announcements. The issue has been resolved after fixing a configuration error in the service platform.",
    },
    publishedAt: "2024-04-17T17:00:00+09:00",
    startedAt: "2024-04-17T17:00:00+09:00",
    resolvedAt: "2024-04-17T00:00:00.000+09:00",
    estimatedResolveDate: null,
    cause: {
      ja: "サービス基盤の設定不備",
      en: "Misconfiguration within the service platform",
    },
    externalLink: null,
    updates: [
      {
        id: "936e0961-post-1",
        status: "degraded",
        body: {
          ja: "バージョン7.1.0で断続的にTTSが再生されない事象を確認しています。",
          en: "We observed intermittent TTS playback failures on app version 7.1.0.",
        },
        createdAt: "2024-04-17T17:00:00+09:00",
      },
      {
        id: "936e0961-post-2",
        status: "operational",
        body: {
          ja: "日本時間2024年4月17日 17時から同日19時にかけてTrainLCD バージョン7.1.0にて断続的に自動アナウンス機能が動作しない障害が発生しておりましたが、現在は復旧しております。原因はサービス基盤の設定不備でございます。利用者の方々にご迷惑をおかけしたことをお詫び申し上げます。",
          en: "Configuration has been fixed and the TTS feature is now operating normally.",
        },
        createdAt: "2024-04-17T00:00:00.000+09:00",
      },
    ],
    lastNotifiedAt: "2024-04-17T00:00:00.000+09:00",
  },
  {
    id: "urn:uuid:ef88d24e-baa9-4694-a662-a4e116cc4a7c",
    slug: "1",
    incidentImpact: "maintenance",
    affectedServiceIds: [
      "mobile-ios",
      "mobile-android",
      "feedback",
      "tts",
      "station-api",
    ],
    title: {
      ja: "TrainLCD開発者都合によるサービス全面休止",
      en: "Full suspension of TrainLCD services",
    },
    description: {
      ja: "2024年4月9日現在より自動アナウンス機能、フィードバック機能どちらとも使用可能となり、TrainLCDサービスの全面再開となりました。ご不便ご迷惑をおかけして申し訳ございませんでした。また皆様のメンテナンスへのご理解ご協力を心より感謝致します。",
      en: "As of 9 Apr 2024 all TrainLCD services, including the TTS and feedback features, have resumed normal operation. Thank you for your patience during the maintenance window.",
    },
    publishedAt: "2023-12-15T00:00:00.000",
    startedAt: "2023-12-15T00:00:00.000",
    resolvedAt: "2024-04-09T00:00:00.000+09:00",
    estimatedResolveDate: null,
    cause: {
      ja: "TrainLCD開発者の一身上の都合",
      en: "Personal circumstances of the maintainer",
    },
    externalLink: null,
    updates: [
      {
        id: "ef88d24e-post-1",
        status: "maintenance",
        body: {
          ja: "TrainLCD開発者の一身上の都合で一時的にサービスを全面休止しております。再開見込みは4月中旬です。",
          en: "All TrainLCD services are temporarily suspended due to the maintainer's personal circumstances. We expect to resume around mid-April.",
        },
        createdAt: "2023-12-15T00:00:00.000",
      },
      {
        id: "ef88d24e-post-2",
        status: "partiallyMaintenance",
        body: {
          ja: "試験的にTrainLCDのサービスを一部再開しております。サービス全面再開ではございませんので、フィードバックと自動アナウンス機能はご利用になれません。また予期しないバグが発生する可能性がございます。",
          en: "We have partially reopened TrainLCD. Feedback and TTS remain unavailable and unexpected bugs may appear during the trial period.",
        },
        createdAt: "2024-03-20T00:00:00+09:00",
      },
      {
        id: "ef88d24e-post-3",
        status: "operational",
        body: {
          ja: "2024年4月9日現在より自動アナウンス機能、フィードバック機能どちらとも使用可能となり、TrainLCDサービスの全面再開となりました。ご不便ご迷惑をおかけして申し訳ございませんでした。また皆様のメンテナンスへのご理解ご協力を心より感謝致します。",
          en: "As of 9 Apr 2024 all TrainLCD services, including the TTS and feedback features, have resumed normal operation. Thank you for your patience during the maintenance window.",
        },
        createdAt: "2024-04-09T00:00:00.000+09:00",
      },
    ],
    lastNotifiedAt: "2024-04-09T00:00:00.000+09:00",
  },
];

export const incidentHistories: IncidentHistory[] = incidentSeed.map(
  (incident) => {
    const latestUpdate = incident.updates[incident.updates.length - 1];
    const updatedAt =
      incident.updatedAt || latestUpdate?.createdAt || incident.publishedAt;

    return {
      ...incident,
      updatedAt,
    };
  }
);

export const isOperational = (() =>
  services.every((service) => service.status === "operational"))();

export const underMaintenanceServices = (() =>
  services.filter((service) => service.status === "maintenance"))();

export const degradedServices = (() =>
  services.filter((service) => service.status === "degraded"))();

export const hasOutage = (() =>
  services.some((service) => service.status === "outage"))();

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
