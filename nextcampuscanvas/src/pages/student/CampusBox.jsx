//Tutorial: https://www.youtube.com/watch?v=xNMYz74zNHM

import { useEffect, useState } from 'react';
import { storefront } from '@services/storefront';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';

//hooks
import { useInputValue } from '@hooks/useInputValue';

//Styles
import styles from '@pagestyles/student/CampusBox.module.scss';

//Assets
//Leave this here in case box image doesn´t work if taken from imgur
import Box from '@assets/PagesImages/CampusBox/campusbox.png';
import SoldOut from '@assets/PagesImages/CampusBox/soldout.png';

//Endpoints
import endPoints from '@services/api';

//Components
import Layout from '@components/GeneralUseComponents/Layout/Layout';
import SponsorsSlider from '@components/GeneralUseComponents/SponsorsSlider/SponsorsSlider';
import ErrorDisplayer from '@components/GeneralUseComponents/ErrorDisplayer/ErrorDisplayer';
import Loader from '@components/GeneralUseComponents/Loader/Loader';
import ButtonUp from '@components/GeneralUseComponents/ButtonUp/ButtonUp';
import SEOHeader from '@components/GeneralUseComponents/SEO_Header/SEOHeader';
import StaticProgressBar from '@components/GeneralUseComponents/StaticProgressBar/StaticProgressBar';
import FacebookShareButton from '@components/GeneralUseComponents/ShareButtons/FacebookShareButton/FacebookShareButton';
import TwitterShareButton from '@components/GeneralUseComponents/ShareButtons/TwitterShareButton/TwitterShareButton';
import WhatsAppShareButton from '@components/GeneralUseComponents/ShareButtons/WhatsAppShareButton/WhatsAppShareButton';

//Facebook conversions API
import FB_Conversions_order_box_page_view from '@services/fbConversionsAPI/order_box_page_view_content';
const { FB_Conversions_order_box_page_views } =
  FB_Conversions_order_box_page_view;
import identifyBrowser from '@services/identifyBrowser';
const { getBrowserName } = identifyBrowser;

