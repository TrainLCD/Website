# DevContainer Setup for TrainLCD Status

This directory contains the VS Code DevContainer configuration for developing the `apps/status` application.

## What's Included

- **Node.js 20**: Development environment with npm
- **PostgreSQL 16**: Database for Prisma ORM
- **Redis 7**: Caching and session storage
- **Development Tools**: git, postgresql-client, redis-tools

## Getting Started

### Prerequisites

- [Visual Studio Code](https://code.visualstudio.com/)
- [Docker Desktop](https://www.docker.com/products/docker-desktop)
- [Dev Containers extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers)

### Starting the DevContainer

1. Open the repository in VS Code
2. Press `F1` or `Ctrl+Shift+P` (Windows/Linux) / `Cmd+Shift+P` (Mac)
3. Type "Dev Containers: Reopen in Container" and select it
4. Wait for the container to build and start (first time may take a few minutes)

The container will automatically:
- Install npm dependencies (`npm install`)
- Generate Prisma client (`npx prisma generate`)

### Running the Application

```bash
# Start the Next.js development server (with Turbopack)
npm run dev

# The status app will be available at http://localhost:3000
```

### Database Management

```bash
# Run Prisma migrations
npx prisma migrate dev

# Open Prisma Studio (database GUI)
npx prisma studio

# Reset database (WARNING: deletes all data)
npx prisma migrate reset
```

### Environment Variables

The DevContainer automatically configures:

- `DATABASE_URL=postgresql://trainlcd:trainlcd@postgres:5432/trainlcd_status?schema=public`
- `REDIS_URL=redis://redis:6379`
- `NODE_ENV=development`

## Services

| Service | Port | Purpose |
|---------|------|---------|
| Next.js | 3000 | Development server |
| PostgreSQL | 5432 | Database |
| Redis | 6379 | Cache/KV store |

## Troubleshooting

### Container won't start

- Ensure Docker Desktop is running
- Try rebuilding the container: "Dev Containers: Rebuild Container"

### Database connection issues

- Check if PostgreSQL is healthy: `docker compose ps`
- Test connection: `psql -h postgres -U trainlcd -d trainlcd_status`

### Permission issues

- The container runs as the `node` user (non-root)
- Files created in the container will be owned by the node user

## Notes

- **Scope**: This DevContainer is configured for `apps/status` only
- **Package Manager**: npm (version provided by Node.js 20 image; may not be exactly 10.4.0)
- **ORM**: Prisma with PostgreSQL
- Changes to Prisma schema require running `npx prisma generate` and `npx prisma migrate dev`
