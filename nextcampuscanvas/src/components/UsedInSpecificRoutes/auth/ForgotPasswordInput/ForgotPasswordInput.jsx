import React, { useState } from 'react';
import Link from 'next/link';

//hooks
import { useInputValue } from '@hooks/useInputValue';

//Styles
import styles from './ForgotPasswordInput.module.scss';

const ForgotPasswordInput = (props) => {
  const [sent, setSent] = useState(false);

  //Controlling inputs
  const ACC_EMAIL = useInputValue('');

  const handleSubmit = (e) => {
    //TODO: show error if email doesn´t exist?
    e.preventDefault();
    ACC_EMAIL.setValue('');
    setSent(true);
  };
  return (
    <form
      className={styles.form}
      method='POST'
      onSubmit={handleSubmit}
      action=''
      autoComplete='off'
    >
      {sent ? (
        <>
          <h4 className={styles.sent__message}>
            Te hemos enviado un enlace único para reestablecer tu contraseña.
            Revisa tu correo, incluyendo el buzón de spam.
          </h4>
          <p className={styles.sent__resendOption}>
            ¿No has recibido el enlace?{' '}
            <span onClick={() => setSent(false)}>Reenviar enlace</span>{' '}
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
            {...ACC_EMAIL}
          />
          <button type='submit' className={'btn button--red'}>
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
