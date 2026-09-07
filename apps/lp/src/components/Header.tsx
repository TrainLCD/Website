import styles from './Header.module.css';
import AppLogo from './AppLogo';
import { ServiceStatus } from './ServiceStatus';

// ページ内セクションへのアンカー。id は各セクションコンポーネント側で定義している
const NAV_ITEMS = [
  { href: '/#features', label: 'できること' },
  { href: '/#portrait', label: '縦画面' },
  { href: '/#tablet', label: 'iPad' },
  { href: '/#wearable', label: 'Watch' },
  { href: '/faq', label: 'よくある質問' },
] as const;

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <a href="/" className={styles.appLink}>
          <AppLogo width={25.26} height={32} />
          <span className={styles.title}>TrainLCD</span>
        </a>
        <nav className={styles.nav} aria-label="サイト内ナビゲーション">
          {NAV_ITEMS.map((item) => (
            <a key={item.href} href={item.href} className={styles.navLink}>
              {item.label}
            </a>
          ))}
        </nav>
        <div className={styles.right}>
          <ServiceStatus />
          <a href="/#download" className={styles.cta}>
            無料でダウンロード
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
