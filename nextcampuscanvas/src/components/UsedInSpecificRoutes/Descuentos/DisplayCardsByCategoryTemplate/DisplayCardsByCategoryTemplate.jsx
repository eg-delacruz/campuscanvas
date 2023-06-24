import { forwardRef } from 'react';
import PropTypes from 'prop-types';

import Image from 'next/image';

//Styles
import styles from './DisplayCardsByCategoryTemplate.module.scss';

//Components
import DiscountCard from '@components/GeneralUseComponents/DiscountCard/DiscountCard';
import DiscountsNavbar from '@components/UsedInSpecificRoutes/Descuentos/DiscountsNavbar/DiscountsNavbar';
import CircularLoader from '@components/GeneralUseComponents/CircularLoader/CircularLoader';

//Assets
import no_discounts_img from '@assets/PagesImages/Discounts/no_discounts.svg';

const DisplayCardsByCategoryTemplate = forwardRef(
  ({ cards, loading, error, categoryDescription }, lastCardElementRef) => {
    return (
      <div className={`${styles.container} container`}>
        <DiscountsNavbar />

        <p className={styles.category_description}>{categoryDescription}</p>

        {cards.length > 0 ? (
          <>
            <section className={styles.grid_container}>
              {cards.map((card, index) => {
                //If the card is the last one, add a ref to it
                if (cards.length === index + 1) {
                  return (
                    <DiscountCard
                      key={card.discount_id}
                      banner={card.banner.URL}
                      brand_name={card.brand_name}
                      brand_logo={card.brand_logo.brand_logo.URL}
                      title={card.title}
                      discount_id={card.discount_id}
                      card_tag={card.card_tag}
                      brand_slug={card.brand_slug.brand_slug}
                      ref={lastCardElementRef}
                    />
                  );
                } else {
                  return (
                    <DiscountCard
                      key={card.discount_id}
                      banner={card.banner.URL}
                      brand_name={card.brand_name}
                      brand_logo={card.brand_logo.brand_logo.URL}
                      title={card.title}
                      discount_id={card.discount_id}
                      brand_slug={card.brand_slug.brand_slug}
                      card_tag={card.card_tag}
                    />
                  );
                }
              })}
            </section>
            <div className={styles.loader_on_scroll_container}>
              {loading && <CircularLoader />}
            </div>
            <div>{error && error}</div>
          </>
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
      </div>
    );
  }
);

export default DisplayCardsByCategoryTemplate;

DisplayCardsByCategoryTemplate.propTypes = {
  cards: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string,
  categoryDescription: PropTypes.string,
};
