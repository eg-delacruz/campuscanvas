import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

//Assets
import Logo_Campus_Canvas from '@assets/GeneralUse/Logos/logo.svg';
import logged_user_icon from '@assets/GeneralUse/IconsAndButtons/logged_user.svg';

//Styles
import styles from './Header.module.scss';

//Session
import { useSession } from 'next-auth/react';
import { signOut } from 'next-auth/react';

function Header() {
  const { data: session, status } = useSession();
  const loading = status === 'loading';

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
    <>
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
          {/* Logo + logged user menu */}
          <div className={styles.header__logo}>
            <Link href='/'>
              <button className={styles.header__logo_button}>
                <Image
                  height={55}
                  src={Logo_Campus_Canvas}
                  alt='Logo Campus Canvas'
                />
              </button>
            </Link>

            {/* Logged in user menu for bigger than 767px */}
            {session && (
              <div className={styles.header__logged_user_menu}>
                <div className={styles.icon}>
                  <Image src={logged_user_icon} />
                </div>
                <p>{session.token.email}</p>
                <button
                  onClick={() => signOut()}
                  className={`${styles.logoutButton} btn button--red `}
                >
                  <Link href='/'>Log out</Link>
                </button>
              </div>
            )}
          </div>

          <nav
            onClick={() => hideMenu()}
            className={
              menu.isMenuOn
                ? `${styles.menu} ${styles['is-active']}`
                : styles.menu
            }
          >
            <ul
              className={
                session
                  ? `${styles.menu__list} ${styles['menu__list--logged']}`
                  : styles.menu__list
              }
            >
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

            {/* /////////////////////////
            //     Login buttons      //
            ///////////////////////// */}

            {!loading && !session && (
              <ul className={styles.loginMenu}>
                <Link href='/auth/login'>
                  <li
                    className={`${styles.loginMenu__item} ${styles.menu__logButton} btn button--redRedborderTransparentHoverShadowtRed`}
                  >
                    Login
                  </li>
                </Link>
                <Link href='/auth/registro'>
                  <li className={`${styles.loginMenu__item} btn button--red `}>
                    Registrarse
                  </li>
                </Link>
              </ul>
            )}

            {/* This part only displays in the curtain menu */}
            {session && (
              <section className={styles.userMenu__767}>
                <div className={styles.user__info}>
                  <div className={styles.user__icon}>
                    <Image src={logged_user_icon} />
                  </div>
                  <p>{session.token.email}</p>
                </div>
                <div
                  onClick={() => signOut()}
                  className={`${styles.signoutButton} btn button--red `}
                >
                  <Link href='/'>Log out</Link>
                </div>
              </section>
            )}
          </nav>
        </div>
      </header>
    </>
  );
}

export default Header;
