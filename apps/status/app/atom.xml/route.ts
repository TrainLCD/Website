import { incidentHistories } from "data";
import dayjs, { Dayjs } from "dayjs";
import minMax from "dayjs/plugin/minMax";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import { NextResponse } from "next/server";

dayjs.extend(minMax);
dayjs.extend(timezone);
dayjs.extend(utc);

const toPubDate = (date: string | Dayjs | null) =>
  dayjs.tz(date, "UTC").format("YYYY-MM-DDTHH:mm:ssZ");

export async function GET() {
  const lastPublishedIncident = incidentHistories
    .map((inc) => inc.publishedAt)
    .map((at) => dayjs(at));
  const latestIncidentDate = dayjs.max(lastPublishedIncident);

  return new NextResponse(
    `<?xml version="1.0" encoding="UTF-8"?>
    <feed xml:lang="ja-JP" xmlns="http://www.w3.org/2005/Atom">
      <id>urn:uuid:afc63722-af43-48b6-a2ec-bdc3d0950a1b</id>
      <link rel="alternate" type="text/html" href="https://status.trainlcd.app"/>
      <link rel="self" type="application/atom+xml" href="/atom.xml"/>
      <title>TrainLCD Status(障害履歴)</title>
      <updated>${toPubDate(latestIncidentDate)}</updated>
      <author>
        <name>TinyKitten(関口 翼)</name>
      </author>
      ${incidentHistories.map(
        (inc) => `<entry>
            <id>${inc.id}</id>
            <published>${toPubDate(inc.publishedAt)}</published>
            <updated>${toPubDate(inc.updatedAt)}</updated>
            <link rel="alternate" type="text/html" href="${inc.incidentLink}"/>
            <title>${inc.title}</title>
            <content>${inc.description}</content>
        </entry>`
      )}
    </feed>`,
    {
      headers: {
        "Content-Type": "text/xml",
      },
    }
  );
}
