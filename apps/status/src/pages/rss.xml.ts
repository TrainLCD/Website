import type { APIRoute } from "astro";
import { incidentHistories, services } from "data";
import dayjs, { parseTokyoDate } from "@utils/dayjs";
import type { Dayjs } from "dayjs";
import minMax from "dayjs/plugin/minMax";
import { resolveLocale, type Locale } from "@utils/locale";

dayjs.extend(minMax);

export const prerender = true;

const toPubDate = (date: string | Dayjs | null) => {
  if (!date) {
    return "";
  }
  const base = typeof date === "string" ? parseTokyoDate(date) : date;
  return base.tz("UTC").format("ddd, DD MMM YYYY HH:mm:ss ZZ");
};

const channelCopy: Record<
  Locale,
  {
    description: string;
    serviceTitleSuffix: string;
    title: string;
  }
> = {
  ja: {
    description: "TrainLCDのサービス稼働状況と障害履歴",
    serviceTitleSuffix: " の稼働状況",
    title: "TrainLCDステータス",
  },
  en: {
    description: "TrainLCD service status and incident log",
    serviceTitleSuffix: " status update",
    title: "TrainLCD Status",
  },
};

export const GET: APIRoute = ({ request }) => {
  const locale = resolveLocale(request.headers.get("accept-language"));
  const copy = channelCopy[locale];

  const incidentDates = incidentHistories
    .map((inc) => inc.updatedAt || inc.publishedAt)
    .map((at) => parseTokyoDate(at));
  const serviceDates = services.map((service) =>
    parseTokyoDate(service.updatedAt)
  );
  const latestUpdateCandidates = [...incidentDates, ...serviceDates].filter(
    (date): date is Dayjs => Boolean(date)
  );
  const latestUpdate =
    latestUpdateCandidates.length > 0
      ? dayjs.max(latestUpdateCandidates)
      : null;

  const serviceItems = services
    .map((service) => {
      const permalink = `https://status.trainlcd.app/#service-${service.id}`;
      const title = `${service.label[locale]}${copy.serviceTitleSuffix}`;
      return `<item>
        <title><![CDATA[${title}]]></title>
        <description><![CDATA[${service.statusSummary[locale]}]]></description>
        <pubDate>${toPubDate(service.updatedAt)}</pubDate>
        <link>${permalink}</link>
        <guid isPermaLink="false">service:${service.id}</guid>
        <category>service-status</category>
      </item>`;
    })
    .join("\n    ");

  const incidentItems = incidentHistories
    .map(
      (inc) => `<item>
        <title><![CDATA[${inc.title[locale]}]]></title>
        <description><![CDATA[${inc.description[locale]}]]></description>
        <pubDate>${toPubDate(inc.publishedAt)}</pubDate>
        <link>https://status.trainlcd.app/incidents/${inc.slug}</link>
        <guid>https://status.trainlcd.app/incidents/${inc.slug}</guid>
        <category>incident</category>
      </item>`
    )
    .join("\n    ");

  const body = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">
  <channel>
    <title>${copy.title}</title>
    <link>https://status.trainlcd.app</link>
    <description>${copy.description}</description>
    <pubDate>${toPubDate(latestUpdate)}</pubDate>
    ${[serviceItems, incidentItems].filter(Boolean).join("\n    ")}
  </channel>
</rss>`;

  return new Response(body, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, HEAD",
    },
  });
};
