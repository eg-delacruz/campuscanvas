import React from 'react';
import Link from 'next/link';
import Head from 'next/head';
import Image from 'next/image';

//Assets
import Construccion_img from '@assets/PagesImages/ConstructionImages/under_construction.svg';

//Components
import SecondaryHeader from '@components/GeneralUseComponents/SecondaryHeader/SecondaryHeader';

//Styles
import styles from '@pagestyles/Construccion.module.scss';

function Construccion() {
  return (
    <>
      <Head>
        <title>Construcción | Campus Canvas</title>
        <meta
          name='En construcción'
          content='Estamos trabajando en nuevas funcionalidades para ti.'
        />
        {/* Prevents horizontal scroll due to animations on phone */}
        <meta
          name='viewport'
          content='width=device-width, height=device-height, initial-scale=1.0'
        />
      </Head>

      <div className={styles.construction__container}>
        <SecondaryHeader />

        <main className={styles.main}>
          <div className={`${styles.main__container} container`}>
            <h2>Esta parte de nuestro sitio está en desarrollo</h2>
            <figure>
              <Image src={Construccion_img} alt='Sitio en construcción' />
            </figure>
            <p>
              Estamos preparando funcionalidades muy especiales para ti. <br />
              Siempre puedes volver al <Link href='/'>Home</Link>
            </p>
          </div>
        </main>
      </div>
    </>
  );
}

export default Construccion;
