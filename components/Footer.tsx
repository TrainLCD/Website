import styles from '../styles/components/Footer.module.css';

const Footer: React.FC = () => {
  return (
    <footer className={styles.root}>
      <p className={styles.copyright}>Copyright © TinyKitten 2020</p>
    </footer>
  );
};

export default Footer;
