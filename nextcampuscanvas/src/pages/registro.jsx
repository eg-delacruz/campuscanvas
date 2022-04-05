import React from 'react';
import Head from 'next/head';
import { connect } from 'react-redux';
import { useRouter } from 'next/router';

//Form Validation
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

//Components
import SecondaryHeader from '@components/GeneralUseComponents/SecondaryHeader/SecondaryHeader';
import EmailPasswordForm from '@components/UsedInSpecificRoutes/register/EmailPasswordForm';
import FooterSignature from '@components/GeneralUseComponents/FooterSignature/FooterSignature';

//Styles
import styles from '@pagestyles/Registro.module.scss';

//Redux actions
import * as authActions from '@actions/authActions';
const { signIn } = authActions;

const login = (props) => {
  return (
    <>
      <Head>
        <title>Login | Campus Canvas</title>
        <meta
          name='Login'
          content='Inicia sesión para acceder a nuestros servicios'
        />
        {/* Prevents horizontal scroll due to animations on phone */}
        <meta
          name='viewport'
          content='width=device-width, height=device-height, initial-scale=1.0'
        />
      </Head>

      <div className={styles.login__container}>
        <SecondaryHeader />

        <main className={styles.main}>
          <div className={styles.main__container}>
            <EmailPasswordForm />
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
