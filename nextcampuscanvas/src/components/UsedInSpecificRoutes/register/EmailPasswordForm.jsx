import Link from 'next/link';
import { connect } from 'react-redux';
import { useRouter } from 'next/router';
import { signIn } from 'next-auth/react';

//Form Validation
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

//Components
import Loader from '@components/GeneralUseComponents/Loader/Loader';

//hooks
import { useInputValue } from '@hooks/useInputValue';

//Styles
import styles from './emailPasswordForm.module.scss';

//Redux actions
import * as authActions from '@actions/authActions';
const { register } = authActions;

//Form validation
const schema = yup.object().shape({
  //Name of inputs should match these keys
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
  console.log(props);
  const router = useRouter();

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

  const submitFunction = (e) => {
    try {
      props.register(CORREO.value, CONTRASENA.value).then((res) => {
        if (res?.payload === 'El email ya existe') {
          return false;
        }
        console.log('Usuario registrado');
        //TODO: Esto debería hacerse en reduxAction
        signIn('credentials', {
          redirect: false,
          email: CORREO.value,
          password: CONTRASENA.value,
        });
        router.push('/');
      });
    } catch (error) {
      console.log(error);
    }
  };

  if (props.loading) return <Loader />;

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
        {...CORREO}
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
        {...CONTRASENA}
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
        {...REP_CONTRASENA}
      />
      <input
        className={styles.checkbox}
        type='checkbox'
        id='terms_cons'
        name='terms_cons'
        autoComplete='off'
        {...CHECK_BOX}
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
      {props.error && <p className={styles.errorMessage}>{props.error}</p>}
      {/* /////////////////////////
            //       Buttons        //
            ///////////////////////// */}
      <div className={styles.buttons}>
        {/* TODO: ver si este _blank funciona con la Link tag */}
        <Link target='_blank' href='/construccion'>
          ¿Olvidaste tu contraseña?
        </Link>
        <p>
          ¿Ya tienes una cuenta? <Link href='/login'>Accede aquí</Link>
        </p>
        <button type='submit' className='btn button--red'>
          Continuar
        </button>
      </div>
    </form>
  );
};

//Map state to props
const mapStateToProps = (reducers) => {
  return reducers.authReducer;
};

//Map actions to props
const mapDispatchToProps = {
  register,
};

export default connect(mapStateToProps, mapDispatchToProps)(emailPasswordForm);
