import React from 'react';
import styles from '../../styles/components/sections/Welcome.module.css';
import Image from 'next/image';
import AppStoreIcon from '../AppStoreIcon';
import GooglePlayIcon from '../GooglePlayIcon';
import ArrowIcon from '../ArrowIcon';
import { ShowingImage } from '../../models/ShowingImage';

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
          日本全国で使える
          <br />
          電車のLCDを再現したスマホアプリです
        </h2>
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

        <ArrowIcon className={styles.arrow} onClick={handleNextClick} />
      </div>
    </section>
  );
};

export default WelcomeSection;
