import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Link from 'next/link';

//Components
import SecondaryHeader from '@components/GeneralUseComponents/SecondaryHeader/SecondaryHeader';
import Loader from '@components/GeneralUseComponents/Loader/Loader';

//Session
import { useSession } from 'next-auth/react';
import { signOut } from 'next-auth/react';

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
      <SecondaryHeader />
      <div className={`${styles.container} container`}>
        <h1>Administración</h1>
        <ul className={styles.routes}>
          {session?.token.role === 'super_admin' && (
            <Link href={'/admin/master'}>
              <li>Admin</li>
            </Link>
          )}
          <Link href={'/admin/clientes'}>
            <li>Clientes</li>
          </Link>
          <Link href={'/admin/estudiantes'}>
            <li>Estudiantes</li>
          </Link>
          <button onClick={() => signOut()} className='btn button--red'>
            Log out
          </button>
        </ul>
      </div>
    </>
  );
};

export default index;
