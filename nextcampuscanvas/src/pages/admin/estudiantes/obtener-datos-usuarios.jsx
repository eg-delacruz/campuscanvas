import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

//Styles
import styles from '@styles/pagestyles/admin/students/obtenerDatosUsuarios.module.scss';

//Session
import { useSession } from 'next-auth/react';

//Components
import SecondaryHeader from '@components/GeneralUseComponents/SecondaryHeader/SecondaryHeader';
import Loader from '@components/GeneralUseComponents/Loader/Loader';

//Assets
import arrow_right_white from '@assets/GeneralUse/IconsAndButtons/arrow_right_white.svg';

//Services
import { ToUploadImageConfig } from '@services/ToUploadImageConfig';
import dateToLetters from '@services/dateToLetters';
import capitalize from '@services/capitalize';

//hooks
import { useInputValue } from '@hooks/useInputValue';

//Endpoints
import endPoints from '@services/api';

const obtener_datos_de_usuarios = () => {
  const [state, setState] = useState({
    loading: false,
    error: null,
    submitLoading: false,
  });

  const [userData, setUserData] = useState(null);

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

  //Controlling inputs
  const ACC_EMAIL = useInputValue('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setState({ ...state, error: null, submitLoading: true });
    setUserData(null);
    try {
      const respuesta = await fetch(
        endPoints.admin.getUserData(ACC_EMAIL.value),
        {
          method: 'GET',
          headers: {
            accept: '*/*',
            'Content-Type': 'application/json',
            app_secret_key:
              process.env.NEXT_PUBLIC_MAIN_NEXT_WEB_APP_SECRET_KEY,
          },
        }
      );

      const data = await respuesta.json();

      //Displaying errors sent by server
      if (data.error) {
        setState({
          ...state,
          error: data.error,
          submitLoading: false,
        });
        setTimeout(() => {
          setState({ ...state, error: null });
        }, 5000);
        return false;
      }

      setUserData(data.body);
      setState({ ...state, error: null, submitLoading: false });
    } catch (error) {
      //Leave this console log
      console.log(error);
      setState({
        ...state,
        error: 'Ha habido un error',
        submitLoading: false,
      });
    }
  };

  //TODO: handle verification
  const handleVerification = async () => {
    console.log('Hay que verificar');
    //Display a swal to do the validation
  };

  const displayStuIdDocument = (ID_URL) => {
    localStorage.setItem('STU_ID_FILE', ID_URL);

    const currentURL = encodeURI(window.location.href);
    const fileURL = currentURL.replace(
      'obtener-datos-usuarios',
      'display-stu-id-docs'
    );

    window.open(fileURL, '_blank');
  };

  let adaptedOrders;
  if (userData?.boxOrders?.length > 0) {
    const orders = JSON.parse(JSON.stringify(userData?.boxOrders));
    adaptedOrders = orders.map((order) => {
      if (order.season.includes('_allow_one_more')) {
        order.season = order.season.replace('_allow_one_more', '');
      }
      if (order.season.toLowerCase().includes('autumn_')) {
        order.season = order.season.replace('autumn_', 'Otoño ');
      }
      if (order.season.toLowerCase().includes('spring_')) {
        order.season = order.season.replace('spring_', 'Primavera ');
      }
      if (order.total_paid.includes('.')) {
        order.total_paid = order.total_paid.replace('.', ',');
      }
      let days = [
        'Domingo',
        'Lunes',
        'Martes',
        'Miercoles',
        'Jueves',
        'Viernes',
        'Sabado',
      ];
      let months = [
        'Enero',
        'Febrero',
        'Marzo',
        'Abril',
        'Mayo',
        'Junio',
        'Julio',
        'Agosto',
        'Septiembre',
        'Octubre',
        'Noviembre',
        'Diciembre',
      ];

      order.createdAt = new Date(order.createdAt);
      order.createdAt = `${days[new Date(order.createdAt).getDay()]} ${new Date(
        order.createdAt
      ).getDate()} de ${
        months[new Date(order.createdAt).getMonth()]
      } de ${new Date(order.createdAt).getFullYear()}`;
      return order;
    });
  }

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
        <h1>Datos de usuario</h1>

        {/* /////////////////////////
           //     Input field      //
           ///////////////////////// */}

        <form
          action=''
          method='GET'
          autoComplete='off'
          className={styles.email_form}
          onSubmit={handleSubmit}
        >
          <div className={styles.email_tag}>Email de la cuenta:</div>
          <div>
            <input
              className={`${styles.input}`}
              name='account_email'
              id='account_email'
              type='email'
              placeholder='Email'
              autoComplete='off'
              value={ACC_EMAIL.value}
              onChange={ACC_EMAIL.onChange}
              required
            />
          </div>
          <button
            type='submit'
            className={`${styles.submit_validation} ${
              state.submitLoading && styles.buttonLoading
            } btn button--red`}
            disabled={state.submitLoading}
          >
            Obtener datos
          </button>
        </form>
        <div className={styles.server_errors_displayer}>
          {state.error && <p className={`error__messagev2`}>{state.error}</p>}
        </div>

        {/* /////////////////////////
           //  Display user data   //
          ///////////////////////// */}
        {userData && (
          <>
            <h4>Información de la cuenta</h4>
            <div className={styles.acc_data_container}>
              <div className={styles.left_side_data}>
                <p className={styles.user_acc_email}>{userData.user.email}</p>

                {userData.user.stu_verified ? (
                  <div className={styles.verified_stu_displayer}>
                    <p className={`${styles.title} success__message`}>
                      Estudiante verificado
                    </p>
                    <div className={styles.green_circle}>Verificado</div>
                  </div>
                ) : (
                  <div className={styles.unverified_stu_displayer}>
                    <p className={`${styles.title} error__message`}>
                      Estudiante no verificado
                    </p>
                    <div
                      onClick={() => handleVerification()}
                      className={styles.red_circle}
                    >
                      Verificar
                    </div>
                  </div>
                )}

                <p>
                  <strong>Nickname:</strong> {userData.user.nickname}
                </p>

                <div className={styles.dates_info_container}>
                  <div className={styles.dates_info_container_left}>
                    <p className={styles.dates_info}>
                      <strong>Fecha de creación de cuenta:</strong>
                    </p>
                    <p className={styles.dates_info}>
                      {dateToLetters.dateToLetterswithOutDay(
                        userData.user.createdAt
                      )}
                    </p>
                  </div>
                  <div className={styles.dates_info_container_right}>
                    <p className={styles.dates_info}>
                      <strong>Fecha de modificación:</strong>
                    </p>
                    <p className={styles.dates_info}>
                      {dateToLetters.dateToLetterswithOutDay(
                        userData.user.updatedAt
                      )}
                    </p>
                  </div>
                </div>
              </div>

              <div className={styles.right_side_data}>
                <div className={styles.row1}>
                  <p className={styles.gender}>
                    <strong className={styles.gray_tag}>Género: </strong>
                    {capitalize.capitalizeFirstLetter(userData.user.gender)}
                  </p>
                  <p className={styles.birthdate}>
                    <strong className={styles.gray_tag}>
                      Fecha de nacimiento:{' '}
                    </strong>
                    {userData.user.birthdate}
                  </p>
                </div>

                <div className={styles.row2}>
                  <div className={styles.stu_email}>
                    <p>
                      <strong className={styles.gray_tag}>
                        Email de estudiante:{' '}
                      </strong>
                    </p>
                    <p>{userData.user.stu_email}</p>
                  </div>
                  <div className={styles.stu_id}>
                    <p>
                      <strong className={styles.gray_tag}>
                        ID de estudiante:{' '}
                      </strong>
                    </p>
                    <p>{userData.user.stu_id}</p>
                  </div>
                </div>

                <p className={styles.row3}>Datos del estudio</p>

                <div className={styles.row4}>
                  <div className={styles.university}>
                    <p>
                      <strong className={styles.gray_tag}>Universidad: </strong>
                    </p>
                    <p>
                      {capitalize.capitalizeFirstLetter(
                        userData.user.stu_data.university
                      )}
                    </p>
                  </div>
                  <div className={styles.faculty}>
                    <p>
                      <strong className={styles.gray_tag}>Facultad: </strong>
                    </p>
                    <p>
                      {capitalize.capitalizeFirstLetter(
                        userData.user.stu_data.faculty
                      )}
                    </p>
                  </div>
                </div>

                <div className={styles.row5}>
                  <div className={styles.academic_degree}>
                    <p>
                      <strong className={styles.gray_tag}>
                        Grado académico:{' '}
                      </strong>
                    </p>
                    <p>
                      {capitalize.capitalizeFirstLetter(
                        userData.user.stu_data.academic_degree
                      )}
                    </p>
                  </div>
                  <div className={styles.empty}></div>
                </div>

                <div className={styles.row6}>
                  <div className={styles.last_uni_semester}>
                    <p>
                      <strong className={styles.gray_tag}>
                        Semestre de graduación:{' '}
                      </strong>
                    </p>
                    <p>
                      {capitalize.capitalizeFirstLetter(
                        userData.user.stu_data.last_uni_semester
                      )}
                    </p>
                  </div>
                  <div className={styles.last_uni_year}>
                    <p>
                      <strong className={styles.gray_tag}>
                        Año de graduación:{' '}
                      </strong>
                    </p>
                    <p>{userData.user.stu_data.last_uni_year}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* /////////////////////////
           // Display delivery address //
          ///////////////////////// */}
            <h4>Dirección de entrega</h4>

            <div className={styles.delivery_address_container}>
              <div>
                <p>
                  <strong>Calle: </strong>
                  {userData.user.delivery_address.street}
                </p>
              </div>
              <div>
                <p>
                  <strong>Ciudad: </strong>
                  {userData.user.delivery_address.city}
                </p>
              </div>
              <div>
                <p>
                  <strong>Número de casa: </strong>
                  {userData.user.delivery_address.house_number}
                </p>
              </div>
              <div>
                <p>
                  <strong>Código postal: </strong>
                  {userData.user.delivery_address.postal_code}
                </p>
              </div>
              <div>
                <p>
                  <strong>Teléfono: </strong>
                  {userData.user.phone}
                </p>
              </div>
              <div>
                <p>
                  <strong>País: </strong>
                  {userData.user.delivery_address.country}
                </p>
              </div>
              <div>
                <p>
                  <strong>Observaciones: </strong>
                  {userData.user.delivery_address.observations}
                </p>
              </div>
            </div>

            {/* /////////////////////////
           // Display stu_id_files //
          ///////////////////////// */}
            <h4>Documentos de identificación de estudiantes</h4>

            {Object.keys(userData.stuIdFiles).length === 0 ? (
              <div>El usuario no ha subido ningún documento.</div>
            ) : (
              <div className={styles.stu_id_files_container}>
                <p className={styles.upload_date}>
                  <strong>
                    Subidos el:{' '}
                    {dateToLetters.dateToLetterswithOutDay(
                      userData.stuIdFiles.createdAt
                    )}
                  </strong>
                </p>
                <div>
                  {userData.stuIdFiles.stu_id_files.map((file, index) => (
                    <div key={index} className={styles.file_container}>
                      <div className={styles.file_image}>
                        <Image
                          src={
                            ToUploadImageConfig[
                              file.name.split('.').slice(-1)
                            ] || ToUploadImageConfig['default']
                          }
                        />
                      </div>
                      <div className={styles.file_info}>
                        <p className={styles.file_name}>
                          <strong>Nombre: </strong>
                          {file.name}
                        </p>
                        <p className={styles.file_URL}>
                          <span onClick={() => displayStuIdDocument(file.URL)}>
                            Ver archivo
                          </span>
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* /////////////////////////
           //   Display Box Orders   //
          ///////////////////////// */}
            <h4>Pedidos Campus Box</h4>
            {userData.boxOrders.length === 0 ? (
              <div>No se ha hecho ningún pedido.</div>
            ) : (
              <div className={styles.box_orders_container}>
                {adaptedOrders.map((order) => (
                  <div
                    key={order.shopify_order_number}
                    className={styles.order}
                  >
                    <h4
                      className={styles.order__number}
                    >{`Pedido #${order.shopify_order_number}`}</h4>
                    <div className={styles.order__information}>
                      <div>
                        <p>
                          <strong>Descripción: </strong>
                          {order.description}
                        </p>
                        <p>
                          <strong>Fecha del pedido: </strong>
                          {order.createdAt}
                        </p>
                        <p>
                          <strong>Temporada: </strong>
                          {order.season}
                        </p>

                        {order.status_URL ===
                        'Recogida sin pasarela de pagos' ? (
                          <p>
                            Recogiste este pedido en nuestras instalaciones sin
                            utilizar la pasarela de pagos.
                          </p>
                        ) : (
                          <p>
                            Puedes consultar{' '}
                            <a href={order.status_URL} target={'_blank'}>
                              aquí
                            </a>{' '}
                            el estado del pedido.
                          </p>
                        )}
                      </div>
                      <div className={styles.paid_container}>
                        <p>Importe pagado</p>
                        <div>{`${order.total_paid} €`}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default obtener_datos_de_usuarios;