'use client';

import type { StatusType } from '@/server/types';
import type { Locale } from '@/server/lib/locale';
import { StatusIcon } from '../StatusIcon';

type OverviewProps = {
  statusLabel: StatusType;
  locale: Locale;
};

export default function Overview({ statusLabel, locale }: OverviewProps) {
  const statusObj = (() => {
    const messages = {
      partiallyMaintenance: {
        ja: 'TrainLCDサービスの一部は\n現在メンテナンス中です',
        en: 'Some TrainLCD services are\ncurrently under maintenance',
        status: 'maintenance' as const,
      },
      maintenance: {
        ja: 'TrainLCDサービスは\n現在メンテナンス中です',
        en: 'TrainLCD services are\ncurrently under maintenance',
        status: 'maintenance' as const,
      },
      partiallyDegraded: {
        ja: 'TrainLCDサービスの一部にて\n障害が発生しております',
        en: 'Some TrainLCD services are\nexperiencing issues',
        status: 'degraded' as const,
      },
      degraded: {
        ja: 'TrainLCDサービスにて\n障害が発生しております',
        en: 'TrainLCD services are\nexperiencing issues',
        status: 'degraded' as const,
      },
      outage: {
        ja: 'TrainLCDサービスにて\n致命的な障害が発生しております',
        en: 'TrainLCD services are\nexperiencing a major outage',
        status: 'outage' as const,
      },
      operational: {
        ja: 'すべてのサービスは\n正常に動作しています',
        en: 'All services are\noperating normally',
        status: 'operational' as const,
      },
    };

    const message = messages[statusLabel as keyof typeof messages];
    if (!message) {
      return null;
    }

    return {
      text: message[locale],
      status: message.status,
    };
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
