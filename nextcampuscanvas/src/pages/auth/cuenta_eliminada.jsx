import React, { useEffect } from 'react';
import { useRouter } from 'next/router';

//Styles
import styles from '@pagestyles/Cuenta_eliminada.module.scss';

//Components
import SecondaryHeader from '@components/GeneralUseComponents/SecondaryHeader/SecondaryHeader';
import FooterSignature from '@components/GeneralUseComponents/FooterSignature/FooterSignature';
import SEOHeader from '@components/GeneralUseComponents/SEO_Header/SEOHeader';

const cuenta_verificada = () => {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      router.push('/');
    }, 7000);
  }, []);

  return (
    <>
      <SEOHeader
        tabTitle={'Cuenta verificada'}
        metaName={'Cuenta verificada'}
        description={'¡Se ha verificado tu cuenta de estudiante exitosamente!'}
      />
      <div className={styles.verif_acc__container}>
        <SecondaryHeader />

        <main className={styles.main}>
          <div className={`${styles.main__container} container`}>
            <h2>Cuenta eliminada</h2>
            <h3>Has eliminado tu cuenta.</h3>
            <p>
              Lamentamos verte partir, pero siempre puedes volver en el
              futuro.😉 <br /> Serás redirigido a la página principal en unos
              segundos.
            </p>
          </div>
        </main>

        <FooterSignature />
      </div>
    </>
  );
};

export default cuenta_verificada;
