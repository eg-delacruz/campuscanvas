import React from 'react';
import Head from 'next/head';
import Image from 'next/image';

//assets
import Gerardo from '@assets/PagesImages/NosotrosImages/Gerardo.jpg';

//styles
import styles from '@pagestyles/Nosotros.module.scss';

//Components
import ButtonUp from '@components/GeneralUseComponents/ButtonUp/ButtonUp';
import Layout from '@components/GeneralUseComponents/Layout/Layout';
import SEOHeader from '@components/GeneralUseComponents/SEO_Header/SEOHeader';

function Nosotros() {
  return (
    <>
      <SEOHeader
        tabTitle={'Nosotros'}
        metaName={'Nosotros'}
        description={'Conoce quienes somos'}
      />

      <Layout>
        <div>
          {/* /////////////////////////
            //       Hero        //
            ///////////////////////// */}
          <ButtonUp />

          <section className={styles.hero}>
            <div className={`${styles.hero__container} container`}>
              <h1>Unimos estudiantes y empresas de una manera diferente</h1>
            </div>
          </section>

          {/* /////////////////////////
            //       Main        //
            ///////////////////////// */}

          <main className={styles.main}>
            <div className={`${styles.main__container} container`}>
              <div className={styles.main__quienesSomos}>
                <h2>¿Quiénes somos?</h2>
                <div className={styles['main__quienesSomos-container']}>
                  <p>
                    El principal promotor de Campus Canvas es Gerardo De La
                    Cruz, graduado en 2021 en la Universidad de Ciencias
                    Aplicadas de Bremen con un Grado Internacional en Ingeniería
                    Económica. El carácter internacional de sus estudios le ha
                    permitido indagar en los ámbitos comerciales y aspectos
                    empresariales de distintos países, principalmente de
                    Alemania, España y El Salvador. <br />
                    <br /> La experiencia adquirida en empresas de renombre como
                    Bosch, en Madrid, o Aeroman, en El Salvador, en combinación
                    con sus estudios enfocados a las distintas áreas
                    empresariales (mercadeo, contabilidad, recursos humanos,
                    finanzas) y el desarrollo de destrezas interpersonales en
                    entornos multiculturales ha culminado en la creación de este
                    proyecto
                    <strong> Campus Canvas</strong> .
                  </p>
                  <figure className={styles.main__image1Container}>
                    <Image
                      className={styles.main__image1}
                      src={Gerardo}
                      alt='Equipo Campus Canvas'
                    />
                  </figure>
                </div>
              </div>

              <div className={styles.main__motivation}>
                <h2>Lo que nos motiva</h2>
                <p>
                  El equipo de Campus Canvas está formado en su mayoría por
                  estudiantes, con lo cual nosotros también sabemos que a veces
                  la motivación por los estudios puede estar por los suelos. Es
                  por eso que nuestro objetivo número uno es motivarte a ti,
                  estudiante, y hacer de tu tiempo en la universidad una
                  experiencia memorable. Los productos promocionales de nuestras{' '}
                  <strong>Campus Bag</strong> son cuidadosamente seleccionados
                  para que estos sean de tu agrado y beneficio. Buscamos ser una
                  alternativa publicitaria atractiva y poco intrusiva a
                  comparación de otros medios tradicionales y digitales,
                  conectando y facilitando así la interacción entre empresas y
                  estudiantes a través de la distribución de{' '}
                  <strong>
                    ofertas de empleo, productos promocionales de interés y
                    cupones de descuento
                  </strong>{' '}
                  en variedad de productos. Todo totalmente gratis para ti de
                  parte de nuestros patrocinadores!🎁
                </p>
              </div>
            </div>
          </main>
        </div>
      </Layout>
    </>
  );
}

export default Nosotros;
