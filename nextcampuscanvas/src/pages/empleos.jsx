import React from 'react';
import { useRouter } from 'next/router';

//Styles
import styles from '@pagestyles/Empleos.module.scss';

//Components
import TablaEmpleos from '@components/UsedInSpecificRoutes/Jobs/TablaEmpleos/TablaEmpleos';
import Layout from '@components/GeneralUseComponents/Layout/Layout';
import SEOHeader from '@components/GeneralUseComponents/SEO_Header/SEOHeader';

function Empleos() {
  const router = useRouter();
  return (
    <>
      <SEOHeader
        tabTitle={'Empleos'}
        metaName={'Empleos'}
        description={'Aplica a un empleo en Campus Canvas'}
      />

      <Layout>
        <div className={styles.body__gridContainer}>
          <main>
            <div className={`${styles.main__container} container`}>
              <h2>Trabaja con nosotros!</h2>
              <p className={styles.main__subTitle}>
                Forma parte de nuestro increíble equipo. Aquí puedes encontrar
                los puestos que actualmente buscamos:
              </p>

              <TablaEmpleos />

              <section className={styles.main__sendCV}>
                <h3>Toma la iniciativa y envíanos tu CV</h3>

                <button
                  onClick={() => {
                    router.push(
                      { pathname: '/contacto', query: { CV: true } },
                      'contacto'
                    );
                  }}
                  className='btn button--red'
                >
                  Enviar mi CV
                </button>
              </section>
            </div>
          </main>
        </div>
      </Layout>
    </>
  );
}

export default Empleos;
