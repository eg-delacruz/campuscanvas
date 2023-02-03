import Image from 'next/image';

//Styles
import styles from './DisplayCardsByCategoryTemplate.module.scss';

//Components
import DiscountCard from '@components/GeneralUseComponents/DiscountCard/DiscountCard';
import DiscountsNavbar from '@components/UsedInSpecificRoutes/Descuentos/DiscountsNavbar/DiscountsNavbar';
import Loader from '@components/GeneralUseComponents/Loader/Loader';

//Assets
import no_discounts_img from '@assets/PagesImages/Discounts/no_discounts.svg';

const DisplayCardsByCategoryTemplate = ({ state }) => {
  return (
    <div className={`${styles.container} container`}>
      <DiscountsNavbar />

      {state.loading ? (
        <div className={styles.loaderContainer}>
          <Loader />
        </div>
      ) : (
        <>
          {state.cards.length > 0 ? (
            <section className={styles.grid_container}>
              {state.cards.map((card) => (
                <DiscountCard
                  key={card.discount_id}
                  banner={card.banner.URL}
                  brand_name={card.brand_name}
                  brand_logo={card.brand_logo.brand_logo.URL}
                  title={card.title}
                  discount_id={card.discount_id}
                />
              ))}
            </section>
          ) : (
            <div className={styles.no_discounts_container}>
              <h2>No hay descuentos en esta categoría</h2>
              <figure>
                <Image
                  src={no_discounts_img}
                  alt='No hay descuentos en esta categoría'
                />
              </figure>
              <p>
                Puedes continuar explorando el resto de secciones de descuentos
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default DisplayCardsByCategoryTemplate;
