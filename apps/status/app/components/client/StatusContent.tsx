'use client';

import { useStatusStream } from '../../hooks/useStatusStream';
import type { StatusType, Service, IncidentHistory } from '../../server/types';
import Overview from './Overview';
import ServicesTable from './ServicesTable';
import IncidentsTable from './IncidentsTable';

type StatusContentProps = {
  initialStatusLabel: StatusType;
  initialServices: Service[];
  initialIncidents: IncidentHistory[];
};

export default function StatusContent({
  initialStatusLabel,
  initialServices,
  initialIncidents,
}: StatusContentProps) {
  const { data } = useStatusStream({
    statusLabel: initialStatusLabel,
    services: initialServices,
    incidents: initialIncidents,
  });

  return (
    <>
      <Overview statusLabel={data.statusLabel} />
      <div className="mt-16 w-full flex justify-center items-center">
        <ServicesTable services={data.services} />
      </div>
      <div className="mt-16 w-full flex justify-center items-center">
        <IncidentsTable incidents={data.incidents} />
      </div>
    </>
  );
}
