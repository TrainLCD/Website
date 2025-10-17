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
  return base.tz('UTC').format('YYYY-MM-DDTHH:mm:ssZ');
};

export const GET: APIRoute = () => {
  const lastPublished = incidentHistories
    .map((inc) => parseTokyoDate(inc.publishedAt));
  const latestIncidentDate = dayjs.max(lastPublished);

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<feed xml:lang="ja-JP" xmlns="http://www.w3.org/2005/Atom">
  <id>urn:uuid:afc63722-af43-48b6-a2ec-bdc3d0950a1b</id>
  <link rel="alternate" type="text/html" href="https://status.trainlcd.app"/>
  <link rel="self" type="application/atom+xml" href="/atom.xml"/>
  <title>TrainLCD Status(障害履歴)</title>
  <updated>${toPubDate(latestIncidentDate)}</updated>
  <author>
    <name>TinyKitten(関口 翼)</name>
  </author>
  ${incidentHistories
    .map(
      (inc) => `<entry>
    <id>${inc.id}</id>
    <published>${toPubDate(inc.publishedAt)}</published>
    <updated>${toPubDate(inc.updatedAt)}</updated>
    <link rel="alternate" type="text/html" href="https://status.trainlcd.app/incidents/${inc.slug}"/>
    <title><![CDATA[${inc.title}]]></title>
    <content type="html"><![CDATA[${inc.description}]]></content>
  </entry>`
    )
    .join('\n  ')}
</feed>`;

  return new Response(body, {
    headers: {
      'Content-Type': 'application/atom+xml; charset=utf-8',
    },
  });
};
