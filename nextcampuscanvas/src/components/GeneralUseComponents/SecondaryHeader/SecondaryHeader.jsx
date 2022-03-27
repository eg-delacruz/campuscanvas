import React from 'react';

//Assets
import Logo_Campus_Canvas from '../../../assets/static/GeneralUse/Logos/logo.svg';

//Styles
import './SecondaryHeader.scoped.scss';

const SecondaryHeader = () => {
  return (
    <header className='header'>
      <div className='header__container container'>
        <a href='/'>
          <img src={Logo_Campus_Canvas} alt='Logo Campus Canvas' />
        </a>
      </div>
    </header>
  );
};

export default SecondaryHeader;
