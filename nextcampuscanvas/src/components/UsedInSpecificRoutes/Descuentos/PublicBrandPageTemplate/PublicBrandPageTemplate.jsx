import PropTypes from 'prop-types';

//Styles
import styles from './PublicBrandPageTemplate.module.scss';

//Components
import DiscountCard from '@components/GeneralUseComponents/DiscountCard/DiscountCard';

//React query
import { useQuery } from '@tanstack/react-query';
import discountKeys from '@query-key-factory/discountKeys';

//Services
import { createHTMLElement } from '@services/createHTMLElement';

//Request functions
import requestFn from '@request-functions/Discounts/Cards/index';

//TODO: Get the discounts count from the discounts array, not from the brand object to avoid page regenearion when a new discount is added or deleted
const PublicBrandPageTemplate = ({ brand }) => {
  //React query
  const ATTACHED_DISCOUNT_CARDS = useQuery({
    queryKey: [discountKeys.cards.get_by_brand_id(brand._id)],
    queryFn: () => requestFn.getCardsByBrandId(brand._id),
    staleTime: 1000 * 60 * 60 * 24 * 2, //2 days
  });

  return (
    <main className={`${styles.container} container`}>
      {/* /////////////////////////
            //   Upper Headings    //
          ///////////////////////// */}

      {brand.upper_headings !== '' && (
        <section
          className={styles.upper_headings}
          dangerouslySetInnerHTML={createHTMLElement(brand.upper_headings)}
        />
      )}

      {/* //////////////////////////////
         // Brand logo + description //
         /////////////////////////////*/}

      <div className={styles.logo_description_container}>
        <div>
          <div className={styles.logo_container}>
            <img
              src={brand.brand_logo.URL}
              alt={`Logo de ${brand.brand_name}`}
            />
          </div>
        </div>

        <div
          className={styles.brand_description}
          dangerouslySetInnerHTML={createHTMLElement(brand.brand_description)}
        ></div>
      </div>

      {/* /////////////////////////
          //   Discount cards    //
          ///////////////////////// */}

      {ATTACHED_DISCOUNT_CARDS.isLoading ? (
        <>Cargando...</>
      ) : (
        <>
          {ATTACHED_DISCOUNT_CARDS.isError ? (
            <p className='error__message'>
              {ATTACHED_DISCOUNT_CARDS.error?.message}
            </p>
          ) : (
            <>
              {ATTACHED_DISCOUNT_CARDS.data?.length === 0 ? (
                <>{brand.brand_name} no tiene descuentos actualmente</>
              ) : (
                <section className={styles.discount_cards_section}>
                  <h3>
                    Hay {ATTACHED_DISCOUNT_CARDS.data?.length} descuentos para
                    estudiantes en {brand.brand_name} actualmente
                  </h3>
                  <div className={styles.discounts_grid}>
                    {ATTACHED_DISCOUNT_CARDS.data?.map((card) => (
                      <DiscountCard
                        key={card.discount_id}
                        banner={card.banner.URL}
                        brand_name={card.brand_name}
                        brand_logo={card.brand_logo.brand_logo.URL}
                        title={card.title}
                        discount_id={card.discount_id}
                        card_tag={card.card_tag}
                        brand_slug={card.brand_slug.brand_slug}
                      />
                    ))}
                  </div>
                </section>
              )}
            </>
          )}
        </>
      )}
      {/* /////////////////////////
          //        Faqs         //
          ///////////////////////// */}
      {brand.faqs !== '' && (
        <>
          <h2>
            Preguntas frecuentes sobre los descuentos de {brand.brand_name}
          </h2>
          <section
            className={styles.faqs_container}
            dangerouslySetInnerHTML={createHTMLElement(brand.faqs)}
          />
        </>
      )}
    </main>
  );
};

export default PublicBrandPageTemplate;

PublicBrandPageTemplate.propTypes = {
  brand: PropTypes.object.isRequired,
};
