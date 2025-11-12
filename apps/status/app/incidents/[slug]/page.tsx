import { notFound } from 'next/navigation';
import Link from 'next/link';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { StatusIcon } from '../../components/StatusIcon';
import { getIncidentBySlug, getIncidentHistories } from '@/server/repo/incidentRepository';
import { getServices } from '@/server/repo/serviceRepository';
import type { IncidentHistory, StatusType } from '@/server/types';

// Force dynamic rendering
export const dynamic = 'force-dynamic';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault('Asia/Tokyo');

const parseTokyoDate = (input: string) => dayjs(input).tz('Asia/Tokyo');

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const incident = await getIncidentBySlug(slug);

  if (!incident) {
    return {
      title: 'Incident Not Found - TrainLCD System Status',
    };
  }

  return {
    title: `${incident.title.ja} - TrainLCD System Status`,
    description: incident.description.ja,
    openGraph: {
      title: `${incident.title.ja} - TrainLCD System Status`,
      description: incident.description.ja,
      type: 'article',
      publishedTime: incident.publishedAt,
      modifiedTime: incident.updatedAt,
    },
  };
}

export default async function IncidentDetailPage({ params }: Props) {
  const { slug } = await params;
  const [incident, services] = await Promise.all([
    getIncidentBySlug(slug),
    getServices(),
  ]);

  if (!incident) {
    notFound();
  }

  const affectedServices = services.filter((s) =>
    incident.affectedServiceIds.includes(s.id)
  );

  const getStatusLabel = (status: StatusType) => {
    switch (status) {
      case 'operational':
        return { ja: '正常', en: 'Operational' };
      case 'maintenance':
        return { ja: 'メンテナンス', en: 'Maintenance' };
      case 'partiallyMaintenance':
        return { ja: '一部メンテナンス', en: 'Partial Maintenance' };
      case 'degraded':
        return { ja: '性能低下', en: 'Degraded' };
      case 'partiallyDegraded':
        return { ja: '一部性能低下', en: 'Partially Degraded' };
      case 'outage':
        return { ja: '障害', en: 'Outage' };
      default:
        return { ja: '不明', en: 'Unknown' };
    }
  };

  return (
    <>
      <Header />
      <main className="flex flex-col justify-center items-center md:p-8 p-4 md:mt-16 mt-4 md:mb-32 mb-16 w-full">
        <div className="w-full max-w-2xl">
          {/* Back link */}
          <Link
            href="/"
            className="text-orange-700 hover:underline text-sm mb-4 inline-block"
          >
            ← 障害履歴に戻る
          </Link>

          {/* Incident header */}
          <div className="border rounded-lg p-6 mb-6">
            <div className="flex items-start justify-between mb-4">
              <h1 className="text-2xl font-bold flex-1">{incident.title.ja}</h1>
              <StatusIcon
                status={incident.incidentImpact}
                className="h-10 w-10 ml-4 flex-shrink-0"
              />
            </div>

            <div className="flex items-center gap-2 mb-4">
              <span className="text-sm font-semibold px-3 py-1 rounded-full bg-gray-100">
                {getStatusLabel(incident.incidentImpact).ja}
              </span>
            </div>

            <div className="text-sm text-gray-600 space-y-1 mb-4">
              <p>
                <span className="font-semibold">公開日時:</span>{' '}
                {parseTokyoDate(incident.publishedAt).format('YYYY年MM月DD日 HH:mm')}
              </p>
              <p>
                <span className="font-semibold">対応開始日時:</span>{' '}
                {parseTokyoDate(incident.startedAt).format('YYYY年MM月DD日 HH:mm')}
              </p>
              {incident.resolvedAt && (
                <p>
                  <span className="font-semibold">復旧完了日時:</span>{' '}
                  {parseTokyoDate(incident.resolvedAt).format('YYYY年MM月DD日 HH:mm')}
                </p>
              )}
              {incident.estimatedResolveDate && (
                <p>
                  <span className="font-semibold">推定復旧完了日時:</span>{' '}
                  {parseTokyoDate(incident.estimatedResolveDate).format(
                    'YYYY年MM月DD日 HH:mm'
                  )}
                </p>
              )}
            </div>

            <div className="mb-4">
              <h2 className="font-semibold text-lg mb-2">概要</h2>
              <p className="text-gray-700">{incident.description.ja}</p>
            </div>

            {incident.cause && (
              <div className="mb-4">
                <h2 className="font-semibold text-lg mb-2">原因</h2>
                <p className="text-gray-700">{incident.cause.ja}</p>
              </div>
            )}

            {affectedServices.length > 0 && (
              <div className="mb-4">
                <h2 className="font-semibold text-lg mb-2">影響を受けたサービス</h2>
                <ul className="list-disc list-inside space-y-1">
                  {affectedServices.map((service) => (
                    <li key={service.id} className="text-gray-700">
                      {service.label.ja}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {incident.externalLink && (
              <div>
                <h2 className="font-semibold text-lg mb-2">関連リンク</h2>
                <a
                  href={incident.externalLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-orange-700 hover:underline"
                >
                  {incident.externalLink}
                </a>
              </div>
            )}
          </div>

          {/* Updates section */}
          {incident.updates.length > 0 && (
            <div className="border rounded-lg p-6">
              <h2 className="font-semibold text-xl mb-4">更新情報</h2>
              <div className="space-y-6">
                {incident.updates
                  .slice()
                  .reverse()
                  .map((update) => (
                    <div key={update.id} className="border-l-4 border-gray-300 pl-4">
                      <div className="flex items-center gap-2 mb-2">
                        <StatusIcon status={update.status} className="h-6 w-6" />
                        <span className="text-sm font-semibold px-2 py-1 rounded bg-gray-100">
                          {getStatusLabel(update.status).ja}
                        </span>
                        <span className="text-sm text-gray-600">
                          {parseTokyoDate(update.createdAt).format(
                            'YYYY年MM月DD日 HH:mm'
                          )}
                        </span>
                      </div>
                      <p className="text-gray-700">{update.body.ja}</p>
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
