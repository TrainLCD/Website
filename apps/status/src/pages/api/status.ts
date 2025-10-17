import type { APIRoute } from 'astro';
import {
  incidentHistories,
  isOperational,
  services as serviceStatus,
  statusLabel as overallStatus,
} from 'data';

export const GET: APIRoute = () => {
  try {
    const body = JSON.stringify({
      isOperational,
      status: overallStatus,
      incidentHistories,
      serviceStatus,
    });

    return new Response(body, {
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
    });
  } catch (error) {
    console.error('[api/status] failed to serialize response', error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
    });
  }
};
