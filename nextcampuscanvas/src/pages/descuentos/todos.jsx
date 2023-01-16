//Styles
import styles from '@styles/pagestyles/descuentos/Todos.module.scss';

//Components
import SEOHeader from '@components/GeneralUseComponents/SEO_Header/SEOHeader';
import Header from '@components/GeneralUseComponents/Header/Header';
import DiscountsNavbar from '@components/UsedInSpecificRoutes/descuentos/DiscountsNavbar/DiscountsNavbar';
import Footer from '@components/GeneralUseComponents/Footer/Footer';
import DiscountCard from '@components/GeneralUseComponents/DiscountCard/DiscountCard';
import ButtonUp from '@components/GeneralUseComponents/ButtonUp/ButtonUp';

//Databases
import { DISCOUNT_CARDS } from '@databases/discounts/discountCardsDatabase.js';

//Apply load on scroll if needed
const todos = () => {
  return (
    <>
      <SEOHeader
        tabTitle={'Todos nuestros descuentos'}
        metaName={'Todos nuestros descuentos'}
        description={
          'Explora todos nuestros descuentos a estudiantes españoles'
        }
      />

      <ButtonUp />

      <div className={styles.page_wrapper}>
        <div className={`${styles.header_wrapper} header_wrapper`}>
          <Header />
        </div>
        <div className={`${styles.container} container`}>
          <DiscountsNavbar />

          <section className={styles.grid_container}>
            {DISCOUNT_CARDS.map((card) => (
              <DiscountCard
                key={card.discount_id}
                banner={card.banner}
                brand_name={card.brand_name}
                brand_logo={card.brand_logo}
                title={card.title}
                discount_id={card.discount_id}
              />
            ))}
            {DISCOUNT_CARDS.map((card) => (
              <DiscountCard
                key={card.discount_id}
                banner={card.banner}
                brand_name={card.brand_name}
                brand_logo={card.brand_logo}
                title={card.title}
                discount_id={card.discount_id}
              />
            ))}
          </section>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default todos;
