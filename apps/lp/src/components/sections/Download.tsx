import styles from './Download.module.css';
import AppStoreJPImg from '../../assets/images/store/app-store-jp.png';
import PlayStoreJPImg from '../../assets/images/store/google-play-jp.png';
import DescriptionText from '../DescriptionText';
import ImageWithoutSize from '../ImageWithoutSize';

const DownloadSection = () => {
  return (
    <section className={styles.container} id="download">
      <div className={styles.stores}>
        <a
          className={styles.storeLink}
          href="https://apps.apple.com/jp/app/trainlcd/id1486355943"
          target="_blank"
          rel="noopener noreferrer"
        >
          <ImageWithoutSize alt="App Store" src={AppStoreJPImg} />
        </a>
        <a
          className={styles.storeLink}
          href="https://play.google.com/store/apps/details?id=me.tinykitten.trainlcd"
          target="_blank"
          rel="noopener noreferrer"
        >
          <ImageWithoutSize alt="Google Play" src={PlayStoreJPImg} />
        </a>
      </div>
      <div className={styles.texts}>
        <p className={styles.shortHeading}>早速使ってみよう</p>
        <h3 className={styles.heading}>
          iOSとAndroid
          <br />
          <span className={styles.accent}>どちらも対応</span>
        </h3>

        <DescriptionText>
          iPhone、iPad、Androidスマートフォンに対応していて、もちろん無料です。
          <br />
          早速お使いのスマートフォンで使ってみましょう！
        </DescriptionText>
      </div>
    </section>
  );
};

export default DownloadSection;
