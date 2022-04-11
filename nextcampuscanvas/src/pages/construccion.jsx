import React from 'react';
import Link from 'next/link';
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
      <SEOHeader
        tabTitle={'Construcción'}
        metaName={'En construcción'}
        description={'Estamos trabajando en nuevas funcionalidades para ti.'}
      />

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
