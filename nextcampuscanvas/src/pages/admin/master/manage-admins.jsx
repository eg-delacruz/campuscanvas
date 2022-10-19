import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

//Session
import { useSession } from 'next-auth/react';

import styles from '@styles/pagestyles/admin/ManageAdmins.module.scss';

//Components
import SecondaryHeader from '@components/GeneralUseComponents/SecondaryHeader/SecondaryHeader';
import Loader from '@components/GeneralUseComponents/Loader/Loader';

//Assets
import arrow_right_white from '@assets/GeneralUse/IconsAndButtons/arrow_right_white.svg';

//hooks
import { useInputValue } from '@hooks/useInputValue';

//Endpoints
import endPoints from '@services/api';

const manageAdmins = () => {
  const [state, setState] = useState({
    submitLoading: false,
    loading: true,
    error: null,
    responses: '',
  });

  const [admins, setAdmins] = useState({
    all: [],
    gettingAdmins: true,
    error: null,
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

  //Getting all current admins at page load
  useEffect(() => {
    if (session) {
      getAdmins();
    }
  }, [session]);

  //Controlling inputs
  const CREAR_DESTITUIR = useInputValue('');
  const EMAIL_ADMIN = useInputValue('');
  const CONTRASENA = useInputValue('');
  const REP_CONTRASENA = useInputValue('');

  //Functions
  //Crear/Destituir radio buttons(start)
  const isCrearDestituirRadioSelected = (value) =>
    CREAR_DESTITUIR.value === value;
  const handleRadioCrearDestituirClick = (e) => {
    CREAR_DESTITUIR.setValue(e.currentTarget.value);
  };
  //Crear/Destituir radio buttons(end)

  const createAdmin = async (admin_data) => {
    try {
      const respuesta = await fetch(endPoints.admin.manageAdmins, {
        method: 'POST',
        headers: {
          accept: '*/*',
          'Content-Type': 'application/json',
          app_secret_key: process.env.NEXT_PUBLIC_MAIN_NEXT_WEB_APP_SECRET_KEY,
        },
        body: JSON.stringify(admin_data),
      });
      const data = await respuesta.json();

      return data;
    } catch (error) {
      throw new Error(error);
    }
  };

  const revokeAdmin = async (admin_data) => {
    try {
      const respuesta = await fetch(endPoints.admin.manageAdmins, {
        method: 'DELETE',
        headers: {
          accept: '*/*',
          'Content-Type': 'application/json',
          app_secret_key: process.env.NEXT_PUBLIC_MAIN_NEXT_WEB_APP_SECRET_KEY,
        },
        body: JSON.stringify(admin_data),
      });
      const data = await respuesta.json();

      return data;
    } catch (error) {
      throw new Error(error);
    }
  };

  const getAdmins = async () => {
    setAdmins({
      ...admins,
      error: null,
      gettingAdmins: true,
    });
    try {
      const respuesta = await fetch(endPoints.admin.manageAdmins, {
        method: 'GET',
        headers: {
          accept: '*/*',
          'Content-Type': 'application/json',
          app_secret_key: process.env.NEXT_PUBLIC_MAIN_NEXT_WEB_APP_SECRET_KEY,
          master_admin: session.token.sub,
        },
      });
      const data = await respuesta.json();
      setAdmins({
        ...admins,
        all: data.body,
        error: null,
        gettingAdmins: false,
      });

      return data;
    } catch (error) {
      setAdmins({ ...admins, error: error, gettingAdmins: false });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setState({ ...state, error: null, submitLoading: true });

    //Checking if password spelled right
    if (REP_CONTRASENA.value !== CONTRASENA.value) {
      setState({
        ...state,
        error: 'La contraseña debe coincidir',
        submitLoading: false,
      });
      return false;
    }

    const admin_data = {
      userId: session.token.sub,
      admin_email: EMAIL_ADMIN.value,
      password: CONTRASENA.value,
    };

    try {
      //Create admin
      if (CREAR_DESTITUIR.value === 'crear_admin') {
        const data = await createAdmin(admin_data);

        if (data.error) {
          setState({ ...state, error: data.error });

          //Clearing important fields
          CREAR_DESTITUIR.setValue('');
          CONTRASENA.setValue('');
          REP_CONTRASENA.setValue('');

          return false;
        }
        setState({
          ...state,
          error: null,
          submitLoading: false,
          responses: data.body,
        });

        //Clearing important fields
        CREAR_DESTITUIR.setValue('');
        CONTRASENA.setValue('');
        REP_CONTRASENA.setValue('');

        //Reset admins table values
        getAdmins();

        //Reseting state ti stop seeing response message
        setTimeout(() => {
          setState({
            ...state,
            responses: '',
            error: null,
          });
        }, 3000);
      }

      //Revoke admin
      if (CREAR_DESTITUIR.value === 'destituir_admin') {
        const data = await revokeAdmin(admin_data);

        if (data.error) {
          setState({ ...state, error: data.error });

          //Clearing important fields
          CREAR_DESTITUIR.setValue('');
          CONTRASENA.setValue('');
          REP_CONTRASENA.setValue('');

          return false;
        }

        setState({
          ...state,
          error: null,
          submitLoading: false,
          responses: data.body,
        });

        //Clearing important fields
        CREAR_DESTITUIR.setValue('');
        CONTRASENA.setValue('');
        REP_CONTRASENA.setValue('');

        //Reset admins table values
        getAdmins();

        //Reseting state ti stop seeing response message
        setTimeout(() => {
          setState({
            ...state,
            responses: '',
            error: null,
          });
        }, 3000);
      }
    } catch (error) {
      setState({
        ...state,
        error: 'Hubo un error. ' + error.message,
        submitLoading: false,
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
        <Link href={'/admin/master'}>
          <button className={`${styles.button_back} btn button--red`}>
            <span>
              <Image src={arrow_right_white} />
            </span>
            <div>Atrás</div>
          </button>
        </Link>
        <h1>Gestión de roles de administración</h1>

        {/* /////////////////////////
            //          Form       //
            ///////////////////////// */}
        <form
          action=''
          method='POST'
          autoComplete='off'
          onSubmit={handleSubmit}
          className={styles.form}
        >
          {/* Choose action inputs */}
          <div className={styles.inputs_container}>
            <div className={styles.radio_input_container}>
              <input
                required
                className={styles.radio_input}
                type='radio'
                id='crear_admin'
                name='crear_destituir_admin'
                value='crear_admin'
                checked={isCrearDestituirRadioSelected('crear_admin')}
                onChange={handleRadioCrearDestituirClick}
              />
              <label htmlFor='crear_admin'>Crear admin</label>
            </div>
            <div className={styles.radio_input_container}>
              <input
                required
                className={styles.radio_input}
                type='radio'
                id='destituir_admin'
                name='crear_destituir_admin'
                value='destituir_admin'
                checked={isCrearDestituirRadioSelected('destituir_admin')}
                onChange={handleRadioCrearDestituirClick}
              />
              <label htmlFor='destituir_admin'>Destituir admin</label>
            </div>
          </div>

          <div className={styles.input_container}>
            <label htmlFor='email_admin' className={`${styles.input_title}`}>
              E-mail de cuenta administrativa
            </label>
            <input
              className={`${styles.input}`}
              name='email_admin'
              id='email_admin'
              type='email'
              placeholder='E-mail de cuenta administrativa'
              autoComplete='off'
              value={EMAIL_ADMIN.value}
              onChange={EMAIL_ADMIN.onChange}
              required
            />
          </div>

          <div>
            <label htmlFor='contrasena' className={`${styles.input_title}`}>
              Contraseña
            </label>
            <input
              className={`${styles.input}`}
              name='contrasena'
              id='contrasena'
              type='password'
              placeholder='Contraseña'
              autoComplete='off'
              value={CONTRASENA.value}
              onChange={CONTRASENA.onChange}
              required
            />
          </div>

          <div>
            <label htmlFor='rep_contrasena' className={`${styles.input_title}`}>
              Repita la contraseña
            </label>
            <input
              className={`${styles.input}`}
              name='rep_contrasena'
              id='rep_contrasena'
              type='password'
              placeholder='Contraseña'
              autoComplete='off'
              value={REP_CONTRASENA.value}
              onChange={REP_CONTRASENA.onChange}
              required
            />
          </div>
          {state.error && (
            <p className={`${styles.error_displayer} error__message`}>
              {state.error}
            </p>
          )}
          {state.responses && (
            <p
              className={`${styles.success_response_displayer} success__message`}
            >
              {state.responses}
            </p>
          )}

          <button
            type='submit'
            className={`${styles.submit_button} ${
              state.submitLoading && styles.buttonLoading
            } btn button--red`}
            disabled={state.submitLoading}
          >
            {CREAR_DESTITUIR.value === 'destituir_admin'
              ? 'Destituir admin'
              : 'Crear admin'}
          </button>
        </form>

        {/* /////////////////////////
            //      Admins table   //
            ///////////////////////// */}

        <h3>Administradores actuales</h3>
        {admins.gettingAdmins ? (
          <Loader />
        ) : (
          <>
            <table className={styles.current_admins}>
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Email</th>
                </tr>
              </thead>

              <tbody>
                {admins.all.map((admin, index) => (
                  <tr key={index}>
                    <td className={styles.current_admins__column1}>
                      {admin.nickname}
                    </td>
                    <td>{admin.email}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
        {admins.error && (
          <p className={`${styles.error_displayer} error__message`}>
            {admins.error}
          </p>
        )}
      </div>
    </>
  );
};

export default manageAdmins;
