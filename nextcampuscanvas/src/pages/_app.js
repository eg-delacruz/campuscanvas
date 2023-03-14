import { Provider } from 'react-redux';
import { createWrapper } from 'next-redux-wrapper';
//import configureStore from '../services/configureStore';
import { store } from '@services/configureStore';
import { SessionProvider } from 'next-auth/react';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import * as ga from '../services/googleAnalytics/index';

//Globas styles
import '@styles/Globals.scss';
import '@styles/Buttons.scss';

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  const router = useRouter();

  //Google Analytics (start)
  useEffect(() => {
    const handleRouteChange = (url) => {
      ga.pageview(url);
    };
    //When the component is mounted, subscribe to router changes
    //and log those page views
    router.events.on('routeChangeComplete', handleRouteChange);

    // If the component is unmounted, unsubscribe
    // from the event with the `off` method
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);
  //Google Analytics (end)

  return (
    <SessionProvider session={session}>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </SessionProvider>
  );
}

const makestore = () => store;
const wrapper = createWrapper(makestore);

export default wrapper.withRedux(MyApp);
