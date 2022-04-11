import React from 'react';
import { connect } from 'react-redux';

//Components
import SecondaryHeader from '@components/GeneralUseComponents/SecondaryHeader/SecondaryHeader';
import FooterSignature from '@components/GeneralUseComponents/FooterSignature/FooterSignature';
import LoginForm from '@components/UsedInSpecificRoutes/Login/LoginForm';
import SEOHeader from '@components/GeneralUseComponents/SEO_Header/SEOHeader';

//Styles
import styles from '@pagestyles/Login.module.scss';

//Redux actions
import * as authActions from '@actions/authActions';
const { signIn } = authActions;

const login = (props) => {
  return (
    <>
      <SEOHeader
        tabTitle={'Login frecuentes'}
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
//Map state to props
const mapStateToProps = (reducers) => {
  return reducers.authReducer;
};

//Map actions to props
const mapDispatchToProps = {
  signIn,
};

export default connect(mapStateToProps, mapDispatchToProps)(login);
