//Styles
import styles from '@styles/pagestyles/descuentos/Todos.module.scss';

//Components
import SEOHeader from '@components/GeneralUseComponents/SEO_Header/SEOHeader';
import Header from '@components/GeneralUseComponents/Header/Header';
import DiscountsNavbar from '@components/UsedInSpecificRoutes/Descuentos/DiscountsNavbar/DiscountsNavbar';
import Footer from '@components/GeneralUseComponents/Footer/Footer';

const alimentacion = () => {
  return (
    <>
      <SEOHeader
        tabTitle={'Descuentos en alimentación'}
        metaName={'Descuentos en alimentación'}
        description={
          'Explora todos nuestros descuentos de alimentación para estudiantes españoles'
        }
      />
      <div className={styles.page_wrapper}>
        <div className={`${styles.header_wrapper} header_wrapper`}>
          <Header />
        </div>
        <div className={`${styles.container} container`}>
          <DiscountsNavbar />

          <h1>Alimentación</h1>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default alimentacion;
