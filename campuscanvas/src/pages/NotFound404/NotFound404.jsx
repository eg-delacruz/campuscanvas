import React from 'react';
import { Link } from 'react-router-dom';

//Styles
import './NotFound404.scss';

//Components
import NotFoundImage from '../../assets/static/NotFound404.svg';

const NotFound404 = () => {
  return (
    <div className='404__container'>
      <main className='main'>
        <div className='main__container container'>
          <h2>Página no encontrada</h2>
          <figure>
            <img src={NotFoundImage} alt='Página no encontrada' />
          </figure>
          <p>
            No pudimos encontrar la ruta especificada, inténtalo más tarde.
            <br />
            Siempre puedes volver al <Link to='/'>Home</Link>
          </p>
        </div>
      </main>
    </div>
  );
};

export default NotFound404;
