import { useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';

//Styles
import styles from '@styles/pagestyles/Pedidos.module.scss';

//Assets
import arrow_right_black from '@assets/GeneralUse/IconsAndButtons/arrow_right_black.svg';

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

const pedidos = (props) => {
  //Session
  const { data: session, status } = useSession();

  const router = useRouter();

  //Securing route
  if (status === 'unauthenticated') {
    router.push('/auth/login');
  }

  //Send state to UserSidebar to open and close it
  const [openSidebar, setOpenSidebar] = useState(false);

  const [state, setState] = useState({
    orders: [],
    loading: false,
    error: false,
    data: [],
  });

  //TODO: Hacer pedido de órdenes luego de haber hecho las modificaciones necesarias en el backend

  const orders = [
    {
      season: 'autumn_2022_allow_one_more',
      account_email: 'netoxas3107@gmail.com',
      description: 'Campus Box',
      stu_id: '',
      stu_email: 'netoxas3107@stu.urjc.es',
      shopify_order_number: '1049',
      total_paid: '6.50',
      status_URL:
        'https://campuscanvases.myshopify.com/61473128636/orders/372f02b27b81f7d267bf876b187e04eb/authenticate?key=e1e93644901fcaa737bcc5b575bfba32',
      createdAt: '2022-08-15T09:28:50.818+00:00',
      order_created_in_shopify_at: '2022-08-15T09:28:46.000+00:00',
    },
    {
      season: 'autumn_2022',
      account_email: 'netoxas3107@gmail.com',
      description: 'Campus Box',
      stu_id: '',
      stu_email: 'netoxas3107@stu.urjc.es',
      shopify_order_number: 'R20220815092850',
      total_paid: '0.00',
      status_URL: 'Recogida sin pasarela de pagos',
      createdAt: '2022-08-15T10:28:50.818+00:00',
      order_created_in_shopify_at: '2022-08-15T10:28:46.000+00:00',
    },
  ];

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
    order.createdAt = `${days[new Date(order.createdAt).getDay()]} ${new Date(
      order.createdAt
    ).getDate()} de ${
      months[new Date(order.createdAt).getMonth()]
    } de ${new Date(order.createdAt).getFullYear()}`;
    return order;
  });

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
              onClick={() => setOpenSidebar(true)}
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
    return adaptedOrders.map((order) => (
      <div className={styles.order}>
        <h4
          className={styles.order__number}
        >{`Orden #${order.shopify_order_number}`}</h4>
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
                Recogiste este pedido en nuestras instalaciones sin utilizar la
                pasarela de pagos.
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
          <UserSidebar
            setOpenSidebar={setOpenSidebar}
            openSidebar={openSidebar}
          />

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
                    onClick={() => setOpenSidebar(true)}
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
