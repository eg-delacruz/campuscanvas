import Swal from 'sweetalert2';

//Assets
import white_background_svg_big from '@assets/GeneralUse/UsedInComponents/Ofertas/white_svg_background_big.svg';

//styles
import styles from './OfferTemplate.module.scss';

//Services
import dateFormat from '@services/dateFormat.js';

//Components
import RateOfferSnippet from '../RateOfferSnippet/RateOfferSnippet';

const OfferTemplate = ({ offer, children }) => {
  const handleTermsCons = () => {
    //Display modal with sweetalert2
    //TODO: enhance this modal with proper styling later
    Swal.fire({
      title: 'Términos y condiciones',
      html: offer.terms_and_conds,
      confirmButtonText: 'Aceptar',
    });
  };
  return (
    <article className={`${styles.container} `}>
      {/* /////////////////////////
            //   Image + logo    //
          ///////////////////////// */}
      <section className={styles.banner_logo_container}>
        <div className={styles.banner_container}>
          <span className={styles.banner_wrapper}>
            <span>
              <img src={white_background_svg_big.src} alt='' />
            </span>
            <img
              className={styles.banner_image}
              src={offer.banner}
              alt={offer.brand.brand_name}
            />
          </span>
        </div>
        <div className={styles.logo_container}>
          <span>
            <img src={offer.brand_logo} alt='' />
          </span>
        </div>
      </section>

      {/*/////////////////////////
        //       Offer info     //
        /////////////////////////*/}
      <p className={styles.valid_period}>
        Válido hasta {dateFormat.shortSlashDate(offer.valid_till)}
      </p>
      <section className={styles.upper_offer_info}>
        <h2>{offer.title}</h2>
        <p>{offer.description}</p>
      </section>

      {children}
      <p className={styles.terms_cons}>
        <span onClick={handleTermsCons}>Términos y condiciones</span>
      </p>
      <RateOfferSnippet offer_id={offer.offer_id} />
    </article>
  );
};

export default OfferTemplate;
