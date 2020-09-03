import { AppPropsType } from 'next/dist/next-server/lib/utils';
import '../styles/globals.css';
import { ReactElement } from 'react';

function MyApp({ Component, pageProps }: AppPropsType): ReactElement {
  return <Component {...pageProps} />;
}

export default MyApp;
