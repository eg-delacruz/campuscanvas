import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Main from '../pages/Main';
import Construccion from '../pages/Construccion';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={Main} />
        <Route exact path='/construccion' component={Construccion} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
