import { NextResponse } from 'next/server';
import { getServices, getStatusLabel } from '@/app/server/repo/serviceRepository';
import { getIncidentHistories } from '@/app/server/repo/incidentRepository';

export async function GET() {
  const [statusLabel, services, incidents] = await Promise.all([
    getStatusLabel(),
    getServices(),
    getIncidentHistories(),
  ]);

  return NextResponse.json({
    statusLabel,
    services,
    incidents,
  });
}
