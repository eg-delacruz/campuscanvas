import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';

//Assets
import Logo_Campus_Canvas from '@assets/GeneralUse/Logos/logo.svg';
import logged_user_icon from '@assets/GeneralUse/IconsAndButtons/logged_user.svg';
import logout_icon from '@assets/GeneralUse/IconsAndButtons/usedInComponents/Header/logout_icon.svg';
import profile_icon from '@assets/GeneralUse/IconsAndButtons/usedInComponents/Header/profile_icon.svg';
import admin_icon from '@assets/GeneralUse/IconsAndButtons/usedInComponents/Header/admin_icon.svg';
import dropdown_menu_arrow from '@assets/GeneralUse/IconsAndButtons/usedInComponents/Header/dropdown_menu_arrow.svg';
import Isotype767 from '@assets/GeneralUse/Logos/header_isotype_767.svg';

//Styles
import styles from './Header.module.scss';

//Session
import { useSession } from 'next-auth/react';
import { signOut } from 'next-auth/react';

//Redux actions
import { getUser, selectUser } from '@redux/usersSlice';
import { openSidebar } from '@redux/globalStateSlice';

//Services
import { truncateText } from '@services/truncateText.js';

//Hooks
import useWindowDimensions from '@hooks/useWindowDimensions';
import useSecureUnverifRoutesInsideFunction from '@hooks/useSecureUnverifRouteInsideFunction';

//Facebook conversions API
import FB_Conversions_RegisterButton_ViewContent from '@services/fbConversionsAPI/register_buttons_clicks';
const { FB_Conversions_register_button_clicks } =
  FB_Conversions_RegisterButton_ViewContent;
import identifyBrowser from '@services/identifyBrowser';
const { getBrowserName } = identifyBrowser;

export default function Header() {
  const { width, height } = useWindowDimensions();

  const { redirectUnverifUser } = useSecureUnverifRoutesInsideFunction();

  const router = useRouter();
  //Session
  const { data: session, status } = useSession();
  const loading = status === 'loading';

  //States
  const [comparingIfNameChanged, setComparingIfNameChanged] = useState({
    comparing: true,
    changed: false,
  });
  const [state, setState] = useState({ gettingUser: false });

  //Allows us to manipulate the appropriate slice/action
  const dispatch = useDispatch();

  //Reducers
  const usersReducer = useSelector(selectUser);

  //This useEffect gets the user data to be able to redirect user to the correct step of the registration process and to compare if the user name in the session is the same as the one in the reducer to display the correct name
  useEffect(() => {
    const setUserName = async () => {
      setState({ ...state, gettingUser: true });
      if (session && usersReducer.user === null) {
        dispatch(getUser(session.token.sub));
      }
      setState({ ...state, gettingUser: false });
    };
    setUserName();
  }, [session]);

  //This useEffect compares the user name in the session with the one in the reducer
  useEffect(() => {
    if (usersReducer.user && session) {
      if (usersReducer.user.nickname !== session.token.name) {
        setComparingIfNameChanged({
          ...comparingIfNameChanged,
          changed: true,
          comparing: false,
        });
        return;
      }
      setComparingIfNameChanged({
        ...comparingIfNameChanged,
        changed: false,
        comparing: false,
      });
    }
  }, [usersReducer.user]);

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
    dispatch(openSidebar(true));
    redirectTo(url);
  };

  //This function is only displayed if there is a session
  const nameDisplayer = () => {
    if (comparingIfNameChanged.comparing || !comparingIfNameChanged.changed) {
      return (
        <>
          {width < 369
            ? truncateText(session.token.name, 15)
            : session.token.name}
        </>
      );
    }
    if (comparingIfNameChanged.changed) {
      return (
        <>
          {width < 369
            ? truncateText(usersReducer.user.nickname, 15)
            : usersReducer.user.nickname}
        </>
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
          session && styles.loggedInUserHeader767
        }`}
        id='header'
      >
        {/* Un estilo es scopped y el otro global, tener cuidado */}
        <div className={`${styles['header__container']} container`}>
          {/* Logo + logged user menu */}

          {/* This correct header is used to avoid header overlay over the top page content if the user is logged in */}
          <div
            className={`${styles.header__logo} ${
              session ? styles.correctHeaderLoggedUser767 : ''
            }`}
          >
            <Link href='/'>
              <button
                className={`${styles.header__logo_button} ${
                  session ? styles.disableLogoLoggedUser767 : ''
                }`}
              >
                <Image
                  width={280}
                  src={Logo_Campus_Canvas}
                  alt='Logo Campus Canvas'
                />
              </button>
            </Link>

            {/* Logged in user menu + validated/unvalidated message*/}
            {session && (
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
                      {nameDisplayer()}
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
                  {session?.token.role === 'admin' ||
                  session.token.role === 'super_admin' ? (
                    <li onClick={() => redirectTo('/admin')}>
                      Admin
                      <i>
                        <Image alt='Admin' src={admin_icon} />
                      </i>
                    </li>
                  ) : (
                    ''
                  )}
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
                {session.token.stu_verified && (
                  <p className={styles.verified_text}>Estudiante verificado</p>
                )}
                {/* Non-verified user button */}
                {!session.token.stu_verified && (
                  <div className={styles.unverif_button_container}>
                    <button
                      className={`${styles.unverified_button} btn button--redRedborderTransparentHoverShadowtRed`}
                      onClick={() => redirectUnverifUser()}
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
              <Link href='/'>
                <li className={styles.menu__item}>Home</li>
              </Link>
              {/* TODO: uncomment when I start to work with campus box */}
              {/* <Link href='/campusbox'>
                <li className={styles.menu__item}>Campus Box</li>
              </Link> */}
              <Link href='/descuentos/todos'>
                <li className={styles.menu__item}>Descuentos</li>
              </Link>
              <Link href='/blog'>
                <li className={styles.menu__item}>Blog</li>
              </Link>
            </ul>

            {/* /////////////////////////
            //     Login buttons      //
            ///////////////////////// */}

            {/* {loginMenuSkeleton()} */}

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
