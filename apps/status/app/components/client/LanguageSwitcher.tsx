'use client';

import { useState, useTransition } from 'react';
import type { Locale } from '../../server/lib/locale';

type LanguageSwitcherProps = {
  currentLocale: Locale;
};

export default function LanguageSwitcher({ currentLocale }: LanguageSwitcherProps) {
  const [locale, setLocale] = useState<Locale>(currentLocale);
  const [isPending, startTransition] = useTransition();

  const handleLocaleChange = (newLocale: Locale) => {
    setLocale(newLocale);
    startTransition(async () => {
      // Set cookie and reload page to apply new locale
      try {
        const response = await fetch('/api/locale', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ locale: newLocale }),
        });
        if (!response.ok) {
          // Revert the optimistic state update
          setLocale(currentLocale);
          console.error('Failed to set locale');
          return;
        }
        // Reload to apply new locale from server-side
        window.location.reload();
      } catch (error) {
        // Revert the optimistic state update
        setLocale(currentLocale);
        console.error('Failed to set locale:', error);
      }
    });
  };

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => handleLocaleChange('ja')}
        disabled={isPending}
        className={`px-3 py-1 text-sm font-medium rounded transition-colors ${
          locale === 'ja'
            ? 'bg-neutral-800 text-white'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        } ${isPending ? 'opacity-50 cursor-not-allowed' : ''}`}
        aria-label="Switch to Japanese"
      >
        日本語
      </button>
      <button
        onClick={() => handleLocaleChange('en')}
        disabled={isPending}
        className={`px-3 py-1 text-sm font-medium rounded transition-colors ${
          locale === 'en'
            ? 'bg-neutral-800 text-white'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        } ${isPending ? 'opacity-50 cursor-not-allowed' : ''}`}
        aria-label="Switch to English"
      >
        English
      </button>
    </div>
  );
}
