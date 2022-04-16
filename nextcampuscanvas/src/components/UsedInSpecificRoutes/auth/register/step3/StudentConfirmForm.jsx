import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

//Assets
import sendIcon from '@assets/GeneralUse/IconsAndButtons/send_email.svg';

//hooks
import { useInputValue } from '@hooks/useInputValue';

//Styles
import styles from './StudentConfirmForm.module.scss';

const StudentConfirmForm = (props) => {
  const [sent, setSent] = useState(false);

  //Controlling inputs
  const STU_EMAIL = useInputValue('');

  const handleSubmit = (e) => {
    //TODO: Al dar click, que aparezca cargando antes de
    //mostrar a usuario si el correo ya existe o no
    e.preventDefault();
    console.log(STU_EMAIL.value);
    STU_EMAIL.setValue('');
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
            Te hemos enviado un enlace de verificación. Revisa tu correo
            universitario, incluyendo el buzón de spam.
          </h4>
          <p className={styles.sent__resendOption}>
            ¿No has recibido el enlace?{' '}
            <span onClick={() => setSent(false)}>Reenviar enlace</span>{' '}
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
          {props.error && (
            <p className={styles.inputText__errors}>{props.error}</p>
          )}

          <button
            type='submit'
            className={`${styles.continueButton} btn button--red`}
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

export default StudentConfirmForm;
