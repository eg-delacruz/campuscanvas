import React from 'react';
import SEOHeader from '@components/GeneralUseComponents/SEO_Header/SEOHeader';

//Styles
import styles from '@components/CurrentlyUnused/PageComponents/TablaUniversidades/UniList.module.scss';

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
                <th className={styles.Uni}>Universidad Rey Juan Carlos URJC</th>
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
                <th className={styles.Uni}>
                  Universidad Complutense de Madrid
                </th>
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
