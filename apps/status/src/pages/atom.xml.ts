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
  return base.tz("UTC").format("YYYY-MM-DDTHH:mm:ssZ");
};

const copy: Record<
  Locale,
  { serviceTitleSuffix: string; channelTitle: string }
> = {
  ja: {
    serviceTitleSuffix: " の稼働状況",
    channelTitle: "TrainLCDステータス",
  },
  en: {
    serviceTitleSuffix: " status update",
    channelTitle: "TrainLCD Status",
  },
};

export const GET: APIRoute = ({ request }) => {
  const locale = resolveLocale(request.headers.get("accept-language"));
  const localeCopy = copy[locale];

  const incidentDates = incidentHistories.map((inc) =>
    parseTokyoDate(inc.updatedAt || inc.publishedAt)
  );
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

  const serviceEntries = services
    .map((service) => {
      const permalink = `https://status.trainlcd.app/#service-${service.id}`;
      const title = `${service.label[locale]}${localeCopy.serviceTitleSuffix}`;
      return `<entry>
    <id>urn:service-status:${service.id}</id>
    <published>${toPubDate(service.statusSince)}</published>
    <updated>${toPubDate(service.updatedAt)}</updated>
    <link rel="alternate" type="text/html" href="${permalink}"/>
    <category term="service-status" />
    <title><![CDATA[${title}]]></title>
    <content type="html"><![CDATA[${service.statusSummary[locale]}]]></content>
  </entry>`;
    })
    .join("\n  ");

  const incidentEntries = incidentHistories
    .map(
      (inc) => `<entry>
    <id>${inc.id}</id>
    <published>${toPubDate(inc.publishedAt)}</published>
    <updated>${toPubDate(inc.updatedAt || inc.publishedAt)}</updated>
    <link rel="alternate" type="text/html" href="https://status.trainlcd.app/incidents/${
      inc.slug
    }"/>
    <category term="incident" />
    <title><![CDATA[${inc.title[locale]}]]></title>
    <content type="html"><![CDATA[${inc.description[locale]}]]></content>
  </entry>`
    )
    .join("\n  ");

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<feed xml:lang="ja-JP" xmlns="http://www.w3.org/2005/Atom">
  <id>urn:uuid:afc63722-af43-48b6-a2ec-bdc3d0950a1b</id>
  <link rel="alternate" type="text/html" href="https://status.trainlcd.app"/>
  <link rel="self" type="application/atom+xml" href="/atom.xml"/>
  <title>${localeCopy.channelTitle}</title>
  <updated>${toPubDate(latestUpdate)}</updated>
  <author>
    <name>TinyKitten(関口 翼)</name>
  </author>
  ${[serviceEntries, incidentEntries].filter(Boolean).join("\n  ")}
</feed>`;

  return new Response(body, {
    headers: {
      "Content-Type": "application/atom+xml; charset=utf-8",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, HEAD",
    },
  });
};
