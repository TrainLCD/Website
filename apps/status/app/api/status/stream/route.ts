import { NextRequest } from 'next/server';
import { services, incidentHistories, statusLabel } from 'data';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  // Check if the request is from status.trainlcd.app
  const origin = request.headers.get('origin');
  const host = request.headers.get('host');
  
  // Allow requests from status.trainlcd.app or localhost for development
  const isAllowedOrigin = 
    origin?.includes('status.trainlcd.app') || 
    host?.includes('localhost') ||
    host?.includes('127.0.0.1');

  if (!isAllowedOrigin && origin) {
    return new Response('Forbidden', { status: 403 });
  }

  // Create a readable stream for SSE
  const encoder = new TextEncoder();
  
  const stream = new ReadableStream({
    start(controller) {
      // Send initial data
      const initialData = {
        statusLabel,
        services,
        incidents: incidentHistories,
      };
      
      const message = `data: ${JSON.stringify(initialData)}\n\n`;
      controller.enqueue(encoder.encode(message));

      // Set up an interval to send updates (every 30 seconds)
      const intervalId = setInterval(() => {
        // In a real implementation, you would check for actual updates
        // For now, we'll send the current state
        const updateData = {
          statusLabel,
          services,
          incidents: incidentHistories,
        };
        
        const updateMessage = `data: ${JSON.stringify(updateData)}\n\n`;
        controller.enqueue(encoder.encode(updateMessage));
      }, 30000);

      // Clean up when the connection is closed
      request.signal.addEventListener('abort', () => {
        clearInterval(intervalId);
        controller.close();
      });
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
      'Access-Control-Allow-Origin': origin || '*',
      'Access-Control-Allow-Credentials': 'true',
    },
  });
}
