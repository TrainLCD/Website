import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Type for incident history seed data with nested relations
type IncidentHistorySeed = {
  id: string;
  slug: string;
  incidentImpact: string;
  affectedServiceIds: string[];
  titleJa: string;
  titleEn: string;
  descriptionJa: string;
  descriptionEn: string;
  publishedAt: string;
  startedAt: string;
  updatedAt: string;
  resolvedAt: string | null;
  estimatedResolveDate: string | null;
  causeJa: string | null;
  causeEn: string | null;
  externalLink: string | null;
  lastNotifiedAt: string | null;
  updates: {
    id: string;
    status: string;
    bodyJa: string;
    bodyEn: string;
    createdAt: string;
  }[];
};

// Service definitions data
const serviceCatalog = [
  {
    id: "mobile-ios",
    category: "application",
    labelJa: "モバイルアプリ(iOS/iPadOS)",
    labelEn: "Mobile App (iOS/iPadOS)",
    descriptionJa:
      "現時点においてモバイルアプリについての障害情報はございません。",
    descriptionEn:
      "At this time, we do not have any information on the failure of the mobile application.",
  },
  {
    id: "mobile-android",
    category: "application",
    labelJa: "モバイルアプリ(Android)",
    labelEn: "Mobile App (Android)",
    descriptionJa:
      "現時点においてモバイルアプリについての障害情報はございません。",
    descriptionEn:
      "At this time, we do not have any information on the failure of the mobile application.",
  },
  {
    id: "feedback",
    category: "support",
    labelJa: "フィードバックシステム",
    labelEn: "Feedback System",
    descriptionJa: "フィードバック機能は現在正常にご利用いただけます。",
    descriptionEn: "The feedback function is currently working properly.",
  },
  {
    id: "tts",
    category: "platform",
    labelJa: "自動アナウンス機能(TTS)",
    labelEn: "Automated Announcements (TTS)",
    descriptionJa: "現在正常に稼働しております。",
    descriptionEn: "The system is currently operating normally.",
  },
  {
    id: "station-api",
    category: "api",
    labelJa: "StationAPI",
    labelEn: "StationAPI",
    descriptionJa: "現在正常に稼働しております。",
    descriptionEn: "The system is currently operating normally.",
  },
];

// Service status snapshots
const serviceStatusSnapshots = [
  {
    serviceId: "mobile-ios",
    status: "operational",
    summaryJa: "現時点においてモバイルアプリについての障害情報はございません。",
    summaryEn:
      "At this time, we do not have any information on the failure of the mobile application.",
    statusSince: "2024-04-04T00:00:00+09:00",
    updatedAt: "2024-04-05T00:00:00+09:00",
  },
  {
    serviceId: "mobile-android",
    status: "operational",
    summaryJa: "現時点においてモバイルアプリについての障害情報はございません。",
    summaryEn:
      "At this time, we do not have any information on the failure of the mobile application.",
    statusSince: "2024-04-04T00:00:00+09:00",
    updatedAt: "2024-04-05T00:00:00+09:00",
  },
  {
    serviceId: "feedback",
    status: "operational",
    summaryJa: "フィードバック機能は現在正常にご利用いただけます。",
    summaryEn: "The feedback function is currently working properly.",
    statusSince: "2024-04-09T00:00:00+09:00",
    updatedAt: "2024-04-09T00:00:00+09:00",
  },
  {
    serviceId: "tts",
    status: "operational",
    summaryJa: "現在正常に稼働しております。",
    summaryEn: "The system is currently operating normally.",
    statusSince: "2025-01-20T00:11:00+09:00",
    updatedAt: "2025-01-20T00:11:00+09:00",
  },
  {
    serviceId: "station-api",
    status: "operational",
    summaryJa: "現在正常に稼働しております。",
    summaryEn: "The system is currently operating normally.",
    statusSince: "2023-12-15T00:00:00+09:00",
    updatedAt: "2024-04-05T00:00:00+09:00",
  },
];

