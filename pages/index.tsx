import React from 'react';
import Footer from '../components/Footer';
import AppHead from '../components/Head';
import Header from '../components/Header';
import DownloadSection from '../components/sections/Download';
import OSSSection from '../components/sections/OSS';
import ServiceAreaSection from '../components/sections/ServiceArea';
import TabletSection from '../components/sections/Tablet';
import WearableSection from '../components/sections/Wearable';
import WelcomeSection from '../components/sections/Welcome';

const Home: React.FC = () => {
  return (
    <main>
      <AppHead
        title="TrainLCD"
        description="TrainLCDは、日本全国の鉄道路線で使える新感覚のナビゲーションアプリです。"
        url="https://trainlcd.tinykitten.me/"
        ogType="website"
      />
      <Header />
      <WelcomeSection />
      <ServiceAreaSection />
      <TabletSection />
      <WearableSection />
      <OSSSection />
      <DownloadSection />
      <Footer />
    </main>
  );
};

export default Home;
