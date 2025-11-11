-- CreateTable
CREATE TABLE "service_definitions" (
    "id" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "label_ja" TEXT NOT NULL,
    "label_en" TEXT NOT NULL,
    "description_ja" TEXT NOT NULL,
    "description_en" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "service_definitions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "service_status_snapshots" (
    "id" SERIAL NOT NULL,
    "service_id" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "summary_ja" TEXT NOT NULL,
    "summary_en" TEXT NOT NULL,
    "status_since" TIMESTAMP(3) NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "service_status_snapshots_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "incident_histories" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "incident_impact" TEXT NOT NULL,
    "title_ja" TEXT NOT NULL,
    "title_en" TEXT NOT NULL,
    "description_ja" TEXT NOT NULL,
    "description_en" TEXT NOT NULL,
    "published_at" TIMESTAMP(3) NOT NULL,
    "started_at" TIMESTAMP(3) NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "resolved_at" TIMESTAMP(3),
    "estimated_resolve_date" TIMESTAMP(3),
    "cause_ja" TEXT,
    "cause_en" TEXT,
    "external_link" TEXT,
    "last_notified_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "incident_histories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "incident_updates" (
    "id" TEXT NOT NULL,
    "incident_id" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "body_ja" TEXT NOT NULL,
    "body_en" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "incident_updates_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "affected_services" (
    "incident_id" TEXT NOT NULL,
    "service_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "affected_services_pkey" PRIMARY KEY ("incident_id","service_id")
);

-- CreateIndex
CREATE INDEX "service_status_snapshots_service_id_idx" ON "service_status_snapshots"("service_id");

-- CreateIndex
CREATE UNIQUE INDEX "incident_histories_slug_key" ON "incident_histories"("slug");

-- CreateIndex
CREATE INDEX "incident_histories_slug_idx" ON "incident_histories"("slug");

-- CreateIndex
CREATE INDEX "incident_histories_published_at_idx" ON "incident_histories"("published_at");

-- CreateIndex
CREATE INDEX "incident_updates_incident_id_idx" ON "incident_updates"("incident_id");

-- CreateIndex
CREATE INDEX "affected_services_incident_id_idx" ON "affected_services"("incident_id");

-- CreateIndex
CREATE INDEX "affected_services_service_id_idx" ON "affected_services"("service_id");

-- AddForeignKey
ALTER TABLE "service_status_snapshots" ADD CONSTRAINT "service_status_snapshots_service_id_fkey" FOREIGN KEY ("service_id") REFERENCES "service_definitions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "incident_updates" ADD CONSTRAINT "incident_updates_incident_id_fkey" FOREIGN KEY ("incident_id") REFERENCES "incident_histories"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "affected_services" ADD CONSTRAINT "affected_services_incident_id_fkey" FOREIGN KEY ("incident_id") REFERENCES "incident_histories"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "affected_services" ADD CONSTRAINT "affected_services_service_id_fkey" FOREIGN KEY ("service_id") REFERENCES "service_definitions"("id") ON DELETE CASCADE ON UPDATE CASCADE;
