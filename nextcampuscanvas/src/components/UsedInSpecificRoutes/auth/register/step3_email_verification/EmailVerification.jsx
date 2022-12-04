import { useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';

//Assets
import sendIcon from '@assets/GeneralUse/IconsAndButtons/send_email.svg';
import arrow_right_white from '@assets/GeneralUse/IconsAndButtons/arrow_right_white.svg';

//Styles
import styles from './EmailVerification.module.scss';

//Endpoints
import endPoints from '@services/api';

//hooks
import { useInputValue } from '@hooks/useInputValue';

//Browser identifyer
import identifyBrowser from '@services/identifyBrowser';
const { getBrowserName } = identifyBrowser;

const EmailVerification = ({ user_id, setVerificationMethod }) => {
  const [state, setState] = useState({
    loading: false,
    error: false,
    sent: false,
  });

  const router = useRouter();

  //Controlling inputs
  const STU_EMAIL = useInputValue('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setState({ ...state, loading: true });

    const id = user_id;
    const stu_email = STU_EMAIL.value;

    try {
      const response = await fetch(endPoints.auth.verifyStuEmail, {
        method: 'POST',
        headers: {
          accept: '*/*',
          'Content-Type': 'application/json',
          app_secret_key: process.env.NEXT_PUBLIC_MAIN_NEXT_WEB_APP_SECRET_KEY,
        },
        body: JSON.stringify({
          id,
          stu_email,
          browserName: getBrowserName(navigator.userAgent),
        }),
      });
      const data = await response.json();

      if (data.error) {
        if (data.error === 'No has ingresado tu universidad') {
          setState({ ...state, error: data.error, loading: false });
          return setTimeout(() => {
            router.push('/');
          }, 2000);
        }
        setState({ ...state, error: data.error, loading: false });
        return false;
      }

      STU_EMAIL.setValue('');
      setState({ ...state, error: false, loading: false, sent: true });
    } catch (error) {
      console.log(error);
      setState({ ...state, loading: false, error: error.message });
    }
  };

  return (
    <>
      <form
        className={styles.form}
        method='POST'
        onSubmit={handleSubmit}
        action=''
        autoComplete='off'
      >
        {state.sent ? (
          <>
            <h4 className={styles.sent__message}>
              Te hemos enviado un enlace de verificación. Revisa tu correo
              universitario, incluyendo el buzón de SPAM.
            </h4>
            <p className={styles.sent__resendOption}>
              ¿No has recibido el enlace?{' '}
              <span onClick={() => setState({ ...state, sent: false })}>
                Reenviar enlace
              </span>{' '}
            </p>
          </>
        ) : (
          <>
            <button
              onClick={() => {
                setVerificationMethod('');
              }}
              className={`${styles.button_back} btn button--red`}
            >
              <span>
                <Image src={arrow_right_white} />
              </span>
              <div>Otro método</div>
            </button>

            <h1>Regístrate gratis</h1>
            <h4>Paso 3 de 3</h4>
            <p className={styles.form__subtitle}>
              Para verificar tu estatus de estudiante, introduce tu correo
              universitario y te enviaremos un enlace de confirmación.
            </p>

            <div className={styles.confirmationContainer}>
              <div className={styles.iconContainer}>
                <Image layout='fixed' src={sendIcon} />
              </div>
              <div>
                <label htmlFor='email'>Correo universitario</label>
                <input
                  required
                  name='email'
                  id='email'
                  type='email'
                  placeholder='Correo universitario'
                  autoComplete='off'
                  value={STU_EMAIL.value}
                  onChange={STU_EMAIL.onChange}
                />
              </div>
            </div>
            {state.error && (
              <p className={styles.inputText__errors}>{state.error}</p>
            )}

            <button
              type='submit'
              className={`${styles.sentLinkButton} ${
                state.loading && styles.buttonLoading
              } btn button--red`}
              disabled={state.loading}
            >
              Enviar enlace{' '}
            </button>
            <p className={styles.bottom_message}>
              En caso tengas problemas para verificarte, considera hacerlo
              mediante tu identificación de estudiante o consulta nuestras{' '}
              <Link href='/FAQs'>FAQs</Link>.
            </p>
          </>
        )}
      </form>
    </>
  );
};

export default EmailVerification;
