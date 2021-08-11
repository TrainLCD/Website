import Link from 'next/link';
import styles from '../styles/components/Footer.module.css';
import { isJa } from '../utils/isJa';

const Footer: React.FC = () => {
  return (
    <footer className={styles.root}>
      <a
        href="https://twitter.com/TrainLCD"
        rel="noreferrer noopener"
        className={[styles.link, styles.bold].join(' ')}
      >
        {isJa ? '公式Twitter' : 'Twitter(Japanese only)'}
      </a>

      <Link href={isJa ? '/privacy-policy' : '/privacy-policy-en'} passHref>
        <a className={styles.link}>
          {isJa ? 'プライバシーポリシー' : 'Privacy Policy'}
        </a>
      </Link>
      <p className={styles.copyright}>Copyright © TinyKitten 2021</p>
    </footer>
  );
};

export default Footer;
