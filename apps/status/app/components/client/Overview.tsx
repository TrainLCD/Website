'use client';

import type { StatusType } from '@/server/types';
import { StatusIcon } from '../StatusIcon';

type OverviewProps = {
  statusLabel: StatusType;
};

export default function Overview({ statusLabel }: OverviewProps) {
  const statusObj = (() => {
    switch (statusLabel) {
      case 'partiallyMaintenance':
        return {
          text: 'TrainLCDサービスの一部は\n現在メンテナンス中です',
          status: 'maintenance' as const,
        };
      case 'maintenance':
        return {
          text: 'TrainLCDサービスは\n現在メンテナンス中です',
          status: 'maintenance' as const,
        };
      case 'partiallyDegraded':
        return {
          text: 'TrainLCDサービスの一部にて\n障害が発生しております',
          status: 'degraded' as const,
        };
      case 'degraded':
        return {
          text: 'TrainLCDサービスにて\n障害が発生しております',
          status: 'degraded' as const,
        };
      case 'outage':
        return {
          text: 'TrainLCDサービスにて\n致命的な障害が発生しております',
          status: 'outage' as const,
        };
      case 'operational':
        return {
          text: 'すべてのサービスは\n正常に動作しています',
          status: 'operational' as const,
        };
      default:
        return null;
    }
  })();

  if (!statusObj) {
    return null;
  }

  return (
    <div className="flex justify-center flex-col items-center">
      <StatusIcon status={statusObj.status} className="h-32 w-32" />
      <h1 className="mt-4 font-bold text-2xl text-center whitespace-pre-wrap">
        {statusObj.text}
      </h1>
    </div>
  );
}
