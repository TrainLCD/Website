import Image from 'next/image';
import styles from '../../styles/components/sections/Download.module.css';
import { isJa } from '../../utils/isJa';

const DownloadSection: React.FC = () => {
  return (
    <div className={styles.root}>
      {isJa && <h1 className={styles.title}>DOWNLOAD</h1>}
      <h2 className={styles.subtitle}>
        {isJa ? 'TrainLCDを使ってみよう' : 'Try TrainLCD'}
      </h2>
      <p className={styles.text}>
        {isJa
          ? 'TrainLCDはiPhone、iPad、Androidスマートフォンに対応しています。'
          : 'TrainLCD is compatible with iPhone, iPad and Android smartphones.'}
        <br />
        {isJa
          ? `早速お使いのスマートフォンで使ってみましょう！`
          : `Let's use it on your smartphone right away!`}
      </p>
      <div className={styles.stores}>
        <a
          className={styles.store}
          href="https://apps.apple.com/jp/app/trainlcd/id1486355943"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            className={styles.mockup}
            src={
              isJa
                ? '/images/store/appstore-jp.svg'
                : '/images/store/appstore-us.svg'
            }
            alt="Mockup"
            width={135}
            height={40}
          />
        </a>
        <a
          className={styles.store}
          href="https://play.google.com/store/apps/details?id=me.tinykitten.trainlcd"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            className={styles.mockup}
            src={
              isJa
                ? '/images/store/google-play-jp.png'
                : '/images/store/google-play-us.png'
            }
            alt="Mockup"
            width={134}
            height={40}
          />
        </a>
      </div>
    </div>
  );
};

export default DownloadSection;
