import PropTypes from 'prop-types';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Image from 'next/image';

//Styles
import styles from './UserSidebar.module.scss';

//Assets
import user_icon from '@assets/GeneralUse/IconsAndButtons/usedInComponents/UserSidebar/user.svg';
import home_icon from '@assets/GeneralUse/IconsAndButtons/usedInComponents/UserSidebar/home.svg';
import cc_logo from '@assets/GeneralUse/IconsAndButtons/usedInComponents/UserSidebar/campus_canvas.svg';
import logout_icon from '@assets/GeneralUse/IconsAndButtons/usedInComponents/UserSidebar/logout.svg';
import logged_user_icon from '@assets/GeneralUse/IconsAndButtons/logged_user.svg';
import arrow_right_black from '@assets/GeneralUse/IconsAndButtons/arrow_right_black.svg';

//Session
import { useSession } from 'next-auth/react';
import { signOut } from 'next-auth/react';

const UserSidebar = (props) => {
  const router = useRouter();

  //Session
  const { data: session, status } = useSession();

  //Dirigir a usuario al paso de verificación correspondiente
  const verifyUser = () => {
    if (!session?.token.stu_data.university && !session?.token.stu_verified) {
      return router.push(
        { pathname: '/auth/registro', query: { step: 2 } },
        'auth/registro'
      );
    }
    if (session?.token.stu_data.university && !session?.token.stu_verified) {
      return router.push(
        { pathname: '/auth/registro', query: { step: 3 } },
        'auth/registro'
      );
    }
  };

  const verifiedUnverifiedButtonDisplayer = () => {
    if (status === 'loading') {
      return <p>Cargando...</p>;
    }
    if (session?.token.stu_verified) {
      return (
        /* Verified user text */
        <p className={styles.sidebar__verified_text}>Estudiante verificado</p>
      );
    }
    if (!session?.token.stu_verified) {
      return (
        /* Non-verified user button */
        <button
          className={`${styles.sidebar__unverified_button} btn button--redRedborderTransparentHoverShadowtRed`}
          onClick={() => verifyUser()}
        >
          Verifica tu cuenta
        </button>
      );
    }
  };

  return (
    <nav className={`${styles.sidebar} ${!props.openSidebar && styles.close}`}>
      {/* /////////////////////////
          //    Logo + user     //
          ///////////////////////// */}
      <div className={styles.sidebar__header}>
        <Link href='/' passHref>
          <div className={styles.sidebar__logo}>
            <Image src={cc_logo} alt='Logo Campus Canvas' />
          </div>
        </Link>
        <div className={styles.sidebar__user_verify}>
          <div className={styles.sidebar__header_icon}>
            <Image src={logged_user_icon} />
          </div>

          {verifiedUnverifiedButtonDisplayer()}
        </div>
      </div>

      {/* /////////////////////////
          //  Sidebar elements   //
          ///////////////////////// */}
      <ul className={styles.sidebar__options}>
        <li>
          <Link href='/' passHref>
            <div
              className={`${styles.sidebar__option} ${
                router.pathname === '/' ? styles.activeLink : ''
              }`}
            >
              <div className={styles.sidebar__option_icon_text}>
                <Image src={home_icon} alt='Home' />
                <p>Home</p>
              </div>
            </div>
          </Link>
        </li>
        <li
          onClick={() => {
            props.setOpenSidebar(false);
          }}
        >
          <Link href='/cuenta' passHref>
            <div
              className={`${styles.sidebar__option} ${
                router.pathname === '/cuenta' ? styles.activeLink : ''
              }`}
            >
              <div className={styles.sidebar__option_icon_text}>
                <Image src={user_icon} alt='Cuenta' />
                <p>Perfil </p>
              </div>
              <span className={styles.sidebar__option_black_arrow}>
                <Image src={arrow_right_black} />
              </span>
            </div>
          </Link>
        </li>
      </ul>
      <div
        onClick={() => signOut()}
        className={`${styles.sidebar__option} ${styles.sidebar__logout}`}
      >
        <div className={styles.sidebar__option_icon_text}>
          <Image src={logout_icon} alt='Logout' />
          <p>Log out</p>
        </div>
      </div>
    </nav>
  );
};

export default UserSidebar;

UserSidebar.propTypes = {
  setOpenSidebar: PropTypes.func.isRequired,
  openSidebar: PropTypes.bool.isRequired,
};
