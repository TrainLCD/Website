import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useCallback, useState } from 'react';
import styled from 'styled-components';
import Footer from '../components/Footer';
import AppHead from '../components/Head';
import SpecialHeader from '../components/anniversary/4th/Header';
import FirstView from '../components/anniversary/4th/sections/FirstView';
import GreetingSection from '../components/anniversary/4th/sections/Greeting';
import HistorySection from '../components/anniversary/4th/sections/History';

const SpecialPage: React.VFC = () => {
  const [firstViewPassed, setFirstViewPassed] = useState(false);

  const handleVisibilityChange = useCallback(
    (visibility: boolean) => setFirstViewPassed(visibility),
    []
  );

  return (
    <Container>
      <AppHead
        title="TrainLCD 4周年記念サイト"
        description="TrainLCDは、おかげさまで開発開始から4周年を迎えました。"
        url="https://trainlcd.tinykitten.me/special"
        ogType="website"
      />
      <SpecialHeader firstViewPassed={firstViewPassed} />
      <FirstView />
      <GreetingSection onVisibilityChange={handleVisibilityChange} />
      <HistorySection />
      <Footer />
    </Container>
  );
};

const Container = styled.main`
  min-height: 100vh;
`;

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common'])),
  },
});

export default SpecialPage;
