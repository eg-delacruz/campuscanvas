import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

//Session
import { useSession } from 'next-auth/react';

//Styles
import styles from '@styles/pagestyles/admin/students/validacionesPorIdPendientes.module.scss';

//Components
import SecondaryHeader from '@components/GeneralUseComponents/SecondaryHeader/SecondaryHeader';
import Loader from '@components/GeneralUseComponents/Loader/Loader';

//Assets
import arrow_right_white from '@assets/GeneralUse/IconsAndButtons/arrow_right_white.svg';

//Services
import { ToUploadImageConfig } from '@services/ToUploadImageConfig';
import dateToLetters from '@services/dateToLetters';

//hooks
import { useInputValue } from '@hooks/useInputValue';

//Endpoints
import endPoints from '@services/api';

//TODO: work on "reject" button handler

const validaciones_por_id_pendientes = () => {
  const [state, setState] = useState({
    loading: false,
    error: null,
    gettingValidations: true,
    gettingValidationsError: null,
    validating: false,
    validatingError: false,
  });

  const [pendingValidations, setPendingValidations] = useState([]);
  const [pendingValidationsLeft, setPendingValidationsLeft] = useState(0);

  const [validateAcc, setValidateAcc] = useState({
    user_email: '',
    userID: '',
  });

  //Session
  const { data: session, status } = useSession();

  const router = useRouter();

  //Securing route (start)
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
    setState({ ...state, loading: true });
    if (
      session?.token.role === 'super_admin' ||
      session?.token.role === 'admin'
    ) {
      setState({ ...state, loading: false });
    }
  }, [session]);
  //Securing route (end)

  useEffect(() => {
    getPendingValitadions();
  }, []);

  //Controlling inputs
  const STU_ID = useInputValue('');

  const getPendingValitadions = async () => {
    setState({
      ...state,
      gettingValidations: true,
      gettingValidationsError: null,
    });
    try {
      const respuesta = await fetch(endPoints.user.getPendingStuIdValidations, {
        method: 'GET',
        headers: {
          accept: '*/*',
          'Content-Type': 'application/json',
          app_secret_key: process.env.NEXT_PUBLIC_MAIN_NEXT_WEB_APP_SECRET_KEY,
          website_location: 'admin_pending_validations',
        },
      });

      const data = await respuesta.json();

      if (data.error) {
        setState({ ...state, gettingValidationsError: data.error });
        return false;
      }

      setPendingValidationsLeft(data.body.EntriesCount);
      setPendingValidations(data.body.OldestEntries);
      setState({
        ...state,
        loading: false,
        gettingValidations: false,
        gettingValidationsError: null,
      });
    } catch (error) {
      setState({
        ...state,
        gettingValidations: false,
        gettingValidationsError: error,
      });
    }
  };

  const handleValidation = async (e) => {
    e.preventDefault();
    setState({ ...state, validatingError: null, validating: true });
    if (!validateAcc.user_email) {
      return setState({
        ...state,
        validatingError: 'Debes seleccionar un usuario',
        validating: false,
      });
    }

    const VALIDATION_DATA = {
      userID: validateAcc.userID,
      stu_id: STU_ID.value,
    };

    console.log(VALIDATION_DATA);

    //TODO: patch validation data
    //TODO: check if no errors
    //TODO: clean validation field
    //TODO: erase entry from array and from pendingvalidations collection
    //TODO: decrease the left entries by -1
    setState({ ...state, validatingError: null, validating: false });
  };

  const displayStuIdDocument = (ID_URL) => {
    localStorage.setItem('STU_ID_FILE', ID_URL);

    const currentURL = encodeURI(window.location.href);
    const fileURL = currentURL.replace(
      'validaciones-por-id-pendientes',
      'display-stu-id-docs'
    );

    window.open(fileURL, '_blank');
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
        <Link href={'/admin/estudiantes'}>
          <button className={`${styles.button_back} btn button--red`}>
            <span>
              <Image src={arrow_right_white} />
            </span>
            <div>Atrás</div>
          </button>
        </Link>
        <h1>Validaciones por identificación de estudiante pendientes</h1>

        {/* /////////////////////////
           //  Validation field   //
           ///////////////////////// */}

        <form
          action=''
          method='POST'
          autoComplete='off'
          onSubmit={handleValidation}
          className={styles.validation_field}
        >
          <div className={styles.email_container}>
            Validar a:
            <div>{validateAcc.user_email}</div>
          </div>
          <div>
            <input
              className={`${styles.input}`}
              name='stu_id'
              id='stu_id'
              type='text'
              placeholder='ID de estudiante'
              autoComplete='off'
              value={STU_ID.value}
              onChange={STU_ID.onChange}
              required
            />
          </div>
          <button
            type='submit'
            className={`${styles.submit_validation} ${
              state.validating && styles.buttonLoading
            } btn button--red`}
            disabled={state.validating}
          >
            Validar
          </button>
          {state.validatingError && (
            <p className={`error__messagev2`}>{state.validatingError}</p>
          )}
        </form>

        {state.gettingValidationsError ? (
          <p className={`error__messagev2`}>{state.gettingValidationsError}</p>
        ) : (
          <>
            <h4>
              <strong>{pendingValidationsLeft}</strong> restantes
            </h4>
            {pendingValidations.length > 0 && (
              <ul className={styles.pending_validations}>
                {pendingValidations.map((item) => (
                  <li key={item.userID}>
                    <div className={styles.user_info}>
                      <div className={styles.user_info_texts}>
                        <p className={styles.pending_validations__user_email}>
                          <strong>Email: </strong>
                          {item.account_email}
                        </p>
                        <h5>
                          <strong>Fecha de creación: </strong>
                          {dateToLetters.dateToLetterswithOutDay(
                            item.createdAt
                          )}
                        </h5>
                      </div>
                      <div className={styles.user_info_buttons}>
                        <button
                          className={`${styles.validate_button} btn button--red`}
                          onClick={() => {
                            STU_ID.setValue('');
                            setValidateAcc({
                              ...validateAcc,
                              user_email: item.account_email,
                              userID: item.userID,
                            });
                          }}
                        >
                          Validar
                        </button>
                        <button
                          className={`${styles.reject_button} btn button--purple`}
                        >
                          Rechazar
                        </button>
                      </div>
                    </div>

                    {/* /////////////////////////
                    //       User Files        //
                  ///////////////////////// */}
                    <div className={styles.pending_validations__files}>
                      {item.stu_id_files.stu_id_files.map((file, index) => (
                        <div
                          key={index}
                          className={styles.pending_validations__file_container}
                        >
                          <div
                            className={styles.pending_validations__file_image}
                          >
                            <Image
                              src={
                                ToUploadImageConfig[
                                  file.name.split('.').slice(-1)
                                ] || ToUploadImageConfig['default']
                              }
                            />
                          </div>
                          <div
                            className={styles.pending_validations__file_info}
                          >
                            <p
                              className={styles.pending_validations__file_name}
                            >
                              <strong>Nombre: </strong>
                              {file.name}
                            </p>
                            <p className={styles.pending_validations__file_URL}>
                              {/* <strong>Archivo: </strong> */}

                              <span
                                onClick={() => displayStuIdDocument(file.URL)}
                              >
                                Ver archivo
                              </span>
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </li>
                ))}
              </ul>
            )}
            <button
              className={`${
                styles.load_more_button
              } btn button--redRedborderTransparent ${
                state.gettingValidations && styles.buttonLoading
              }`}
              onClick={() => getPendingValitadions()}
            >
              Cargar últimos 15
            </button>
          </>
        )}
      </div>
    </>
  );
};

export default validaciones_por_id_pendientes;
