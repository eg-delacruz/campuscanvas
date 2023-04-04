import Image from 'next/image';
import Link from 'next/link';

//Assets
import UserIcon from '@assets/GeneralUse/UsedInComponents/AdminHeader/UserIcon.svg';
import logout_icon from '@assets/GeneralUse/IconsAndButtons/usedInComponents/Header/logout_icon.svg';
import plain_cc_isotype from '@assets/GeneralUse/Logos/plain_cc_isotype.svg';

//Session
import { useSession } from 'next-auth/react';

//Components
import BurgerButton from '@components/GeneralUseComponents/BurguerButton/BurgerButton';

//Hooks
import { useInputValue } from '@hooks/useInputValue';
import useWindowDimensions from '@hooks/useWindowDimensions';

//Styles
import styles from './AdminHeader.module.scss';

//Session
import { signOut } from 'next-auth/react';

const AdminHeader = () => {
  //Session
  const { data: session, status } = useSession();
  const { width } = useWindowDimensions();

  //Controlling inputs
  const MenuCheckbox_767 = useInputValue(false);

  const onMenuCheckbox_767Change = () => {
    MenuCheckbox_767.setValue(!MenuCheckbox_767.value);
  };

  const close767Menu = () => {
    if (width <= 767) MenuCheckbox_767.setValue(false);
  };

  //TODO: display something to show if there are pending validations
  return (
    <header className={styles.header}>
      <div className={`${styles.container} container`}>
        <input
          className={styles.menu_checkbox_767}
          checked={MenuCheckbox_767.value}
          onChange={onMenuCheckbox_767Change}
          type='checkbox'
          id='menu-bar'
        />
        <label htmlFor='menu-bar' className={styles.menu_bar}>
          <BurgerButton />
        </label>
        {/* /////////////////////////
            //     Home logo      //
            ///////////////////////// */}

        <Link href='/'>
          <button className={styles.logo_container} type='button'>
            <Image
              width={50}
              height={50}
              src={plain_cc_isotype}
              alt='Logo Campus Canvas'
            />
          </button>
        </Link>

        {/* /////////////////////////
            //      Nav bar       //
            ///////////////////////// */}

        <nav
          className={`${styles.navbar} ${
            MenuCheckbox_767.value ? styles.activ_navbar : ''
          }`}
        >
          <ul className={styles.upper_ul}>
            <li onClick={close767Menu}>
              <Link href={'/admin'}>Dashboard</Link>
            </li>

            <li>
              <Link
                href={
                  width > 767 ? '/admin/descuentos/gestionar-descuentos' : '#'
                }
              >
                Descuentos
              </Link>
              <ul className={styles.second_level_ul}>
                <li onClick={close767Menu}>
                  <Link href={'/admin/descuentos/gestionar-descuentos'}>
                    Gestionar descuentos
                  </Link>
                </li>
                <li onClick={close767Menu}>
                  <Link href={'/admin/descuentos/gestionar-marcas'}>
                    Marcas
                  </Link>
                </li>
                <li onClick={close767Menu}>
                  <Link href={'/admin/descuentos/gestionar-home-slider'}>
                    Home slider
                  </Link>
                </li>
              </ul>
            </li>

            <li>
              <Link
                href={
                  width > 767
                    ? '/admin/estudiantes/obtener-datos-usuarios'
                    : '#'
                }
              >
                Estudiantes
              </Link>
              <ul className={styles.second_level_ul}>
                <li onClick={close767Menu}>
                  <Link href={'/admin/estudiantes/obtener-datos-usuarios'}>
                    Datos de estudiantes
                  </Link>
                </li>
                <li onClick={close767Menu}>
                  <Link
                    href={'/admin/estudiantes/validaciones-por-id-pendientes'}
                  >
                    Validaciones pend.
                  </Link>
                </li>
              </ul>
            </li>

            <li>
              <Link href={width > 767 ? '/admin/clientes' : '#'}>Clientes</Link>
              <ul className={styles.second_level_ul}>
                <li onClick={close767Menu}>
                  <Link href={'/admin/clientes'}>Opciones</Link>
                </li>
                <li onClick={close767Menu}>
                  <Link href={'/admin/clientes/nuevo-contrato'}>
                    Nuevo contrato
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
        </nav>

        {/* /////////////////////////
            //     User menu      //
            ///////////////////////// */}

        <div className={styles.user_container}>
          <div className={styles.user_icon}>
            <Image src={UserIcon} alt='User Icon' />
          </div>
          <ul className={styles.user_dropdown_menu}>
            {session.token.role === 'super_admin' && (
              <Link href={'/admin/master'}>
                <li>Master admin</li>
              </Link>
            )}

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