// Incident histories
const incidentHistories: IncidentHistorySeed[] = [
  {
    id: "urn:uuid:974a2140-0b20-4d74-82aa-e98b1b6240ab",
    slug: "2024-11-01-tts-outage",
    incidentImpact: "outage",
    affectedServiceIds: ["tts"],
    titleJa: "自動アナウンス機能の一時的な使用不可について",
    titleEn: "Temporary unavailability of TTS announcements",
    descriptionJa:
      "開発者の個人的な都合により自動アナウンス機能の運用を取りやめておりましたが、2024年11月16日 14時15分現在自動アナウンス機能の提供を再開致しました。\nこの復旧作業においての音質の変更はありません。利用者の方々にご迷惑をおかけしたことをお詫び申し上げます。",
    descriptionEn:
      "Service for the TTS announcements resumed at 14:15 JST on 16 Nov 2024 with no change in audio quality. We apologise for the disruption caused while the operator was unavailable.",
    publishedAt: "2024-11-16T00:36:00.000+09:00",
    startedAt: "2024-11-16T00:36:00.000+09:00",
    updatedAt: "2024-11-16T14:15:00.000+09:00",
    resolvedAt: "2024-11-16T14:15:00.000+09:00",
    estimatedResolveDate: null,
    causeJa: "開発者の個人的な都合",
    causeEn: "Personal circumstances of the maintainer",
    externalLink: null,
    lastNotifiedAt: "2024-11-16T14:15:00.000+09:00",
    updates: [
      {
        id: "974a2140-post-1",
        status: "outage",
        bodyJa: "当面の間、TTS 機能を停止いたします。再開時期は未定です。",
        bodyEn: "The TTS feature is suspended until further notice.",
        createdAt: "2024-11-16T00:36:00.000+09:00",
      },
      {
        id: "974a2140-post-2",
        status: "operational",
        bodyJa:
          "開発者の個人的な都合により自動アナウンス機能の運用を取りやめておりましたが、2024年11月16日 14時15分現在自動アナウンス機能の提供を再開致しました。\nこの復旧作業においての音質の変更はありません。利用者の方々にご迷惑をおかけしたことをお詫び申し上げます。",
        bodyEn:
          "Service for the TTS announcements resumed at 14:15 JST on 16 Nov 2024 with no change in audio quality. We apologise for the disruption caused while the operator was unavailable.",
        createdAt: "2024-11-16T14:15:00.000+09:00",
      },
    ],
  },
  {
    id: "urn:uuid:d054fa44-faf9-42d0-a0d6-6c062cfe344c",
    slug: "2024-11-01-tts-degradation",
    incidentImpact: "degraded",
    affectedServiceIds: ["tts"],
    titleJa: "自動アナウンス機能日本語音声のコスト削減について",
    titleEn: "Cost optimisation for Japanese TTS audio",
    descriptionJa:
      "音質を落とした形で自動アナウンス機能を提供しておりましたが、現在は通常音質で提供しております。",
    descriptionEn:
      "We had been providing TTS with reduced audio fidelity, but it is now available at normal quality.",
    publishedAt: "2024-11-07T00:00:00.000+09:00",
    startedAt: "2024-11-07T00:00:00.000+09:00",
    updatedAt: "2025-01-16T00:00:00.000+09:00",
    resolvedAt: "2025-01-16T00:00:00.000+09:00",
    estimatedResolveDate: null,
    causeJa: "開発者の個人的な都合",
    causeEn: "Personal circumstances of the maintainer",
    externalLink: null,
    lastNotifiedAt: "2025-01-16T00:00:00.000+09:00",
    updates: [
      {
        id: "d054fa44-post-1",
        status: "degraded",
        bodyJa: "音質を落とした形でTTSを継続提供いたします。",
        bodyEn: "We continue to provide TTS with reduced audio fidelity.",
        createdAt: "2024-11-07T00:00:00.000+09:00",
      },
      {
        id: "d054fa44-post-2",
        status: "operational",
        bodyJa:
          "音質を落とした形で自動アナウンス機能を提供しておりましたが、現在は通常音質で提供しております。",
        bodyEn:
          "We had been providing TTS with reduced audio fidelity, but it is now available at normal quality.",
        createdAt: "2025-01-16T00:00:00.000+09:00",
      },
    ],
  },
  {
    id: "urn:uuid:936e0961-0cbf-4ccd-a80c-facd88b8c052",
    slug: "2024-04-17-tts-incident",
    incidentImpact: "degraded",
    affectedServiceIds: ["tts"],
    titleJa:
      "TrainLCDアプリ バージョン7.1.0にて自動アナウンス機能が断続的に使用不可",
    titleEn: "Intermittent failures of TTS on TrainLCD v7.1.0",
    descriptionJa:
      "日本時間2024年4月17日 17時から同日19時にかけてTrainLCD バージョン7.1.0にて断続的に自動アナウンス機能が動作しない障害が発生しておりましたが、現在は復旧しております。原因はサービス基盤の設定不備でございます。利用者の方々にご迷惑をおかけしたことをお詫び申し上げます。",
    descriptionEn:
      "Between 17:00 and 19:00 JST on 17 Apr 2024, TrainLCD v7.1.0 intermittently failed to play TTS announcements. The issue has been resolved after fixing a configuration error in the service platform.",
    publishedAt: "2024-04-17T17:00:00+09:00",
    startedAt: "2024-04-17T17:00:00+09:00",
    updatedAt: "2024-04-17T19:00:00.000+09:00",
    resolvedAt: "2024-04-17T19:00:00.000+09:00",
    estimatedResolveDate: null,
    causeJa: "サービス基盤の設定不備",
    causeEn: "Misconfiguration within the service platform",
    externalLink: null,
    lastNotifiedAt: "2024-04-17T19:00:00.000+09:00",
    updates: [
      {
        id: "936e0961-post-1",
        status: "degraded",
        bodyJa:
          "バージョン7.1.0で断続的にTTSが再生されない事象を確認しています。",
        bodyEn:
          "We observed intermittent TTS playback failures on app version 7.1.0.",
        createdAt: "2024-04-17T17:00:00+09:00",
      },
      {
        id: "936e0961-post-2",
        status: "operational",
        bodyJa:
          "日本時間2024年4月17日 17時から同日19時にかけてTrainLCD バージョン7.1.0にて断続的に自動アナウンス機能が動作しない障害が発生しておりましたが、現在は復旧しております。原因はサービス基盤の設定不備でございます。利用者の方々にご迷惑をおかけしたことをお詫び申し上げます。",
        bodyEn:
          "Configuration has been fixed and the TTS feature is now operating normally.",
        createdAt: "2024-04-17T19:00:00.000+09:00",
      },
    ],
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
    titleJa: "TrainLCD開発者都合によるサービス全面休止",
    titleEn: "Full suspension of TrainLCD services",
    descriptionJa:
      "2024年4月9日現在より自動アナウンス機能、フィードバック機能どちらとも使用可能となり、TrainLCDサービスの全面再開となりました。ご不便ご迷惑をおかけして申し訳ございませんでした。また皆様のメンテナンスへのご理解ご協力を心より感謝致します。",
    descriptionEn:
      "As of 9 Apr 2024 all TrainLCD services, including the TTS and feedback features, have resumed normal operation. Thank you for your patience during the maintenance window.",
    publishedAt: "2023-12-15T00:00:00.000+09:00",
    startedAt: "2023-12-15T00:00:00.000+09:00",
    updatedAt: "2024-04-09T00:00:00.000+09:00",
    resolvedAt: "2024-04-09T00:00:00.000+09:00",
    estimatedResolveDate: null,
    causeJa: "TrainLCD開発者の一身上の都合",
    causeEn: "Personal circumstances of the maintainer",
    externalLink: null,
    lastNotifiedAt: "2024-04-09T00:00:00.000+09:00",
    updates: [
      {
        id: "ef88d24e-post-1",
        status: "maintenance",
        bodyJa:
          "TrainLCD開発者の一身上の都合で一時的にサービスを全面休止しております。再開見込みは4月中旬です。",
        bodyEn:
          "All TrainLCD services are temporarily suspended due to the maintainer's personal circumstances. We expect to resume around mid-April.",
        createdAt: "2023-12-15T00:00:00.000+09:00",
      },
      {
        id: "ef88d24e-post-2",
        status: "partiallyMaintenance",
        bodyJa:
          "試験的にTrainLCDのサービスを一部再開しております。サービス全面再開ではございませんので、フィードバックと自動アナウンス機能はご利用になれません。また予期しないバグが発生する可能性がございます。",
        bodyEn:
          "We have partially reopened TrainLCD. Feedback and TTS remain unavailable and unexpected bugs may appear during the trial period.",
        createdAt: "2024-03-20T00:00:00+09:00",
      },
      {
        id: "ef88d24e-post-3",
        status: "operational",
        bodyJa:
          "2024年4月9日現在より自動アナウンス機能、フィードバック機能どちらとも使用可能となり、TrainLCDサービスの全面再開となりました。ご不便ご迷惑をおかけして申し訳ございませんでした。また皆様のメンテナンスへのご理解ご協力を心より感謝致します。",
        bodyEn:
          "As of 9 Apr 2024 all TrainLCD services, including the TTS and feedback features, have resumed normal operation. Thank you for your patience during the maintenance window.",
        createdAt: "2024-04-09T00:00:00.000+09:00",
      },
    ],
  },
];

