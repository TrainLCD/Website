import { NextResponse } from 'next/server';
import { services, incidentHistories, statusLabel } from 'data';

export const dynamic = 'force-dynamic';

export async function GET() {
  return NextResponse.json({
    statusLabel,
    services,
    incidents: incidentHistories,
  });
}
