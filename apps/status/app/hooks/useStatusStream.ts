'use client';

import { useEffect, useState } from 'react';
import type { StatusType, Service, IncidentHistory } from '../server/types';

export type StatusData = {
  statusLabel: StatusType;
  services: Service[];
  incidents: IncidentHistory[];
};

export function useStatusStream(initialData: StatusData) {
  const [data, setData] = useState<StatusData>(initialData);
  const [isConnected, setIsConnected] = useState(false);

  // Update data if initialData changes (e.g., after navigation)
  useEffect(() => {
    setData(initialData);
  }, [initialData]);

  useEffect(() => {
    // Only use SSE in the browser
    if (typeof window === 'undefined') {
      return;
    }

    let eventSource: EventSource | null = null;

    try {
      eventSource = new EventSource('/api/status/stream');

      eventSource.onopen = () => {
        setIsConnected(true);
      };

      eventSource.onmessage = (event) => {
        try {
          const newData = JSON.parse(event.data) as StatusData;
          setData(newData);
        } catch (error) {
          console.error('Failed to parse SSE data:', error);
        }
      };

      eventSource.onerror = () => {
        setIsConnected(false);
        eventSource?.close();
      };
    } catch (error) {
      console.error('Failed to create EventSource:', error);
      setIsConnected(false);
    }

    return () => {
      if (eventSource) {
        eventSource.close();
      }
    };
  }, []);

  return { data, isConnected };
}
