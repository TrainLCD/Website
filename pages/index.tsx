import React, { useEffect, useState } from 'react';
import fukuokaBg from '../assets/images/bg/fukuoka.jpg';
import kyotoBg from '../assets/images/bg/kyoto.jpg';
import naganoBg from '../assets/images/bg/nagano.jpg';
import nagasakiBg from '../assets/images/bg/nagasaki.jpg';
import osakaBg from '../assets/images/bg/osaka.jpg';
import shibuyaBg from '../assets/images/bg/shibuya.jpg';
import mojikoEnMock from '../assets/images/mockup/mojiko-en.png';
import mojikoMock from '../assets/images/mockup/mojiko.png';
import nijoEnMock from '../assets/images/mockup/nijo-en.png';
import nijoMock from '../assets/images/mockup/nijo.png';
import nishihamanoMachiEnMock from '../assets/images/mockup/nishihamano-machi-en.png';
import nishihamanoMachiMock from '../assets/images/mockup/nishihamano-machi.png';
import shibuyaEnMock from '../assets/images/mockup/shibuya-en.png';
import shibuyaMock from '../assets/images/mockup/shibuya.png';
import shinOsakaEnMock from '../assets/images/mockup/shin-osaka-en.png';
import shinOsakaMock from '../assets/images/mockup/shin-osaka.png';
import tatsuokajoEnMock from '../assets/images/mockup/tatsuokajo-en.png';
import tatsuokajoMock from '../assets/images/mockup/tatsuokajo.png';
import AppHead from '../components/Head';
import AboutSection from '../components/sections/About';
import DownloadSection from '../components/sections/Download';
import FeatureSection from '../components/sections/Feature';
import JoinCommunitySection from '../components/sections/JoinCommunity';
import SupportSection from '../components/sections/Support';
import WelcomeSection from '../components/sections/Welcome';
import ServiceSuspendModal from '../components/ServiceSuspendModal';
import { ShowingImage } from '../models/ShowingImage';
import { isJa } from '../utils/isJa';

const images: ShowingImage[] = [
  {
    bg: fukuokaBg,
    mock: isJa ? mojikoMock : mojikoEnMock,
  },
  {
    bg: kyotoBg,
    mock: isJa ? nijoMock : nijoEnMock,
  },
  {
    bg: nagasakiBg,
    mock: isJa ? nishihamanoMachiMock : nishihamanoMachiEnMock,
  },
  {
    bg: osakaBg,
    mock: isJa ? shinOsakaMock : shinOsakaEnMock,
  },
  {
    bg: naganoBg,
    mock: isJa ? tatsuokajoMock : tatsuokajoEnMock,
  },
  {
    bg: shibuyaBg,
    mock: isJa ? shibuyaMock : shibuyaEnMock,
  },
];

const Home: React.FC = () => {
  const [showingImg, setShowingImg] = useState<ShowingImage>();
  const [suspendModalShow, setSuspendModalShow] = useState(true);

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

  const handleSuspendModalClose = () => setSuspendModalShow(false);

  return (
    <main>
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

      <ServiceSuspendModal
        isOpen={suspendModalShow}
        onRequestClose={handleSuspendModalClose}
      />
    </main>
  );
};

export default Home;
