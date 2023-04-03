import { useState, useEffect } from 'react';
import Image from 'next/image';
import Swal from 'sweetalert2';

//Styles
import styles from '@styles/pagestyles/admin/students/validacionesPorIdPendientes.module.scss';

//Components
import AdminHeader from '@components/UsedInSpecificRoutes/Admin/AdminHeader/AdminHeader';
import Loader from '@components/GeneralUseComponents/Loader/Loader';

//Services
import { ToUploadImageConfig } from '@services/ToUploadImageConfig';
import dateToLetters from '@services/dateFormat';

//hooks
import { useInputValue } from '@hooks/useInputValue';
import useSecureAdminRoute from '@hooks/useSecureAdminRoute';

//Endpoints
import endPoints from '@services/api';

//ONLY ONE PERSON SHOULD WORK ON THIS SCREEN - If more than one admin is validating students, this can generate problems, since if one validated student has to be validated again, the second time, the other admin will get an error
const validaciones_por_id_pendientes = () => {
  const { securingRoute } = useSecureAdminRoute();

  const [state, setState] = useState({
    gettingValidations: true,
    gettingValidationsError: null,
    validating: false,
    validatingError: false,
    validatingSuccess: null,
    rejectionError: false,
  });

  const [pendingValidations, setPendingValidations] = useState([]);
  const [pendingValidationsLeft, setPendingValidationsLeft] = useState();

  const [validateAcc, setValidateAcc] = useState({
    user_email: '',
    userID: '',
  });

  const [rejectAcc, setRejectAcc] = useState({
    user_email: '',
    userID: '',
  });

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
      validatingError: null,
    });

    //Clean validation field and validate acc info
    setValidateAcc({ ...validateAcc, user_email: '', userID: '' });
    STU_ID.setValue('');

    try {
      const respuesta = await fetch(
        endPoints.admin.getPendingStuIdValidations,
        {
          method: 'GET',
          headers: {
            accept: '*/*',
            'Content-Type': 'application/json',
            app_secret_key:
              process.env.NEXT_PUBLIC_MAIN_NEXT_WEB_APP_SECRET_KEY,
            website_location: 'admin_pending_validations',
          },
        }
      );

      const data = await respuesta.json();

      if (data.error) {
        setState({ ...state, gettingValidationsError: data.error });
        return false;
      }

      setPendingValidationsLeft(data.body.EntriesCount);
      setPendingValidations(data.body.OldestEntries);
      setState({
        ...state,
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

    //Data needed to validate account
    const VALIDATION_DATA = {
      userID: validateAcc.userID,
      stu_id: STU_ID.value,
    };

    const respuesta = await fetch(endPoints.admin.validateByStuId, {
      method: 'PATCH',
      headers: {
        accept: '*/*',
        'Content-Type': 'application/json',
        app_secret_key: process.env.NEXT_PUBLIC_MAIN_NEXT_WEB_APP_SECRET_KEY,
      },
      body: JSON.stringify(VALIDATION_DATA),
    });

    const data = await respuesta.json();

    //Handling possible validation errors
    if (data.error) {
      setState({
        ...state,
        validatingError: data.error,
        validating: false,
      });
      setTimeout(() => {
        setState({ ...state, validatingError: null });
      }, 5000);
      return false;
    }

    //Clean validation field and validate acc info
    setValidateAcc({ ...validateAcc, user_email: '', userID: '' });
    STU_ID.setValue('');

    //Erase the validated account from current entries in client
    const leftPendingValidations = pendingValidations.filter(
      (entry) => entry.userID !== validateAcc.userID
    );
    setPendingValidations(leftPendingValidations);
    //Decrease validations in client by 1
    setPendingValidationsLeft(pendingValidationsLeft - 1);

    setState({
      ...state,
      validatingError: null,
      validating: false,
      validatingSuccess: data.body,
    });

    //Clenaing success validation message
    setTimeout(() => {
      setState({ ...state, validatingSuccess: null });
    }, 5000);
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

  const displayRejectModal = async () => {
    if (rejectAcc.user_email) {
      //Modal
      const customModal = Swal.mixin({
        customClass: {
          confirmButton: `${styles.modal_reject_button} btn button--unwantedOption`,
          cancelButton: `${styles.modal_cancel_button} btn button--red`,
        },
        buttonsStyling: false,
      });
      //  invalid stu id (it has already been used for this uni)
      const { value } = await customModal.fire({
        title: `Rechazar validación de ${rejectAcc.user_email}`,
        input: 'select',
        //IMPORTANT: if this options change, they should be changed in the
        //DELETE method of vefify_by_stu_id.js, since an email
        //is sent based on the reject reason
        inputOptions: {
          'Error al abrir documento': 'Error al abrir documento',
          'El documento no es un ID de estudiante':
            'El documento no es un ID de estudiante',
          'Documento no valido': 'Documento no valido',
        },
        icon: 'warning',
        inputPlaceholder: 'Elige una razón',
        showCancelButton: true,
        cancelButtonText: 'Cancelar',
        confirmButtonText: 'Rechazar',
        showLoaderOnConfirm: true,
        inputValidator: (value) => {
          return new Promise(async (resolve) => {
            if (value) {
              resolve();
            } else {
              resolve('Debes seleccionar una razón');
            }
          });
        },
      });
      if (value) {
        await rejectValidation(value);
      }
    }
  };
  //useEffect monitors if rejectAcc state changes to display the reject modal
  useEffect(() => {
    displayRejectModal();
  }, [rejectAcc]);

  const showRejectModal = (account_email, userID) => {
    //If this state changes, the useEffect above will monitor the change of state
    //and display modal. This is needed since useState is async.
    setRejectAcc({
      ...rejectAcc,
      user_email: account_email,
      userID: userID,
    });
  };

  const rejectValidation = async (reject_reason) => {
    const LoadingSwal = Swal.mixin({
      showConfirmButton: false,
    });
    LoadingSwal.fire({
      title: 'Espera un momento...',
      showClass: {
        popup: 'animate__fadeIn',
      },
      allowOutsideClick: () => !Swal.isLoading(),
    });
    //Data needed to reject account
    const REJECTION_DATA = {
      userID: rejectAcc.userID,
      user_email: rejectAcc.user_email,
      reject_reason,
    };

    try {
      //Send rejection
      const respuesta = await fetch(
        endPoints.admin.rejectStuIdValidation(
          REJECTION_DATA.userID,
          REJECTION_DATA.user_email,
          REJECTION_DATA.reject_reason
        ),
        {
          method: 'DELETE',
          headers: {
            accept: '*/*',
            'Content-Type': 'application/json',
            app_secret_key:
              process.env.NEXT_PUBLIC_MAIN_NEXT_WEB_APP_SECRET_KEY,
          },
        }
      );

      const data = await respuesta.json();

      //Handle possible validation errors (show it in a swal)
      if (data.error) {
        //Leave this console.log here
        console.log(data.error);
        const ErrorSwal = Swal.mixin({
          customClass: {
            confirmButton: `btn button--red`,
          },
          buttonsStyling: false,
        });
        ErrorSwal.fire({
          title: 'Hubo un error al rechazar validación. Ver consola',
          showClass: {
            popup: 'animate__fadeIn',
          },
        });
      }

      //Clean validation field and validate acc info
      setValidateAcc({ ...validateAcc, user_email: '', userID: '' });
      STU_ID.setValue('');

      //Erase the validated account from current entries in client
      const leftPendingValidations = pendingValidations.filter(
        (entry) => entry.userID !== rejectAcc.userID
      );
      setPendingValidations(leftPendingValidations);

      //Decrease validations in client by 1
      setPendingValidationsLeft(pendingValidationsLeft - 1);

      //Display reject confirmation display response message
      const SuccessSwal = Swal.mixin({
        customClass: {
          confirmButton: `btn button--red`,
        },
        buttonsStyling: false,
      });
      SuccessSwal.fire({
        title: `${data.body}`,
        timer: 2000,
        showClass: {
          popup: 'animate__fadeIn',
        },
      });
    } catch (error) {
      //Leave this console.log here
      console.log(error);
      const ErrorSwal = Swal.mixin({
        customClass: {
          confirmButton: `btn button--red`,
        },
        buttonsStyling: false,
      });
      ErrorSwal.fire({
        title: 'Hubo un error al rechazar validación',
        showClass: {
          popup: 'animate__fadeIn',
        },
      });
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
        <h1>Validaciones por identificación de estudiante pendientes</h1>
        <p>
          Revisar que los documentos sean identificaciones de estudiante
          válidas, vigentes, y que además concuerden con la universidad.
          Solamente un administrador debería operar a la vez.
        </p>

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
        </form>
        <div className={styles.server_responses_displayer}>
          {state.validatingError && (
            <p className={`error__messagev2`}>{state.validatingError}</p>
          )}
          {state.validatingSuccess && (
            <p className={`success__messagev2`}>{state.validatingSuccess}</p>
          )}
        </div>

        {state.gettingValidationsError ? (
          <p className={`error__messagev2`}>{state.gettingValidationsError}</p>
        ) : (
          <>
            <h4>
              <strong>{pendingValidationsLeft}</strong> restantes
            </h4>

            {/* ///////////////////////////
           //Pending validations table //
           /////////////////////////// */}

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
                        <p className={styles.pending_validations__user_uni}>
                          <strong>Universidad: </strong>
                          {item.university}
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
                          onClick={() =>
                            showRejectModal(item.account_email, item.userID)
                          }
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
