import { Provider } from 'react-redux';
import { createWrapper } from 'next-redux-wrapper';
//import configureStore from '../services/configureStore';
import { store } from '@services/configureStore';
import { SessionProvider } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import * as ga from '../services/googleAnalytics/index';

//Hooks
import { usePreserveScroll } from '@hooks/usePreserveScroll';

//React Query
import {
  QueryClient,
  QueryClientProvider,
  Hydrate,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

//Globas styles
import '@styles/Globals.scss';
import '@styles/Buttons.scss';
import '@styles/React-Tag-Autocomplete-Lib-Styles.scss'; //React Tag Autocomplete Lib Styles

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  const [queryClient] = useState(() => new QueryClient());

  //Google Analytics (start)
  const router = useRouter();
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

  //Preserve Scroll
  usePreserveScroll();

  //Service Worker (start)
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', function () {
        navigator.serviceWorker.register('/sw.js').then(
          function (registration) {
            // Registration was successful
          },
          function (err) {
            // registration failed :(
          }
        );
      });
    }
  }, []);
  //Service Worker (end)

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <SessionProvider session={session}>
          <Provider store={store}>
            <Component {...pageProps} />
          </Provider>
        </SessionProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </Hydrate>
    </QueryClientProvider>
  );
}

const makestore = () => store;
const wrapper = createWrapper(makestore);

export default wrapper.withRedux(MyApp);
