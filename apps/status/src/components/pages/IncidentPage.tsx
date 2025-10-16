import type { IncidentHistory } from 'data';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import { ArrowIcon } from '@components/icons/Arrow';
import { StatusIcon } from '@components/StatusIcon';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault('Asia/Tokyo');

type Props = {
  incident?: IncidentHistory;
};

const formatDate = (dateStr: string | null, excludeMinutes = false) => {
  if (!dateStr) {
    return null;
  }
  const date = dayjs.tz(dateStr, 'Asia/Tokyo');
  return excludeMinutes
    ? date.format('YYYY/MM/DD H時')
    : date.format('YYYY/MM/DD HH:mm');
};

const IncidentPage = ({ incident }: Props) => {
  if (!incident) {
    return (
      <main className="flex flex-col justify-center items-center md:p-8 p-4 md:mt-16 mt-4 md:mb-32 mb-16">
        <div className="flex justify-center flex-col items-center">
          <StatusIcon status="unknown" className="h-32 w-32" />
          <h1 className="mt-4 font-bold text-2xl text-center">404 Not Found</h1>
          <h2 className="mt-4 font-bold text-center">
            指定された障害レポートが見つかりませんでした。
          </h2>
          <div className="mt-4">
            <a className="text-sm font-bold text-gray-600 flex items-center" href="/">
              現在の障害情報
            </a>
          </div>
        </div>
      </main>
    );
  }

  const resolvedText = incident.resolvedAt
    ? formatDate(incident.resolvedAt)
    : `未復旧(${incident.estimatedResolveDate ? `${formatDate(incident.estimatedResolveDate, true)}頃復旧見込み` : '復旧見込みなし'})`;

  return (
    <main className="flex flex-col justify-center items-center md:p-8 p-4 md:mt-16 mt-4 md:mb-32 mb-16">
      <div className="flex justify-center flex-col items-center w-full max-w-2xl">
        <StatusIcon status={incident.incidentImpact} className="h-32 w-32" />
        <h1 className="mt-4 font-bold text-2xl text-center whitespace-pre-wrap">
          {incident.title}
        </h1>
        <p className="mt-4 w-full whitespace-pre-wrap">{incident.description}</p>

        <div className="mt-6 w-full flex">
          <p className="font-bold">推定障害発生日時:</p>
          <p className="ml-2">{formatDate(incident.publishedAt)}</p>
        </div>
        <div className="w-full flex">
          <p className="font-bold">最終更新日時:</p>
          <p className="ml-2">{formatDate(incident.updatedAt)}</p>
        </div>
        <div className="w-full flex">
          <p className="font-bold">障害の原因:</p>
          <p className="ml-2">{incident.cause}</p>
        </div>
        <div className="w-full flex">
          <p className="font-bold">復旧日時:</p>
          <p className="ml-2">{resolvedText}</p>
        </div>

        <div className="w-full mt-8">
          <a className="text-sm font-bold text-gray-600 inline-flex items-center" href="/">
            <ArrowIcon className="mr-1" />現在の障害情報
          </a>
        </div>
      </div>
    </main>
  );
};

export default IncidentPage;
