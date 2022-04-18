import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { connect } from 'react-redux';
import { useRouter } from 'next/router';

//Form Validation
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

//hooks
import { useInputValue } from '@hooks/useInputValue';

//Styles
import styles from './ResetPasswordInput.module.scss';

//Endpoints
import endPoints from '@services/api';

//Redux actions
import * as authActions from '@actions/authActions';
const { login } = authActions;

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
  const [state, setState] = useState({
    sent: false,
    error: '',
    loading: false,
  });
  const router = useRouter();

  //Getting userEmail
  const id = router.query['reset-password'][1];
  const token = router.query['reset-password'][2];
  const userEmail = router.query['reset-password'][3];

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

  const submitFunction = async (e) => {
    setState({ ...state, loading: true });
    const respuesta = await fetch(endPoints.auth.resetPassword(id, token), {
      method: 'POST',
      headers: {
        accept: '*/*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ password: CONTRASENA.value }),
    });
    const data = await respuesta.json();

    if (data?.error) {
      setState({ ...state, loading: false, error: data.error });
      setTimeout(() => {
        router.push('/');
      }, 3500);
    }

    //Login y redirección a home
    try {
      props.login(userEmail, CONTRASENA.value).then(async (res) => {
        if (res?.payload === 'Usuario o contraseña incorrectos') {
          return false;
        }
        setState({ ...state, sent: true });
        CONTRASENA.setValue('');
        REP_CONTRASENA.setValue('');
        setState({ ...state, sent: true, loading: false });
        setTimeout(async () => {
          await router.push('/');
        }, 3000);
      });
    } catch (error) {
      console.log(error);
    }
  };

  if (state.error)
    return <h3 className={styles.modifyPassErr}>{state.error}</h3>;

  return (
    <form
      className={styles.form}
      method='POST'
      onSubmit={handleSubmit(submitFunction)}
      action=''
      autoComplete='off'
    >
      {state.sent ? (
        <>
          <h3 className={styles.sent__message}>
            ¡Contraseña modificada con éxito!
          </h3>
        </>
      ) : (
        <>
          <h3>Reestablecer contraseña {userEmail && `para ${userEmail}`}</h3>
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
            value={CONTRASENA.value}
            onChange={CONTRASENA.onChange}
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
            value={REP_CONTRASENA.value}
            onChange={REP_CONTRASENA.onChange}
          />
          <button
            type='submit'
            className={`${
              state.loading && styles.buttonLoading
            }  btn button--red`}
            disabled={state.loading}
          >
            <div className={`${state.loading && styles.dot_flashing} `}></div>
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

//Map state to props
const mapStateToProps = (reducers) => {
  return reducers.authReducer;
};

//Map actions to props
const mapDispatchToProps = {
  login,
};

export default connect(mapStateToProps, mapDispatchToProps)(ResetPasswordInput);
