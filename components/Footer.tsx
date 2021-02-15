import Link from 'next/link';
import styles from '../styles/components/Footer.module.css';

const Footer: React.FC = () => {
  return (
    <footer className={styles.root}>
      <Link href="/privacy-policy" passHref>
        <a className={styles.link}>プライバシーポリシー</a>
      </Link>
      <p className={styles.copyright}>Copyright © TinyKitten 2020</p>
    </footer>
  );
};

export default Footer;
