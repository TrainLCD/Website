import type { JSX } from 'preact';
import styles from './ButtonLink.module.css';

type Props = JSX.IntrinsicElements['a'];

const ButtonLink = ({ className, ...rest }: Props) => (
  <a
    className={className ? `${styles.link} ${className}` : styles.link}
    {...rest}
  />
);

export default ButtonLink;
