import styles from '../styles/components/Header.module.css';
import TinyKittenIcon from './TinyKittenIcon';
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <div className={styles.title}>
        <a
          href="https://tinykitten.me"
          target="_blank"
          rel="noreferrer noopener"
        >
          <TinyKittenIcon width={32} height={32} />
        </a>
      </div>
    </header>
  );
};

export default Header;
