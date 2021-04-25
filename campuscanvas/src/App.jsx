import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

//pages
import Main from './pages/Main/Main';
import Construccion from './pages/Construction/Construccion';

//Router
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
