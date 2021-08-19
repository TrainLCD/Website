import styles from '../../styles/components/sections/Welcome.module.css';
import Image from 'next/image';
import ArrowIcon from '../ArrowIcon';
import { ShowingImage } from '../../models/ShowingImage';
import { isJa } from '../../utils/isJa';

type Props = {
  showingImg: ShowingImage;
};

const WelcomeSection: React.FC<Props> = ({ showingImg }: Props) => {
  const handleNextClick = () => {
    const aboutElem = document.querySelector('#about');
    window.scrollTo({
      top: aboutElem?.getBoundingClientRect().top,
      behavior: 'smooth',
    });
  };

  return (
    <section
      className={styles.firstView}
      style={{
        backgroundImage: `url('${showingImg.bg}')`,
      }}
    >
      <div className={styles.firstViewContent}>
        <Image
          className={styles.mockup}
          src={showingImg.mock}
          alt="Mockup"
          width={361.5}
          height={191.25}
        />
        <h1 className={styles.appNameTitle}>TrainLCD</h1>
        <h2 className={styles.appDescription}>
          {isJa
            ? `日本全国の鉄道路線で使える\n新感覚のナビゲーションアプリです。`
            : 'Can be used on routes all over Japan\nNew sense navigation app.'}
        </h2>
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

        <ArrowIcon className={styles.arrow} onClick={handleNextClick} />
      </div>
    </section>
  );
};

export default WelcomeSection;
