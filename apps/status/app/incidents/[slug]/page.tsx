import { notFound } from 'next/navigation';
import Link from 'next/link';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { StatusIcon } from '../../components/StatusIcon';
import { getIncidentBySlug } from '@/server/repo/incidentRepository';
import { getServices } from '@/server/repo/serviceRepository';
import { detectLocale } from '@/server/lib/locale';
import type { StatusType } from '@/server/types';

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
  const locale = await detectLocale();
  const incident = await getIncidentBySlug(slug, locale);

  if (!incident) {
    return {
      title: 'Incident Not Found - TrainLCD System Status',
    };
  }

  return {
    title: `${incident.title[locale]} - TrainLCD System Status`,
    description: incident.description[locale],
    openGraph: {
      title: `${incident.title[locale]} - TrainLCD System Status`,
      description: incident.description[locale],
      type: 'article',
      publishedTime: incident.publishedAt,
      modifiedTime: incident.updatedAt,
    },
  };
}

export default async function IncidentDetailPage({ params }: Props) {
  const { slug } = await params;
  const locale = await detectLocale();
  
  const [incident, services] = await Promise.all([
    getIncidentBySlug(slug, locale),
    getServices(locale),
  ]);

  if (!incident) {
    notFound();
  }

  const affectedServices = services.filter((s) =>
    incident.affectedServiceIds.includes(s.id)
  );

  const getStatusLabel = (status: StatusType) => {
    const labels = {
      operational: { ja: '正常', en: 'Operational' },
      maintenance: { ja: 'メンテナンス', en: 'Maintenance' },
      partiallyMaintenance: { ja: '一部メンテナンス', en: 'Partial Maintenance' },
      degraded: { ja: '性能低下', en: 'Degraded' },
      partiallyDegraded: { ja: '一部性能低下', en: 'Partially Degraded' },
      outage: { ja: '障害', en: 'Outage' },
      unknown: { ja: '不明', en: 'Unknown' },
    };
    return labels[status] || labels.unknown;
  };

  const labels = {
    backLink: locale === 'ja' ? '← 障害履歴に戻る' : '← Back to incident history',
    publishedAt: locale === 'ja' ? '公開日時:' : 'Published:',
    startedAt: locale === 'ja' ? '対応開始日時:' : 'Started:',
    resolvedAt: locale === 'ja' ? '復旧完了日時:' : 'Resolved:',
    estimatedResolveDate: locale === 'ja' ? '推定復旧完了日時:' : 'Estimated resolution:',
    summary: locale === 'ja' ? '概要' : 'Summary',
    cause: locale === 'ja' ? '原因' : 'Cause',
    affectedServices: locale === 'ja' ? '影響を受けたサービス' : 'Affected Services',
    relatedLinks: locale === 'ja' ? '関連リンク' : 'Related Links',
    updates: locale === 'ja' ? '更新情報' : 'Updates',
  };

  const dateFormat = locale === 'ja' ? 'YYYY年MM月DD日 HH:mm' : 'MMM DD, YYYY HH:mm';

  return (
    <>
      <Header locale={locale} />
      <main className="flex flex-col justify-center items-center md:p-8 p-4 md:mt-16 mt-4 md:mb-32 mb-16 w-full">
        <div className="w-full max-w-2xl">
          {/* Back link */}
          <Link
            href="/"
            className="text-orange-700 hover:underline text-sm mb-4 inline-block"
          >
            {labels.backLink}
          </Link>

          {/* Incident header */}
          <div className="border rounded-lg p-6 mb-6">
            <div className="flex items-start justify-between mb-4">
              <h1 className="text-2xl font-bold flex-1">{incident.title[locale]}</h1>
              <StatusIcon
                status={incident.incidentImpact}
                className="h-10 w-10 ml-4 flex-shrink-0"
              />
            </div>

            <div className="flex items-center gap-2 mb-4">
              <span className="text-sm font-semibold px-3 py-1 rounded-full bg-gray-100">
                {getStatusLabel(incident.incidentImpact)[locale]}
              </span>
            </div>

            <div className="text-sm text-gray-600 space-y-1 mb-4">
              <p>
                <span className="font-semibold">{labels.publishedAt}</span>{' '}
                {parseTokyoDate(incident.publishedAt).format(dateFormat)}
              </p>
              <p>
                <span className="font-semibold">{labels.startedAt}</span>{' '}
                {parseTokyoDate(incident.startedAt).format(dateFormat)}
              </p>
              {incident.resolvedAt && (
                <p>
                  <span className="font-semibold">{labels.resolvedAt}</span>{' '}
                  {parseTokyoDate(incident.resolvedAt).format(dateFormat)}
                </p>
              )}
              {incident.estimatedResolveDate && (
                <p>
                  <span className="font-semibold">{labels.estimatedResolveDate}</span>{' '}
                  {parseTokyoDate(incident.estimatedResolveDate).format(dateFormat)}
                </p>
              )}
            </div>

            <div className="mb-4">
              <h2 className="font-semibold text-lg mb-2">{labels.summary}</h2>
              <p className="text-gray-700">{incident.description[locale]}</p>
            </div>

            {incident.cause && (
              <div className="mb-4">
                <h2 className="font-semibold text-lg mb-2">{labels.cause}</h2>
                <p className="text-gray-700">{incident.cause[locale]}</p>
              </div>
            )}

            {affectedServices.length > 0 && (
              <div className="mb-4">
                <h2 className="font-semibold text-lg mb-2">{labels.affectedServices}</h2>
                <ul className="list-disc list-inside space-y-1">
                  {affectedServices.map((service) => (
                    <li key={service.id} className="text-gray-700">
                      {service.label[locale]}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {incident.externalLink && (
              <div>
                <h2 className="font-semibold text-lg mb-2">{labels.relatedLinks}</h2>
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
              <h2 className="font-semibold text-xl mb-4">{labels.updates}</h2>
              <div className="space-y-6">
                {incident.updates
                  .slice()
                  .reverse()
                  .map((update) => (
                    <div key={update.id} className="border-l-4 border-gray-300 pl-4">
                      <div className="flex items-center gap-2 mb-2">
                        <StatusIcon status={update.status} className="h-6 w-6" />
                        <span className="text-sm font-semibold px-2 py-1 rounded bg-gray-100">
                          {getStatusLabel(update.status)[locale]}
                        </span>
                        <span className="text-sm text-gray-600">
                          {parseTokyoDate(update.createdAt).format(dateFormat)}
                        </span>
                      </div>
                      <p className="text-gray-700">{update.body[locale]}</p>
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
