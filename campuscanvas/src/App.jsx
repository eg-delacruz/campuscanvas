import React, { Fragment } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';

//pages
import Main from './pages/Main/Main';
import Construccion from './pages/Construction/Construccion';

//Router
function App() {
  return (
    <BrowserRouter>
      <Switch>
        {/* A todo lo que va fuera del <Fragment> no se le aplica el layout */}
        <Route exact path='/construccion' component={Construccion} />
        <Fragment>
          <Layout>
            <Route exact path='/' component={Main} />
          </Layout>
        </Fragment>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
