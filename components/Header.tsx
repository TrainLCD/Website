import styles from '../styles/components/Header.module.css';
import Link from 'next/link';
import TinyKittenIcon from './TinyKittenIcon';
import React from 'react';

const ForwardedIcon = React.forwardRef<HTMLAnchorElement>((props, ref) => (
  <a {...props} ref={ref}>
    <TinyKittenIcon width={32} height={32} />
  </a>
));

ForwardedIcon.displayName = 'TinyKiten';

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <div className={styles.title}>
        <Link href="/" passHref>
          <ForwardedIcon />
        </Link>
      </div>
    </header>
  );
};

export default Header;
