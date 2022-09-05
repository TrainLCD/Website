import { appWithTranslation } from 'next-i18next';
import type { AppProps } from 'next/app';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { MediaContextProvider } from '../constants/media';
import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps): React.ReactElement {
  return (
    <MediaContextProvider disableDynamicMediaQueries>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </MediaContextProvider>
  );
}

export default appWithTranslation(MyApp);
