import React, { useState } from 'react';
import { connect } from 'react-redux';

//Components
import SecondaryHeader from '@components/GeneralUseComponents/SecondaryHeader/SecondaryHeader';
import FooterSignature from '@components/GeneralUseComponents/FooterSignature/FooterSignature';
import SEOHeader from '@components/GeneralUseComponents/SEO_Header/SEOHeader';
import EmailPasswordForm from '@components/UsedInSpecificRoutes/register/step1/EmailPasswordForm';
import DataForm from '@components/UsedInSpecificRoutes/register/step2/DataForm';
import StudentConfirmForm from '@components/UsedInSpecificRoutes/register/step3/StudentConfirmForm';

//Styles
import styles from '@pagestyles/Registro.module.scss';

//Redux actions
import * as authActions from '@actions/authActions';
const { signIn } = authActions;

const login = (props) => {
  const [step, setStep] = useState(1);
  return (
    <>
      <SEOHeader
        tabTitle={'Registro'}
        metaName={'Registro de usuario'}
        description={
          'Regísrate en Campus Canvas y acceder a nuestros productos'
        }
      />

      <div className={styles.login__container}>
        <SecondaryHeader />

        <main className={styles.main}>
          <div className={styles.main__container}>
            {step === 1 && <EmailPasswordForm setStep={setStep} />}
            {step === 2 && <DataForm setStep={setStep} />}
            {step === 3 && <StudentConfirmForm setStep={setStep} />}
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
