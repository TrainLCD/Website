import React, { useEffect, useState } from 'react';
import AppHead from '../components/Head';
import AboutSection from '../components/sections/About';
import DownloadSection from '../components/sections/Download';
import FeatureSection from '../components/sections/Feature';
import WelcomeSection from '../components/sections/Welcome';
import { ShowingImage } from '../models/ShowingImage';
import styles from '../styles/pages/Home.module.css';
import { isJa } from '../utils/isJa';

const images: ShowingImage[] = [
  {
    bg: '/images/bg/fukuoka.jpg',
    mock: isJa ? '/images/mockup/mojiko.png' : '/images/mockup/mojiko-en.png',
  },
  {
    bg: '/images/bg/kyoto.jpg',
    mock: isJa ? '/images/mockup/nijo.png' : '/images/mockup/nijo-en.png',
  },
  {
    bg: '/images/bg/nagasaki.jpg',
    mock: isJa
      ? '/images/mockup/nishihamano-machi.png'
      : '/images/mockup/nishihamano-machi-en.png',
  },
  {
    bg: '/images/bg/osaka.jpg',
    mock: isJa
      ? '/images/mockup/shin-osaka.png'
      : '/images/mockup/shin-osaka-en.png',
  },
  {
    bg: '/images/bg/nagano.jpg',
    mock: isJa
      ? '/images/mockup/tatsuokajo.png'
      : '/images/mockup/tatsuokajo-en.png',
  },
  {
    bg: '/images/bg/shibuya.jpg',
    mock: isJa ? '/images/mockup/shibuya.png' : '/images/mockup/shibuya-en.png',
  },
];

const Home: React.FC = () => {
  const [showingImg, setShowingImg] = useState<ShowingImage>();

  useEffect(() => {
    const index = Math.floor(Math.random() * Math.floor(images.length));
    setShowingImg(images[index]);
  }, []);

  if (!showingImg) {
    return (
      <>
        <AppHead
          title="TrainLCD"
          description="TrainLCDは、位置情報と連動して電車のLCDを再現するアプリです。"
          url="https://trainlcd.tinykitten.me/"
          ogType="website"
        />
      </>
    );
  }

  return (
    <main className={styles.main}>
      <AppHead
        title="TrainLCD"
        description="TrainLCDは、位置情報と連動して電車のLCDを再現するアプリです。"
        url="https://trainlcd.tinykitten.me/"
        ogType="website"
      />
      <WelcomeSection showingImg={showingImg} />
      <AboutSection showingImg={showingImg} />
      <FeatureSection />
      <DownloadSection />
    </main>
  );
};

export default Home;
