import mockImage from '../../assets/images/mockup/iphone-and-ipad.png';
import ImageWithoutSize from '../ImageWithoutSize';
import RingsPC from '../RingsPC';
import RingsSP from '../RingsSP';
import styles from './Welcome.module.css';

const WelcomeSection = () => (
  <section className={styles.container}>
    <div className={styles.texts}>
      <h2 className={styles.heading}>
        日本全国の鉄道路線で使える
        <br />
        <span className={styles.colored}>新感覚</span>
        ナビゲーションアプリ
      </h2>
      <p className={styles.description}>
        今までにありそうでなかった
        あなたのスマートフォンで使えるトレインビジョン。
        <br />
        それが、新感覚ナビゲーションアプリ「TrainLCD」
        <br />
        迷いそうな時、降りれるか不安な時。きっとあなたの役に立つはずです。
      </p>
      <a href="#download" className={`${styles.button} ${styles.desktopButton}`}>
        使ってみる
      </a>
    </div>
    <div className={styles.mockup}>
      <RingsPC className={styles.ringsPc} />
      <RingsSP className={styles.ringsSp} />
      <ImageWithoutSize src={mockImage} alt="iPhone and iPad" />
    </div>
    <a href="#download" className={`${styles.button} ${styles.mobileButton}`}>
      使ってみる
    </a>
  </section>
);

export default WelcomeSection;
