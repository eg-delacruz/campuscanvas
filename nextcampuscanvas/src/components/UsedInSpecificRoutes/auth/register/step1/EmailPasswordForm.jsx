import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/router';

//Form Validation
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

//Session
import { useSession } from 'next-auth/react';
import { signIn } from 'next-auth/react';

//hooks
import { useInputValue } from '@hooks/useInputValue';

//Styles
import styles from './emailPasswordForm.module.scss';

//Endpoints
import endPoints from '@services/api';

//Form validation
const schema = yup.object().shape({
  //Name and id of inputs, as well
  //as htmlFor of labels has to match these keys
  correo: yup
    .string()
    .email('Escribe una dirección de correo válida')
    .required('Escribe tu correo'),
  contrasena: yup
    .string()
    .min(6, 'La contraseña debe tener almenos 6 caracteres')
    .max(16, 'La contraseña debe tener como máximo 16 caracteres')
    .required('Escribe una contraseña'),
  //This checks if the two passwords match
  rep_contrasena: yup.string().oneOf([yup.ref('contrasena'), null]),
  terms_cons: yup
    .boolean()
    .required('Acepta nuestros términos y condiciones para continuar')
    .oneOf([true], 'Acepta nuestros términos y condiciones para continuar'),
});

const emailPasswordForm = (props) => {
  const [state, setState] = useState({ loading: false, error: '' });
  const router = useRouter();

  //Session
  const { data: session, status } = useSession();
  const loading = status === 'loading';

  //Controlling inputs
  const CORREO = useInputValue('');
  const CONTRASENA = useInputValue('');
  const REP_CONTRASENA = useInputValue('');
  const CHECK_BOX = useInputValue('');

  //Connect yup to react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const submitFunction = async (e) => {
    try {
      setState({ ...state, loading: true });

      //Saving user in DB
      const respuesta = await fetch(endPoints.user.create, {
        method: 'POST',
        headers: {
          accept: '*/*',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: CORREO.value,
          password: CONTRASENA.value,
        }),
      });
      const data = await respuesta.json();

      //If user already exists
      if (
        data.error ===
        'Este email ya ha sido registrado, inicia sesión o recupera tu contraseña.'
      ) {
        setState({ ...state, loading: false, error: data.error });
        return false;
      }

      //If user succesfully registered, log in
      const auth = await signIn('credentials', {
        redirect: false,
        email: CORREO.value,
        password: CONTRASENA.value,
      });

      if (auth.error) {
        setState({
          ...state,
          error: 'Usuario o contraseña incorrectos',
          loading: false,
        });
        return false;
      }
      setState({
        ...state,
        loading: false,
      });
      props.setStep(2);
    } catch (error) {
      setState({
        ...state,
        error: 'Error al registrar usuario' + error.message,
        loading: false,
      });
    }
  };
  if (status === 'authenticated') {
    router.push('/auth/login');
  }

  return (
    <form
      //Needs to be done so so that the react-hook-form can work
      onSubmit={handleSubmit(submitFunction)}
      method='POST'
      className={styles.form}
      action=''
      autoComplete='off'
    >
      <h1>Regístrate gratis</h1>
      <h4>Paso 1 de 3</h4>
      <p className={styles.form__subtitle}>
        Estás a muy poco de obtener tu <b>Campus Box </b> gratuita
      </p>
      <label className={styles.inputText__label} htmlFor='correo_universitario'>
        Email
        <p className={styles.inputText__errors}>{errors.correo?.message}</p>
      </label>
      <input
        name='correo'
        id='correo'
        type='email'
        placeholder='Correo'
        autoComplete='off'
        {...register('correo')}
        value={CORREO.value}
        onChange={CORREO.onChange}
      />
      <label className={styles.inputText__label} htmlFor='contrasena'>
        Contraseña{' '}
        <p className={styles.inputText__errors}>{errors.contrasena?.message}</p>
      </label>
      <input
        name='contrasena'
        id='contrasena'
        type='password'
        placeholder='Contraseña'
        {...register('contrasena')}
        autoComplete='off'
        value={CONTRASENA.value}
        onChange={CONTRASENA.onChange}
      />
      <label className={`${styles.inputText__label} `} htmlFor='rep_contrasena'>
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
      <input
        className={styles.checkbox}
        type='checkbox'
        id='terms_cons'
        name='terms_cons'
        autoComplete='off'
        value={CHECK_BOX.value}
        onChange={CHECK_BOX.onChange}
        {...register('terms_cons')}
      />{' '}
      <label className={styles.checkbox__label} htmlFor='terms_cons'>
        {' '}
        Acepto los <Link href='/condiciones'>Términos y Condiciones</Link> y la{' '}
        <Link href='/privacidad'>Política de privacidad</Link>
      </label>
      <p className={styles.inputCheckBox__errors}>
        {errors.terms_cons &&
          'Acepta nuestros términos y condiciones para continuar'}
      </p>
      {state.error && <p className={styles.errorMessage}>{state.error}</p>}
      {/* /////////////////////////
            //       Buttons        //
            ///////////////////////// */}
      <div className={styles.buttons}>
        <Link href='/auth/forgot-password'>¿Olvidaste tu contraseña?</Link>
        <p>
          ¿Ya tienes una cuenta? <Link href='/auth/login'>Accede aquí</Link>
        </p>
        <button
          type='submit'
          className={`${
            state.loading && styles.buttonLoading
          }  btn button--red`}
          disabled={state.loading}
        >
          <div className={`${state.loading && styles.dot_flashing} `}></div>
          Continuar
        </button>
      </div>
    </form>
  );
};

export default emailPasswordForm;
