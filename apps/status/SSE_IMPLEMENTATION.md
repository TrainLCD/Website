# SSE Implementation for Status Updates

This document describes the Server-Sent Events (SSE) implementation for real-time status updates on status.trainlcd.app.

## Overview

The status page now supports real-time updates via Server-Sent Events (SSE), allowing the UI to automatically refresh when status changes occur without requiring page refreshes.

## Architecture

### Server-Side: SSE Endpoint

**File:** `apps/status/app/api/status/stream/route.ts`

The SSE endpoint:
- Serves status updates via the `/api/status/stream` endpoint
- Sends initial status data immediately upon connection
- Sends updates every 30 seconds (configurable)
- Properly handles connection cleanup when clients disconnect
- Returns data in SSE format: `data: {JSON}\n\n`

### Middleware: Origin Validation

**File:** `apps/status/middleware.ts`

The middleware:
- Restricts SSE access to status.trainlcd.app origin in production
- Allows localhost/127.0.0.1 in development
- Returns 403 Forbidden for unauthorized origins

### Client-Side: React Hook

**File:** `apps/status/app/hooks/useStatusStream.ts`

The custom hook:
- Manages EventSource connection lifecycle
- Parses incoming SSE data
- Maintains connection state
- Automatically reconnects on errors
- Cleans up on component unmount

### UI Component

**File:** `apps/status/app/components/client/StatusContent.tsx`

The wrapper component:
- Receives initial status data as props (for SSR)
- Subscribes to SSE updates via useStatusStream hook
- Passes updated data to child components (Overview, ServicesTable, IncidentsTable)
- Seamlessly updates UI when new data arrives

## Usage

The SSE functionality is automatically enabled on the status page. No user interaction is required.

### Testing SSE Endpoint

```bash
# Test the SSE stream
curl -N http://localhost:3001/api/status/stream

# Test with specific origin (in production)
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

## Security

- Origin validation ensures only status.trainlcd.app can access the SSE endpoint in production
- Development mode allows localhost for testing
- CORS headers are set appropriately for the allowed origin

## Future Enhancements

- [ ] Implement actual change detection instead of periodic polling
- [ ] Add support for different event types (status change, incident update, etc.)
- [ ] Implement exponential backoff for reconnection attempts
- [ ] Add connection status indicator in UI
