//Styles
import styles from '@styles/pagestyles/descuentos/Todos.module.scss';

//Components
import SEOHeader from '@components/GeneralUseComponents/SEO_Header/SEOHeader';
import Header from '@components/GeneralUseComponents/Header/Header';
import DiscountsNavbar from '@components/UsedInSpecificRoutes/descuentos/DiscountsNavbar/DiscountsNavbar';
import Footer from '@components/GeneralUseComponents/Footer/Footer';
import OfferCard from '@components/GeneralUseComponents/OfferCard/OfferCard';

//Databases
import { OFFER_CARDS } from '@databases/offers/offerCardsDatabase.js';

const belleza = () => {
  return (
    <>
      <SEOHeader
        tabTitle={'Descuentos de belleza'}
        metaName={'Descuentos de belleza'}
        description={
          'Explora todos nuestros descuentos de belleza para estudiantes españoles'
        }
      />
      <div className={styles.page_wrapper}>
        <div className={`${styles.header_wrapper} header_wrapper`}>
          <Header />
        </div>
        <div className={`${styles.container} container`}>
          <DiscountsNavbar />

          <section className={styles.grid_container}>
            {OFFER_CARDS.map((card) => (
              <OfferCard
                key={card.offer_id}
                banner={card.banner}
                brand_name={card.brand_name}
                brand_logo={card.brand_logo}
                title={card.title}
                offer_id={card.offer_id}
              />
            ))}
            {OFFER_CARDS.map((card) => (
              <OfferCard
                key={card.offer_id}
                banner={card.banner}
                brand_name={card.brand_name}
                brand_logo={card.brand_logo}
                title={card.title}
                offer_id={card.offer_id}
              />
            ))}
          </section>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default belleza;
