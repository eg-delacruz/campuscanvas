import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

//Styles
import styles from '@pagestyles/Main.module.scss';

//Assets
import Hero_image from '@assets/PagesImages/HomeImages/bags_hero.png';
import MQ_Hero_image from '@assets/PagesImages/HomeImages/3bags_hero.png';
import Bag_logo from '@assets/GeneralUse/Logos/bag_logo.svg';
import Bag_example from '@assets/PagesImages/HomeImages/bag.png';
import Card_gift from '@assets/GeneralUse/card_gift.png';
import Card_pages from '@assets/GeneralUse/card_pages.png';
import Card_coupons from '@assets/GeneralUse/card_coupons.png';
import Distribution_map from '@assets/PagesImages/HomeImages/distribution_map.png';
import Distributon_house from '@assets/PagesImages/HomeImages/distribution_house.png';

//Components
import Layout from '@components/GeneralUseComponents/Layout/Layout';
import ButtonUp from '@components/GeneralUseComponents/ButtonUp/ButtonUp';
import Carousel from '@components/GeneralUseComponents/Carousel/Carousel';

export default function Home() {
  return (
    <>
      <Head>
        <title>Home | Campus Canvas</title>
        <meta
          name='Campus Canvas'
          content='Bolsas publicitarias gratuitas para estudiantes'
        />
        {/* Prevents horizontal scroll due to animations on phone */}
        <meta
          name='viewport'
          content='width=device-width, height=device-height, initial-scale=1.0'
        />
      </Head>

      <Layout>
        <ButtonUp />

        <div className={styles.body__gridContainer}>
          <ButtonUp />
          {/* /////////////////////////
            //       Hero        //
            ///////////////////////// */}

          <section className={styles.hero}>
            <div className={`${styles['hero__container']} container`}>
              <h1 className={styles.hero__title}>
                ¡La bolsa más esperada por los estudiantes!
              </h1>
              <picture
                className={styles['hero__image-container']}
                width={1112}
                height={461}
              >
                <source media='(max-width:480px)' srcSet={MQ_Hero_image} />
                <Image
                  className={styles.hero__image}
                  src={Hero_image}
                  alt='Bolsas Campus Canvas'
                />
              </picture>
            </div>
          </section>

          {/* /////////////////////////
            //       Main         //
            ///////////////////////// */}

          <main>
            <div className={`${styles['main__container']} container`}>
              <figure className={styles['main__title-container']}>
                <Image src={Bag_logo} alt='Logo Campus Bags' />
              </figure>
              <section className={styles.main__content}>
                <figure className={styles['main__content-image']}>
                  <img
                    src={Bag_example.src}
                    width={687}
                    height={531.3}
                    alt='Ejemplo de bolsa de Campus Canvas'
                  />
                </figure>
                <div className={styles['main__description-container']}>
                  <p className={styles['main__content-description']}>
                    Si eres un estudiante de alguna de las principales
                    universidades de la Comunidad de Madrid, podrás recibir una
                    de nuestras bolsas
                    <strong> Campus Bag </strong> llena de regalos y productos
                    pensados especialmente para ti de parte de nuestros
                    patrocinadores. ¡Todo completamente gratis!
                    <br />
                    <br />
                    Repartimos las bolsas a lo largo del cuatrimestre
                    estudiantil, cerca de alguno de los punto de acceso a tu
                    universidad. Consulta nuestra{' '}
                    <Link href='/universidades'>
                      lista de universidades y ubicaciones
                    </Link>
                    , donde podrás comprobar si tu campus se encuentra entre
                    nuestros puntos de repartición. ¡No te quedes sin la tuya!
                  </p>
                </div>
              </section>
            </div>
          </main>

          {/* /////////////////////////
            //      Benefits       //
            ///////////////////////// */}

          <section className={styles.benefits}>
            <div className={`${styles.benefits__container} container`}>
              <div className={styles.benefits__cards}>
                <article className={styles.card}>
                  <div>
                    <Image
                      src={Card_gift}
                      className={styles.card__image}
                      alt='Productos de la bolsa'
                    />
                  </div>
                  <div className={styles.card__information}>
                    <h4>Productos</h4>
                    <p>
                      Encuentra distintos comestibles como galletas,
                      chocolatinas y golosinas, además de productos que pueden
                      serte de utilidad en tus estudios.
                    </p>
                  </div>
                </article>

                <article className={styles.card}>
                  <div>
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
                  <div>
                    <Image
                      // width={300}
                      // height={300}
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
                  El contenido de nuestra Campus Bag puede ser distinto según el
                  área en la que estudias. Seguro que en la tuya encuentras más
                  de algún producto interesante para ti, pues nuestras marcas
                  patrocinadoras provienen de distintas industrias y sectores.
                </p>
              </div>
            </div>
          </section>

          {/* /////////////////////////
            //    Distribution     //
            ///////////////////////// */}

          <section className={styles.distribution}>
            <div className={`${styles.distributionMadrid} container`}>
              <h2>Espéranos en tu universidad de la Comunidad de Madrid</h2>
              <figure>
                <Image
                  src={Distribution_map}
                  alt='Mapa de distribución en Madrid'
                />
              </figure>
              <p>
                Si eres estudiante en una de las universidades de la Comunidad
                de Madrid, podrás recibir tu Campus Bag en alguna de nuestras
                visitas a tu campus.
              </p>
            </div>
            <div className={`${styles.distributionDelivery} container`}>
              <h2>... O te la llevamos hasta tu casa!</h2>
              <figure>
                <Image
                  src={Distributon_house}
                  alt='Te enviamos la Campus Bag a casa'
                />
              </figure>
              <h4>Tú solo pagas el envío</h4>
              <Link href='/construccion'>
                <button className='btn button--red'>¡Pedir Campus Bag!</button>
              </Link>
            </div>
          </section>

          {/* /////////////////////////
            //   Patrocinadores    //
            ///////////////////////// */}

          <Carousel titulo='Nuestros patrocinadores' />
        </div>
      </Layout>
    </>
  );
}
