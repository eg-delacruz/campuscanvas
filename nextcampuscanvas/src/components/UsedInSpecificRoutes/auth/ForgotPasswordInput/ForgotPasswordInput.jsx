import React, { useState } from 'react';
import Link from 'next/link';

//hooks
import { useInputValue } from '@hooks/useInputValue';

//Styles
import styles from './ForgotPasswordInput.module.scss';

//Endpoints
import endPoints from '@services/api';

const ForgotPasswordInput = (props) => {
  const [state, setState] = useState({ sent: false, loading: false });

  //Controlling inputs
  const ACC_EMAIL = useInputValue('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setState({ sent: false, loading: true });

    const respuesta = await fetch(endPoints.auth.forgotPassword, {
      method: 'POST',
      headers: {
        accept: '*/*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: ACC_EMAIL.value }),
    });
    //const data = await respuesta.json();

    ACC_EMAIL.setValue('');
    setState({ sent: true, loading: false });
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
            Te hemos enviado un enlace único para reestablecer tu contraseña.
            Revisa tu correo, incluyendo el buzón de spam.
          </h4>
          <p className={styles.sent__resendOption}>
            ¿No has recibido el enlace?{' '}
            <span onClick={() => setState({ sent: false, loading: false })}>
              Reenviar enlace
            </span>{' '}
          </p>
        </>
      ) : (
        <>
          <h1>¿Olvidaste tu contraseña?</h1>
          <p className={styles.form__subtitle}>
            Para reestablecer tu contraseña, enviaremos un enlace al email de tu
            cuenta de Campus Canvas
          </p>
          <label htmlFor='email'>
            {' '}
            <b>Ingresa el correo de tu cuenta:</b>{' '}
          </label>
          <input
            className={styles.email_input}
            required
            name='email'
            id='email'
            type='email'
            placeholder='correo'
            autoComplete='off'
            value={ACC_EMAIL.value}
            onChange={ACC_EMAIL.onChange}
          />
          <button
            type='submit'
            className={`${
              state.loading && styles.buttonLoading
            }  btn button--red`}
            disabled={state.loading}
          >
            Enviar enlace{' '}
          </button>
        </>
      )}

      <div className={styles.contactButton}>
        <Link href={'/contacto'}>Contáctanos</Link>
      </div>
    </form>
  );
};

export default ForgotPasswordInput;
