import {
  hasDegradedService,
  hasOutage,
  hasUnderMaintenanceService,
} from "../utils/availability";
import { StatusIcon } from "./Icon";

export const Overview = () => {
  const statusObj = (() => {
    if (hasUnderMaintenanceService) {
      return {
        text: "TrainLCDサービスは現在メンテナンス中です",
        Icon: <StatusIcon status="maintenance" className="size-32" />,
      };
    }
    if (hasDegradedService) {
      return {
        text: "TrainLCDサービスの一部にて障害が発生しております",
        Icon: <StatusIcon status="degraded" className="size-32" />,
      };
    }
    if (hasOutage) {
      return {
        text: "TrainLCDサービスにて致命的な障害が発生しております",
        Icon: <StatusIcon status="outage" className="size-32" />,
      };
    }
    return {
      text: "すべてのサービスは正常に動作しています",
      Icon: <StatusIcon status="operational" className="size-32" />,
    };
  })();

  const { Icon } = statusObj;

  return (
    <div className="flex justify-center flex-col items-center">
      {Icon}
      <h1 className="mt-4 font-bold text-2xl text-center">{statusObj.text}</h1>
    </div>
  );
};
