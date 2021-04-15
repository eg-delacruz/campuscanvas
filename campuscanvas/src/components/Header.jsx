import React, { useState } from 'react';
import '../assets/styles/components/Header.scss';
import Logo_Campus_Canvas from '../assets/static/logo.svg';

function Header() {
  const [menu, setMenu] = useState({
    isMenuOn: false,
  });

  const toggleMenu = (event) => {
    setMenu({ isMenuOn: !menu.isMenuOn });
  };

  const hideMenu = () => {
    setMenu({ isMenuOn: false });
  };

  return (
    <React.Fragment>
      {/* Burguer Button */}

      <i
        onClick={() => toggleMenu()}
        className='burguer__button'
        id='burger-menu'
      >
        <div className='burguer__line1 icon__line' />
        <div className='burguer__line2 icon__line' />
        <div className='burguer__line3 icon__line' />
      </i>

      <header className='header'>
        <div className='header__container container'>
          <figure className='header__logo'>
            <a href='/'>
              <img src={Logo_Campus_Canvas} alt='Logo Campus Canvas' />
            </a>
          </figure>
          <nav
            onClick={() => hideMenu()}
            className={menu.isMenuOn ? 'menu is-active' : 'menu'}
          >
            <ul className='menu__list'>
              <li className='menu__item'>
                <a href='/'>Home</a>
              </li>
              <li className='menu__item'>
                <a href='pages/construccion.html'>Nosotros</a>
              </li>
              <li className='menu__item'>
                <a href='pages/construccion.html'>Para empresas</a>
              </li>
              <li className='menu__item'>
                <a href='pages/construccion.html'>Blog</a>
              </li>
              <li className='menu__item'>
                <a href='pages/construccion.html'>FAQs</a>
              </li>
            </ul>
          </nav>
        </div>
      </header>
    </React.Fragment>
  );
}

export default Header;
