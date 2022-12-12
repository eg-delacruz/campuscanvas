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
import Isotype767 from '@assets/GeneralUse/Logos/header_isotype_767.svg';

//Styles
import styles from './Header.module.scss';

//Session
import { useSession } from 'next-auth/react';
import { signOut } from 'next-auth/react';

//Redux actions
import * as usersActions from '@actions/usersActions';
const { getUser } = usersActions;
import * as globalStateActions from '@actions/globalStateActions';
const { open_sidebar } = globalStateActions;

//Services
import { truncateText } from '@services/truncateText.js';

//Hooks
import useWindowDimensions from '@hooks/useWindowDimensions';

//Facebook conversions API
import FB_Conversions_RegisterButton_ViewContent from '@services/fbConversionsAPI/register_buttons_clicks';
const { FB_Conversions_register_button_clicks } =
  FB_Conversions_RegisterButton_ViewContent;
import identifyBrowser from '@services/identifyBrowser';
const { getBrowserName } = identifyBrowser;

function Header(props) {
  const { width, height } = useWindowDimensions();
  const router = useRouter();
  //Session
  const { data: session, status } = useSession();
  const loading = status === 'loading';

  const [state, setState] = useState({ gettingUser: false });

  //This useEffect gets the user data to display user name
  //even if user stops verification process in step 2 or 3
  useEffect(() => {
    const setUserName = async () => {
      setState({ ...state, gettingUser: true });
      if (session && props.usersReducer.user === null) {
        await props.getUser(session.token.sub);
      }
      setState({ ...state, gettingUser: false });
    };
    setUserName();
  }, [session]);

  const [menus, setMenus] = useState({
    isMenuOn: false,
    isUserMenuOn: false,
  });

  const toggleMenu = (event) => {
    setMenus({ ...menus, isMenuOn: !menus.isMenuOn });
  };

  const toggleUserMenu = (event) => {
    setMenus({ ...menus, isUserMenuOn: !menus.isUserMenuOn });
  };

  const hideMenu = () => {
    setMenus({ ...menus, isMenuOn: false });
  };

  const redirectTo = (url) => {
    return router.push(url);
  };

  const handleOpenAccountPage = (url) => {
    props.open_sidebar(true);
    redirectTo(url);
  };

  //Dirigir a usuario al paso de verificación correspondiente
  const verifyUser = () => {
    if (
      !props.usersReducer.user.stu_data.university &&
      !props.usersReducer.user.stu_verified
    ) {
      router.push(
        { pathname: '/auth/registro', query: { step: 2 } },
        'auth/registro'
      );
    }
    if (
      props.usersReducer.user.stu_data.university &&
      !props.usersReducer.user.stu_verified
    ) {
      router.push(
        { pathname: '/auth/registro', query: { step: 3 } },
        'auth/registro'
      );
    }
  };

  //Skeletons
  const loggedUserMenuSkeleton = () => {
    if (status === 'loading' || state.gettingUser) {
      return (
        <div className={styles.logged_user_menu__skeleton}>
          <div className={styles.skeleton_item1}>
            <div className={styles.skeleton_item1_1}></div>
            <div className={styles.skeleton_item1_2}></div>
          </div>
          <div className={styles.skeleton_item2}></div>
        </div>
      );
    }
  };
  const loginMenuSkeleton = () => {
    if (status === 'loading' || state.gettingUser) {
      return (
        <div className={styles.loginMenu__skeleton}>
          <div className={styles['loginMenu__skeleton--button1']}></div>
          <div className={styles['loginMenu__skeleton--button2']}></div>
        </div>
      );
    }
  };

  const sendToFB_Conversions_API = () => {
    FB_Conversions_register_button_clicks(getBrowserName(navigator.userAgent));
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

      <header
        className={`${styles['header']} ${
          props.usersReducer.user && styles.loggedInUserHeader767
        }`}
        id='header'
      >
        {/* Un estilo es scopped y el otro global, tener cuidado */}
        <div className={`${styles['header__container']} container`}>
          {/* Logo + logged user menu */}

          <div
            className={`${styles.header__logo} ${
              props.usersReducer.user ? styles.correctHeaderLoggedUser767 : ''
            }`}
          >
            <Link href='/'>
              <button
                className={`${styles.header__logo_button} ${
                  props.usersReducer.user ? styles.disableLogoLoggedUser767 : ''
                }`}
              >
                <Image
                  height={55}
                  src={Logo_Campus_Canvas}
                  alt='Logo Campus Canvas'
                />
              </button>
            </Link>

            {/* Logged in user menu + validated/unvalidated message*/}
            {loggedUserMenuSkeleton()}

            {props.usersReducer.user && (
              <div
                className={`${styles.header__logged_user_menu} ${styles.userMenuStickyState767}`}
              >
                <div className={styles.header__logged_user_menu_container}>
                  <Link href={'/'}>
                    <button className={styles.header__logged_user_menu_logo767}>
                      <Image src={Isotype767} alt={'Campus Canvas logo'} />
                    </button>
                  </Link>
                  <div
                    onClick={() => toggleUserMenu()}
                    className={
                      styles.header__logged_user_menu_iconButton_container
                    }
                  >
                    <div className={styles.icon}>
                      <Image src={logged_user_icon} />
                    </div>
                    <button>
                      {width < 369
                        ? truncateText(props.usersReducer.user.nickname, 15)
                        : props.usersReducer.user.nickname}
                      <i>
                        <Image src={dropdown_menu_arrow} />
                      </i>
                    </button>
                  </div>
                </div>
                <ul
                  className={`${
                    menus.isUserMenuOn ? styles['dropdow-is-active'] : ''
                  } `}
                >
                  <li onClick={() => handleOpenAccountPage('/cuenta')}>
                    Cuenta
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
                {props.usersReducer.user.stu_verified && (
                  <p className={styles.verified_text}>Estudiante verificado</p>
                )}
                {/* Non-verified user button */}
                {!props.usersReducer.user.stu_verified && (
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
              menus.isMenuOn
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
              <li
                className={`${styles.menu__item} ${styles.menu__item_empresas}`}
              >
                <Link href='/empresas'>Información para empresas</Link>
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

            {loginMenuSkeleton()}

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
                  <li
                    onClick={sendToFB_Conversions_API}
                    className={`${styles.loginMenu__item} btn button--red `}
                  >
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
const mapStateToProps = ({ usersReducer, globalStateReducer }) => {
  return { usersReducer, globalStateReducer };
};

//Map actions to props
const mapDispatchToProps = {
  getUser,
  open_sidebar,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
