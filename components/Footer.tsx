import Link from 'next/link';
import styles from '../styles/components/Footer.module.css';
import { isJa } from '../utils/isJa';

const Footer: React.FC = () => {
  return (
    <footer className={styles.root}>
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
