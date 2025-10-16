import { incidentHistories } from 'data';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import { StatusIcon } from './StatusIcon';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault('Asia/Tokyo');

const IncidentsTable = () => {
  return (
    <div className="border w-full rounded-lg max-w-2xl">
      <p className="bg-gray-100 font-semibold p-4">障害履歴</p>
      <ul>
        {incidentHistories.map((incident) => (
          <li key={incident.id} className="flex border-b last:border-none p-4">
            <div className="flex-1">
              <p className="text-xs">
                {dayjs.tz(incident.publishedAt, 'Asia/Tokyo').format('YYYY/MM/DD HH:mm')}
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
