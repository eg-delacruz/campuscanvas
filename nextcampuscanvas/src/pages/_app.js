import App from 'next/app';
import React from 'react';
import { Provider } from 'react-redux';
import { createWrapper } from 'next-redux-wrapper';
import configureStore from '../services/configureStore';
import { SessionProvider } from 'next-auth/react';
import Script from 'next/script';

//Globas styles
import '@styles/Globals.scss';
import '@styles/Buttons.scss';

const store = configureStore();

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <>
        <Script
          strategy='afterInteractive'
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
        />
        <Script
          id='gtag-init'
          strategy='afterInteractive'
          dangerouslySetInnerHTML={{
            __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
              page_path: window.location.pathname,
            });
          `,
          }}
        />

        <SessionProvider refetchOnWindowFocus={true}>
          <Provider store={store}>
            <Component {...pageProps} />
          </Provider>
        </SessionProvider>
      </>
    );
  }
}

const makestore = () => store;
const wrapper = createWrapper(makestore);

export default wrapper.withRedux(MyApp);

// function MyApp({ Component, pageProps }) {
//   return <Component {...pageProps} />;
// }

// export default MyApp;
