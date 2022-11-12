import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { signOut } from 'next-auth/react';

//Session
import { useSession } from 'next-auth/react';

//Styles
import styles from '@pagestyles/admin/students/students.module.scss';

//Components
import SecondaryHeader from '@components/GeneralUseComponents/SecondaryHeader/SecondaryHeader';
import Loader from '@components/GeneralUseComponents/Loader/Loader';

//Assets
import arrow_right_black from '@assets/GeneralUse/IconsAndButtons/arrow_right_white.svg';

//Endpoints
import endPoints from '@services/api';

const index = () => {
  const [state, setState] = useState({
    loading: true,
    error: 'Holi',
  });
  //Stores true or false, just to desplay if there are pending validations
  const [pendingValidations, setPendingValidations] = useState(false);

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

  useEffect(() => {
    if (session) {
      getPendingValitadionsAvailable();
    }
  }, [session]);

  const getPendingValitadionsAvailable = async () => {
    setState({ ...state, error: null });
    try {
      const respuesta = await fetch(endPoints.user.getPendingStuIdValidations, {
        method: 'GET',
        headers: {
          accept: '*/*',
          'Content-Type': 'application/json',
          app_secret_key: process.env.NEXT_PUBLIC_MAIN_NEXT_WEB_APP_SECRET_KEY,
          website_location: 'admin_estudiantes_index',
        },
      });

      const data = await respuesta.json();

      if (data.error) {
        setState({ ...state, error: data.error });
        return false;
      }

      setPendingValidations(data.body);
      setState({ ...state, error: null, loading: false });
    } catch (error) {
      setState({
        ...state,
        error: error,
      });
    }
  };

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
        <h1>Estudiantes</h1>
        <Link href={'/admin'}>
          <button className={`${styles.button_back} btn button--red`}>
            <span>
              <Image src={arrow_right_black} />
            </span>
            <div>Atrás</div>
          </button>
        </Link>

        <ul className={styles.routes}>
          <Link href={'#'}>
            <li>Obtener datos de estudiante</li>
          </Link>
          <Link href={'/admin/estudiantes/validaciones-por-id-pendientes'}>
            <li className={`${pendingValidations && styles.buttonLoading}`}>
              Validaciones pendientes
            </li>
          </Link>
        </ul>

        {state.error && <p className={`error__messagev2`}>{state.error}</p>}
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
