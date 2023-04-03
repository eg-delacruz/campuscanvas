import Link from 'next/link';

//Styles
import styles from '@pagestyles/admin/clients/clients.module.scss';

//Components
import AdminHeader from '@components/UsedInSpecificRoutes/Admin/AdminHeader/AdminHeader';
import Loader from '@components/GeneralUseComponents/Loader/Loader';

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
        <h1>Clientes</h1>

        <ul className={styles.routes}>
          <Link href={'/admin/clientes/nuevo-contrato'}>
            <li>Nuevo contrato</li>
          </Link>
          <Link href={'#'}>
            <li>Buscar contrato por número</li>
          </Link>
        </ul>
      </div>
    </>
  );
};

export default index;
