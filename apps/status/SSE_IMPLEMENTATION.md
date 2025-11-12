# SSE Implementation for Status Updates

This document describes the Server-Sent Events (SSE) implementation for real-time status updates on status.trainlcd.app.

## Overview

The status page now supports real-time updates via Server-Sent Events (SSE), allowing the UI to automatically refresh when status changes occur without requiring page refreshes. The implementation uses Redis pub/sub for event distribution.

## Architecture

### Server-Side: SSE Endpoint

**File:** `apps/status/app/api/status/stream/route.ts`

The SSE endpoint:
- Serves status updates via the `/api/status/stream` endpoint
- Fetches initial data from PostgreSQL (via Prisma) with Redis caching
- Subscribes to Redis pub/sub channel (`status:updates`) for real-time updates
- Sends heartbeat messages every 30 seconds to keep connections alive
- Properly handles connection cleanup when clients disconnect
- Returns data in SSE format: `data: {JSON}\n\n`

### Middleware: Origin Validation

**File:** `apps/status/middleware.ts`

The middleware:
- Restricts SSE access to status.trainlcd.app origin in production
- Uses exact hostname matching (not `includes()`) for security
- Requires Origin header in production (returns 403 if missing)
- Allows localhost/127.0.0.1 in development

**Security improvements:**
- Uses `URL` parsing for exact hostname validation
- Prevents subdomain attacks (e.g., `evil.status.trainlcd.app.attacker.com`)
- Requires Origin header in production to prevent CSRF attacks

### Client-Side: React Hook

**File:** `apps/status/app/hooks/useStatusStream.ts`

The custom hook:
- Manages EventSource connection lifecycle
- Parses incoming SSE data
- Maintains connection state
- Sets `isConnected` to false on errors (including EventSource creation failures)
- Cleans up on component unmount

### UI Component

**File:** `apps/status/app/components/client/StatusContent.tsx`

The wrapper component:
- Receives initial status data as props (for SSR)
- Subscribes to SSE updates via useStatusStream hook
- Passes updated data to child components (Overview, ServicesTable, IncidentsTable)
- Seamlessly updates UI when new data arrives

## Data Layer

### Redis Integration

The SSE endpoint integrates with Redis for two purposes:

1. **Caching**: Initial data is fetched from Redis cache (60s TTL) when available, falling back to PostgreSQL
2. **Pub/Sub**: Real-time updates are distributed via Redis pub/sub on the `status:updates` channel

To publish status updates:
```javascript
// Publish update event
await redis.publish('status:updates', JSON.stringify({
  statusLabel,
  services,
  incidents,
}));
```

### PostgreSQL + Prisma

Data is persisted in PostgreSQL with the following repositories:
- `serviceRepository`: Manages service definitions and status snapshots
- `incidentRepository`: Manages incident histories and updates

## Usage

The SSE functionality is automatically enabled on the status page. No user interaction is required.

### Testing SSE Endpoint

```bash
# Test the SSE stream (development)
curl -N http://localhost:3001/api/status/stream

# Test with specific origin (production)
curl -N -H "Origin: https://status.trainlcd.app" https://status.trainlcd.app/api/status/stream
```

### Data Format

The SSE endpoint sends data in the following format:

```json
{
  "statusLabel": "operational",
  "services": [...],
  "incidents": [...]
}
```

### Heartbeat

The server sends heartbeat comments (`: heartbeat\n\n`) every 30 seconds to keep the connection alive. These are ignored by EventSource clients.

## Security

- **Origin validation**: Exact hostname matching ensures only status.trainlcd.app can access the SSE endpoint in production
- **Origin header required**: Production requests must include Origin header to prevent CSRF
- **CORS headers**: Only set when origin is present, never uses wildcard with credentials
- **Development mode**: Allows localhost for testing

## Implementation Notes

### Redis Pub/Sub

The implementation uses Redis pub/sub for distributing updates:
- A duplicate Redis client is created for subscription to avoid blocking
- Subscription is properly cleaned up when connection closes
- Falls back gracefully if Redis is unavailable

### Stream Error Handling

The implementation includes proper error handling:
- Try-catch blocks prevent `controller.enqueue()` errors from crashing
- Heartbeat interval is cleared when stream closes
- Redis subscription is cleaned up on abort

## Future Enhancements

- [x] Implement Redis pub/sub for real-time updates
- [x] Use PostgreSQL + Prisma for data persistence
- [x] Fix origin validation security issues
- [x] Add proper error handling for stream enqueue
- [ ] Add connection status indicator in UI
- [ ] Implement exponential backoff for reconnection attempts
- [ ] Add support for different event types (status change, incident update, etc.)
