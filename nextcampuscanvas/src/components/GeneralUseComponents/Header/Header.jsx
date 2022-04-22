import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { connect } from 'react-redux';
import { useRouter } from 'next/router';

//Assets
import Logo_Campus_Canvas from '@assets/GeneralUse/Logos/logo.svg';
import logged_user_icon from '@assets/GeneralUse/IconsAndButtons/logged_user.svg';
import logout_icon from '@assets/GeneralUse/IconsAndButtons/usedInComponents/Header/logout_icon.svg';
import profile_icon from '@assets/GeneralUse/IconsAndButtons/usedInComponents/Header/profile_icon.svg';
import dropdown_menu_arrow from '@assets/GeneralUse/IconsAndButtons/usedInComponents/Header/dropdown_menu_arrow.svg';

//Styles
import styles from './Header.module.scss';

//Session
import { useSession } from 'next-auth/react';
import { signOut } from 'next-auth/react';

//Redux actions
import * as usersActions from '@actions/usersActions';
const { getUser } = usersActions;

function Header(props) {
  const router = useRouter();
  //Session
  const { data: session, status } = useSession();
  const loading = status === 'loading';

  //This useEffect gets the user data to display user name
  //even if user stops verification process in step 2 or 3
  useEffect(() => {
    const setUserName = async () => {
      if (session && props.user === null) {
        await props.getUser(session.token.sub);
      }
    };
    setUserName();
  }, [session]);

  const [menu, setMenu] = useState({
    isMenuOn: false,
  });

  const toggleMenu = (event) => {
    setMenu({ isMenuOn: !menu.isMenuOn });
  };

  const hideMenu = () => {
    setMenu({ isMenuOn: false });
  };

  const redirectTo = (url) => {
    return router.push(url);
  };

  //Dirigir a usuario al paso de verificación correspondiente
  const verifyUser = () => {
    if (!props.user.stu_data.university && !props.user.stu_verified) {
      router.push(
        { pathname: '/auth/registro', query: { step: 2 } },
        'auth/registro'
      );
    }
    if (props.user.stu_data.university && !props.user.stu_verified) {
      router.push(
        { pathname: '/auth/registro', query: { step: 3 } },
        'auth/registro'
      );
    }
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
            {props.user && (
              <div className={styles.header__logged_user_menu}>
                <div className={styles.header__logged_user_menu_container}>
                  <div className={styles.icon}>
                    <Image src={logged_user_icon} />
                  </div>
                  <p>
                    {props.user.name ? props.user.name : props.user.email}
                    <i>
                      <Image src={dropdown_menu_arrow} />
                    </i>
                  </p>
                </div>
                <ul className={styles.dropdownMenu}>
                  <li onClick={() => redirectTo('/construccion')}>
                    Perfil
                    <i>
                      <Image alt='Perfil' src={profile_icon} />
                    </i>
                  </li>
                  <li onClick={() => signOut()}>
                    {' '}
                    Log out
                    <i>
                      <Image alt='Cerrar sesión' src={logout_icon} />
                    </i>
                  </li>
                </ul>
                {/* Verified user text */}
                {props.user.stu_verified && (
                  <p className={styles.verified_text}>Estudiante verificado</p>
                )}
                {/* Non-verified user button */}
                {!props.user.stu_verified && (
                  <div className={styles.unverif_button_container}>
                    <button
                      className={`${styles.unverified_button} btn button--redRedborderTransparentHoverShadowtRed`}
                      onClick={() => verifyUser()}
                    >
                      Verifica tu cuenta
                    </button>
                  </div>
                )}
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
              <ul
                className={`${styles.loginMenu} ${
                  !session && loading ? styles.loading : styles.loaded
                }`}
              >
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
          </nav>
        </div>
      </header>
    </>
  );
}
//Map state to props
const mapStateToProps = (reducers) => {
  return reducers.usersReducer;
};

//Map actions to props
const mapDispatchToProps = {
  getUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
