import Image from 'next/image';

//Styles
import styles from './DisplayCardsByCategoryTemplate.module.scss';

//Components
import DiscountCard from '@components/GeneralUseComponents/DiscountCard/DiscountCard';
import DiscountsNavbar from '@components/UsedInSpecificRoutes/Descuentos/DiscountsNavbar/DiscountsNavbar';

//Assets
import no_discounts_img from '@assets/PagesImages/Discounts/no_discounts.svg';

const DisplayCardsByCategoryTemplate = ({ cards }) => {
  return (
    <div className={`${styles.container} container`}>
      <DiscountsNavbar />

      {cards.length > 0 ? (
        <section className={styles.grid_container}>
          {cards.map((card) => (
            <DiscountCard
              key={card.discount_id}
              banner={card.banner.URL}
              brand_name={card.brand_name}
              brand_logo={card.brand_logo.brand_logo.URL}
              title={card.title}
              discount_id={card.discount_id}
              card_tag={card.card_tag}
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
          <p>Puedes continuar explorando el resto de secciones de descuentos</p>
        </div>
      )}
    </div>
  );
};

export default DisplayCardsByCategoryTemplate;
