import App from 'next/app';
import React from 'react';
import { Provider } from 'react-redux';
import { createWrapper } from 'next-redux-wrapper';
import configureStore from '../services/configureStore';
import { SessionProvider } from 'next-auth/react';

//Globas styles
import '@styles/Globals.scss';
import '@styles/Buttons.scss';

const store = configureStore();

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <SessionProvider>
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
      </SessionProvider>
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
