//Styles
import styles from '@styles/pagestyles/descuentos/Todos.module.scss';

//Components
import SEOHeader from '@components/GeneralUseComponents/SEO_Header/SEOHeader';
import Header from '@components/GeneralUseComponents/Header/Header';
import DiscountsNavbar from '@components/UsedInSpecificRoutes/descuentos/DiscountsNavbar/DiscountsNavbar';
import Footer from '@components/GeneralUseComponents/Footer/Footer';

const otros = () => {
  return (
    <>
      <SEOHeader
        tabTitle={'Otros descuentos'}
        metaName={'Otros descuentos'}
        description={'Explora otros descuentos para estudiantes españoles'}
      />
      <div className={styles.page_wrapper}>
        <div className={`${styles.header_wrapper} header_wrapper`}>
          <Header />
        </div>
        <div className={`${styles.container} container`}>
          <DiscountsNavbar />

          <h1>Otros</h1>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default otros;
