import { useState } from 'react';
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

const UserSidebar = (props) => {
  const router = useRouter();
  //Use this state only in the MQ of 480px
  const [isOpen, setIsOpen] = useState(false);
  return (
    <nav className={styles.sidebar}>
      <Link href='/' passHref>
        <div className={styles.sidebar__logo}>
          <Image src={cc_logo} alt='Logo Campus Canvas' />
        </div>
      </Link>
      <ul className={styles.sidebar__options}>
        <li>
          <Link href='/' passHref>
            <div
              className={`${styles.sidebar__option} ${
                router.pathname === '/' ? styles.activeLink : ''
              }`}
            >
              <Image src={home_icon} alt='Home' />
              <p>Home</p>
            </div>
          </Link>
        </li>
        <li>
          <Link href='/cuenta' passHref>
            <div
              className={`${styles.sidebar__option} ${
                router.pathname === '/cuenta' ? styles.activeLink : ''
              }`}
            >
              <Image src={user_icon} alt='Cuenta' />
              <p>Perfil</p>
            </div>
          </Link>
        </li>
      </ul>
      <div className={`${styles.sidebar__option} ${styles.sidebar__logout}`}>
        <Image src={logout_icon} alt='Logout' />
        <p>Log out</p>
      </div>
    </nav>
  );
};

export default UserSidebar;
