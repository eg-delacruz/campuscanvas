//Styles
import styles from '@styles/pagestyles/descuentos/Todos.module.scss';

//Components
import SEOHeader from '@components/GeneralUseComponents/SEO_Header/SEOHeader';
import Header from '@components/GeneralUseComponents/Header/Header';
import DiscountsNavbar from '@components/UsedInSpecificRoutes/Descuentos/DiscountsNavbar/DiscountsNavbar';
import Footer from '@components/GeneralUseComponents/Footer/Footer';

const entretenimiento = () => {
  return (
    <>
      <SEOHeader
        tabTitle={'Descuentos de entretenimiento'}
        metaName={'Descuentos de entretenimiento'}
        description={
          'Explora todos nuestros descuentos de entretenimiento para estudiantes españoles'
        }
      />
      <div className={styles.page_wrapper}>
        <div className={`${styles.header_wrapper} header_wrapper`}>
          <Header />
        </div>
        <div className={`${styles.container} container`}>
          <DiscountsNavbar />

          <h1>Entretenimiento</h1>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default entretenimiento;
