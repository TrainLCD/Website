import { getServices } from '@/app/server/repo/serviceRepository';
import { getIncidentHistories } from '@/app/server/repo/incidentRepository';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import minMax from 'dayjs/plugin/minMax';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(minMax);

const parseTokyoDate = (dateStr: string) => {
  return dayjs.tz(dateStr, 'Asia/Tokyo');
};

const toPubDate = (date: string | dayjs.Dayjs | null) => {
  if (!date) {
    return '';
  }
  const base = typeof date === 'string' ? parseTokyoDate(date) : date;
  return base.tz('UTC').format('ddd, DD MMM YYYY HH:mm:ss ZZ');
};

export async function GET() {
  const [services, incidentHistories] = await Promise.all([
    getServices(),
    getIncidentHistories(),
  ]);

  const incidentDates = incidentHistories
    .map((inc) => inc.updatedAt || inc.publishedAt)
    .map((at) => parseTokyoDate(at));
  const serviceDates = services.map((service) => parseTokyoDate(service.updatedAt));
  const latestUpdateCandidates = [...incidentDates, ...serviceDates].filter(
    (date): date is dayjs.Dayjs => Boolean(date)
  );
  const latestUpdate =
    latestUpdateCandidates.length > 0 ? dayjs.max(latestUpdateCandidates) : null;

  const serviceItems = services
    .map((service) => {
      const permalink = `https://status.trainlcd.app/#service-${service.id}`;
      return `<item>
        <title><![CDATA[${service.label.ja} の稼働状況]]></title>
        <description><![CDATA[${service.statusSummary.ja}]]></description>
        <pubDate>${toPubDate(service.updatedAt)}</pubDate>
        <link>${permalink}</link>
        <guid isPermaLink="false">service:${service.id}</guid>
        <category>service-status</category>
      </item>`;
    })
    .join('\n    ');

  const incidentItems = incidentHistories
    .map(
      (inc) => `<item>
        <title><![CDATA[${inc.title.ja}]]></title>
        <description><![CDATA[${inc.description.ja}]]></description>
        <pubDate>${toPubDate(inc.publishedAt)}</pubDate>
        <link>https://status.trainlcd.app/incidents/${inc.slug}</link>
        <guid>https://status.trainlcd.app/incidents/${inc.slug}</guid>
        <category>incident</category>
      </item>`
    )
    .join('\n    ');

  const body = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">
  <channel>
    <title>TrainLCD Status</title>
    <link>https://status.trainlcd.app</link>
    <description>TrainLCDのサービス稼働状況と障害履歴</description>
    <pubDate>${toPubDate(latestUpdate)}</pubDate>
    ${[serviceItems, incidentItems].filter(Boolean).join('\n    ')}
  </channel>
</rss>`;

  return new Response(body, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, HEAD',
    },
  });
}
