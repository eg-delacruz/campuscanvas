import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

//Form Validation
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

//hooks
import { useInputValue } from '@hooks/useInputValue';

//Styles
import styles from './ResetPasswordInput.module.scss';

//Form validation
const schema = yup.object().shape({
  //Name and id of inputs, as well
  //as htmlFor of labels has to match these keys
  contrasena: yup
    .string()
    .min(6, 'La contraseña debe tener almenos 6 caracteres')
    .max(16, 'La contraseña debe tener como máximo 16 caracteres')
    .required('Escribe una contraseña'),
  //This checks if the two passwords match
  rep_contrasena: yup.string().oneOf([yup.ref('contrasena'), null]),
});

const ResetPasswordInput = (props) => {
  const [sent, setSent] = useState(false);
  const router = useRouter();

  //Connect yup to react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  //Controlling inputs
  const CONTRASENA = useInputValue('');
  const REP_CONTRASENA = useInputValue('');

  const submitFunction = (e) => {
    //TODO: al haber enviado, hacer login y mostrar que contraseña
    //fue cambiada con éxito por un instante, seguido de una redirección
    //a home ya con el login hecho. A lo mejor recibir correo que
    //se mostrará en el título a través de Redux??
    CONTRASENA.setValue('');
    REP_CONTRASENA.setValue('');
    setSent(true);
    setTimeout(() => {
      router.push('/');
    }, 3000);
  };
  return (
    <form
      className={styles.form}
      method='POST'
      onSubmit={handleSubmit(submitFunction)}
      action=''
      autoComplete='off'
    >
      {sent ? (
        <>
          <h3 className={styles.sent__message}>
            ¡Contraseña modificada con éxito!
          </h3>
        </>
      ) : (
        <>
          <h1>Reestablecer contraseña para "email"</h1>
          <p className={styles.form__subtitle}>
            {' '}
            Introduce tu nueva contraseña
          </p>

          <label className={styles.inputText__label} htmlFor='contrasena'>
            Contraseña
            <p className={styles.inputText__errors}>
              {errors.contrasena?.message}
            </p>
          </label>
          <input
            name='contrasena'
            id='contrasena'
            type='password'
            placeholder='Contraseña'
            autoComplete='off'
            {...register('contrasena')}
            {...CONTRASENA}
          />

          <label
            className={`${styles.inputText__label} `}
            htmlFor='rep_contrasena'
          >
            Repita la contraseña
            <p className={styles.inputText__errors}>
              {errors.rep_contrasena && 'La contraseña debe coincidir'}
            </p>
          </label>
          <input
            className={styles.inputText__RepPassword}
            name='rep_contrasena'
            id='rep_contrasena'
            type='password'
            autoComplete='off'
            placeholder='Repita la contraseña'
            {...register('rep_contrasena')}
            {...REP_CONTRASENA}
          />
          <button type='submit' className={'btn button--red'}>
            Cambiar contraseña
          </button>
          <div className={styles.contactButton}>
            <Link href={'/contacto'}>Contáctanos</Link>
          </div>
        </>
      )}
    </form>
  );
};

export default ResetPasswordInput;
