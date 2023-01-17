import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSelector, useDispatch } from 'react-redux';
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
import { getUser, selectUser } from '@redux/usersSlice';
import { openSidebar } from '@redux/globalStateSlice';

//Services
import { truncateText } from '@services/truncateText.js';

//Hooks
import useWindowDimensions from '@hooks/useWindowDimensions';
import useRedirectIfAdmin from '@hooks/useRedirectIfAdmin';

//Facebook conversions API
import FB_Conversions_RegisterButton_ViewContent from '@services/fbConversionsAPI/register_buttons_clicks';
const { FB_Conversions_register_button_clicks } =
  FB_Conversions_RegisterButton_ViewContent;
import identifyBrowser from '@services/identifyBrowser';
const { getBrowserName } = identifyBrowser;

function Header() {
  //Redirecting if admin
  useRedirectIfAdmin();

  const { width, height } = useWindowDimensions();
  const router = useRouter();
  //Session
  const { data: session, status } = useSession();
  const loading = status === 'loading';

  //Allows us to manipulate the appropriate slice/action
  const dispatch = useDispatch();

  //Reducers
  const usersReducer = useSelector(selectUser);

  const [state, setState] = useState({ gettingUser: false });

  //This useEffect gets the user data to display user name
  //even if user stops verification process in step 2 or 3
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

  //Dirigir a usuario al paso de verificación correspondiente
  const verifyUser = () => {
    if (
      !usersReducer.user.stu_data.university &&
      !usersReducer.user.stu_verified
    ) {
      router.push(
        { pathname: '/auth/registro', query: { step: 2 } },
        'auth/registro'
      );
    }
    if (
      usersReducer.user.stu_data.university &&
      !usersReducer.user.stu_verified
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
          usersReducer.user && styles.loggedInUserHeader767
        }`}
        id='header'
      >
        {/* Un estilo es scopped y el otro global, tener cuidado */}
        <div className={`${styles['header__container']} container`}>
          {/* Logo + logged user menu */}

          <div
            className={`${styles.header__logo} ${
              usersReducer.user ? styles.correctHeaderLoggedUser767 : ''
            }`}
          >
            <Link href='/'>
              <button
                className={`${styles.header__logo_button} ${
                  usersReducer.user ? styles.disableLogoLoggedUser767 : ''
                }`}
              >
                <Image
                  //height={55}
                  width={280}
                  src={Logo_Campus_Canvas}
                  alt='Logo Campus Canvas'
                />
              </button>
            </Link>

            {/* Logged in user menu + validated/unvalidated message*/}
            {loggedUserMenuSkeleton()}

            {usersReducer.user && (
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
                        ? truncateText(usersReducer.user.nickname, 15)
                        : usersReducer.user.nickname}
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
                {usersReducer.user.stu_verified && (
                  <p className={styles.verified_text}>Estudiante verificado</p>
                )}
                {/* Non-verified user button */}
                {!usersReducer.user.stu_verified && (
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
              <Link href='/'>
                <li className={styles.menu__item}>Home</li>
              </Link>
              <Link href='/campusbox'>
                <li className={styles.menu__item}>Campus Box</li>
              </Link>
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

export default Header;
