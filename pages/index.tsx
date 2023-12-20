import React, { useState } from 'react';
import Footer from '../components/Footer';
import AppHead from '../components/Head';
import Header from '../components/Header';
import ServiceSuspendModal from '../components/ServiceSuspendModal';
import DownloadSection from '../components/sections/Download';
import OSSSection from '../components/sections/OSS';
import ServiceAreaSection from '../components/sections/ServiceArea';
import TabletSection from '../components/sections/Tablet';
import WearableSection from '../components/sections/Wearable';
import WelcomeSection from '../components/sections/Welcome';

const Home: React.FC = () => {
  const [suspendModalShow, setSuspendModalShow] = useState(true);
  const handleSuspendModalClose = () => setSuspendModalShow(false);

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

      <ServiceSuspendModal
        isOpen={suspendModalShow}
        onRequestClose={handleSuspendModalClose}
      />
    </main>
  );
};

export default Home;
