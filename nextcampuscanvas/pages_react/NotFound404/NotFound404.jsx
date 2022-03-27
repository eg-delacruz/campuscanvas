import React from 'react';
import { Link } from 'react-router-dom';

//Styles
import './NotFound404.scoped.scss';

//Assets
import NotFoundImage from '../../assets/static/PagesImages/NotFoundImages/NotFound404.svg';

//Components
import HelmetLayout from '../../components/GeneralUseComponents/HelmetLayout/HelmetLayout';
import SecondaryHeader from '../../components/GeneralUseComponents/SecondaryHeader/SecondaryHeader';

const NotFound404 = () => {
  return (
    <div className='404__container'>
      <HelmetLayout
        title='Página no encontrada'
        subtitle='No se pudo encontrar la página que estabas buscando'
      />
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
