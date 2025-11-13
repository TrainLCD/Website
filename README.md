# TrainLCD Website Monorepo

![Billboard](.github/images/billboard.png)

[![Node.js >= 18](https://img.shields.io/badge/node-%3E=18-3c873a.svg)](https://nodejs.org/) [![npm v10](https://img.shields.io/badge/npm-10.x-CB3837.svg)](https://www.npmjs.com/) [![Turbo](https://img.shields.io/badge/Turbo-Repo-4B32C3.svg)](https://turbo.build/repo)

This repository hosts the official TrainLCD landing page and system status page in a single monorepo. The LP is built with Astro, while the real-time status dashboard runs on Next.js 16 and React 19.

## Table of Contents

1. [Project Overview](#project-overview)
2. [Key Features](#key-features)
3. [Repository Structure](#repository-structure)
4. [Tech Stack](#tech-stack)
5. [Getting Started](#getting-started)
6. [Environment Variables](#environment-variables)
7. [Available Scripts](#available-scripts)
8. [Development Workflow](#development-workflow)
9. [Architecture Notes](#architecture-notes)
10. [Database & Seeding](#database--seeding)
11. [Contributing](#contributing)
12. [License](#license)

## Project Overview

- **`apps/lp` (Landing Page)**: Astro + Preact site optimized for static delivery. Used for the public product introduction and announcements.
- **`apps/status` (Status Page)**: Next.js App Router app. Prisma + PostgreSQL store service snapshots, while Redis cache + SSE stream real-time updates to the UI.
- **Shared Tooling**: Turbo Repo orchestrates tasks, and shared ESLint/TypeScript settings live under `packages/`.

## Key Features

- 🚆 **Real-time monitoring**: `apps/status` automatically refreshes via Redis Pub/Sub + Server-Sent Events.
- 🌏 **Localization**: `detectLocale()` inspects `Accept-Language` headers and switches between Japanese and English (`apps/status/app/server/lib/locale.ts`).
- 🧠 **Static + dynamic hybrid**: The LP ships as static assets, while the status app serves fresh data via SSR/ISR.
- 🧰 **Centralized lint/TS config**: `packages/eslint-config` and `packages/typescript-config` keep code quality consistent.
- 🧪 **Vitest coverage**: Snapshot and event APIs include dedicated unit/integration tests inside `__tests__` folders.

## Repository Structure

```plaintext
Website/
├── apps/
│   ├── lp/                # Astro landing page
│   └── status/            # Next.js status app (SSR + SSE)
├── packages/
│   ├── eslint-config/     # Shared ESLint rules
│   └── typescript-config/ # Shared TS config
├── prisma/                # Prisma schema & seed
├── .github/workflows/     # CI (code-quality, etc.)
├── turbo.json             # Turbo pipeline definition
└── README.md
```

## Tech Stack

| Layer | Tools |
| --- | --- |
| Monorepo management | Turbo Repo, npm Workspaces |
| Landing page | Astro 5, Preact 10, Sharp |
| Status app | Next.js 16 (App Router), React 19, Tailwind CSS |
| Data | Prisma 6, PostgreSQL, Redis (ioredis) |
| Real-time | Server-Sent Events, Redis Pub/Sub |
| Testing & linting | Vitest 4, ESLint 9 |

## Getting Started

```bash
npm install                     # Install all workspace dependencies
npm run lint                    # Run ESLint across the repo via Turbo
cd apps/status && npm run test  # Execute status app tests (Vitest)
```

Use Node.js 18+ and npm 10.x in local environments. `npm run dev` launches the dev servers defined in `turbo.json`, so multiple apps can run in parallel.

## Environment Variables

| Name | Purpose | Example |
| --- | --- | --- |
| `DATABASE_URL` | PostgreSQL connection for Prisma | `postgres://trainlcd:password@localhost:5432/trainlcd` |
| `REDIS_URL` | Redis cache + pub/sub endpoint for status updates | `redis://localhost:6379` |
| `ALLOWED_SNAPSHOT_ORIGINS` | Comma-separated list (or `*`) for `/api/status/snapshot` CORS | `https://status.trainlcd.app,https://app.trainlcd.com` |
| `STATUS_UPDATE_API_KEY` | Shared secret for `/api/status/events` mutations | `super-secret-key` |

Store secrets in `.env.local` under each app and load them via `dotenv` where needed.

## Available Scripts

| Script | Description |
| --- | --- |
| `npm run dev` | Start all app dev servers through Turbo |
| `npm run build` | Build every app/package in the workspace |
| `npm run lint` | Run ESLint with `--max-warnings=0` |
| `npm run db:seed` | Execute `prisma/seed.ts` to load sample data |
| `apps/lp: npm run dev` | Launch the Astro server (default port 3000) |
| `apps/status: npm run dev` | Launch the Next.js server (SSE enabled) |
| `apps/status: npm run test` | Run Vitest suites for APIs and server logic |

## Development Workflow

1. Run `npm install`, `npm run lint`, and `cd apps/status && npm run test` to ensure a clean baseline.
2. Implement changes and add/extend tests under `__tests__` (e.g., `apps/status/app/server/lib/__tests__`).
3. Before opening a PR, run `npm run lint`, `cd apps/status && npm run test`, and `npm run build`.
4. Confirm the checklist: zero lint errors, all tests green, new functionality covered by tests.

## Architecture Notes

- **SSE stream**: `apps/status/app/api/status/stream/route.ts` merges Redis pub/sub events with PostgreSQL seed data and emits a heartbeat every 30 seconds. Details live in `apps/status/SSE_IMPLEMENTATION.md`.
- **Middleware guard**: `apps/status/middleware.ts` enforces strict Origin checks, allowing only `status.trainlcd.app` in production.
- **i18n**: See `apps/status/I18N_IMPLEMENTATION.md` for locale detection and the `LocaleText` pattern used across services/incidents.
- **Caching**: Redis keys encode the locale, caching service and incident payloads for ~60 seconds before falling back to Prisma queries.

## Database & Seeding

Prisma schema files live in `prisma/schema.prisma`. Seed data can be loaded with:

```bash
npm run db:seed
```

The `postinstall` script inside `apps/status` runs `prisma generate --schema=../../prisma/schema.prisma`, so Prisma Client is ready right after installing dependencies.

## Contributing

- Discuss ideas via Issues/Discussions before large changes.
- Create feature branches such as `feat/<topic>`.
- Ensure lint/tests/build all succeed before opening a PR.
- Include a summary, screenshots (if applicable), and test results in the PR description.

Refer to `AGENTS.md` and the implementation memos for deeper contributor guidelines.

## License

Distributed under the MIT License. See `LICENSE` for details.
