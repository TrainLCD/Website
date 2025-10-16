import styles from './NumberBox.module.css';

type Props = {
  preText: string;
  num: number;
  afterText: string;
  en: boolean;
};

const NumberBox = ({ preText, num, afterText, en }: Props) => (
  <div className={styles.container}>
    <div className={styles.top}>
      <p className={`${styles.preText} ${en ? styles.preTextEn : styles.preTextJa}`}>
        {preText}
      </p>
      <p className={styles.num}>{num.toLocaleString()}</p>
    </div>
    <div className={styles.afterTextContainer}>
      <p className={styles.afterText}>{afterText}</p>
    </div>
  </div>
);

export default NumberBox;
