'use client';

import { useStatusStream } from '../../hooks/useStatusStream';
import type { StatusType, Service, IncidentHistory } from '../../server/types';
import type { Locale } from '../../server/lib/locale';
import Overview from './Overview';
import ServicesTable from './ServicesTable';
import IncidentsTable from './IncidentsTable';

type StatusContentProps = {
  initialStatusLabel: StatusType;
  initialServices: Service[];
  initialIncidents: IncidentHistory[];
  locale: Locale;
};

export default function StatusContent({
  initialStatusLabel,
  initialServices,
  initialIncidents,
  locale,
}: StatusContentProps) {
  const { data } = useStatusStream({
    statusLabel: initialStatusLabel,
    services: initialServices,
    incidents: initialIncidents,
  });

  return (
    <>
      <Overview statusLabel={data.statusLabel} locale={locale} />
      <div className="mt-16 w-full flex justify-center items-center">
        <ServicesTable services={data.services} locale={locale} />
      </div>
      <div className="mt-16 w-full flex justify-center items-center">
        <IncidentsTable incidents={data.incidents} locale={locale} />
      </div>
    </>
  );
}
