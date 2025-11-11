import { PrismaClient } from '@prisma/client';
import {
  services as dataServices,
  incidentHistories as dataIncidents,
} from '../packages/data';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting database seed...');

  // Extract unique service definitions from the services array
  const serviceDefinitions = dataServices.map((service) => ({
    id: service.id,
    category: service.category,
    labelJa: service.label.ja,
    labelEn: service.label.en,
    descriptionJa: service.description.ja,
    descriptionEn: service.description.en,
  }));

  console.log(`Seeding ${serviceDefinitions.length} service definitions...`);

  // Upsert service definitions
  for (const def of serviceDefinitions) {
    await prisma.serviceDefinition.upsert({
      where: { id: def.id },
      update: def,
      create: def,
    });
  }

  console.log('Service definitions seeded successfully.');

  // Seed service status snapshots
  console.log(`Seeding ${dataServices.length} service status snapshots...`);

  for (const service of dataServices) {
    await prisma.serviceStatusSnapshot.create({
      data: {
        serviceId: service.id,
        status: service.status,
        summaryJa: service.statusSummary.ja,
        summaryEn: service.statusSummary.en,
        statusSince: new Date(service.statusSince),
        updatedAt: new Date(service.updatedAt),
      },
    });
  }

  console.log('Service status snapshots seeded successfully.');

  // Seed incident histories
  console.log(`Seeding ${dataIncidents.length} incident histories...`);

  for (const incident of dataIncidents) {
    // Create incident
    await prisma.incidentHistory.upsert({
      where: { id: incident.id },
      update: {
        slug: incident.slug,
        incidentImpact: incident.incidentImpact,
        titleJa: incident.title.ja,
        titleEn: incident.title.en,
        descriptionJa: incident.description.ja,
        descriptionEn: incident.description.en,
        publishedAt: new Date(incident.publishedAt),
        startedAt: new Date(incident.startedAt),
        updatedAt: new Date(incident.updatedAt),
        resolvedAt: incident.resolvedAt ? new Date(incident.resolvedAt) : null,
        estimatedResolveDate: incident.estimatedResolveDate
          ? new Date(incident.estimatedResolveDate)
          : null,
        causeJa: incident.cause?.ja ?? null,
        causeEn: incident.cause?.en ?? null,
        externalLink: incident.externalLink,
        lastNotifiedAt: incident.lastNotifiedAt
          ? new Date(incident.lastNotifiedAt)
          : null,
      },
      create: {
        id: incident.id,
        slug: incident.slug,
        incidentImpact: incident.incidentImpact,
        titleJa: incident.title.ja,
        titleEn: incident.title.en,
        descriptionJa: incident.description.ja,
        descriptionEn: incident.description.en,
        publishedAt: new Date(incident.publishedAt),
        startedAt: new Date(incident.startedAt),
        updatedAt: new Date(incident.updatedAt),
        resolvedAt: incident.resolvedAt ? new Date(incident.resolvedAt) : null,
        estimatedResolveDate: incident.estimatedResolveDate
          ? new Date(incident.estimatedResolveDate)
          : null,
        causeJa: incident.cause?.ja ?? null,
        causeEn: incident.cause?.en ?? null,
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
          status: update.status,
          bodyJa: update.body.ja,
          bodyEn: update.body.en,
          createdAt: new Date(update.createdAt),
        },
        create: {
          id: update.id,
          incidentId: incident.id,
          status: update.status,
          bodyJa: update.body.ja,
          bodyEn: update.body.en,
          createdAt: new Date(update.createdAt),
        },
      });
    }

    // Create affected services relationships
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
  console.log('Database seed completed!');
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
