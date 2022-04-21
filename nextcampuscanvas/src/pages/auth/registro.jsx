import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';

//Assets
import Logo_Campus_Canvas from '@assets/GeneralUse/Logos/logo.svg';

//Components
import FooterSignature from '@components/GeneralUseComponents/FooterSignature/FooterSignature';
import SEOHeader from '@components/GeneralUseComponents/SEO_Header/SEOHeader';
import EmailPasswordForm from '@components/UsedInSpecificRoutes/auth/register/step1/EmailPasswordForm';
import DataForm from '@components/UsedInSpecificRoutes/auth/register/step2/DataForm';
import StudentConfirmForm from '@components/UsedInSpecificRoutes/auth/register/step3/StudentConfirmForm';

//Styles
import styles from '@pagestyles/Registro.module.scss';

const registro = (props) => {
  const router = useRouter();
  const [step, setStep] = useState(1);

  //Render the form depending on the step
  useEffect(() => {
    if (router.query.step === '2') {
      setStep(2);
      router.query.step = {};
    }
    if (router.query.step === '3') {
      setStep(3);
      router.query.step = {};
    }
  }, [step]);

  return (
    <>
      <SEOHeader
        tabTitle={'Registro'}
        metaName={'Registro de usuario'}
        description={
          'Regísrate en Campus Canvas y acceder a nuestros productos'
        }
      />

      {/* Not using generic secondaryHeader to prevent that user goes to home throug
      verification process without refreshing props.user, since with link, redux props 
      would be kept without updating them */}
      <div className={styles.login__container}>
        <header className={styles.header}>
          <div className={`${styles.header__container} container`}>
            <a href='/'>
              <button>
                <Image src={Logo_Campus_Canvas} alt='Logo Campus Canvas' />
              </button>
            </a>
          </div>
        </header>

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

export default registro;