const CampusBox = () => {
  const [product, setProduct] = useState({});
  const [state, setState] = useState({
    allowedToOrder: false,
    orderLimitLoading: false,
    loading: false,
    checkoutLoading: false,
    newsletter_error: '',
    newsletter_success: '',
    error: '',
  });

  const router = useRouter();

  //Toggle this const to render different things
  //deppending if box is being sent or still not
  const BoxAvailable = false;

  //Session
  const { data: session, status } = useSession();

  //Redirecting according to auth status/securing route
  if (status === 'unauthenticated') {
    router.push('/auth/login');
  }
  if (session) {
    if (!session?.token.stu_data.university && !session?.token.stu_verified) {
      router.push(
        { pathname: '/auth/registro', query: { step: 2 } },
        '/auth/registro'
      );
    }
    if (session?.token.stu_data.university && !session?.token.stu_verified) {
      router.push(
        { pathname: '/auth/registro', query: { step: 3 } },
        '/auth/registro'
      );
    }
  }

  ///////////////////////////////Getting product information and limiting orders////////////////////////////////
  const id = 'gid://shopify/Product/7509431713980';
  const REQUIRED_BOX_DATA = `
  query Product{
    product(id:"${id}"){
      handle
      totalInventory
      variants(first: 1) {
        edges {
          node {
            id
          }
        }
      }
    }
  }
  `;

  async function fetchData(userID, account_email, stu_id, stu_email) {
    setState({ ...state, loading: true });
    const response = await storefront(REQUIRED_BOX_DATA);
    setProduct(response);
    setState({ ...state, loading: false, orderLimitLoading: true });

    //Checking order allowance for user
    const respuesta = await fetch(
      endPoints.orders.isAllowedToOrder(
        userID,
        account_email,
        stu_id,
        stu_email
      ),
      {
        method: 'GET',
        headers: {
          accept: '*/*',
          'Content-Type': 'application/json',
          app_secret_key: process.env.NEXT_PUBLIC_MAIN_NEXT_WEB_APP_SECRET_KEY,
        },
      }
    );
    const data = await respuesta.json();
    setState({
      ...state,
      orderLimitLoading: false,
      allowedToOrder: data.body.allowToOrder,
    });
  }

  useEffect(() => {
    if (session) {
      //Sending data of page views to FB Conversions API (Start)
      FB_Conversions_order_box_page_views(
        session,
        getBrowserName(navigator.userAgent)
      );
      //Sending data of page views to FB Conversions API (End)

      let stu_id = 'UNDEFINED';
      let stu_email = 'UNDEFINED';
      const userID = session.token.sub;
      const account_email = session.token.email;
      if (session.token.stu_id) {
        stu_id = session.token.stu_id;
      }
      if (session.token.stu_email) {
        stu_email = session.token.stu_email;
      }

      try {
        if (Object.keys(product).length === 0) {
          fetchData(userID, account_email, stu_id, stu_email);
        }
      } catch (error) {
        console.log(error);
        setState({ ...state, loading: false, error: error });
      }
    }
  }, [session]);

  ///////////////////////////////Getting product information and limiting orders////////////////////////////////(end)
  /////////////////////////////// Checkout config ////////////////////////////////
  //const needed to request checkout
  let variantId = product.data?.product.variants.edges[0].node.id;
  const checkoutMutation = `
  mutation CheckoutCreate($variantId:ID!){
    checkoutCreate(input:{
      lineItems:{
        variantId: $variantId,
        quantity:1
      },customAttributes:{
        key:"UserID"
        value:"${session?.token.sub}"
      }
    }){
      checkout{
        webUrl
        id
        requiresShipping
        availableShippingRates{
          shippingRates{
            priceV2{
              amount
            }
          }
        }
      }
    }
  }
  `;

  async function getCheckout() {
    setState({ ...state, checkoutLoading: true });
    const response = await storefront(checkoutMutation, { variantId });
    const { webUrl } = response.data.checkoutCreate.checkout;
    window.location.href = webUrl;
  }
  const checkout = () => {
    try {
      getCheckout();
    } catch (error) {
      console.log(error);
      setState({ ...state, checkoutLoading: false, error: error });
    }
  };

  /////////////////////////////// Checkout config ////////////////////////////////(end)

  //Controlling inputs
  const NEWSLETTER = useInputValue('');

  const handleNewsletter = async () => {
    setState({ ...state, newsletter_error: '', newsletter_success: '' });
    if (!NEWSLETTER.value) {
      return setState({
        ...state,
        newsletter_success: '',
        newsletter_error: 'Introduce un correo',
      });
    }
    if (!NEWSLETTER.value.includes('@')) {
      return setState({
        ...state,
        newsletter_success: '',
        newsletter_error: 'Introduce un correo válido',
      });
    }

    const URL = 'https://api.sendinblue.com/v3/contacts';
    const APIKEY = process.env.NEXT_PUBLIC_SENDINBLUE_CC_API_KEY;

    try {
      const respuesta = await fetch(URL, {
        method: 'POST',
        headers: {
          accept: 'application/json',
          'content-type': 'application/json',
          'api-key': APIKEY,
        },
        body: JSON.stringify({
          updateEnabled: false,
          email: NEWSLETTER.value,
        }),
      });

      if (!respuesta.ok) {
        return setState({
          ...state,
          newsletter_success: '',
          newsletter_error: 'Hubo un error, vuelve a intentarlo',
        });
      }

      setState({
        ...state,
        newsletter_error: '',
        newsletter_success: '¡Te has suscrito correctamente!',
      });
    } catch (error) {
      setState({
        ...state,
        newsletter_success: '',
        newsletter_error: 'Error al suscribir usuario',
      });
      console.log(error.message);
    }
  };

  //Order limit displayer
  const orderLimitDisplayer = () => {
    if (state.orderLimitLoading) {
      return (
        <>
          <button
            className={`${styles.loadingBtnSpinner} btn button--red`}
            disabled={true}
          >
            Cargando
          </button>

          <div className={styles.divider}></div>
        </>
      );
    }
    if (!state.allowedToOrder) {
      return (
        //Renders if not allowed to order because of limit of 1 box has been reached
        <>
          <button
            className={`${styles.buttonDisabled} btn button--red`}
            disabled={true}
          >
            ¡Obtener Campus Box!
          </button>

          <div className={styles.divider}></div>
          <p className={styles.notAllowedMessage}>
            ¡Vaya! Parece que ya has pedido tu Campus Box de este semestre... :(
            <br />
            Siguenos en 👉<a href='#footer'>redes sociales</a> para enterarte
            cuando volvamos con más. O ☎️
            <Link href={'/contacto'}>contacta con nosotros</Link>
          </p>
        </>
      );
    }
    if (state.allowedToOrder) {
      return (
        //Renders if user is allowed to order
        <>
          {/* Displays one thing or the other depending on box availability */}
          {BoxAvailable ? (
            <button
              className={`${
                state.checkoutLoading && styles.buttonLoading
              } btn button--red`}
              disabled={state.checkoutLoading}
              onClick={() => checkout()}
            >
              ¡Obtener Campus Box!
            </button>
          ) : (
            <>
              <div className={styles.proximamente_anouncement}>
                Obtenla próximamente...
              </div>
              <div className={styles.newsletter}>
                <p className={styles.newsletter__description}>
                  ¡Suscríbete a nuestra newsletter y entérate de la próxima
                  distribución!
                </p>
                <div className={styles.newsletter__inputs}>
                  <input
                    name='email'
                    id='email'
                    type='email'
                    placeholder='Introduce tu email...'
                    autoComplete='off'
                    value={NEWSLETTER.value}
                    onChange={NEWSLETTER.onChange}
                  />
                  <button
                    onClick={handleNewsletter}
                    className='btn button--red'
                  >
                    Suscribirme
                  </button>
                </div>
                {state.newsletter_error && (
                  <p className='error__message'>{state.newsletter_error}</p>
                )}
                {state.newsletter_success && (
                  <p className='success__message'>{state.newsletter_success}</p>
                )}
              </div>
            </>
          )}

          <div className={styles.divider}></div>
          <p className={styles.conditions}>
            * Debido a las existencias limitadas de la Campus Box, solamente
            puedes pedir una caja por semestre.
          </p>
        </>
      );
    }
  };

  /////////////////////////////// Limiting boxes to one per user per semester ////////////////////////////////(end)

  if (status === 'loading' || !session?.token.stu_verified || state.loading) {
    return (
      <>
        <div className={styles.loaderContainer}>
          <Loader />
        </div>
      </>
    );
  }

  if (state.error) {
    return <ErrorDisplayer message={state.error} />;
  }

  //If product out of stock
  if (product.data?.product.totalInventory <= 0) {
    return (
      <Layout>
        <ButtonUp />
        <div className={`${styles.OutOFStock} container`}>
          <h2>Vaya, que pena. No tenemos más Campus Box en inventario... :(</h2>
          <figure>
            <Image src={SoldOut} alt='Imagen de producto agotado' />
          </figure>
          <p>
            Tenemos unidades limitadas de Campus Box cada semestre
            universitario.
          </p>
          <p>¡No te desanimes!</p>
          <p>
            Pronto volveremos con más. Mientras tanto, puedes volver al home
            para explorar las ofertas y beneficios disponibles exclusivamente
            para estudiantes.
          </p>
          <Link href={'/'}>
            <button
              className={`${styles.backhome} btn button--redRedborderTransparentHoverShadowtRed`}
            >
              Volver al home
            </button>
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <>
      <SEOHeader
        tabTitle={'Campus Box'}
        metaName={'Campus Box'}
        description={'Pide tu Campus Box gratuita'}
      />
      <Layout>
        <ButtonUp />
        <div className={`${styles.campusbox}`}>
          <main className={`${styles.campusbox__container} container`}>
            <figure>
              <Image
                src='https://i.imgur.com/CftTF3j.png'
                width={600}
                height={600}
                alt='Imagen de Campus Box'
                unoptimized={true}
              />
            </figure>
            <div className={styles.details}>
              <h2>Campus Box</h2>
              <p className={styles.vendor}>Campus Canvas</p>
              <p className={styles.price}>€0,00 EUR</p>
              <p className={styles.taxes}>Impuesto incluido</p>

              <div className={styles.progressBarContainer}>
                <div className={styles.progressBarTitle}>
                  ¡No te quedes sin la tuya! Quedan:
                </div>

                {/* Displays one thing or the other depending on box availability */}
                {BoxAvailable ? (
                  <StaticProgressBar
                    MaxAmount={18000}
                    units='unidades'
                    left={product.data?.product.totalInventory}
                  />
                ) : (
                  <StaticProgressBar
                    MaxAmount={18000}
                    units='unidades'
                    left={0}
                  />
                )}
              </div>

              <p className={styles.description}>
                Nuestra <b>Campus Box</b> es exclusiva para estudiantes
                universitarios. Encuentra productos y sorpresas de nuestros
                patrocinadores. ¡Todo totalmente gratis!
              </p>

              {/* Allows or denies user to order a box depending on the order limit of 1 per user */}
              {orderLimitDisplayer()}

              <p>
                <strong>Comparte:</strong>
              </p>
              <div className={styles.share_buttons}>
                <div className={styles.button_container}>
                  <FacebookShareButton width={50} height={50} color='#4867AA' />
                </div>
                <div className={styles.button_container}>
                  <TwitterShareButton
                    width={50}
                    height={50}
                    color='#1D9BF0'
                    postTitle='¡Pide tu Campus Box gratuita!'
                  />
                </div>
                <div className={styles.button_container}>
                  <WhatsAppShareButton
                    width={50}
                    height={50}
                    color='#2AB13F'
                    postTitle='¡Pide tu Campus Box gratuita!'
                  />
                </div>
              </div>
            </div>
          </main>

          <section className={`${styles.sponsors} container`}>
            <h2>Aquí tus patrocinadores</h2>
            <SponsorsSlider lessPadding />
          </section>
          <Link href={'/'}>
            <button
              className={`${styles.backhome} btn button--redRedborderTransparentHoverShadowtRed`}
            >
              Volver al home
            </button>
          </Link>
        </div>
      </Layout>
    </>
  );
};

export default CampusBox;
