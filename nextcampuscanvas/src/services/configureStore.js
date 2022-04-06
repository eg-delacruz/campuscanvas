import { applyMiddleware, createStore } from 'redux';
import reduxThunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import reducers from '../reducers';

export default function configureStore(preloadedState = {}) {
  const middlewares = [reduxThunk];
  const middlewareEnhancer = applyMiddleware(...middlewares);

  const enhancers = [middlewareEnhancer];
  const composedEnhancers = composeWithDevTools(...enhancers);

  const store = createStore(reducers, preloadedState, composedEnhancers);

  return store;
}

//Configuración de react redux:
//Creamos initial state, aplicamos middlewares, proveemos los reducers a la app
//y aplicamos los enhancers, en este caso para tener acceso a las redux dev tools
//en navegador, pero se podrían añadir más.
//Documentation: https://redux.js.org/usage/configuring-your-store
