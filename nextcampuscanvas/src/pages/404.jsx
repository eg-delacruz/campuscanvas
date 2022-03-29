import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Head from 'next/head';

//Styles
import styles from '@pagestyles/404.module.scss';

//Assets
import NotFoundImage from '@assets/PagesImages/NotFoundImages/NotFound404.svg';

//Components
import SecondaryHeader from '@components/GeneralUseComponents/SecondaryHeader/SecondaryHeader';

const NotFound404 = () => {
  return (
    <>
      <Head>
        <title>Page Not Found | Campus Canvas</title>
        <meta
          name='Página no encontrada'
          content='No pudimos encontrar la página que buscabas. Puedes volver al Home.'
        />
        {/* Prevents horizontal scroll due to animations on phone */}
        <meta
          name='viewport'
          content='width=device-width, height=device-height, initial-scale=1.0'
        />
      </Head>
      <div className={styles['404__container']}>
        <SecondaryHeader />
        <main className={styles.main}>
          <div className={`${styles.main__container} container`}>
            <h2>Página no encontrada</h2>
            <figure>
              <Image src={NotFoundImage} alt='Página no encontrada' />
            </figure>
            <p>
              No pudimos encontrar la ruta especificada, inténtalo más tarde.
              <br />
              Siempre puedes volver al <Link href='/'>Home</Link>
            </p>
          </div>
        </main>
      </div>
    </>
  );
};

export default NotFound404;
