import React from 'react';
import { Link } from 'react-router-dom';

//Styles
import './NotFound404.scoped.scss';

//Assets
import NotFoundImage from '../../assets/static/NotFound404.svg';

//Components
import SecondaryHeader from '../../components/SecondaryHeader/SecondaryHeader';

const NotFound404 = () => {
  return (
    <div className='404__container'>
      <SecondaryHeader />
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