async function main() {
  console.log("Starting database seed...");

  // Seed service definitions
  console.log(`Seeding ${serviceCatalog.length} service definitions...`);
  for (const def of serviceCatalog) {
    await prisma.serviceDefinition.upsert({
      where: { id: def.id },
      update: def,
      create: def,
    });
  }
  console.log("Service definitions seeded successfully.");

  // Clear existing snapshots first to ensure idempotency
  await prisma.serviceStatusSnapshot.deleteMany({});

  // Seed service status snapshots
  console.log(
    `Seeding ${serviceStatusSnapshots.length} service status snapshots...`
  );
  for (const snapshot of serviceStatusSnapshots) {
    await prisma.serviceStatusSnapshot.create({
      data: {
        serviceId: snapshot.serviceId,
        status: snapshot.status,
        summaryJa: snapshot.summaryJa,
        summaryEn: snapshot.summaryEn,
        statusSince: new Date(snapshot.statusSince),
        updatedAt: new Date(snapshot.updatedAt),
        createdAt: new Date(snapshot.statusSince), // Set createdAt to match statusSince
      },
    });
  }
  console.log("Service status snapshots seeded successfully.");

  // Seed incident histories
  console.log(`Seeding ${incidentHistories.length} incident histories...`);
  for (const incident of incidentHistories) {
    // Create incident
    await prisma.incidentHistory.upsert({
      where: { id: incident.id },
      update: {
        slug: incident.slug,
        incidentImpact: incident.incidentImpact,
        titleJa: incident.titleJa,
        titleEn: incident.titleEn,
        descriptionJa: incident.descriptionJa,
        descriptionEn: incident.descriptionEn,
        publishedAt: new Date(incident.publishedAt),
        startedAt: new Date(incident.startedAt),
        updatedAt: new Date(incident.updatedAt),
        resolvedAt: incident.resolvedAt ? new Date(incident.resolvedAt) : null,
        estimatedResolveDate: incident.estimatedResolveDate
          ? new Date(incident.estimatedResolveDate)
          : null,
        causeJa: incident.causeJa,
        causeEn: incident.causeEn,
        externalLink: incident.externalLink,
        lastNotifiedAt: incident.lastNotifiedAt
          ? new Date(incident.lastNotifiedAt)
          : null,
      },
      create: {
        id: incident.id,
        slug: incident.slug,
        incidentImpact: incident.incidentImpact,
        titleJa: incident.titleJa,
        titleEn: incident.titleEn,
        descriptionJa: incident.descriptionJa,
        descriptionEn: incident.descriptionEn,
        publishedAt: new Date(incident.publishedAt),
        startedAt: new Date(incident.startedAt),
        updatedAt: new Date(incident.updatedAt),
        resolvedAt: incident.resolvedAt ? new Date(incident.resolvedAt) : null,
        estimatedResolveDate: incident.estimatedResolveDate
          ? new Date(incident.estimatedResolveDate)
          : null,
        causeJa: incident.causeJa,
        causeEn: incident.causeEn,
        externalLink: incident.externalLink,
        lastNotifiedAt: incident.lastNotifiedAt
          ? new Date(incident.lastNotifiedAt)
          : null,
      },
    });

    // Create incident updates
    for (const update of incident.updates) {
      await prisma.incidentUpdate.upsert({
        where: { id: update.id },
        update: {
          incidentId: incident.id,
          status: update.status,
          bodyJa: update.bodyJa,
          bodyEn: update.bodyEn,
          createdAt: new Date(update.createdAt),
        },
        create: {
          id: update.id,
          incidentId: incident.id,
          status: update.status,
          bodyJa: update.bodyJa,
          bodyEn: update.bodyEn,
          createdAt: new Date(update.createdAt),
        },
      });
    }

    // Link affected services
    for (const serviceId of incident.affectedServiceIds) {
      await prisma.affectedService.upsert({
        where: {
          incidentId_serviceId: {
            incidentId: incident.id,
            serviceId: serviceId,
          },
        },
        update: {},
        create: {
          incidentId: incident.id,
          serviceId: serviceId,
        },
      });
    }
  }
  console.log("Incident histories seeded successfully.");

  console.log("Database seed completed successfully!");
}

main()
  .catch((e) => {
    console.error("Error seeding database:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
