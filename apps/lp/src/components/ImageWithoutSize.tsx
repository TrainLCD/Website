import type { JSX } from 'preact';
import styles from './ImageWithoutSize.module.css';

type AstroImageImport = {
  src: string;
  width?: number;
  height?: number;
  format?: string;
};

type Props = JSX.IntrinsicElements['img'] & {
  src: string | AstroImageImport;
};

const resolveSrc = (src: Props['src']) => (typeof src === 'string' ? src : src.src);

const ImageWithoutSize = ({
  loading = 'lazy',
  decoding = 'async',
  src,
  className,
  ...rest
}: Props) => (
  <img
    loading={loading}
    decoding={decoding}
    src={resolveSrc(src)}
    className={className ? `${styles.image} ${className}` : styles.image}
    {...rest}
  />
);

export default ImageWithoutSize;
