# Database Schema Documentation

This directory contains the Prisma schema and migrations for the TrainLCD status database.

## Entity Relationship Diagram

For a visual representation of the database structure and relationships, see [ER_DIAGRAM.md](./ER_DIAGRAM.md).

## Prerequisites

- PostgreSQL 12 or later
- Node.js 18 or later

## Setup

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Configure database connection**
   
   Copy `.env.example` to `.env` and update the `DATABASE_URL`:
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and set your PostgreSQL connection string:
   ```
   DATABASE_URL="postgresql://user:password@localhost:5432/database_name?schema=public"
   ```

3. **Run migrations**
   ```bash
   npx prisma migrate dev
   ```

4. **Generate Prisma Client**
   ```bash
   npx prisma generate
   ```

## Database Schema Overview

The schema is designed to store status and incident information for TrainLCD services in a normalized structure:

### Tables

#### `service_definitions`
Service catalog containing all available services (mobile apps, APIs, platform features).

**Key fields:**
- `id` (PK): Unique service identifier
- `category`: Service category (application, api, platform, support)
- `label_ja`, `label_en`: Bilingual service labels
- `description_ja`, `description_en`: Bilingual service descriptions

#### `service_status_snapshots`
Current status snapshots for each service.

**Key fields:**
- `id` (PK): Auto-increment ID
- `service_id` (FK): References service_definitions
- `status`: Current status (operational, maintenance, degraded, outage, etc.)
- `summary_ja`, `summary_en`: Bilingual status summaries
- `status_since`: When this status began
- `updated_at`: When this snapshot was last updated

#### `incident_histories`
Historical record of incidents affecting services.

**Key fields:**
- `id` (PK): Unique incident identifier (URN format)
- `slug`: URL-friendly identifier (unique)
- `incident_impact`: Overall incident impact level
- `title_ja`, `title_en`: Bilingual incident titles
- `description_ja`, `description_en`: Bilingual incident descriptions
- `published_at`: When the incident was published
- `started_at`: When the incident started
- `resolved_at`: When the incident was resolved (nullable)
- `cause_ja`, `cause_en`: Bilingual root cause analysis (nullable)
- `external_link`: Link to external resources (nullable)

#### `incident_updates`
Timeline of updates for each incident.

**Key fields:**
- `id` (PK): Unique update identifier
- `incident_id` (FK): References incident_histories
- `status`: Status at time of update
- `body_ja`, `body_en`: Bilingual update content
- `created_at`: When the update was posted

#### `affected_services`
Junction table linking incidents to affected services (many-to-many).

**Key fields:**
- `incident_id` (FK): References incident_histories
- `service_id` (FK): References service_definitions
- Composite primary key on (incident_id, service_id)

## Development Commands

### View data in Prisma Studio
```bash
npx prisma studio
```

### Create a new migration
```bash
npx prisma migrate dev --name migration_name
```

### Reset database (⚠️ destroys all data)
```bash
npx prisma migrate reset
```

### Apply migrations to production
```bash
npx prisma migrate deploy
```

### Format schema file
```bash
npx prisma format
```

## Design Principles

1. **Normalization**: Data is properly normalized to avoid redundancy
2. **Bilingual Support**: Separate columns for Japanese (`_ja`) and English (`_en`) text
3. **Referential Integrity**: Foreign keys with cascading deletes maintain data consistency
4. **Indexing**: Strategic indexes on frequently queried columns (slug, publishedAt, etc.)
5. **Audit Trail**: Timestamps (createdAt, updatedAt) on all tables

## Integration Notes

- Prisma Client should only be used in **Node.js runtime** (not in browser/edge)
- The schema mirrors the TypeScript types in `packages/data/index.ts`
- Current implementation does not modify UI/API behavior - it only prepares the database structure
- Future work will migrate data from the static data file to the database
