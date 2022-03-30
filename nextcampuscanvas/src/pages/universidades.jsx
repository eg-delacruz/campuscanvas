import React from 'react';
import Head from 'next/head';

//Styles
import styles from '@pagestyles/UniList.module.scss';

//Components
import Layout from '@components/GeneralUseComponents/Layout/Layout';

const UniList = () => {
  return (
    <>
      <Head>
        <title>Universidades | Campus Canvas</title>
        <meta
          name='Universidades'
          content='Lista de universidades y ubicaciones de repartición'
        />
        {/* Prevents horizontal scroll due to animations on phone */}
        <meta
          name='viewport'
          content='width=device-width, height=device-height, initial-scale=1.0'
        />
      </Head>

      <Layout>
        <div className={`${styles.Universidades} container`}>
          <h1>Lista de universidades</h1>
          <h3>Próximamente actualizaremos nuestra lista de repartición.</h3>

          <table className={styles.UniList}>
            <thead>
              <tr>
                <th>Lista de Universidades</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td className={styles.Uni}>Universidad Rey Juan Carlos URJC</td>
              </tr>
              <tr>
                <td className={styles.Campus}>Campus Alcorcón</td>
              </tr>
              <tr>
                <td className={styles.Campus}>Campus Aranjuez</td>
              </tr>
              <tr>
                <td className={styles.Campus}>Campus Fuenlabrada</td>
              </tr>
              <tr>
                <td className={styles.Campus}>Paseo de los artilleros</td>
              </tr>
              <tr>
                <td className={styles.Uni}>
                  Universidad Complutense de Madrid
                </td>
              </tr>
              <tr>
                <td className={styles.Campus}>Campus Av. Séneca</td>
              </tr>
              <tr>
                <td className={styles.Campus}>Campus de Somosaguas</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Layout>
    </>
  );
};

export default UniList;
