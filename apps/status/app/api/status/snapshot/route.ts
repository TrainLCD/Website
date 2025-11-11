import { NextResponse } from 'next/server';
import { getServices, getStatusLabel } from '@/server/repo/serviceRepository';
import { getIncidentHistories } from '@/server/repo/incidentRepository';

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
