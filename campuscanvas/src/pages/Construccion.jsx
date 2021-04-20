import React from 'react';
import { Link } from 'react-router-dom';

import Construccion_img from '../assets/static/under_construction.svg';
import Logo_Campus_Canvas from '../assets/static/logo.svg';

import '../assets/styles/pages/Construccion.scoped.scss';

function Construccion() {
  return (
    <React.Fragment>
      <header className='header header__construccion'>
        <div className='header__container container'>
          <a href='/'>
            <img src={Logo_Campus_Canvas} alt='Logo Campus Canvas' />
          </a>
        </div>
      </header>

      <main className='main'>
        <div className='main__container container'>
          <h2>Esta parte de nuestro sitio está en desarrollo</h2>
          <figure>
            <img src={Construccion_img} alt='Sitio en construcción' />
          </figure>
          <p>
            Estamos preparando funcionalidades muy especiales para ti. <br />
            Siempre puedes volver al <Link to='/'>Home</Link>
          </p>
        </div>
      </main>
    </React.Fragment>
  );
}

export default Construccion;
