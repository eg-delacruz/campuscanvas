import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

//Assets
import Logo_Campus_Canvas from '@assets/GeneralUse/Logos/logo.svg';

//Styles
import styles from './Header.module.scss';

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
        className={styles['burguer__button']}
        id='burger-menu'
      >
        <div className={styles['icon__line']} />
        <div
          className={`${styles['burguer__line2']} ${styles['icon__line']}`}
        />
        <div className={styles['icon__line']} />
      </i>

      <header className={styles['header']} id='header'>
        {/* Un estilo es scopped y el otro global, tener cuidado */}
        <div className={`${styles['header__container']} container`}>
          <figure className={styles.header__logo}>
            <Link href='/'>
              <button>
                <Image
                  height={55}
                  src={Logo_Campus_Canvas}
                  alt='Logo Campus Canvas'
                />
              </button>
            </Link>
          </figure>

          <nav
            onClick={() => hideMenu()}
            className={
              menu.isMenuOn
                ? `${styles.menu} ${styles['is-active']}`
                : styles.menu
            }
          >
            <ul className={styles.menu__list}>
              <li className={styles.menu__item}>
                <Link href='/'>Home</Link>
              </li>
              <li className={styles.menu__item}>
                <Link href='/nosotros'>Nosotros</Link>
              </li>
              <li className={styles.menu__item}>
                <Link href='/empresas'>
                  <div>
                    Información <br /> para empresas
                  </div>
                </Link>
              </li>
              <li className={styles.menu__item}>
                <Link href='/blog'>Blog</Link>
              </li>
              <li className={styles.menu__item}>
                <Link href='/FAQs'>FAQs</Link>
              </li>
            </ul>

            <ul className={styles.menu__user}>
              <Link href='/login'>
                <li
                  className={`${styles.menu__item} ${styles.menu__logButton} btn button--redRedborderTransparentHoverShadowtRed`}
                >
                  Login
                </li>
              </Link>
              <li className={`${styles.menu__item} btn button--red `}>
                <Link href='/registro'>Registrarse</Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>
    </React.Fragment>
  );
}

export default Header;
