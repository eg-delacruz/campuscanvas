import React from 'react';
import Link from 'next/link';
import Head from 'next/head';

//Styles
import styles from '@pagestyles/FAQs.module.scss';

//Components
import ButtonUp from '@components/GeneralUseComponents/ButtonUp/ButtonUp';
import Layout from '@components/GeneralUseComponents/Layout/Layout';

function FAQs() {
  return (
    <>
      <Head>
        <title>Preguntas frecuentes | Campus Canvas</title>
        <meta
          name='Preguntas frecuentes'
          content='Preguntas frecuentes hechas por empresas y estudiantes'
        />
        {/* Prevents horizontal scroll due to animations on phone */}
        <meta
          name='viewport'
          content='width=device-width, height=device-height, initial-scale=1.0'
        />
      </Head>

      <Layout>
        <div>
          {/* /////////////////////////
            //       Main        //
          ///////////////////////// */}
          <main>
            <ButtonUp />
            <div className={`${styles.main__container} container`}>
              <h2 className={styles.main__title}>Preguntas frecuentes</h2>
              <section className='main__questionList'>
                <article>
                  <h4>
                    ¿Por qué son las bolsas de Campus Bag totalmente gratis?
                  </h4>
                  <p>
                    El contenido de nuestra <strong>Campus Bag</strong> es
                    totalmente patrocinado por empresas que quieren dar a
                    conocer y promover sus productos entre los estudiantes en
                    España; qué mejor manera de hacerlo que obsequiándotelos
                    para que puedas disfrutar de ellos.
                  </p>
                </article>
                <article>
                  <h4>¿Dónde y cuándo se reparten las bolsas?</h4>
                  <p>
                    En nuestra{' '}
                    <Link href='/universidades'>
                      lista de universidades y ubicaciones
                    </Link>{' '}
                    puedes verificar si tu universidad forma parte de nuestros
                    puntos de repartición. Hacemos nuestro mejor esfuerzo por
                    llevarte tu <strong> Campus Bag</strong> al menos una vez
                    por cuatrimestre. Si tu universidad no se encuentra en
                    nuestra lista, ¡no te desanimes! Estamos constantemente en
                    expansión y seguramente en un futuro próximo también
                    estaremos en tu campus.
                  </p>
                </article>
                <article>
                  <h4>
                    Me perdí de la distribución de las bolsas en mi campus,
                    ¿cómo puedo obtener una?
                  </h4>
                  <p>
                    Puedes pedir tu <strong> Campus Bag</strong> en línea en{' '}
                    <Link href='/construccion'>este enlace</Link> , o puedes
                    esperar nuestra siguiente repartición. En algunas
                    universidades repartimos incluso dos veces en el mismo
                    cuatrimestre.
                  </p>
                </article>
                <article>
                  <h4>
                    Me gustaría promocionar un producto con ustedes, ¿Dónde
                    puedo encontrar información?
                  </h4>
                  <p>
                    Puedes enviarnos un Email a{' '}
                    <a href='mailto:campuscanvas.info@gmail.com'>
                      <span>campuscanvas.info@gmail.com</span>
                    </a>{' '}
                    o utilizar nuestro{' '}
                    <Link href='/contacto'> formulario de contacto </Link>. Con
                    mucho gusto te enviaremos toda la información que necesites.
                  </p>
                </article>
              </section>
            </div>
          </main>
        </div>
      </Layout>
    </>
  );
}

export default FAQs;
