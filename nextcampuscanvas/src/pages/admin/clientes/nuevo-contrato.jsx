import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

//Session
import { useSession } from 'next-auth/react';

//Styles
import styles from '@pagestyles/admin/nuevoContrato.module.scss';

//Components
import SecondaryHeader from '@components/GeneralUseComponents/SecondaryHeader/SecondaryHeader';
import Loader from '@components/GeneralUseComponents/Loader/Loader';

//Assets
import arrow_right_white from '@assets/GeneralUse/IconsAndButtons/arrow_right_white.svg';

const nuevoContrato = () => {
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
      <div className='container'>
        <Link href={'/admin/clientes'}>
          <button className={`${styles.button_back} btn button--red`}>
            <span>
              <Image src={arrow_right_white} />
            </span>
            <div>Atrás</div>
          </button>
        </Link>
        <h1>Nuevo contrato</h1>
      </div>
    </>
  );
};

export default nuevoContrato;
