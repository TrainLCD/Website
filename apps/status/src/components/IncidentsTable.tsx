import { incidentHistories } from 'data';
import { parseTokyoDate } from '@utils/dayjs';
import type { JSX } from 'preact';
import { StatusIcon } from './StatusIcon';

// Delay painting offscreen content while reserving space to improve LCP.
const containerStyle: JSX.CSSProperties = {
  contentVisibility: 'auto',
  containIntrinsicSize: '640px',
};

const IncidentsTable = () => {
  return (
    <div className="border w-full rounded-lg max-w-2xl" style={containerStyle}>
      <p className="bg-gray-100 font-semibold p-4">障害履歴</p>
      <ul>
        {incidentHistories.map((incident) => (
          <li key={incident.id} className="flex border-b last:border-none p-4">
            <div className="flex-1">
              <p className="text-xs">
                {parseTokyoDate(incident.publishedAt).format('YYYY/MM/DD HH:mm')}
              </p>
              <a className="underline decoration-solid" href={`/incidents/${incident.slug}`}>
                <p className="font-semibold">{incident.title}</p>
              </a>
              <p className="text-xs mt-1">{incident.description}</p>
            </div>
            <div className="flex justify-center items-center">
              <StatusIcon
                status={incident.incidentImpact}
                className="h-8 w-8 md:ml-2 ml-3"
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default IncidentsTable;
