import type { Locale } from './locale';
import type { StatusType, LocaleText } from '../types';

/**
 * Gets the localized text from a LocaleText object
 */
export function getLocalizedText(text: LocaleText, locale: Locale): string {
  return text[locale];
}

/**
 * Gets the localized status label for a given status type
 */
export function getStatusLabel(status: StatusType, locale: Locale): string {
  const labels: Record<StatusType, LocaleText> = {
    operational: { ja: '正常', en: 'Operational' },
    maintenance: { ja: 'メンテナンス', en: 'Maintenance' },
    partiallyMaintenance: { ja: '一部メンテナンス', en: 'Partial Maintenance' },
    degraded: { ja: '性能低下', en: 'Degraded' },
    partiallyDegraded: { ja: '一部性能低下', en: 'Partially Degraded' },
    outage: { ja: '障害', en: 'Outage' },
    unknown: { ja: '不明', en: 'Unknown' },
  };

  return labels[status][locale];
}

/**
 * Gets the localized overview status message
 */
export function getOverviewStatusMessage(status: StatusType, locale: Locale): string {
  const messages: Record<StatusType, LocaleText> = {
    partiallyMaintenance: {
      ja: 'TrainLCDサービスの一部は\n現在メンテナンス中です',
      en: 'Some TrainLCD services are\ncurrently under maintenance',
    },
    maintenance: {
      ja: 'TrainLCDサービスは\n現在メンテナンス中です',
      en: 'TrainLCD services are\ncurrently under maintenance',
    },
    partiallyDegraded: {
      ja: 'TrainLCDサービスの一部にて\n障害が発生しております',
      en: 'Some TrainLCD services are\nexperiencing issues',
    },
    degraded: {
      ja: 'TrainLCDサービスにて\n障害が発生しております',
      en: 'TrainLCD services are\nexperiencing issues',
    },
    outage: {
      ja: 'TrainLCDサービスにて\n致命的な障害が発生しております',
      en: 'TrainLCD services are\nexperiencing a major outage',
    },
    operational: {
      ja: 'すべてのサービスは\n正常に動作しています',
      en: 'All services are\noperating normally',
    },
    unknown: {
      ja: 'ステータス不明',
      en: 'Status unknown',
    },
  };

  return messages[status][locale];
}
