import React from 'react';

//Components
import SEOHeader from '@components/GeneralUseComponents/SEO_Header/SEOHeader';
import SecondaryHeader from '@components/GeneralUseComponents/SecondaryHeader/SecondaryHeader';
import FooterSignature from '@components/GeneralUseComponents/FooterSignature/FooterSignature';
import CambiarPasswordForm from '@components/UsedInSpecificRoutes/auth/CambiarPasswordInput/CambiarPasswordForm';

//Styles
import styles from '@pagestyles/cambiar_password.module.scss';

//Session
import { useSession } from 'next-auth/react';

const cambiar_password = () => {
  //Session
  const { data: session, status } = useSession();

  //Securing route
  if (status === 'unauthenticated') {
    router.push('/auth/login');
  }

  return (
    <>
      <SEOHeader
        tabTitle={'Cambiar contraseña'}
        metaName={'Cambiar contraseña'}
        description={'Cambia la contraseña de tu cuenta'}
      />
      <div>
        <SecondaryHeader />
        <main className={styles.main}>
          <div className={styles.main__container}>
            <CambiarPasswordForm />
          </div>
        </main>
        <FooterSignature />
      </div>
    </>
  );
};

export default cambiar_password;
