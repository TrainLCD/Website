import { statusLabel } from "data";
import { StatusIcon } from "./StatusIcon";
import type { Locale } from "@utils/locale";

type Props = {
  locale: Locale;
};

const texts = {
  ja: {
    partiallyMaintenance: "TrainLCDサービスの一部は\n現在メンテナンス中です",
    maintenance: "TrainLCDサービスは\n現在メンテナンス中です",
    partiallyDegraded: "TrainLCDサービスの一部にて\n障害が発生しております",
    degraded: "TrainLCDサービスにて\n障害が発生しております",
    outage: "TrainLCDサービスにて\n致命的な障害が発生しております",
    operational: "すべてのサービスは\n正常に動作しています",
  },
  en: {
    partiallyMaintenance: "Some TrainLCD services\nare under maintenance.",
    maintenance: "All TrainLCD services\nare under maintenance.",
    partiallyDegraded: "Issues are affecting\na subset of TrainLCD services.",
    degraded: "Issues are affecting\nTrainLCD services.",
    outage: "Critical outages\nare occurring on TrainLCD.",
    operational: "All services are\noperating normally.",
  },
} as const;

const Overview = ({ locale }: Props) => {
  const message = (() => {
    switch (statusLabel) {
      case "partiallyMaintenance":
        return {
          text: texts[locale].partiallyMaintenance,
          status: "maintenance" as const,
        };
      case "maintenance":
        return {
          text: texts[locale].maintenance,
          status: "maintenance" as const,
        };
      case "partiallyDegraded":
        return {
          text: texts[locale].partiallyDegraded,
          status: "degraded" as const,
        };
      case "degraded":
        return { text: texts[locale].degraded, status: "degraded" as const };
      case "outage":
        return { text: texts[locale].outage, status: "outage" as const };
      case "operational":
        return {
          text: texts[locale].operational,
          status: "operational" as const,
        };
      default:
        return null;
    }
  })();

  if (!message) {
    return null;
  }

  return (
    <div className="flex justify-center flex-col items-center">
      <StatusIcon status={message.status} className="h-32 w-32" />
      <h1 className="mt-4 font-bold text-2xl text-center whitespace-pre-wrap">
        {message.text}
      </h1>
    </div>
  );
};

export default Overview;
