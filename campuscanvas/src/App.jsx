import React, { Fragment } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';

//pages
import Main from './pages/Main/Main';
import Construccion from './pages/Construction/Construccion';
import ParaEmpresas from './pages/ParaEmpresas/ParaEmpresas';
import Nosotros from './pages/Nosotros/Nosotros';
import FAQs from './pages/FAQs/FAQs';
import PoliticasPrivacidad from './pages/PoliticasPrivacidad/PoliticasPrivacidad';
import TerminosCondiciones from './pages/TerminosCondiciones/TerminosCondiciones';
import Cookies from './pages/Cookies/Cookies';
import Empleos from './pages/Empleos/Empleos';

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
            <Route exact path='/nosotros' component={Nosotros} />
            <Route exact path='/FAQs' component={FAQs} />
            <Route exact path='/privacidad' component={PoliticasPrivacidad} />
            <Route exact path='/condiciones' component={TerminosCondiciones} />
            <Route exact path='/cookies' component={Cookies} />
            <Route exact path='/empleos' component={Empleos} />
            {/* Create Not Found 404 page */}
          </Layout>
        </Fragment>
      </Switch>
    </BrowserRouter>
  );
}

export default App;

//This component gathers all pages and gives them a rout and a layout
//To scroll to top when new page opens:
//https://stackoverflow.com/questions/36904185/react-router-scroll-to-top-on-every-transition
