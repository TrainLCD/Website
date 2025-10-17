import styles from './Footer.module.css';
import AppLogo from './AppLogo';
import DiscordLogo from './DiscordLogo';
import TinyKittenProduct from './TinyKittenProduct';
import TwitterLogo from './TwitterLogo';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.container}>
      <div className={styles.appInfo}>
        <AppLogo className={styles.appLogo} />
        <div className={styles.appInfoText}>
          <p className={styles.description}>
            日本全国の鉄道路線で使える 新感覚ナビゲーションアプリ
          </p>
          <p className={styles.appName}>TrainLCD</p>
        </div>
      </div>
      <div className={styles.divider} />
      <div className={styles.bottom}>
        <div>
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
              href="https://discord.gg/jbVE7tj9SE"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Discordサーバーへ参加"
              className={styles.socialLink}
            >
              <DiscordLogo className={styles.discordIcon} />
            </a>
          </div>
          <div className={styles.linkList}>
            <a
              href="https://status.trainlcd.app"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.link}
            >
              障害情報
            </a>
            <a
              href="https://tinykitten.me"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.link}
            >
              開発者のポートフォリオ
            </a>
            <a href="/privacy-policy" className={styles.link}>
              プライバシーポリシー
            </a>
            <a href="/privacy-policy-en" className={styles.link}>
              Privacy Policy(English)
            </a>
          </div>
        </div>
        <div className={styles.bottomRight}>
          <a
            href="https://tinykitten.me"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.socialLink}
          >
            <TinyKittenProduct />
          </a>
          <p className={styles.copyright}>
            © 2019-{currentYear} TinyKitten(Tsubasa SEKIGUCHI)
            <br />
            and the Volunteer TrainLCD development team.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
