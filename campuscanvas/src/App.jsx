import React, { Suspense } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

//hooks
import ScrollToTop from './utilities/ScrollToTop';

//Components

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

//Este import de Empleo es provicional mientras hago el layout, pero después habrá que importar cada página de empleo.
//Revisar en curso de redux por bedu cómo hacer para que en cada URL, cargue el empleo que se necesita.
const Empleo = React.lazy(() => import('./components/JobTemplate/JobTemplate'));

//Router
function App() {
  //console.log(useScrollToTop);

  return (
    <Suspense fallback={<div />}>
      <BrowserRouter>
        <ScrollToTop />

        <Switch>
          <Route exact path='/construccion' component={Construccion} />
          <Route exact path='/' component={Main} />
          <Route exact path='/empresas' component={ParaEmpresas} />
          <Route exact path='/nosotros' component={Nosotros} />
          <Route exact path='/FAQs' component={FAQs} />
          <Route exact path='/privacidad' component={PoliticasPrivacidad} />
          <Route exact path='/condiciones' component={TerminosCondiciones} />
          <Route exact path='/cookies' component={Cookies} />
          <Route exact path='/empleos' component={Empleos} />
          <Route exact path='/contacto' component={Contacto} />
          <Route exact path='/empleo/:id' component={Empleo} />
          <Route component={NotFound} />
        </Switch>
      </BrowserRouter>
    </Suspense>
  );
}

export default App;

//This component gathers all pages and gives them a rout and a layout
