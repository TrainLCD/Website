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
      // Origin header must be present in production
      if (!origin) {
        return new NextResponse('Forbidden: Origin header required', { status: 403 });
      }
      
      // Use exact hostname matching for security
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

  return NextResponse.next();
}

export const config = {
  matcher: '/api/status/stream',
};
