import styles from '../../styles/components/sections/Download.module.css';
import AppStoreIcon from '../AppStoreIcon';
import GooglePlayIcon from '../GooglePlayIcon';

const DownloadSection: React.FC = () => {
  return (
    <div className={styles.root}>
      <h1 className={styles.title}>DOWNLOAD</h1>
      <h2 className={styles.subtitle}>TrainLCDを使ってみよう</h2>
      <p className={styles.text}>
        TrainLCDはiPhone、iPad、Androidスマートフォンに対応しています。
        <br />
        早速お使いのスマートフォンで使ってみましょう！
      </p>
      <div className={styles.stores}>
        <a
          className={styles.store}
          href="https://apps.apple.com/jp/app/trainlcd/id1486355943"
          target="_blank"
          rel="noopener noreferrer"
        >
          <AppStoreIcon width={135} height={40} />
        </a>
        <a
          className={styles.store}
          href="https://play.google.com/store/apps/details?id=me.tinykitten.trainlcd"
          target="_blank"
          rel="noopener noreferrer"
        >
          <GooglePlayIcon width={135} height={40} />
        </a>
      </div>
    </div>
  );
};

export default DownloadSection;
