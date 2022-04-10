import Link from 'next/link';
import Image from 'next/image';
import { connect } from 'react-redux';
import { useRouter } from 'next/router';

//Components
import Loader from '@components/GeneralUseComponents/Loader/Loader';

//Styles
import styles from './LoginForm.module.scss';

//Assets
import Divider from '@assets/PagesImages/Login/Divider.svg';

//hooks
import { useInputValue } from '@hooks/useInputValue';

//Redux actions
import * as authActions from '@actions/authActions';
const { login } = authActions;

const LoginForm = (props) => {
  //console.log(props);
  const router = useRouter();

  //Controlling inputs
  const CORREO = useInputValue('');
  const CONTRASENA = useInputValue('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      props.login(CORREO.value, CONTRASENA.value).then((res) => {
        if (res?.payload === 'Usuario o contraseña incorrectos') {
          return false;
        }
        router.push('/');
      });
    } catch (error) {
      console.log(error);
    }
  };

  if (props.loading) return <Loader />;
  return (
    <form
      onSubmit={handleSubmit}
      method='POST'
      className={styles.form}
      action=''
    >
      <h1>¡Bienvenido!</h1>
      <h4>Inicia sesión con tu correo y tu contraseña</h4>

      <label htmlFor='correo'> Correo universitario</label>

      <input
        name='correo'
        id='correo'
        type='email'
        required
        placeholder='Correo'
        {...CORREO}
      />

      <label htmlFor='contrasena'>Contraseña</label>

      <input
        name='contrasena'
        id='contrasena'
        type='password'
        required
        placeholder='Contraseña'
        {...CONTRASENA}
      />

      {props.error && <p className={styles.errorMessage}>{props.error}</p>}

      <div className={styles.buttons}>
        <Link href='/construccion'>¿Olvidaste tu contraseña?</Link>
        <p>
          ¿Aún no tienes una cuenta?{' '}
          <Link href='/registro'>Regístrate aquí</Link>
        </p>
        <button type='submit' className='btn button--red'>
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

//Map state to props
const mapStateToProps = (reducers) => {
  return reducers.authReducer;
};

//Map actions to props
const mapDispatchToProps = {
  login,
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
