import type { APIRoute } from 'astro';
import { incidentHistories } from 'data';
import dayjs, { Dayjs } from 'dayjs';
import minMax from 'dayjs/plugin/minMax';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

dayjs.extend(minMax);
dayjs.extend(timezone);
dayjs.extend(utc);

const toPubDate = (date: string | Dayjs | null) =>
  dayjs.tz(date, 'UTC').format('ddd, DD MMM YYYY HH:mm:ss ZZ');

export const GET: APIRoute = () => {
  const lastPublished = incidentHistories
    .map((inc) => inc.publishedAt)
    .map((at) => dayjs(at));
  const latestIncidentDate = dayjs.max(lastPublished);

  const body = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">
  <channel>
    <title>TrainLCD Status(障害履歴)</title>
    <link>https://status.trainlcd.app</link>
    <description>Status</description>
    <pubDate>${toPubDate(latestIncidentDate)}</pubDate>
    ${incidentHistories
      .map(
        (inc) => `<item>
        <title>${inc.title}</title>
        <description>${inc.description}</description>
        <pubDate>${toPubDate(inc.publishedAt)}</pubDate>
        <link>https://status.trainlcd.app/incidents/${inc.slug}</link>
        <guid>https://status.trainlcd.app/incidents/${inc.slug}</guid>
      </item>`
      )
      .join('\n    ')}
  </channel>
</rss>`;

  return new Response(body, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
    },
  });
};
