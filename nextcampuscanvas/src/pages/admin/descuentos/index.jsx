import Link from 'next/link';
import Image from 'next/image';
import { signOut } from 'next-auth/react';

//styles
import styles from '@styles/pagestyles/admin/descuentos/descuentos.module.scss';

//Components
import SecondaryHeader from '@components/GeneralUseComponents/SecondaryHeader/SecondaryHeader';
import Loader from '@components/GeneralUseComponents/Loader/Loader';

//Assets
import arrow_right_white from '@assets/GeneralUse/IconsAndButtons/arrow_right_white.svg';

//hooks
import useSecureAdminRoute from '@hooks/useSecureAdminRoute';
const index = () => {
  const { securingRoute } = useSecureAdminRoute();

  if (securingRoute) {
    return (
      <div className={styles.loaderContainer}>
        <Loader />
      </div>
    );
  }
  return (
    <>
      <SecondaryHeader />

      <div className={`${styles.container} container`}>
        <h1>Descuentos</h1>
        <Link href={'/admin'}>
          <button className={`${styles.button_back} btn button--red`}>
            <span>
              <Image src={arrow_right_white} />
            </span>
            <div>Atrás</div>
          </button>
        </Link>

        <ul className={styles.routes}>
          <Link href={'/admin/descuentos/nuevo-descuento'}>
            <li>Crear nuevo descuento</li>
          </Link>
          <Link href={'#'}>
            <li>Gestionar descuentos</li>
          </Link>
          <Link href={'/admin/descuentos/gestionar-marcas'}>
            <li>Gestionar marcas</li>
          </Link>
        </ul>
        <button
          onClick={() => signOut()}
          className={`${styles.button_logout} btn button--red`}
        >
          Log out
        </button>
      </div>
    </>
  );
};

export default index;
