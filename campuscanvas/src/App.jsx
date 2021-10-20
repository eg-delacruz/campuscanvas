import React, { Fragment, Suspense } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

//hooks
import ScrollToTop from './utilities/ScrollToTop';

//Components
import Layout from './components/Layout/Layout';

//pages with React.lazy()

const Main = React.lazy(() => import('./pages/Main/Main'));
const Construccion = React.lazy(() =>
  import('./pages/Construction/Construccion')
);
const ParaEmpresas = React.lazy(() =>
  import('./pages/ParaEmpresas/ParaEmpresas')
);
const Nosotros = React.lazy(() => import('./pages/Nosotros/Nosotros'));
const FAQs = React.lazy(() => import('./pages/FAQs/FAQs'));
const PoliticasPrivacidad = React.lazy(() =>
  import('./pages/PoliticasPrivacidad/PoliticasPrivacidad')
);
const TerminosCondiciones = React.lazy(() =>
  import('./pages/TerminosCondiciones/TerminosCondiciones')
);
const Cookies = React.lazy(() => import('./pages/Cookies/Cookies'));
const Empleos = React.lazy(() => import('./pages/Empleos/Empleos'));
const Contacto = React.lazy(() => import('./pages/Contacto/Contacto'));
const NotFound = React.lazy(() => import('./pages/NotFound404/NotFound404'));

//Router
function App() {
  //console.log(useScrollToTop);
  return (
    <Suspense fallback={<div />}>
      <BrowserRouter>
        <ScrollToTop />
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
              <Route
                exact
                path='/condiciones'
                component={TerminosCondiciones}
              />
              <Route exact path='/cookies' component={Cookies} />
              <Route exact path='/empleos' component={Empleos} />
              <Route exact path='/contacto' component={Contacto} />
              {/*Not Found 404 */}
              <Route component={NotFound} />
            </Layout>
          </Fragment>
        </Switch>
      </BrowserRouter>
    </Suspense>
  );
}

export default App;

//This component gathers all pages and gives them a rout and a layout
