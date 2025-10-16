import type { ComponentChildren, JSX } from 'preact';
import styles from './Button.module.css';

type Props = {
  color?: string;
  children: ComponentChildren;
  className?: string;
  onClick?: JSX.MouseEventHandler<HTMLButtonElement>;
};

const Button = ({ color, children, className, onClick }: Props) => {
  return (
    <button
      type="button"
      style={{ backgroundColor: color || '#008ffe' }}
      className={className ? `${styles.button} ${className}` : styles.button}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
