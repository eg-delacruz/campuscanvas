import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { useRef } from 'react';

//Components
import SecondaryHeader from '@components/GeneralUseComponents/SecondaryHeader/SecondaryHeader';

//Styles
import styles from '@pagestyles/Login.module.scss';

//Assets
import Divider from '@assets/PagesImages/Login/Divider.svg';

//hooks
import { useInputValue } from '@hooks/useInputValue';

const login = (props) => {
  //Controlling inputs
  const CORREO_UNIVERSITARIO = useInputValue('');
  const CONTRASENA = useInputValue('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(CORREO_UNIVERSITARIO.value);
    console.log(CONTRASENA.value);
  };

  return (
    <>
      <Head>
        <title>Login | Campus Canvas</title>
        <meta
          name='Login'
          content='Inicia sesión para acceder a nuestros servicios'
        />
        {/* Prevents horizontal scroll due to animations on phone */}
        <meta
          name='viewport'
          content='width=device-width, height=device-height, initial-scale=1.0'
        />
      </Head>
      <div className={styles.login__container}>
        <SecondaryHeader />

        <main className={styles.main}>
          <div className={styles.main__container}>
            <form
              onSubmit={handleSubmit}
              method='POST'
              className={styles.form}
              action=''
            >
              <h1>¡Bienvenido!</h1>
              <h4>Inicia sesión con tu correo universitario y tu contraseña</h4>

              <label htmlFor='correo_universitario'>
                {' '}
                Correo universitario
              </label>

              <input
                name='correo_universitario'
                id='correo_universitario'
                type='email'
                required
                placeholder='Correo universitario'
                {...CORREO_UNIVERSITARIO}
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

              <div className={styles.buttons}>
                <Link href='/construccion'>¿Olvidaste tu contraseña?</Link>
                <p>
                  ¿Aún no tienes una cuenta?{' '}
                  <Link href='/construccion'>Regístrate aquí</Link>
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
                <Link href='/condiciones'>Términos y Condiciones</Link> y
                nuestra <Link href='/privacidad'>Política de privacidad</Link>
              </p>
            </form>
          </div>
        </main>

        {/* Footer */}
        <section className={styles.footer__signature}>
          <p>®Campus Canvas 2022. Todos los derechos reservados</p>
          <p>Dedicado a los estudiantes desde Madrid ❤️</p>
        </section>
      </div>
    </>
  );
};

export default login;
