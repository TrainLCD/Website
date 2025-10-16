import type { ComponentChildren } from 'preact';
import styles from './DescriptionText.module.css';

const DescriptionText = ({ children }: { children: ComponentChildren }) => (
  <p className={styles.text}>{children}</p>
);

export default DescriptionText;
