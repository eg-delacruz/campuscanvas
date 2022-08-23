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

const index = () => {
  const [state, setState] = useState({
    loading: true,
  });

  //Session
  const { data: session, status } = useSession();

  const router = useRouter();

  //Securing route
  if (status === 'unauthenticated') {
    router.push('/auth/login');
  }
  if (session) {
    if (
      !(
        session?.token.role === 'super_admin' || session?.token.role === 'admin'
      )
    ) {
      router.push('/');
    }
  }

  useEffect(() => {
    if (
      session?.token.role === 'super_admin' ||
      session?.token.role === 'admin'
    ) {
      setState({ ...state, loading: false });
    }
  }, [session]);

  if (state.loading) {
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
          {/* TODO:
            In this route show all admin persons. Secure it so that only super_admin can see it. Make option to create admin account */}
          {session?.token.role === 'super_admin' && (
            <Link href={'/'}>
              <li>Admin</li>
            </Link>
          )}
          <Link href={'/'}>
            <li>Clientes</li>
          </Link>
          <Link href={'/'}>
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
