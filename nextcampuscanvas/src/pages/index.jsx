import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

//Styles
import styles from '@pagestyles/Main.module.scss';

//Assets
import Box_logo from '@assets/GeneralUse/Logos/Box_logo.svg';
import Empty_box from '@assets/PagesImages/HomeImages/box.svg';
import BoxWithProducts from '@assets/PagesImages/HomeImages/box_and_products.svg';
import Card_gift from '@assets/GeneralUse/card_gift.png';
import Card_pages from '@assets/GeneralUse/card_pages.png';
import Card_coupons from '@assets/GeneralUse/card_coupons.png';
import Distribution_map from '@assets/PagesImages/HomeImages/distribution_map.png';
import Distributon_ofice from '@assets/PagesImages/HomeImages/distribution_ofice.png';

//Components
import Layout from '@components/GeneralUseComponents/Layout/Layout';
import ButtonUp from '@components/GeneralUseComponents/ButtonUp/ButtonUp';
import SEOHeader from '@components/GeneralUseComponents/SEO_Header/SEOHeader';
import SponsorsSlider from '@components/GeneralUseComponents/SponsorsSlider/SponsorsSlider';

//Session
import { useSession } from 'next-auth/react';

export default function Home() {
  //Session
  const { data: session, status } = useSession();

  const router = useRouter();

  //Dirigir a usuario al paso de verificación correspondiente
  const verifyUser = () => {
    if (status === 'unauthenticated') {
      return router.push(
        { pathname: '/auth/registro', query: { step: 1 } },
        'auth/registro'
      );
    }
    if (!session?.token.stu_data.university && !session?.token.stu_verified) {
      return router.push(
        { pathname: '/auth/registro', query: { step: 2 } },
        'auth/registro'
      );
    }
    if (session?.token.stu_data.university && !session?.token.stu_verified) {
      return router.push(
        { pathname: '/auth/registro', query: { step: 3 } },
        'auth/registro'
      );
    }
  };

  //Hero button displayer
  const HeroButtonDisplayer = () => {
    if (status === 'loading') {
      return (
        <>
          <button className={`${styles.loadingBtnSpinner} btn button--red`}>
            Cargando
          </button>
        </>
      );
    }
    if (session?.token.stu_verified) {
      return (
        <>
          <p>
            Ya puedes pedir tu <b>Campus Box</b>
          </p>
          <Link href='/student/CampusBox'>
            <button className='btn button--red'>¡Pedir caja gratuita!</button>
          </Link>
        </>
      );
    } else {
      return (
        <>
          <p>
            Regístrate y verifica tu cuenta estudiantil para obtener tu caja
            totalmente gratis
          </p>

          <button className='btn button--red' onClick={() => verifyUser()}>
            Registrarse
          </button>
        </>
      );
    }
  };

  //Distribution button displayer
  const DistributionButtonDisplayer = () => {
    if (status === 'loading') {
      return (
        <>
          <button className={`${styles.loadingBtnSpinner} btn button--red`}>
            Cargando
          </button>
        </>
      );
    }
    if (session?.token.stu_verified) {
      return (
        <>
          <Link href='/student/CampusBox'>
            <button className='btn button--red'>¡Pedir Campus Box!</button>
          </Link>
        </>
      );
    } else {
      return (
        <>
          <button className='btn button--red' onClick={() => verifyUser()}>
            Registrarse
          </button>
        </>
      );
    }
  };

  //TODO: make loading effect on buttons while loading session

  return (
    <>
      <SEOHeader
        tabTitle={'Home'}
        metaName={'Campus Canvas'}
        description={'Bolsas publicitarias gratuitas para estudiantes'}
      />

      <Layout>
        <ButtonUp />

        <div className={styles.body__gridContainer}>
          <ButtonUp />
          {/* /////////////////////////
            //       Hero        //
            ///////////////////////// */}

          <section className={styles.hero}>
            <div className={`${styles.hero__wrapper} container`}>
              <h1>¡Productos exclusivos a estudiantes!</h1>

              <div className={`${styles['hero__container']}`}>
                <div className={`${styles['hero__image_container']}`}>
                  <Image alt='Campus Box' src={BoxWithProducts} />
                </div>
                <div className={`${styles.hero__text_button_container}`}>
                  {HeroButtonDisplayer()}
                </div>
              </div>
            </div>
          </section>

          {/* /////////////////////////
            //       Main         //
            ///////////////////////// */}

          <main className={styles.main}>
            <div className={`${styles['main__container']} container`}>
              <figure className={styles.main__box_logo_container}>
                <Image alt='Logo Campus Box' src={Box_logo} />
              </figure>
              <div className={styles.main__content}>
                <p className={`${styles['main__content-description']}`}>
                  Si eres estudiante universitario inscrito en alguna
                  universidad de España Peninsular, podrás recibir una de
                  nuestras cajas <b>Campus Box</b> llena de regalos y productos
                  pensados especialmente para ti de parte de nuestros
                  patrocinadores. ¡Todo completamente gratis!
                  <br />
                  <br />
                  Enviamos unidades <b>limitadas</b> a lo largo de cada
                  cuatrimestre estudiantil, con lo cuál deberás ser rápido para
                  hacerte con la tuya. Puedes estar al tanto de cuándo iniciamos
                  la distribución a través de nuestras{' '}
                  <a href='#footer'>redes sociales</a>. ¡No te quedes sin la
                  tuya!
                </p>
                <figure className={styles.main__empty_box_container}>
                  <img src={Empty_box.src} alt='Campus Box' />
                </figure>
              </div>
            </div>
          </main>

          {/* /////////////////////////
            //      Benefits       //
            ///////////////////////// */}

          <section className={styles.benefits}>
            <div className={`${styles.benefits__container} container`}>
              <div className={styles.benefits__cards}>
                <article className={styles.card}>
                  <div className={styles.card__image_container}>
                    <Image
                      src={Card_gift}
                      className={styles.card__image}
                      alt='Productos de la bolsa'
                    />
                  </div>
                  <div className={styles.card__information}>
                    <h4>Productos</h4>
                    <p>
                      Encuentra distintos comestibles como galletas, bebidas y
                      golosinas, además de productos que pueden serte de
                      utilidad en tus estudios.
                    </p>
                  </div>
                </article>

                <article className={styles.card}>
                  <div className={styles.card__image_container}>
                    <Image
                      src={Card_pages}
                      alt='Ofertas de trabajo'
                      className={styles.card__image}
                    />
                  </div>
                  <div className={styles.card__information}>
                    <h4>Ofertas de trabajo</h4>
                    <p>
                      Ya sean ofertas de estudiantes en prácticas, jornadas de
                      medio tiempo o a tiempo completo, conecta de primera mano
                      con tus empresas favoritas.
                    </p>
                  </div>
                </article>

                <article className={styles.card}>
                  <div className={styles.card__image_container}>
                    <Image
                      className={styles.card__image}
                      src={Card_coupons}
                      alt='Cupones y descuentos'
                    />
                  </div>
                  <div className={styles.card__information}>
                    <h4>Cupones y descuentos</h4>
                    <p>
                      Ahorra dinero con nosotros a través de códigos de
                      descuento exclusivos para distintos productos, eventos y
                      otras actividades.
                    </p>
                  </div>
                </article>
              </div>
              <div className={styles.benefits__description}>
                <h2>¡Contenido para todos los gustos!</h2>
                <p>
                  El contenido de nuestra <b>Campus Box</b> puede ser distinto
                  según el área en la que estudias. Independientemente de la
                  versión que te toque, siempre encontrarás productos
                  interesantes para ti, pues nuestras marcas patrocinadoras
                  provienen de distintas industrias y sectores.
                </p>
              </div>
            </div>
          </section>

          {/* /////////////////////////
            //    Distribution     //
            ///////////////////////// */}

          <section className={styles.distribution}>
            <div className={`${styles.distributionMadrid} container`}>
              <h2>Recíbela en cualquier parte de España Peninsular</h2>
              <figure>
                <Image
                  src={Distribution_map}
                  alt='Mapa de distribución en España'
                />
              </figure>
              <p>
                Si eres estudiante en alguna universidad Española, puedes pedir
                una Campus Box exclusiva y totalmente gratuita. ¡Apresúrate! Hay
                unidades limitadas por cuatrimestre.
              </p>
            </div>
            <div className={`${styles.distributionDelivery} container`}>
              <h2>... O ven a por la tuya en nuestras oficinas en Madrid</h2>
              <figure>
                <Image
                  src={Distributon_ofice}
                  alt='Ven a recojer tu Campus Box a nuestras oficinas en Madrid'
                />
              </figure>
              <h4>¡De esta manera te ahorras el envío!</h4>

              {DistributionButtonDisplayer()}
            </div>
          </section>

          {/* /////////////////////////
            //   Patrocinadores    //
            ///////////////////////// */}
          <SponsorsSlider titulo='Nuestros patrocinadores' />
        </div>
      </Layout>
    </>
  );
}
