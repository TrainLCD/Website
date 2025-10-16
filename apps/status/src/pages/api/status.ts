import type { APIRoute } from 'astro';
import {
  incidentHistories,
  isOperational,
  services as serviceStatus,
  statusLabel as overallStatus,
} from 'data';

export const GET: APIRoute = () => {
  return new Response(
    JSON.stringify({
      isOperational,
      status: overallStatus,
      incidentHistories,
      serviceStatus,
    }),
    {
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
    }
  );
};
