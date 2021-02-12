import type { AppProps } from 'next/app';
import Header from '../components/Header';
import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps): React.ReactElement {
  return (
    <>
      <Header />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
