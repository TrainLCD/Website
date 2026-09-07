import styles from './Footer.module.css';
import AppLogo from './AppLogo';
import DiscordLogo from './DiscordLogo';
import TinyKittenProduct from './TinyKittenProduct';
import TwitterLogo from './TwitterLogo';

type FooterLink = {
  href: string;
  label: string;
  external?: boolean;
};

type FooterColumn = {
  heading: string;
  links: FooterLink[];
};

const COLUMNS: FooterColumn[] = [
  {
    heading: 'プロダクト',
    links: [
      { href: '/#features', label: 'できること' },
      { href: '/#portrait', label: 'ポートレートモード' },
      { href: '/#tablet', label: 'iPad' },
      { href: '/#wearable', label: 'スマートウォッチ' },
      { href: '/faq', label: 'よくある質問' },
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
      { href: 'https://x.com/trainlcd', label: 'X (旧Twitter)', external: true },
      {
        href: 'https://status.trainlcd.app',
        label: '障害情報',
        external: true,
      },
    ],
  },
  {
    heading: 'ポリシー',
    links: [
      { href: '/privacy-policy', label: 'プライバシーポリシー' },
      { href: '/privacy-policy-en', label: 'Privacy Policy (English)' },
      {
        href: 'https://tinykitten.me',
        label: '開発者のポートフォリオ',
        external: true,
      },
    ],
  },
];

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.container}>
      <div className={styles.inner}>
        <div className={styles.top}>
          <div className={styles.brand}>
            <div className={styles.appInfo}>
              <AppLogo className={styles.appLogo} />
              <p className={styles.appName}>TrainLCD</p>
            </div>
            <p className={styles.description}>
              今までにありそうでなかった、
              <br />
              あなたのスマートフォンで使えるトレインビジョン。
            </p>
            <div className={styles.socialList}>
              <a
                href="https://x.com/trainlcd"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X(旧Twitter)で@trainlcdをフォロー"
                className={styles.socialLink}
              >
                <TwitterLogo className={styles.twitterIcon} />
              </a>
              <a
                href="https://discord.gg/tsemdME9Nz"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Discordサーバーへ参加"
                className={styles.socialLink}
              >
                <DiscordLogo className={styles.discordIcon} />
              </a>
            </div>
          </div>
          <div className={styles.columns}>
            {COLUMNS.map((column) => (
              <div key={column.heading} className={styles.column}>
                <p className={styles.columnHeading}>{column.heading}</p>
                {column.links.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className={styles.link}
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
        <div className={styles.divider} />
        <div className={styles.bottom}>
          <p className={styles.copyright}>
            © 2019-{currentYear} TinyKitten(Tsubasa SEKIGUCHI)
            <br />
            and the Volunteer TrainLCD development team.
          </p>
          <a
            href="https://tinykitten.me"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="開発者のポートフォリオ"
            className={styles.productLink}
          >
            <TinyKittenProduct />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
