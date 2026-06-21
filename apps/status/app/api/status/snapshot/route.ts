import { NextRequest, NextResponse } from 'next/server';
import { getServices, computeStatusLabel } from '@/server/repo/serviceRepository';
import { getIncidentHistories } from '@/server/repo/incidentRepository';
import type { Locale } from '@/server/lib/locale';

/**
 * `locale` クエリパラメータを読み取り検証する。既定は 'ja'。
 * ポーリングするクライアントが自身の locale を渡すことで、
 * ページの言語と一致したスナップショットを返す。
 */
function parseLocale(request: NextRequest): Locale {
  return request.nextUrl.searchParams.get('locale') === 'en' ? 'en' : 'ja';
}

/**
 * Check if the origin is allowed based on ALLOWED_SNAPSHOT_ORIGINS environment variable.
 * Returns 'wildcard' if all origins are allowed, 'specific' if the origin matches the allowed list,
 * or null if the origin is not allowed or is null (same-origin requests don't need CORS headers).
 */
function isOriginAllowed(origin: string | null): 'wildcard' | 'specific' | null {
  if (!origin) {
    return null; // No origin header means same-origin request, no CORS headers needed
  }

  const allowedOrigins = process.env.ALLOWED_SNAPSHOT_ORIGINS;
  
  // If not set or empty, don't allow cross-origin requests
  if (!allowedOrigins) {
    return null;
  }

  // If set to "*", allow all origins
  if (allowedOrigins === '*') {
    return 'wildcard';
  }

  // Parse comma-separated list of allowed origins
  const originList = allowedOrigins.split(',').map(o => o.trim());
  return originList.includes(origin) ? 'specific' : null;
}

export async function GET(request: NextRequest) {
  const locale = parseLocale(request);
  const [services, incidents] = await Promise.all([
    getServices(locale),
    getIncidentHistories(locale),
  ]);
  const statusLabel = computeStatusLabel(services);

  const origin = request.headers.get('origin');
  const allowedType = isOriginAllowed(origin);
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };

  // Add CORS headers if origin is allowed
  if (allowedType === 'wildcard') {
    // For wildcard, use '*' as the origin and don't include credentials
    headers['Access-Control-Allow-Origin'] = '*';
  } else if (allowedType === 'specific' && origin) {
    // For specific origins, echo the origin and allow credentials
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
