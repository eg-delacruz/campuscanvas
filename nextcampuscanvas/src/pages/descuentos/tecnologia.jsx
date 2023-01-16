//Styles
import styles from '@styles/pagestyles/descuentos/Todos.module.scss';

//Components
import SEOHeader from '@components/GeneralUseComponents/SEO_Header/SEOHeader';
import Header from '@components/GeneralUseComponents/Header/Header';
import DiscountsNavbar from '@components/UsedInSpecificRoutes/descuentos/DiscountsNavbar/DiscountsNavbar';
import Footer from '@components/GeneralUseComponents/Footer/Footer';

const tecnologia = () => {
  return (
    <>
      <SEOHeader
        tabTitle={'Descuentos de tecnología'}
        metaName={'Descuentos de tecnología'}
        description={
          'Explora todos nuestros descuentos de tecnología para estudiantes españoles'
        }
      />
      <div className={styles.page_wrapper}>
        <div className={`${styles.header_wrapper} header_wrapper`}>
          <Header />
        </div>
        <div className={`${styles.container} container`}>
          <DiscountsNavbar />

          <h1>Tecnología</h1>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default tecnologia;
