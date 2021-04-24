import type { AppProps } from 'next/app';
import Footer from '../components/Footer';
import Header from '../components/Header';
import '../styles/globals.css';
import Modal from 'react-modal';
import FBMessanger from '../components/FBMessanger';

Modal.setAppElement('#__next');

function MyApp({ Component, pageProps }: AppProps): React.ReactElement {
  return (
    <>
      <Header />
      <Component {...pageProps} />
      <Footer />
      <FBMessanger />
    </>
  );
}

export default MyApp;
