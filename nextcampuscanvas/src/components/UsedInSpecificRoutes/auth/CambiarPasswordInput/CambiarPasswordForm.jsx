import { useState } from 'react';
import { useRouter } from 'next/router';

//Styles
import styles from './CambiarPasswordForm.module.scss';

//Form Validation
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

//Endpoints
import endPoints from '@services/api';

//hooks
import { useInputValue } from '@hooks/useInputValue';

//Session
import { useSession } from 'next-auth/react';

//Form validation
const schema = yup.object().shape({
  //Name and id of inputs, as well
  //as htmlFor of labels has to match these keys
  contrasena_actual: yup.string().required('Este campo es requerido'),
  nueva_contrasena: yup
    .string()
    .min(6, 'La contraseña debe tener almenos 6 caracteres')
    .max(16, 'La contraseña debe tener como máximo 16 caracteres')
    .required('Escribe una contraseña'),
  //This checks if the two passwords match
  rep_nueva_contrasena: yup.string().oneOf([yup.ref('nueva_contrasena'), null]),
});

const CambiarPasswordForm = () => {
  const [state, setState] = useState({
    sent: false,
    error: '',
    loading: false,
  });

  const router = useRouter();

  //Connect yup to react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  //Session
  const { data: session, status } = useSession();

  //Controlling inputs
  const CONTRASENA_ACTUAL = useInputValue('');
  const NUEVA_CONTRASENA = useInputValue('');
  const REP_NUEVA_CONTRASENA = useInputValue('');

  const submitFunction = async (e) => {
    const submitData = {
      userID: session.token.sub,
      newPassword: NUEVA_CONTRASENA.value,
      currentPassword: CONTRASENA_ACTUAL.value,
      website_location: 'change_password',
    };

    try {
      setState({ ...state, loading: true });
      const respuesta = await fetch(endPoints.user.changePassword, {
        method: 'PATCH',
        headers: {
          accept: '*/*',
          'Content-Type': 'application/json',
          app_secret_key: process.env.NEXT_PUBLIC_MAIN_NEXT_WEB_APP_SECRET_KEY,
        },
        body: JSON.stringify(submitData),
      });
      const data = await respuesta.json();

      if (data?.error) {
        setState({ ...state, error: data.error });
        setTimeout(() => {
          router.push('/');
        }, 4000);
      } else {
        setState({ ...state, sent: true });
        CONTRASENA_ACTUAL.setValue('');
        NUEVA_CONTRASENA.setValue('');
        REP_NUEVA_CONTRASENA.setValue('');
        setTimeout(async () => {
          await router.push('/');
        }, 3000);
      }
    } catch (error) {
      setState({ ...state, error: error.message });
      setTimeout(async () => {
        await router.push('/');
      }, 4000);
    }
  };

  return (
    <>
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
            <h3>
              Reestablecer contraseña{' '}
              {session?.token.email && `para ${session.token.email}`}
            </h3>
            <p className={styles.form__subtitle}>
              {' '}
              Introduce los datos requeridos
            </p>

            <label
              className={styles.inputText__label}
              htmlFor='contrasena_actual'
            >
              Contraseña actual
              <p className={styles.inputText__errors}>
                {errors.contrasena_actual?.message}
              </p>
            </label>
            <input
              name='contrasena_actual'
              id='contrasena_actual'
              type='password'
              placeholder='Contraseña actual'
              autoComplete='off'
              {...register('contrasena_actual')}
              value={CONTRASENA_ACTUAL.value}
              onChange={CONTRASENA_ACTUAL.onChange}
            />

            <label
              className={styles.inputText__label}
              htmlFor='nueva_contrasena'
            >
              Nueva contraseña
              <p className={styles.inputText__errors}>
                {errors.nueva_contrasena?.message}
              </p>
            </label>
            <input
              name='nueva_contrasena'
              id='nueva_contrasena'
              type='password'
              placeholder='Nueva contraseña'
              autoComplete='off'
              {...register('nueva_contrasena')}
              value={NUEVA_CONTRASENA.value}
              onChange={NUEVA_CONTRASENA.onChange}
            />

            <label
              className={`${styles.inputText__label} `}
              htmlFor='rep_nueva_contrasena'
            >
              Repite la nueva contraseña
              <p className={styles.inputText__errors}>
                {errors.rep_nueva_contrasena && 'La contraseña debe coincidir'}
              </p>
            </label>
            <input
              className={styles.inputText__RepPassword}
              name='rep_nueva_contrasena'
              id='rep_nueva_contrasena'
              type='password'
              autoComplete='off'
              placeholder='Repite la nueva contraseña'
              {...register('rep_nueva_contrasena')}
              value={REP_NUEVA_CONTRASENA.value}
              onChange={REP_NUEVA_CONTRASENA.onChange}
            />

            {state.error && (
              <p className={styles.responseError}>{state.error}</p>
            )}
            <button
              type='submit'
              className={`${
                state.loading && styles.buttonLoading
              }  btn button--red`}
              disabled={state.loading}
            >
              Cambiar contraseña
            </button>
          </>
        )}
      </form>
    </>
  );
};

export default CambiarPasswordForm;
