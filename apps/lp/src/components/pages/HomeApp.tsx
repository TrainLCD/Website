import Footer from '../Footer';
import Header from '../Header';
import DownloadSection from '../sections/Download';
import OSSSection from '../sections/OSS';
import ServiceAreaSection from '../sections/ServiceArea';
import TabletSection from '../sections/Tablet';
import WearableSection from '../sections/Wearable';
import WelcomeSection from '../sections/Welcome';

const HomeApp = () => (
  <main>
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

export default HomeApp;
