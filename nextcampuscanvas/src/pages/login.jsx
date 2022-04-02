import React from 'react';
import Head from 'next/head';

//Components
import SecondaryHeader from '@components/GeneralUseComponents/SecondaryHeader/SecondaryHeader';

//Styles
import styles from '@pagestyles/Login.module.scss';

const login = () => {
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

        <main>
          <div className='main__container'>
            <h1>¡Bienvenido!</h1>
            <h4>Inicia sesión con tu correo universitario y tu contraseña</h4>
            <label htmlFor='Correo universitario'>
              {' '}
              Correo universitario
              <input type='text' />
            </label>
            <br />
            <label htmlFor='Contraseña'>
              Contraseña
              <input type='text' />
            </label>

            <div className='buttons'>
              <div className='buttons__newCont_Register'>
                <a href=''>¿Olvidaste tu contraseña?</a>
                <p>
                  ¿Aún no tienes una cuenta? <a href=''>Regístrate aquí</a>
                </p>
              </div>

              <div className='buttons__login'>
                <button className='btn'>Iniciar sesión</button>
              </div>

              <p>Divider line</p>

              <p>
                Al continuar, aceptas nuestros{' '}
                <a href=''>Términos y Condiciones</a> y nuestra{' '}
                <a href=''>Política de privacidad</a>
              </p>
            </div>
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
