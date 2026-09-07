import type { ComponentChildren } from 'preact';
import styles from './SectionHeading.module.css';

type Props = {
  /** セクション番号(01, 02, ...) */
  num: string;
  /** 番号の横に添える短いラベル */
  label: string;
  /** 見出し本文。改行は <br /> を含めて渡す */
  children: ComponentChildren;
  /** ダーク背景上に置くときの配色 */
  onDark?: boolean;
  /** 見出しを中央揃えにする */
  center?: boolean;
  /** h2 / h3 を切り替える。トップページの各セクションは h2 */
  level?: 'h2' | 'h3';
};

// 各セクションの先頭に置く番号付き見出し。装飾は番号ラベルと色面のみに留める。
const SectionHeading = ({
  num,
  label,
  children,
  onDark = false,
  center = false,
  level = 'h2',
}: Props) => {
  const Heading = level;
  const classNames = [
    styles.container,
    onDark ? styles.onDark : '',
    center ? styles.center : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classNames}>
      <p className={styles.eyebrow}>
        <span className={styles.num}>{num}</span>
        <span className={styles.label}>{label}</span>
      </p>
      <Heading className={styles.heading}>{children}</Heading>
    </div>
  );
};

export default SectionHeading;
