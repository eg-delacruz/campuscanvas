import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

//these styles only needed here in the app
import './assets/styles/Globals.scss';
import './assets/styles/Buttons.scss';

//Redux config
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import reduxThunk from 'redux-thunk';

import reducers from './reducers';

const store = createStore(
  reducers, //Todos los reducers
  {}, //Estado inicial --> Jugar con esto para ver cómo funciona. Ver si lo mejor es modificarlo desde aquí o desde los reducers.
  applyMiddleware(reduxThunk)
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
);

//this component is just to render the whole Web
