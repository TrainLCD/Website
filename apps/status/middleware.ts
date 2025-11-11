import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Only apply middleware to the SSE stream endpoint
  if (request.nextUrl.pathname === '/api/status/stream') {
    const origin = request.headers.get('origin');
    const host = request.headers.get('host');
    
    // Allow requests from status.trainlcd.app or localhost for development
    const isAllowedOrigin = 
      origin?.includes('status.trainlcd.app') || 
      host?.includes('localhost') ||
      host?.includes('127.0.0.1') ||
      !origin; // Allow requests without origin (same-origin requests)

    if (origin && !isAllowedOrigin) {
      return new NextResponse('Forbidden', { status: 403 });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/api/status/stream',
};
