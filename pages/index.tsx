import React from 'react';
import AppHead from '../components/Head';
import AppleWatchSection from '../components/sections/AppleWatch';
import DownloadSection from '../components/sections/Download';
import IPadSection from '../components/sections/IPad';
import OSSSection from '../components/sections/OSS';
import ServiceAreaSection from '../components/sections/ServiceArea';
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
      <WelcomeSection />
      <ServiceAreaSection />
      <IPadSection />
      <AppleWatchSection />
      <OSSSection />
      <DownloadSection />
    </main>
  );
};

export default Home;
