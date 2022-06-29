//Components
import SecondaryHeader from '@components/GeneralUseComponents/SecondaryHeader/SecondaryHeader';
import FooterSignature from '@components/GeneralUseComponents/FooterSignature/FooterSignature';
import ResetPasswordInput from '@components/UsedInSpecificRoutes/auth/ResetPasswordInput/ResetPasswordInput';
import SEOHeader from '@components/GeneralUseComponents/SEO_Header/SEOHeader';

//Styles
import styles from '@pagestyles/reset_password.module.scss';

const forgot_password = () => {
  return (
    <>
      <SEOHeader
        tabTitle={'Reestablecer contraseña'}
        metaName={'Reestablecer contraseña'}
        description={'Reestablece la contraseña de tu cuenta'}
      />
      <div>
        <SecondaryHeader />
        <main className={styles.main}>
          <div className={styles.main__container}>
            <ResetPasswordInput />
          </div>
        </main>
        <FooterSignature />
      </div>
    </>
  );
};

export default forgot_password;
