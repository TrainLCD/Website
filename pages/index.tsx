import React, { useEffect, useState } from 'react';
import AppHead from '../components/Head';
import AboutSection from '../components/sections/About';
import DownloadSection from '../components/sections/Download';
import FeatureSection from '../components/sections/Feature';
import SupportSection from '../components/sections/Support';
import WelcomeSection from '../components/sections/Welcome';
import JoinCommunitySection from '../components/sections/JoinCommunity';
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
          description="TrainLCDは、日本全国の鉄道路線で使える新感覚のナビゲーションアプリです。"
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
        description="TrainLCDは、日本全国の鉄道路線で使える新感覚のナビゲーションアプリです。"
        url="https://trainlcd.tinykitten.me/"
        ogType="website"
      />
      <WelcomeSection showingImg={showingImg} />
      <AboutSection showingImg={showingImg} />
      <FeatureSection />
      <SupportSection />
      <DownloadSection />
      <JoinCommunitySection />
    </main>
  );
};

export default Home;
