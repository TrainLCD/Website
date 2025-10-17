import styles from './Welcome.module.css';
import mockImage from '../../assets/images/mockup/iphone-and-ipad.png';
import ImageWithoutSize from '../ImageWithoutSize';
import RingsPC from '../RingsPC';
import RingsSP from '../RingsSP';

const WelcomeSection = () => {
  const handleTryButtonClick = () => {
    const aboutElem = document.querySelector('#download');
    window.scrollTo({
      top: (aboutElem?.getBoundingClientRect().top ?? 0) + window.pageYOffset,
      behavior: 'smooth',
    });
  };

  return (
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
        <button
          type="button"
          className={`${styles.button} ${styles.desktopButton}`}
          onClick={handleTryButtonClick}
        >
          使ってみる
        </button>
      </div>
      <div className={styles.mockup}>
        <RingsPC className={styles.ringsPc} />
        <RingsSP className={styles.ringsSp} />
        <ImageWithoutSize src={mockImage} alt="iPhone and iPad" />
      </div>
      <button
        type="button"
        className={`${styles.button} ${styles.mobileButton}`}
        onClick={handleTryButtonClick}
      >
        使ってみる
      </button>
    </section>
  );
};

export default WelcomeSection;
