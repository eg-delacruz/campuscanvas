import React from 'react';
import { Link } from 'react-router-dom';

//Assets
import Construccion_img from '../../assets/static/PagesImages/ConstructionImages/under_construction.svg';

//Components
import SecondaryHeader from '../../components/GeneralUseComponents/SecondaryHeader/SecondaryHeader';
import HelmetLayout from '../../components/GeneralUseComponents/HelmetLayout/HelmetLayout';

//Styles
import './Construccion.scoped.scss';

function Construccion() {
  return (
    <div className='construction__container'>
      <HelmetLayout
        title='En construcción'
        subtitle='Estamos trabajando en nuevas funcionalidades para ti.'
      />
      <SecondaryHeader />

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
    </div>
  );
}

export default Construccion;
