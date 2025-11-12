import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Service definitions data
const serviceCatalog = [
  {
    id: 'mobile-ios',
    category: 'application',
    labelJa: 'モバイルアプリ(iOS/iPadOS)',
    labelEn: 'Mobile App (iOS/iPadOS)',
    descriptionJa: '現時点においてモバイルアプリについての障害情報はございません。',
    descriptionEn: 'At this time, we do not have any information on the failure of the mobile application.',
  },
  {
    id: 'mobile-android',
    category: 'application',
    labelJa: 'モバイルアプリ(Android)',
    labelEn: 'Mobile App (Android)',
    descriptionJa: '現時点においてモバイルアプリについての障害情報はございません。',
    descriptionEn: 'At this time, we do not have any information on the failure of the mobile application.',
  },
  {
    id: 'feedback',
    category: 'support',
    labelJa: 'フィードバックシステム',
    labelEn: 'Feedback System',
    descriptionJa: 'フィードバック機能は現在正常にご利用いただけます。',
    descriptionEn: 'The feedback function is currently working properly.',
  },
  {
    id: 'tts',
    category: 'platform',
    labelJa: '自動アナウンス機能(TTS)',
    labelEn: 'Automated Announcements (TTS)',
    descriptionJa: '現在正常に稼働しております。',
    descriptionEn: 'The system is currently operating normally.',
  },
  {
    id: 'station-api',
    category: 'api',
    labelJa: 'StationAPI',
    labelEn: 'StationAPI',
    descriptionJa: '現在正常に稼働しております。',
    descriptionEn: 'The system is currently operating normally.',
  },
];

// Service status snapshots
const serviceStatusSnapshots = [
  {
    serviceId: 'mobile-ios',
    status: 'operational',
    summaryJa: '現時点においてモバイルアプリについての障害情報はございません。',
    summaryEn: 'At this time, we do not have any information on the failure of the mobile application.',
    statusSince: '2024-04-04T00:00:00+09:00',
    updatedAt: '2024-04-05T00:00:00+09:00',
  },
  {
    serviceId: 'mobile-android',
    status: 'operational',
    summaryJa: '現時点においてモバイルアプリについての障害情報はございません。',
    summaryEn: 'At this time, we do not have any information on the failure of the mobile application.',
    statusSince: '2024-04-04T00:00:00+09:00',
    updatedAt: '2024-04-05T00:00:00+09:00',
  },
  {
    serviceId: 'feedback',
    status: 'operational',
    summaryJa: 'フィードバック機能は現在正常にご利用いただけます。',
    summaryEn: 'The feedback function is currently working properly.',
    statusSince: '2024-04-09T00:00:00+09:00',
    updatedAt: '2024-04-09T00:00:00+09:00',
  },
  {
    serviceId: 'tts',
    status: 'operational',
    summaryJa: '現在正常に稼働しております。',
    summaryEn: 'The system is currently operating normally.',
    statusSince: '2025-01-20T00:11:00+09:00',
    updatedAt: '2025-01-20T00:11:00+09:00',
  },
  {
    serviceId: 'station-api',
    status: 'operational',
    summaryJa: '現在正常に稼働しております。',
    summaryEn: 'The system is currently operating normally.',
    statusSince: '2023-12-15T00:00:00+09:00',
    updatedAt: '2024-04-05T00:00:00+09:00',
  },
];

// Incident histories
const incidentHistories = [
  {
    id: 'urn:uuid:2ff6a668-e923-4ba5-87c4-4cfe4e734efc',
    slug: '2024-11-01-tts-outage-resolved',
    incidentImpact: 'degraded',
    affectedServiceIds: ['tts'],
    titleJa: '自動アナウンス機能は現在正常にご利用いただけます',
    titleEn: 'TTS announcements have been fully restored',
    descriptionJa: '開発者の個人的な都合により自動アナウンス機能の運用を取りやめておりましたが、2024年11月16日 14時15分現在自動アナウンス機能の提供を再開致しました。この復旧作業においての音質の変更はありません。利用者の方々にご迷惑をおかけしたことをお詫び申し上げます。',
    descriptionEn: 'Service for the TTS announcements resumed at 14:15 JST on 16 Nov 2024 with no change in audio quality. We apologise for the disruption caused while the operator was unavailable.',
    publishedAt: '2024-11-16T00:36:00.000',
    startedAt: '2024-11-16T00:36:00.000',
    updatedAt: '2024-11-16T14:15:00.000',
    resolvedAt: '2024-11-16T14:15:00.000',
    estimatedResolveDate: null,
    causeJa: '開発者の個人的な都合',
    causeEn: 'Personal circumstances of the maintainer',
    externalLink: null,
    lastNotifiedAt: null,
    updates: [
      {
        id: '2ff6a668-post-1',
        status: 'degraded',
        bodyJa: '自動アナウンス機能を一時停止しておりました。再開準備を進めています。',
        bodyEn: 'The TTS announcements were paused while we prepared to resume the service.',
        createdAt: '2024-11-16T00:36:00.000',
      },
      {
        id: '2ff6a668-post-2',
        status: 'operational',
        bodyJa: '14:15 に提供を再開し、音質への影響はありません。',
        bodyEn: 'Service resumed at 14:15 JST without any impact on audio quality.',
        createdAt: '2024-11-16T14:15:00.000',
      },
    ],
  },
];

async function main() {
  console.log('Starting database seed...');

  // Seed service definitions
  console.log(`Seeding ${serviceCatalog.length} service definitions...`);
  for (const def of serviceCatalog) {
    await prisma.serviceDefinition.upsert({
      where: { id: def.id },
      update: def,
      create: def,
    });
  }
  console.log('Service definitions seeded successfully.');

  // Seed service status snapshots
  console.log(`Seeding ${serviceStatusSnapshots.length} service status snapshots...`);
  for (const snapshot of serviceStatusSnapshots) {
    await prisma.serviceStatusSnapshot.create({
      data: {
        serviceId: snapshot.serviceId,
        status: snapshot.status,
        summaryJa: snapshot.summaryJa,
        summaryEn: snapshot.summaryEn,
        statusSince: new Date(snapshot.statusSince),
        updatedAt: new Date(snapshot.updatedAt),
      },
    });
  }
  console.log('Service status snapshots seeded successfully.');

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
  console.log('Incident histories seeded successfully.');

  console.log('Database seed completed successfully!');
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
