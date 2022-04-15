import React from 'react';

//Components
import SecondaryHeader from '@components/GeneralUseComponents/SecondaryHeader/SecondaryHeader';
import FooterSignature from '@components/GeneralUseComponents/FooterSignature/FooterSignature';
import ForgotPasswordInput from '@components/UsedInSpecificRoutes/auth/ForgotPasswordInput/ForgotPasswordInput';
import SEOHeader from '@components/GeneralUseComponents/SEO_Header/SEOHeader';

//Styles
import styles from '@pagestyles/forgot_password.module.scss';

const forgot_password = () => {
  return (
    <>
      <SEOHeader
        tabTitle={'Contraseña olvidada'}
        metaName={'Contraseña olvidada'}
        description={
          'Te enviaremos un enlace a tu Email para que puedas reestablecer tu contraseña.'
        }
      />
      <div>
        <SecondaryHeader />
        <main className={styles.main}>
          <div className={styles.main__container}>
            <ForgotPasswordInput />
          </div>
        </main>
        <FooterSignature />
      </div>
    </>
  );
};

export default forgot_password;
