import React, { useEffect } from 'react';
import { useRouter } from 'next/router';

//Styles
import styles from '@pagestyles/Cuenta_verificada.module.scss';

//Components
import SecondaryHeader from '@components/GeneralUseComponents/SecondaryHeader/SecondaryHeader';
import FooterSignature from '@components/GeneralUseComponents/FooterSignature/FooterSignature';
import SEOHeader from '@components/GeneralUseComponents/SEO_Header/SEOHeader';

const cuenta_verificada = () => {
  const router = useRouter();
  useEffect(() => {
    setTimeout(() => {
      router.push('/');
    }, 9000);
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
            <h2>¡Felicidades!</h2>
            <h3>Has verificado tu cuenta de estudiante exitosamente</h3>
            <p>
              Inicia sesión con tu cuenta si aún no lo has hecho para acceder a
              todos los beneficios que ofrecemos exclusivamente a estudiantes
              universitarios.
            </p>
          </div>
        </main>

        <FooterSignature />
      </div>
    </>
  );
};

export default cuenta_verificada;
