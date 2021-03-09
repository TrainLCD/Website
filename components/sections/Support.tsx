import styles from '../../styles/components/sections/Support.module.css';
import { isJa } from '../../utils/isJa';

const SupportSection: React.FC = () => {
  return (
    <div className={styles.root}>
      {isJa && <h1 className={styles.title}>SUPPORT</h1>}
      <h2 className={styles.subtitle}>
        {isJa ? 'サポートが必要ですか？' : 'Need support?'}
      </h2>
      <p className={styles.text}>
        {isJa
          ? 'TrainLCDのサービスなどにお気づきの点があった場合、ご気軽にご連絡ください。'
          : 'If you have any questions about TrainLCD, please feel free to contact us.'}
      </p>

      <div className={styles.buttonContainer}>
        <a
          href="https://forms.gle/bWvwyincJpz76GK86"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.button}
        >
          {isJa ? 'サポートに連絡する' : 'Contact support'}
        </a>
      </div>
    </div>
  );
};

export default SupportSection;
