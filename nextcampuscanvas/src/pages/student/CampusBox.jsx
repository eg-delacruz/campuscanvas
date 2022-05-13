import { useEffect, useState } from 'react';
import { storefront } from '@services/storefront';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';

//Styles
import styles from '@pagestyles/student/CampusBox.module.scss';

//Assets
import Box from '@assets/PagesImages/CampusBox/campusbox.png';
import SoldOut from '@assets/PagesImages/CampusBox/soldout.png';

//Components
import Layout from '@components/GeneralUseComponents/Layout/Layout';
import SponsorsSlider from '@components/GeneralUseComponents/SponsorsSlider/SponsorsSlider';
import ErrorDisplayer from '@components/GeneralUseComponents/ErrorDisplayer/ErrorDisplayer';
import Loader from '@components/GeneralUseComponents/Loader/Loader';

const CampusBox = () => {
  const [product, setProduct] = useState({});
  const [state, setState] = useState({
    loading: false,
    error: '',
  });

  const router = useRouter();

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

  //Getting product inventory
  const id = 'gid://shopify/Product/7509431713980';
  const REQUIRED_BOX_DATA = `
  query Produc{
    product(id:"${id}"){
      handle
      totalInventory
    }
  }
  `;

  async function fetchData() {
    setState({ ...state, loading: true });
    const response = await storefront(REQUIRED_BOX_DATA);
    setProduct(response);
    setState({ ...state, loading: false });
  }

  useEffect(() => {
    try {
      if (Object.keys(product).length === 0) {
        fetchData();
      }
    } catch (error) {
      console.log(error);
      setState({ ...state, loading: false, error: error });
    }
  }, []);

  if (status === 'loading' || !session?.token.stu_verified || state.loading) {
    //TODO: return a better loading displayer
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

  //If out of stock
  if (product.data?.product.totalInventory <= 0) {
    return (
      <Layout>
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
    <Layout>
      <div className={`${styles.campusbox}`}>
        <main className={`${styles.campusbox__container} container`}>
          <figure>
            <Image src={Box} alt='Imagen de Campus Box' />
          </figure>
          <div className={styles.details}>
            <h2>Campus Box</h2>
            <p className={styles.vendor}>Campus Canvas</p>
            <p className={styles.price}>€0,00 EUR</p>
            <p className={styles.taxes}>Impuesto incluido</p>
            <p className={styles.description}>
              Nuestra <b>Campus Box</b> es exclusiva para estudiantes
              universitarios. Encuentra productos y sorpresas de nuestros
              patrocinadores. ¡Todo totalmente gratis!
            </p>
            <Link href={'/construccion'}>
              <button className='btn button--red'>¡Obtener Campus Box!</button>
            </Link>
            <div className={styles.divider}></div>
            <p className={styles.conditions}>
              * Debido a las existencias limitadas de la Campus Box, solamente
              puedes pedir una caja por semestre.
            </p>
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
  );
};

export default CampusBox;
