import Image from 'next/image';
import Link from 'next/link';

//Assets
import Logo_Campus_Canvas from '@assets/GeneralUse/Logos/logo.svg';
import UserIcon from '@assets/GeneralUse/UsedInComponents/AdminHeader/UserIcon.svg';
import logout_icon from '@assets/GeneralUse/IconsAndButtons/usedInComponents/Header/logout_icon.svg';

//Styles
import styles from './AdminHeader.module.scss';

//Session
import { signOut } from 'next-auth/react';

const AdminHeader = () => {
  return (
    <header className={styles.header}>
      <div className={`${styles.container} container`}>
        {/* /////////////////////////
            //     Home logo      //
            ///////////////////////// */}

        <Link href='/'>
          <button>
            <Image src={Logo_Campus_Canvas} alt='Logo Campus Canvas' />
          </button>
        </Link>

        {/* /////////////////////////
            //     User menu      //
            ///////////////////////// */}

        <div className={styles.user_container}>
          <div className={styles.user_icon}>
            <Image src={UserIcon} alt='User Icon' />
          </div>
          <ul className={styles.user_dropdown_menu}>
            <li onClick={() => signOut()}>
              {' '}
              Log out
              <i>
                <Image alt='Cerrar sesión' src={logout_icon} />
              </i>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
