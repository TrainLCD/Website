# TrainLCD System Status

Status page for TrainLCD services built with Next.js 16.

## Tech Stack

- **Framework**: Next.js 16 with App Router
- **Runtime**: Node.js
- **Rendering**: Server-Side Rendering (SSR)
- **Styling**: Tailwind CSS
- **UI Library**: React

## Development

```bash
npm run dev     # Start development server
npm run build   # Build for production
npm run start   # Start production server
npm run lint    # Run ESLint
```

## API

### GET /api/status/snapshot

Returns the current status of all TrainLCD services.

**Response:**
```json
{
  "statusLabel": "operational",
  "services": [...],
  "incidents": [...]
}
```

