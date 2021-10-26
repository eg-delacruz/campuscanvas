import { applyMiddleware, compose, createStore } from 'redux';
import reduxThunk from 'redux-thunk';

import reducers from './reducers';

export default function configureStore(initialState = {}) {
  const middlewares = [reduxThunk];
  const middlewareEnhancer = applyMiddleware(...middlewares);

  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
    window.__REDUX_DEVTOOLS_EXTENSION__();

  const enhancers = [middlewareEnhancer, composeEnhancers];
  const composedEnhancers = compose(...enhancers);

  const store = createStore(reducers, initialState, composedEnhancers);

  return store;
}

//Configuración de react redux:
//Creamos initial state, aplicamos middlewares, proveemos los reducers a la app
//y aplicamos los enhancers, en este caso para tener acceso a las redux dev tools
//en navegador, pero se podrían añadir más.
//Documentation: https://redux.js.org/usage/configuring-your-store
