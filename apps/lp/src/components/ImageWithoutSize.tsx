import type { JSX } from 'preact';
import type { ImageMetadata } from 'astro';
import styles from './ImageWithoutSize.module.css';

type Props = JSX.IntrinsicElements['img'] & {
  src: string | ImageMetadata;
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
