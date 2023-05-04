import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { useDispatch } from 'react-redux';

//Styles
import styles from '@styles/pagestyles/Pedidos.module.scss';

//Assets
import arrow_right_black from '@assets/GeneralUse/IconsAndButtons/arrow_right_black.svg';
import empty_box from '@assets/PagesImages/Pedidos/empty_box.png';

//Components
import UserSidebar from '@components/GeneralUseComponents/UserSidebar/UserSidebar';
import SEOHeader from '@components/GeneralUseComponents/SEO_Header/SEOHeader';
import Loader from '@components/GeneralUseComponents/Loader/Loader';
import FooterSignature from '@components/GeneralUseComponents/FooterSignature/FooterSignature';
import ErrorDisplayer from '@components/GeneralUseComponents/ErrorDisplayer/ErrorDisplayer';
import ButtonUp from '@components/GeneralUseComponents/ButtonUp/ButtonUp';

//Session
import { useSession } from 'next-auth/react';

//Endpoints
import endPoints from '@services/api';

//Redux actions
import { openSidebar } from '@redux/userSidebarGlobalStateSlice';

const pedidos = () => {
  //Session
  const { data: session, status } = useSession();

  const router = useRouter();

  //Securing route
  if (status === 'unauthenticated') {
    router.push('/auth/login');
  }

  const [state, setState] = useState({
    orders: 'initial_state',
    loading: true,
    error: false,
  });

  //Allows us to manipulate the appropriate slice/action
  const dispatch = useDispatch();

  useEffect(() => {
    const getOrders = async () => {
      if (state.orders === 'initial_state' && session) {
        setState({ ...state, loading: true });
        const userID = session?.token.sub;
        try {
          const response = await fetch(endPoints.orders.getUserOrders(userID), {
            method: 'GET',
            headers: {
              accept: '*/*',
              'Content-Type': 'application/json',
              app_secret_key:
                process.env.NEXT_PUBLIC_MAIN_NEXT_WEB_APP_SECRET_KEY,
            },
          });
          const data = await response.json();
          setState({ ...state, orders: data.body, loading: false });
        } catch (error) {
          console.log(error);
          setState({ ...state, loading: false, error: error });
        }
      }
    };
    getOrders();
  }, [session]);

  const loadingErrorsDisplayer = () => {
    if (state.loading) {
      return (
        <div className={styles.Loader__container}>
          <Loader />
        </div>
      );
    }
    if (state.error) {
      return (
        <div>
          <div className={styles.pedidos__container}>
            {/* Back button for mobile */}
            <button
              className={`${styles.pedidos__goback_button}  btn button--redRedborderTransparentHoverShadowtRed`}
              onClick={() => dispatch(openSidebar())}
            >
              <span className={styles.pedidos__black_arrow}>
                <Image src={arrow_right_black} />
              </span>
              <div>Atrás</div>
            </button>

            <h3 className={styles.pedidos__title}>Pedidos</h3>
            <div className={styles.pedidos__title_underline}></div>

            <ErrorDisplayer message={state.error} />
          </div>
        </div>
      );
    }
  };
  const displayOrders = () => {
    {
      /* /////////////////////////
        // If still no orders  //
        ///////////////////////// */
    }
    if (typeof state.orders === 'object' && state.orders.length === 0) {
      return (
        <div>
          <div className={styles.pedidos__container}>
            {/* Back button for mobile */}

            <div className={styles.no_orders_container}>
              <p className={styles.no_orders_text}>
                No has realizado ningún pedido aún
              </p>
              <figure>
                <Image src={empty_box} alt='No has hecho ningún pedido aún' />
              </figure>
            </div>
          </div>
        </div>
      );
    }

    {
      /* //////////////////////////////////////
        // Formatting and displaying orders  //
        //////////////////////////////////// */
    }
    if (typeof state.orders === 'object') {
      const orders = JSON.parse(JSON.stringify(state.orders));
      const adaptedOrders = orders.map((order) => {
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
        order.createdAt = `${
          days[new Date(order.createdAt).getDay()]
        } ${new Date(order.createdAt).getDate()} de ${
          months[new Date(order.createdAt).getMonth()]
        } de ${new Date(order.createdAt).getFullYear()}`;
        return order;
      });

      return adaptedOrders.map((order) => (
        <div key={order.shopify_order_number} className={styles.order}>
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

              {order.status_URL === 'Recogida sin pasarela de pagos' ? (
                <p>
                  Recogiste este pedido en nuestras instalaciones sin utilizar
                  la pasarela de pagos.
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
      ));
    }
  };

  return (
    <>
      <SEOHeader
        tabTitle={'Pedidos'}
        metaName={'Pedidos'}
        description={'Mira los pedido que has realizado'}
      />
      <div className={styles.page}>
        <ButtonUp />
        <div className={styles.page__container}>
          <UserSidebar />

          {/* /////////////////////////
          //    Main content     //
        ///////////////////////// */}
          <main className={styles.pedidos}>
            {state.loading || state.error ? (
              loadingErrorsDisplayer()
            ) : (
              <>
                <div className={styles.pedidos__container}>
                  {/* Back button for mobile */}
                  <button
                    className={`${styles.pedidos__goback_button}  btn button--redRedborderTransparentHoverShadowtRed`}
                    onClick={() => dispatch(openSidebar())}
                  >
                    <span className={styles.pedidos__black_arrow}>
                      <Image src={arrow_right_black} />
                    </span>
                    <div>Atrás</div>
                  </button>

                  <h3 className={styles.pedidos__title}>Pedidos</h3>
                  <div className={styles.pedidos__title_underline}></div>

                  <section className={styles.orders}>
                    {displayOrders()}
                    <p className={styles.contact}>
                      Si tienes alguna duda respecto a tus pedidos, no dudes en{' '}
                      <a href='/contacto'>contactarnos</a>{' '}
                    </p>
                  </section>
                </div>
              </>
            )}
          </main>
        </div>
      </div>
      <FooterSignature />
    </>
  );
};

export default pedidos;
