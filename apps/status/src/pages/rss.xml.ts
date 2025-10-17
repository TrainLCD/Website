import type { APIRoute } from 'astro';
import { incidentHistories } from 'data';
import dayjs, { parseTokyoDate } from '@utils/dayjs';
import type { Dayjs } from 'dayjs';
import minMax from 'dayjs/plugin/minMax';

dayjs.extend(minMax);

const toPubDate = (date: string | Dayjs | null) => {
  if (!date) {
    return '';
  }
  const base = typeof date === 'string' ? parseTokyoDate(date) : date;
  return base.tz('UTC').format('ddd, DD MMM YYYY HH:mm:ss ZZ');
};

export const GET: APIRoute = () => {
  const lastPublished = incidentHistories
    .map((inc) => inc.publishedAt)
    .map((at) => parseTokyoDate(at));
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
        <title><![CDATA[${inc.title}]]></title>
        <content type="html"><![CDATA[${inc.description}]]></content>
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
