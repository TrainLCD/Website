import { NextResponse } from 'next/server';
import { services, incidentHistories, statusLabel } from 'data';

export async function GET() {
  return NextResponse.json({
    statusLabel,
    services,
    incidents: incidentHistories,
  });
}
