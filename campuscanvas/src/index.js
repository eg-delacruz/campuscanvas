import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';

//these styles only needed here in the app
import './assets/styles/Globals.scss';
import './assets/styles/Buttons.scss';

//Redux config
import configureStore from './configureStore';

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
);

//this component is just to render the whole Web
