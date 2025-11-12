import { NextRequest } from 'next/server';
import { getServices, getStatusLabel } from '../../../server/repo/serviceRepository';
import { getIncidentHistories } from '../../../server/repo/incidentRepository';
import { redis, isRedisAvailable } from '../../../server/lib/redis';

export const dynamic = 'force-dynamic';

const SSE_HEARTBEAT_INTERVAL = 30000; // 30 seconds

/**
 * Subscribe to status update events via Redis pub/sub
 */
async function subscribeToStatusUpdates(
  controller: ReadableStreamDefaultController,
  encoder: TextEncoder,
  abortSignal: AbortSignal
) {
  if (!isRedisAvailable()) {
    console.log('[SSE] Redis not available, skipping pub/sub subscription');
    return;
  }

  try {
    // Create a subscriber client
    const subscriber = redis.duplicate();
    await subscriber.connect();

    // Subscribe to status update channel
    await subscriber.subscribe('status:updates', (message) => {
      try {
        if (!abortSignal.aborted) {
          const updateMessage = `data: ${message}\n\n`;
          controller.enqueue(encoder.encode(updateMessage));
        }
      } catch (err) {
        console.error('[SSE] Error enqueueing update:', err);
      }
    });

    // Clean up subscription when connection closes
    abortSignal.addEventListener('abort', async () => {
      try {
        await subscriber.unsubscribe('status:updates');
        await subscriber.quit();
      } catch (err) {
        console.error('[SSE] Error cleaning up subscriber:', err);
      }
    });
  } catch (error) {
    console.error('[SSE] Failed to setup Redis subscription:', error);
  }
}

export async function GET(request: NextRequest) {
  const encoder = new TextEncoder();
  
  const stream = new ReadableStream({
    async start(controller) {
      try {
        // Send initial data
        const [statusLabel, services, incidents] = await Promise.all([
          getStatusLabel(),
          getServices(),
          getIncidentHistories(),
        ]);

        const initialData = {
          statusLabel,
          services,
          incidents,
        };
        
        const message = `data: ${JSON.stringify(initialData)}\n\n`;
        controller.enqueue(encoder.encode(message));

        // Subscribe to Redis pub/sub for real-time updates
        await subscribeToStatusUpdates(controller, encoder, request.signal);

        // Set up heartbeat to keep connection alive
        const heartbeatInterval = setInterval(() => {
          try {
            if (!request.signal.aborted) {
              // Send a comment line as heartbeat (ignored by EventSource)
              controller.enqueue(encoder.encode(': heartbeat\n\n'));
            }
          } catch (err) {
            // Stream is likely closed, clear interval
            clearInterval(heartbeatInterval);
          }
        }, SSE_HEARTBEAT_INTERVAL);

        // Clean up when the connection is closed
        request.signal.addEventListener('abort', () => {
          clearInterval(heartbeatInterval);
          controller.close();
        });
      } catch (error) {
        console.error('[SSE] Error in stream setup:', error);
        controller.error(error);
      }
    },
  });

  const origin = request.headers.get('origin');
  
  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache, no-transform',
      'Connection': 'keep-alive',
      'X-Accel-Buffering': 'no',
      ...(origin ? {
        'Access-Control-Allow-Origin': origin,
        'Access-Control-Allow-Credentials': 'true',
      } : {}),
    },
  });
}
