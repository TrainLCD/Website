import { NextRequest, NextResponse } from 'next/server';
import { getServices, getStatusLabel } from '@/server/repo/serviceRepository';
import { getIncidentHistories } from '@/server/repo/incidentRepository';

/**
 * Check if the origin is allowed based on ALLOWED_SNAPSHOT_ORIGINS environment variable
 */
function isOriginAllowed(origin: string | null): boolean {
  if (!origin) {
    return true; // Same-origin requests don't have Origin header
  }

  const allowedOrigins = process.env.ALLOWED_SNAPSHOT_ORIGINS;
  
  // If not set or empty, don't allow cross-origin requests
  if (!allowedOrigins) {
    return false;
  }

  // If set to "*", allow all origins
  if (allowedOrigins === '*') {
    return true;
  }

  // Parse comma-separated list of allowed origins
  const originList = allowedOrigins.split(',').map(o => o.trim());
  return originList.includes(origin);
}

export async function GET(request: NextRequest) {
  const [statusLabel, services, incidents] = await Promise.all([
    getStatusLabel(),
    getServices(),
    getIncidentHistories(),
  ]);

  const origin = request.headers.get('origin');
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };

  // Add CORS headers if origin is allowed
  if (origin && isOriginAllowed(origin)) {
    headers['Access-Control-Allow-Origin'] = origin;
    headers['Access-Control-Allow-Credentials'] = 'true';
  }

  return NextResponse.json(
    {
      statusLabel,
      services,
      incidents,
    },
    { headers }
  );
}
