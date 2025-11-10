import { incidentHistories } from "data";
import { parseTokyoDate } from "@utils/dayjs";
import { StatusIcon } from "./StatusIcon";
import type { Locale } from "@utils/locale";

type Props = {
  locale: Locale;
};

const headings = {
  ja: "障害履歴",
  en: "Incident history",
} as const;

const IncidentsTable = ({ locale }: Props) => {
  return (
    <div className="border w-full rounded-lg max-w-2xl">
      <p className="bg-gray-100 font-semibold p-4">{headings[locale]}</p>
      <ul>
        {incidentHistories.map((incident) => (
          <li key={incident.id} className="flex border-b last:border-none p-4">
            <div className="flex-1">
              <p className="text-xs">
                {parseTokyoDate(incident.publishedAt).format(
                  "YYYY/MM/DD HH:mm"
                )}
              </p>
              <a
                className="underline decoration-solid"
                href={`/incidents/${incident.slug}`}
              >
                <p className="font-semibold">{incident.title[locale]}</p>
              </a>
              <p className="text-xs mt-1">{incident.description[locale]}</p>
            </div>
            <div className="flex justify-center items-center">
              <StatusIcon
                status={incident.incidentImpact}
                className="h-8 w-8 md:ml-2 ml-3"
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default IncidentsTable;
