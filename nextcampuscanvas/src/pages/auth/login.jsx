import React from 'react';

//Components
import SecondaryHeader from '@components/GeneralUseComponents/SecondaryHeader/SecondaryHeader';
import FooterSignature from '@components/GeneralUseComponents/FooterSignature/FooterSignature';
import LoginForm from '@components/UsedInSpecificRoutes/auth/Login/LoginForm';
import SEOHeader from '@components/GeneralUseComponents/SEO_Header/SEOHeader';

//Styles
import styles from '@pagestyles/Login.module.scss';

const login = (props) => {
  return (
    <>
      <SEOHeader
        tabTitle={'Login'}
        metaName={'Login'}
        description={'Inicia sesión para acceder a nuestros servicios'}
      />

      <div className={styles.login__container}>
        <SecondaryHeader />

        <main className={styles.main}>
          <div className={styles.main__container}>
            <LoginForm />
          </div>
        </main>

        <FooterSignature />
      </div>
    </>
  );
};

export default login;
