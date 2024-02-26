import type { AppProps } from 'next/app';
import { MediaContextProvider } from '../constants/media';
import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps): React.ReactElement {
  return (
    <MediaContextProvider disableDynamicMediaQueries>
      <Component {...pageProps} />
    </MediaContextProvider>
  );
}

export default MyApp;
