import React from 'react';
import Head from 'next/head';

//Styles
import styles from '@pagestyles/UniList.module.scss';

//Components
import Layout from '@components/GeneralUseComponents/Layout/Layout';

const UniList = () => {
  return (
    <>
      <SEOHeader
        tabTitle={'Universidades'}
        metaName={'Universidades'}
        description={'Lista de universidades y ubicaciones de repartición'}
      />

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
