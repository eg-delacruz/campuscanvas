import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

//Session
import { useSession } from 'next-auth/react';

import styles from '@styles/pagestyles/admin/master/ManageAdmins.module.scss';

//Components
import AdminHeader from '@components/UsedInSpecificRoutes/Admin/AdminHeader/AdminHeader';
import Loader from '@components/GeneralUseComponents/Loader/Loader';
import ConfirmationSwal from '@components/GeneralUseComponents/ConfirmationSwal/ConfirmationSwal';

//React query
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import adminKeys from '@query-key-factory/adminKeys';

//Assets
import arrow_right_white from '@assets/GeneralUse/IconsAndButtons/arrow_right_white.svg';

//hooks
import { useInputValue } from '@hooks/useInputValue';
import useSecureAdminRoute from '@hooks/useSecureAdminRoute';

//Request functions
import adminFunctions from '@request-functions/Admin/index';

const manageAdmins = () => {
  const { securingRoute } = useSecureAdminRoute('master');

  const [clientError, setClientError] = useState(null);

  //Session
  const { data: session } = useSession();

  //React query
  const queryClient = useQueryClient();

  const ALL_ADMINS = useQuery({
    queryKey: [adminKeys.all_admin_users],
    queryFn: () => adminFunctions.getAdminUsers(session?.token.sub),
    staleTime: 1000 * 60 * 60 * 24, //24 hours
    enabled: session ? true : false,
  });

  const CREATE_ADMIN = useMutation({
    mutationFn: (admin_data) => adminFunctions.createNewAdmin(admin_data),
    onSuccess: (data) => {
      //Replace info in cache instead of refetching
      queryClient.setQueryData([adminKeys.all_admin_users], (oldData) => {
        if (oldData?.length > 0) {
          return [...oldData, data?.newAdmin];
        } else {
          ALL_ADMINS.refetch();
        }
      });

      //Show a confirmation swal
      ConfirmationSwal({
        message: data?.message,
      });
    },
    onError: () => {
      //Clean CREATE_ADMIN.error after 5 seconds
      setTimeout(() => {
        CREATE_ADMIN.reset();
      }, 5000);
    },
    onSettled: () => {
      //Clearing important fields
      CREAR_DESTITUIR.setValue('');
      CONTRASENA.setValue('');
      REP_CONTRASENA.setValue('');
    },
  });

  const DESTITUIR_ADMIN = useMutation({
    mutationFn: (admin_data) => adminFunctions.revokeAdmin(admin_data),
    onSuccess: (data) => {
      //Eliminate admin from cache instead of refetching by finding it by admin.email property
      queryClient.setQueryData([adminKeys.all_admin_users], (oldData) => {
        if (oldData?.length > 0) {
          return oldData.filter(
            (admin) => admin.email !== data?.revokedAdmin.email
          );
        } else {
          ALL_ADMINS.refetch();
        }
      });

      //Show a confirmation swal
      ConfirmationSwal({
        message: data?.message,
      });
    },
    onError: () => {
      //Clean CREATE_ADMIN.error after 5 seconds
      setTimeout(() => {
        CREATE_ADMIN.reset();
      }, 5000);
    },
    onSettled: () => {
      //Clearing important fields
      CREAR_DESTITUIR.setValue('');
      CONTRASENA.setValue('');
      REP_CONTRASENA.setValue('');
    },
  });

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setClientError(null);

    //Checking if password spelled right
    if (REP_CONTRASENA.value !== CONTRASENA.value) {
      setClientError('La contraseña debe coincidir');
      return false;
    }

    const admin_data = {
      master_id: session.token.sub,
      new_admin_email: EMAIL_ADMIN.value,
      master_password: CONTRASENA.value,
    };

    //Create admin
    if (CREAR_DESTITUIR.value === 'crear_admin') {
      CREATE_ADMIN.mutate(admin_data);
    }

    //Revoke admin
    if (CREAR_DESTITUIR.value === 'destituir_admin') {
      DESTITUIR_ADMIN.mutate(admin_data);
    }
  };

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
          {clientError && (
            <p className={`${styles.error_displayer} error__message`}>
              {clientError}
            </p>
          )}

          {CREATE_ADMIN.isError && (
            <p className={`${styles.error_displayer} error__message`}>
              {CREATE_ADMIN.error?.message}
            </p>
          )}

          {DESTITUIR_ADMIN.isError && (
            <p className={`${styles.error_displayer} error__message`}>
              {DESTITUIR_ADMIN.error?.message}
            </p>
          )}

          <button
            type='submit'
            className={`${styles.submit_button} ${
              CREATE_ADMIN.isLoading === true ||
              (DESTITUIR_ADMIN.isLoading === true && styles.buttonLoading)
            } btn button--red`}
            disabled={CREATE_ADMIN.isLoading || DESTITUIR_ADMIN.isLoading}
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
        {ALL_ADMINS.isLoading ? (
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
                {ALL_ADMINS.data?.map((admin, index) => (
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
        {ALL_ADMINS.isError && (
          <p className={`${styles.error_displayer} error__message`}>
            {ALL_ADMINS.error?.message}
          </p>
        )}
      </div>
    </>
  );
};

export default manageAdmins;
