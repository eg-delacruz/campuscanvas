import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState } from 'react';

//Session
import { useSession } from 'next-auth/react';
import { signIn } from 'next-auth/react';

//Components

//Styles
import styles from './LoginForm.module.scss';

//Assets
import Divider from '@assets/PagesImages/Login/Divider.svg';

//hooks
import { useInputValue } from '@hooks/useInputValue';

const LoginForm = () => {
  const [state, setState] = useState({
    loading: false,
    error: '',
  });

  //Session
  const { data: session, status } = useSession();
  const loading = status === 'loading';

  const router = useRouter();

  //Controlling inputs
  const CORREO = useInputValue('');
  const CONTRASENA = useInputValue('');

  const callbackURL = sessionStorage.getItem('callbackURL')
    ? sessionStorage.getItem('callbackURL')
    : '/';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setState({ ...state, loading: true, error: '' });
    try {
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
        CONTRASENA.setValue('');
        return false;
      }

      setState({
        ...state,
        loading: false,
        error: '',
      });

      //No need for redirect, since the session will be updated and the user will be redirected to the callbackURL
    } catch (error) {
      setState({
        ...state,
        error: 'Error al iniciar sesión' + error.message,
        loading: false,
      });
    }
  };

  //If logged in, redirect to home (or callbackURL)
  if (status !== 'loading' && status === 'authenticated') {
    //Clear the session storage callbackURL
    sessionStorage.removeItem('callbackURL')
      ? sessionStorage.removeItem('callbackURL')
      : null;

    router.push(callbackURL);
  }

  return (
    <form
      onSubmit={handleSubmit}
      method='POST'
      className={styles.form}
      action=''
    >
      <h1>¡Bienvenido!</h1>
      <h4>Inicia sesión con tu correo y tu contraseña</h4>

      <label htmlFor='correo'> Correo</label>

      <input
        name='correo'
        id='correo'
        type='email'
        required
        placeholder='Correo'
        value={CORREO.value}
        onChange={CORREO.onChange}
      />

      <label htmlFor='contrasena'>Contraseña</label>

      <input
        name='contrasena'
        id='contrasena'
        type='password'
        required
        placeholder='Contraseña'
        value={CONTRASENA.value}
        onChange={CONTRASENA.onChange}
      />

      {state.error && <p className={styles.errorMessage}>{state.error}</p>}

      <div className={styles.buttons}>
        <Link href='/auth/forgot-password'>¿Olvidaste tu contraseña?</Link>
        <p>
          ¿Aún no tienes una cuenta?{' '}
          <Link href='/auth/registro'>Regístrate aquí</Link>
        </p>
        <button
          type='submit'
          //If status is authenticated, the user is already logged an this page will automatically redirect to the callbackURL, so in the meantime, the user will see a loading state
          className={`${state.loading && styles.buttonLoading} ${
            status === 'authenticated' && styles.buttonLoading
          }  btn button--red`}
          disabled={state.loading || status === 'authenticated'}
        >
          Iniciar sesión
        </button>
      </div>

      <div className={styles.divider}>
        <Image src={Divider} />
      </div>

      <p className={styles.terminos}>
        Al continuar, aceptas nuestros{' '}
        <Link href='/condiciones'>Términos y Condiciones</Link> y nuestra{' '}
        <Link href='/privacidad'>Política de privacidad</Link>
      </p>
    </form>
  );
};

export default LoginForm;
