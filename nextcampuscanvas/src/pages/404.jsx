import Link from 'next/link';
import Image from 'next/image';

//Styles
import styles from '@pagestyles/404.module.scss';

//Assets
import NotFoundImage from '@assets/PagesImages/NotFoundImages/NotFound404.svg';

//Components
import SecondaryHeader from '@components/GeneralUseComponents/SecondaryHeader/SecondaryHeader';
import SEOHeader from '@components/GeneralUseComponents/SEO_Header/SEOHeader';

const NotFound404 = () => {
  return (
    <>
      <SEOHeader
        tabTitle={'Página no encontrada'}
        metaName={'Página no encontrada'}
        description={
          'No pudimos encontrar la página que buscabas. Puedes volver al Home.'
        }
      />

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
