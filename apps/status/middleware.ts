import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Only apply middleware to the SSE stream endpoint
  if (request.nextUrl.pathname === '/api/status/stream') {
    const origin = request.headers.get('origin');
    const host = request.headers.get('host');
    
    // For development, allow localhost
    const isDevelopment = 
      host?.includes('localhost') || 
      host?.includes('127.0.0.1');
    
    // For production, validate origin header
    if (!isDevelopment) {
      // For same-origin requests, the browser may not send the Origin header
      // In that case, check if the host matches the expected domain
      if (!origin) {
        // Same-origin request - check host header
        if (host !== 'status.trainlcd.app') {
          return new NextResponse('Forbidden: Invalid host', { status: 403 });
        }
      } else {
        // Cross-origin request - validate origin
        let isAllowedOrigin = false;
        try {
          const url = new URL(origin);
          isAllowedOrigin = url.hostname === 'status.trainlcd.app';
        } catch {
          isAllowedOrigin = false;
        }
        
        if (!isAllowedOrigin) {
          return new NextResponse('Forbidden', { status: 403 });
        }
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/api/status/stream',
};
