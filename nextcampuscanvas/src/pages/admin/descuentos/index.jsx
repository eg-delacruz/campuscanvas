import Link from 'next/link';
import Image from 'next/image';

//styles
import styles from '@styles/pagestyles/admin/descuentos/descuentos.module.scss';

//Components
import AdminHeader from '@components/UsedInSpecificRoutes/Admin/AdminHeader/AdminHeader';
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
      <AdminHeader />

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
          <Link href={'/admin/descuentos/gestionar-descuentos'}>
            <li>Gestionar descuentos</li>
          </Link>
          <Link href={'/admin/descuentos/gestionar-marcas'}>
            <li>Gestionar marcas</li>
          </Link>
          <Link href={'/admin/descuentos/gestionar-home-slider'}>
            <li>Gestionar Home Slider</li>
          </Link>
        </ul>
      </div>
    </>
  );
};

export default index;
