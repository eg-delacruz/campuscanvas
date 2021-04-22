import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import './Header.scoped.scss';
import Logo_Campus_Canvas from '../../assets/static/logo.svg';

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

      <header className='header header__component'>
        <div className='header__container container'>
          <figure className='header__logo'>
            <Link to='/'>
              <img src={Logo_Campus_Canvas} alt='Logo Campus Canvas' />
            </Link>
          </figure>
          <nav
            onClick={() => hideMenu()}
            className={menu.isMenuOn ? 'menu is-active' : 'menu'}
          >
            <ul className='menu__list'>
              <li className='menu__item'>
                <Link to='/'>Home</Link>
              </li>
              <li className='menu__item'>
                <Link to='/construccion'>Nosotros</Link>
              </li>
              <li className='menu__item'>
                <Link to='/construccion'>Para empresas</Link>
              </li>
              <li className='menu__item'>
                <Link to='/construccion'>Blog</Link>
              </li>
              <li className='menu__item'>
                <Link to='/construccion'>FAQs</Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>
    </React.Fragment>
  );
}

export default Header;
