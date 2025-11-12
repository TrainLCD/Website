import { useEffect, useState } from 'preact/hooks';
import type { StatusType } from 'data';
import styles from './ServiceStatus.module.css';
import { ErrorIcon } from './icons/Error';
import { WarningIcon } from './icons/Warning';

const statusColorMap = {
  operational: '#22c55e',
  partiallyMaintenance: '#eab308',
  maintenance: '#eab308',
  partiallyDegraded: '#eab308',
  degraded: '#eab308',
  outage: '#ef4444',
  unknown: '#ef4444',
} as const;

const statusText = {
  operational: '異常なし',
  partiallyMaintenance: '支障あり',
  maintenance: 'メンテナンス中',
  partiallyDegraded: '支障あり',
  degraded: '支障あり',
  outage: '障害発生中',
  unknown: '調査中',
} as const;

type Snapshot = {
  statusLabel: StatusType;
};

export const ServiceStatus = () => {
  const [statusLabel, setStatusLabel] = useState<StatusType | null>(null);

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const response = await fetch(
          'https://status.trainlcd.app/api/status/snapshot',
          { cache: 'no-store' }
        );
        if (!response.ok) {
          throw new Error('Failed to fetch status');
        }
        const data: Snapshot = await response.json();
        setStatusLabel(data.statusLabel);
      } catch (error) {
        console.error('Error fetching service status:', error);
        setStatusLabel('unknown');
      }
    };

    fetchStatus();
  }, []);

  // Don't render until we have fetched the status
  if (statusLabel === null) {
    return null;
  }

  const StatusIcon = () => {
    switch (statusLabel) {
      case 'operational':
        return <span className={styles.indicator} />;
      case 'maintenance':
      case 'partiallyMaintenance':
      case 'degraded':
      case 'partiallyDegraded':
        return <WarningIcon color={statusColorMap.maintenance} />;
      case 'outage':
        return <ErrorIcon color={statusColorMap.outage} />;
      case 'unknown':
        return <ErrorIcon color={statusColorMap.unknown} />;
      default:
        return null;
    }
  };

  return (
    <a
      className={styles.container}
      href="https://status.trainlcd.app"
      rel="noopener noreferrer"
      target="_blank"
    >
      <span className={styles.label}>障害情報</span>
      <span className={styles.status}>
        <StatusIcon />
        <span className={styles.statusText}>{statusText[statusLabel]}</span>
      </span>
    </a>
  );
};
