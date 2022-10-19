import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { signOut } from 'next-auth/react';

//Session
import { useSession } from 'next-auth/react';

//Styles
import styles from '@pagestyles/admin/master.module.scss';

//Components
import SecondaryHeader from '@components/GeneralUseComponents/SecondaryHeader/SecondaryHeader';
import Loader from '@components/GeneralUseComponents/Loader/Loader';

//Assets
import arrow_right_black from '@assets/GeneralUse/IconsAndButtons/arrow_right_white.svg';

const index = () => {
  //TODO:
  // show all admin persons below

  const [state, setState] = useState({
    loading: true,
  });

  //Session
  const { data: session, status } = useSession();

  const router = useRouter();

  //Securing route (start)
  if (status === 'unauthenticated') {
    router.push('/auth/login');
  }
  if (session) {
    if (!(session?.token.role === 'super_admin')) {
      router.push('/');
    }
  }

  useEffect(() => {
    if (session?.token.role === 'super_admin') {
      setState({ ...state, loading: false });
    }
  }, [session]);
  //Securing route (end)

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
        <h1>Master</h1>
        <Link href={'/admin'}>
          <button className={`${styles.button_back} btn button--red`}>
            <span>
              <Image src={arrow_right_black} />
            </span>
            <div>Atrás</div>
          </button>
        </Link>

        <ul className={styles.routes}>
          <Link href={'/admin/master/nuevo-admin'}>
            <li>Gestionar roles admin</li>
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
