import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';

//Session
import { useSession } from 'next-auth/react';

//Assets
import sendIcon from '@assets/GeneralUse/IconsAndButtons/send_email.svg';

//hooks
import { useInputValue } from '@hooks/useInputValue';

//Styles
import styles from './StudentConfirmForm.module.scss';

//Endpoints
import endPoints from '@services/api';

//Browser identifyer
import identifyBrowser from '@services/identifyBrowser';
const { getBrowserName } = identifyBrowser;

const StudentConfirmForm = () => {
  const { data: session, status } = useSession();
  const loading = status === 'loading';

  const router = useRouter();

  const [state, setState] = useState({
    loading: false,
    error: false,
    sent: false,
  });

  //Controlling inputs
  const STU_EMAIL = useInputValue('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setState({ ...state, loading: true });
    const id = session?.token.sub;
    const stu_email = STU_EMAIL.value;

    try {
      const response = await fetch(endPoints.auth.verifyStuEmail, {
        method: 'POST',
        headers: {
          accept: '*/*',
          'Content-Type': 'application/json',
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
            universitario, incluyendo el buzón de spam.
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
          <p className={styles.pause_verif_process_message}>
            Si no quieres verificar tu estatus de estudiante ahora, puedes
            continuar más tarde. Para ello, simplemente inicia sesión con tu
            dirección de Email y contraseña, y finaliza el proceso de
            verificación. Ten en cuenta que mientras no te hayas verificado, no
            tendrás acceso total a nuestras ofertas.
          </p>
        </>
      )}

      <div className={styles.contactButton}>
        <Link href={'/contacto'}>Contáctanos</Link>
      </div>
    </form>
  );
};

export default StudentConfirmForm;
