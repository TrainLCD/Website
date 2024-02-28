import { incidentHistories } from "data";
import dayjs from "dayjs";
import Link from "next/link";
import { StatusIcon } from "./Icon";

export const IncidentsTable = () => {
  return (
    <div className="border w-full rounded-lg max-w-2xl">
      <p className="bg-gray-100 font-semibold p-4">障害履歴</p>
      <ul>
        {incidentHistories.map((inc) => (
          <li key={inc.id} className="flex border-b last:border-none p-4">
            <div className="flex-1">
              <p className="text-xs">
                {dayjs(inc.publishedAt).format("YYYY/MM/DD HH:mm")}
              </p>
              <Link href={`/incidents/${inc.slug}`}>
                <p className="font-semibold">{inc.title}</p>
              </Link>
              <p className="text-xs mt-1">{inc.description}</p>
            </div>
            <div className="flex justify-center items-center">
              <StatusIcon
                status={inc.incidentImpact}
                className="size-8 md:ml-2 ml-3"
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
