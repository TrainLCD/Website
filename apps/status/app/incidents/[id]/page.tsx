import { incidentHistories } from "data";
import dayjs from "dayjs";
import Link from "next/link";
import { StatusIcon } from "../../components/Icon";
import { ArrowIcon } from "../../components/icons/Arrow";

export default function IncidentPage({ params }: { params: { id: string } }) {
  const incident = incidentHistories.find((inc) => inc.slug === params.id);

  const formatDate = (dateStr: string, excludeMinutes = false) =>
    excludeMinutes
      ? dayjs(dateStr).format("YYYY/MM/DD H時")
      : dayjs(dateStr).format("YYYY/MM/DD HH:mm");

  if (!incident) {
    return (
      <main className="flex flex-col justify-center items-center md:p-8 p-4 md:mt-16 mt-4 md:mb-32 mb-16">
        <div className="flex justify-center flex-col items-center">
          <StatusIcon status="unknown" className="size-32" />
          <h1 className="mt-4 font-bold text-2xl text-center">404 Not Found</h1>
          <h2 className="mt-4 font-bold text-center">
            指定された障害レポートが見つかりませんでした。
          </h2>
          <div className="mt-4">
            <Link
              className="text-sm font-bold text-gray-600 flex items-center"
              href="/"
            >
              現在の障害情報
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="flex flex-col justify-center items-center md:p-8 p-4 md:mt-16 mt-4 md:mb-32 mb-16">
      <div className="flex justify-center flex-col items-center">
        <StatusIcon status={incident.incidentImpact} className="size-32" />
        <h1 className="mt-4 font-bold text-2xl text-center whitespace-pre-wrap">
          {incident.title}
        </h1>
        <p className="mt-4 w-full">{incident.description}</p>

        <div className="mt-6 w-full flex">
          <p className="font-bold">推定障害発生日時:</p>
          <p className="ml-2">{formatDate(incident.publishedAt)}</p>
        </div>
        <div className="w-full flex">
          <p className="font-bold">最終更新日時:</p>
          <p className="ml-2">{formatDate(incident.updatedAt)}</p>
        </div>
        <div className="w-full flex">
          <p className="font-bold">復旧日時:</p>
          <p className="ml-2">
            {incident.resolvedAt
              ? formatDate(incident.resolvedAt)
              : `未復旧(${incident.estimatedResolveDate ? `${formatDate(incident.estimatedResolveDate, true)}頃復旧見込み` : "復旧見込みなし"})`}
          </p>
        </div>

        <div className="w-full mt-8">
          <Link
            className="text-sm font-bold text-gray-600 inline-flex items-center"
            href="/"
          >
            <ArrowIcon />
            &nbsp;現在の障害情報
          </Link>
        </div>
      </div>
    </main>
  );
}
