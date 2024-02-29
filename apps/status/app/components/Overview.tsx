import { statusLabel } from "data";
import { StatusIcon } from "./Icon";

export const Overview = () => {
  const statusObj = (() => {
    switch (statusLabel) {
      case "maintenance":
        return {
          text: "TrainLCDサービスは\n現在メンテナンス中です",
          Icon: <StatusIcon status="maintenance" className="size-32" />,
        };
      case "degraded":
        return {
          text: "TrainLCDサービスの一部にて\n障害が発生しております",
          Icon: <StatusIcon status="degraded" className="size-32" />,
        };
      case "outage":
        return {
          text: "TrainLCDサービスにて\n致命的な障害が発生しております",
          Icon: <StatusIcon status="outage" className="size-32" />,
        };
      case "operational":
        return {
          text: "すべてのサービスは\n正常に動作しています",
          Icon: <StatusIcon status="operational" className="size-32" />,
        };
      default:
        return null;
    }
  })();

  if (!statusObj) {
    return null;
  }

  const { Icon, text } = statusObj;

  return (
    <div className="flex justify-center flex-col items-center">
      {Icon}
      <h1 className="mt-4 font-bold text-2xl text-center whitespace-pre-wrap">
        {text}
      </h1>
    </div>
  );
};
