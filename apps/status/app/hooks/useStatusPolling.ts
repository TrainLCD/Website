'use client';

import { useEffect, useRef, useState } from 'react';
import type { StatusType, Service, IncidentHistory } from '../server/types';
import type { Locale } from '../server/lib/locale';

export type StatusData = {
  statusLabel: StatusType;
  services: Service[];
  incidents: IncidentHistory[];
};

// ステータスページは更新が稀なので、軽量なポーリングで十分。
// 読み取りは Edge Config から返るため低コスト。
const POLL_INTERVAL_MS = 30_000; // 30 秒

/**
 * `/api/status/snapshot` を定期ポーリングして最新ステータスを取得する。
 * - タブが非表示の間はポーリングを止め、表示に戻った時点で即時更新する。
 * - locale をクエリに渡し、ページの言語と一致したスナップショットを取得する。
 */
export function useStatusPolling(
  initialData: StatusData,
  locale: Locale
): { data: StatusData } {
  const [data, setData] = useState<StatusData>(initialData);

  // 最新の initialData を保持（SSR からの再ハイドレートに追従）
  useEffect(() => {
    setData(initialData);
  }, [initialData]);

  // 古い fetch のレスポンスで新しい状態を上書きしないための世代カウンタ
  const requestSeq = useRef(0);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    let cancelled = false;
    const endpoint = `/api/status/snapshot?locale=${locale}`;

    const poll = async () => {
      if (document.visibilityState === 'hidden') {
        return;
      }
      const seq = ++requestSeq.current;
      try {
        const res = await fetch(endpoint, {
          headers: { Accept: 'application/json' },
          cache: 'no-store',
        });
        if (!res.ok) {
          return;
        }
        const next = (await res.json()) as StatusData;
        // このリクエストより新しいものが既に走っていれば破棄
        if (!cancelled && seq === requestSeq.current) {
          setData(next);
        }
      } catch {
        // 一時的なエラーは無視（次のティックで再試行）
      }
    };

    const intervalId = window.setInterval(poll, POLL_INTERVAL_MS);

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        void poll();
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      cancelled = true;
      window.clearInterval(intervalId);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [locale]);

  return { data };
}
