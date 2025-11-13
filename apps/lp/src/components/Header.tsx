import styles from './Header.module.css';
import AppLogo from './AppLogo';
import { ServiceStatus } from './ServiceStatus';

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.appInfoContainer}>
        <a href="/" className={styles.appLink}>
          <AppLogo width={25.26} height={32} />
          <span className={styles.title}>TrainLCD</span>
        </a>
      </div>
      <nav className={styles.nav}>
        <a href="/faq" className={styles.faqButton}>
          FAQ
        </a>
      </nav>
      <ServiceStatus />
    </header>
  );
};

export default Header;
