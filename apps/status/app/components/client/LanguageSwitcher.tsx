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

  const buttonClassName = (target: Locale) =>
    `h-8 rounded-full px-3 text-xs font-bold transition-colors duration-[250ms] ${
      locale === target
        ? 'bg-[#0b1220] text-white'
        : 'text-[#4b5563] hover:text-[#0b1220]'
    } ${isPending || locale === target ? 'cursor-not-allowed' : ''} ${
      isPending && locale !== target ? 'opacity-50' : ''
    }`;

  return (
    <div className="flex items-center rounded-full border border-[#e5e7eb] bg-white p-0.5">
      <button
        onClick={() => handleLocaleChange('ja')}
        disabled={isPending || locale === 'ja'}
        className={buttonClassName('ja')}
        aria-label="Switch to Japanese"
        aria-pressed={locale === 'ja'}
      >
        日本語
      </button>
      <button
        onClick={() => handleLocaleChange('en')}
        disabled={isPending || locale === 'en'}
        className={buttonClassName('en')}
        aria-label="Switch to English"
        aria-pressed={locale === 'en'}
      >
        English
      </button>
    </div>
  );
}
