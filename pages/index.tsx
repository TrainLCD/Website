import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React from 'react';
import AppHead from '../components/Head';
import AppleWatchSection from '../components/sections/AppleWatch';
import DownloadSection from '../components/sections/Download';
import OSSSection from '../components/sections/OSS';
import ServiceAreaSection from '../components/sections/ServiceArea';
import TabletSection from '../components/sections/Tablet';
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
      <TabletSection />
      <AppleWatchSection />
      <OSSSection />
      <DownloadSection />
    </main>
  );
};

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common'])),
  },
});

export default Home;
