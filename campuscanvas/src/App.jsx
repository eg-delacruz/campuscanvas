import React, { Fragment } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';

//pages
import Main from './pages/Main/Main';
import Construccion from './pages/Construction/Construccion';
import ParaEmpresas from './pages/ParaEmpresas/ParaEmpresas';

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
            <Route exact path='/empresas' component={ParaEmpresas} />
          </Layout>
        </Fragment>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
