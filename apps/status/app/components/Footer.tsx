import AppLogo from './AppLogo';
import TinyKittenProduct from './TinyKittenProduct';
import { DiscordIcon } from './icons/Discord';
import { XIcon } from './icons/X';
import type { Locale } from '../server/lib/locale';

// LP(apps/lp/src/components/Footer.tsx)と同じ見た目・構成のフッター。
// ステータスページは別ドメインで配信されるため、LP 内のリンクは絶対 URL で指定する。

const LP_ORIGIN = 'https://trainlcd.app';

type FooterLink = {
  href: string;
  label: string;
  external?: boolean;
};

type FooterColumn = {
  heading: string;
  links: FooterLink[];
};

const COLUMNS: Record<Locale, FooterColumn[]> = {
  ja: [
    {
      heading: 'プロダクト',
      links: [
        { href: `${LP_ORIGIN}/#features`, label: 'できること' },
        { href: `${LP_ORIGIN}/#portrait`, label: 'ポートレートモード' },
        { href: `${LP_ORIGIN}/#tablet`, label: 'iPad' },
        { href: `${LP_ORIGIN}/#wearable`, label: 'スマートウォッチ' },
        { href: `${LP_ORIGIN}/faq`, label: 'よくある質問' },
      ],
    },
    {
      heading: 'コミュニティ',
      links: [
        {
          href: 'https://github.com/TrainLCD/MobileApp',
          label: 'GitHub',
          external: true,
        },
        {
          href: 'https://discord.gg/tsemdME9Nz',
          label: 'Discord',
          external: true,
        },
        {
          href: 'https://x.com/trainlcd',
          label: 'X (旧Twitter)',
          external: true,
        },
        { href: '/', label: '障害情報' },
      ],
    },
    {
      heading: 'ポリシー',
      links: [
        { href: `${LP_ORIGIN}/privacy-policy`, label: 'プライバシーポリシー' },
        {
          href: `${LP_ORIGIN}/privacy-policy-en`,
          label: 'Privacy Policy (English)',
        },
        {
          href: 'https://tinykitten.me',
          label: '開発者のポートフォリオ',
          external: true,
        },
      ],
    },
  ],
  en: [
    {
      heading: 'Product',
      links: [
        { href: `${LP_ORIGIN}/#features`, label: 'Features' },
        { href: `${LP_ORIGIN}/#portrait`, label: 'Portrait mode' },
        { href: `${LP_ORIGIN}/#tablet`, label: 'iPad' },
        { href: `${LP_ORIGIN}/#wearable`, label: 'Smartwatch' },
        { href: `${LP_ORIGIN}/faq`, label: 'FAQ' },
      ],
    },
    {
      heading: 'Community',
      links: [
        {
          href: 'https://github.com/TrainLCD/MobileApp',
          label: 'GitHub',
          external: true,
        },
        {
          href: 'https://discord.gg/tsemdME9Nz',
          label: 'Discord',
          external: true,
        },
        {
          href: 'https://x.com/trainlcd',
          label: 'X (formerly Twitter)',
          external: true,
        },
        { href: '/', label: 'Service status' },
      ],
    },
    {
      heading: 'Policies',
      links: [
        { href: `${LP_ORIGIN}/privacy-policy-en`, label: 'Privacy Policy' },
        {
          href: `${LP_ORIGIN}/privacy-policy`,
          label: 'プライバシーポリシー (日本語)',
        },
        {
          href: 'https://tinykitten.me',
          label: "Developer's portfolio",
          external: true,
        },
      ],
    },
  ],
};

const TEXT: Record<
  Locale,
  { tagline: string; followX: string; joinDiscord: string; portfolio: string }
> = {
  ja: {
    tagline: '電車のあの画面、持ち歩けます。',
    followX: 'X(旧Twitter)で@trainlcdをフォロー',
    joinDiscord: 'Discordサーバーへ参加',
    portfolio: '開発者のポートフォリオ',
  },
  en: {
    tagline: 'Carry that train screen with you.',
    followX: 'Follow @trainlcd on X (formerly Twitter)',
    joinDiscord: 'Join our Discord server',
    portfolio: "Developer's portfolio",
  },
};

type FooterProps = {
  locale: Locale;
};

const Footer = ({ locale }: FooterProps) => {
  const currentYear = new Date().getFullYear();
  const text = TEXT[locale];

  return (
    <footer className="relative z-[1] mt-auto w-full border-t border-[#e5e7eb] bg-[#f5f7fa] px-6 py-10 md:px-16 md:py-14">
      <div className="mx-auto max-w-[1200px]">
        <div className="flex flex-col gap-10 md:flex-row md:justify-between md:gap-16">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2.5">
              <AppLogo className="h-8 w-auto" />
              <p className="text-[1.375rem] font-bold leading-none text-[#0b1220]">
                TrainLCD
              </p>
            </div>
            <p className="max-w-[420px] text-[0.8125rem] leading-[1.7] text-[#64748b]">
              {text.tagline}
            </p>
            {/* 各ロゴは白で描画するので、ライト背景ではネイビーのチップに載せる */}
            <div className="flex gap-4">
              <a
                href="https://x.com/trainlcd"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={text.followX}
                className="inline-flex items-center justify-center rounded-full bg-[#0b1220] px-3 py-2 text-white opacity-[0.85] transition duration-[250ms] hover:opacity-100"
              >
                <XIcon className="h-5 w-5" />
              </a>
              <a
                href="https://discord.gg/tsemdME9Nz"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={text.joinDiscord}
                className="inline-flex items-center justify-center rounded-full bg-[#0b1220] px-3 py-2 text-white opacity-[0.85] transition duration-[250ms] hover:opacity-100"
              >
                <DiscordIcon className="h-5 w-5" />
              </a>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-x-6 gap-y-8 md:flex md:gap-16">
            {COLUMNS[locale].map((column) => (
              <div key={column.heading} className="flex flex-col gap-3">
                <p className="text-[0.8125rem] font-bold tracking-[0.1em] text-[#0b1220]">
                  {column.heading}
                </p>
                {column.links.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="text-sm text-[#4b5563] no-underline transition-colors duration-[250ms] hover:text-[#0b1220]"
                    {...(link.external
                      ? { target: '_blank', rel: 'noopener noreferrer' }
                      : {})}
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            ))}
          </div>
        </div>
        <div className="mb-6 mt-8 h-px w-full bg-[#e5e7eb]" />
        <div className="flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
          <p className="text-xs leading-normal text-[#64748b]">
            © 2019-{currentYear} TinyKitten(Tsubasa SEKIGUCHI)
            <br />
            and the Volunteer TrainLCD development team.
          </p>
          {/* TinyKitten バナーは currentColor で描画されるので、ネイビーを指定する */}
          <a
            href="https://tinykitten.me"
            target="_blank"
            rel="noopener noreferrer"
            aria-label={text.portfolio}
            className="inline-flex items-center text-[#0b1220] opacity-[0.85] transition duration-[250ms] hover:opacity-100"
          >
            <TinyKittenProduct className="h-[31.5px] w-auto" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
