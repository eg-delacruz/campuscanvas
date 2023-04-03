import Link from 'next/link';

//Components
import AdminHeader from '@components/UsedInSpecificRoutes/Admin/AdminHeader/AdminHeader';
import Loader from '@components/GeneralUseComponents/Loader/Loader';

//Styles
import styles from '@pagestyles/admin/admin.module.scss';

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
        <h1>Administración</h1>
        <p>Dashboard - próximamente...</p>
      </div>
    </>
  );
};

export default index;
