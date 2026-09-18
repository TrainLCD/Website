import Link from 'next/link';
import AppLogo from './AppLogo';
import LanguageSwitcher from './client/LanguageSwitcher';
import type { Locale } from '../server/lib/locale';

// LP(apps/lp/src/components/Header.tsx)と同じ見た目・構成のヘッダー。
// ステータスページは別ドメインで配信されるため、LP 内のリンクは絶対 URL で指定する。

const LP_ORIGIN = 'https://trainlcd.app';

const NAV_ITEMS: Record<Locale, { href: string; label: string }[]> = {
  ja: [
    { href: `${LP_ORIGIN}/#features`, label: 'できること' },
    { href: `${LP_ORIGIN}/#portrait`, label: '縦画面' },
    { href: `${LP_ORIGIN}/#tablet`, label: 'iPad' },
    { href: `${LP_ORIGIN}/#wearable`, label: 'Watch' },
    { href: `${LP_ORIGIN}/faq`, label: 'よくある質問' },
  ],
  en: [
    { href: `${LP_ORIGIN}/#features`, label: 'Features' },
    { href: `${LP_ORIGIN}/#portrait`, label: 'Portrait' },
    { href: `${LP_ORIGIN}/#tablet`, label: 'iPad' },
    { href: `${LP_ORIGIN}/#wearable`, label: 'Watch' },
    { href: `${LP_ORIGIN}/faq`, label: 'FAQ' },
  ],
};

const CTA_LABEL: Record<Locale, string> = {
  ja: '無料でダウンロード',
  en: 'Download for free',
};

const NAV_ARIA_LABEL: Record<Locale, string> = {
  ja: 'サイト内ナビゲーション',
  en: 'Site navigation',
};

type HeaderProps = {
  locale: Locale;
};

const Header = ({ locale }: HeaderProps) => {
  return (
    <header className="sticky top-0 z-50 flex h-16 w-full items-center border-b border-[#e5e7eb] bg-white/[0.88] px-6 backdrop-blur-md md:px-16">
      <div className="mx-auto flex w-full max-w-[1200px] items-center gap-3 md:gap-6">
        <Link className="inline-flex shrink-0 items-center" href="/">
          <AppLogo className="h-8 w-auto" />
          {/* 320px 幅では言語切替と並ばないため、ワードマークはロゴのみにする */}
          <span className="ml-2 hidden text-lg font-bold tracking-[-0.01em] text-[#0b1220] min-[480px]:inline">
            TrainLCD
          </span>
          <span className="ml-2 text-lg font-medium min-[480px]:ml-1.5 tracking-[-0.01em] text-[#64748b]">
            Status
          </span>
        </Link>
        <nav
          className="ml-auto hidden items-center gap-7 lg:flex"
          aria-label={NAV_ARIA_LABEL[locale]}
        >
          {NAV_ITEMS[locale].map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-[0.9375rem] font-medium text-[#4b5563] no-underline transition-colors duration-[250ms] hover:text-[#0b1220]"
            >
              {item.label}
            </a>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-3 lg:ml-0">
          <LanguageSwitcher currentLocale={locale} />
          <a
            href={`${LP_ORIGIN}/#download`}
            className="hidden h-10 items-center whitespace-nowrap rounded-full bg-[#008ffe] px-5 text-sm font-bold text-white no-underline transition duration-[250ms] hover:brightness-110 md:inline-flex"
          >
            {CTA_LABEL[locale]}
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
