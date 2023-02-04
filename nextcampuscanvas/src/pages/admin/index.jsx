import Link from 'next/link';

//Components
import AdminHeader from '@components/UsedInSpecificRoutes/Admin/AdminHeader/AdminHeader';
import Loader from '@components/GeneralUseComponents/Loader/Loader';

//Session
import { useSession } from 'next-auth/react';

//Styles
import styles from '@pagestyles/admin/admin.module.scss';

//hooks
import useSecureAdminRoute from '@hooks/useSecureAdminRoute';

const index = () => {
  const { securingRoute } = useSecureAdminRoute();

  //Session
  const { data: session, status } = useSession();

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
        <h1>Administración</h1>
        <ul className={styles.routes}>
          {session?.token.role === 'super_admin' && (
            <Link href={'/admin/master'}>
              <li>Admin</li>
            </Link>
          )}
          <Link href={'/admin/descuentos'}>
            <li>Descuentos</li>
          </Link>
          <Link href={'/admin/estudiantes'}>
            <li>Estudiantes</li>
          </Link>
          <Link href={'/admin/clientes'}>
            <li>Clientes</li>
          </Link>
        </ul>
      </div>
    </>
  );
};

export default index;
