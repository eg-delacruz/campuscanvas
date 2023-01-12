import Swal from 'sweetalert2';

//Assets
import white_background_svg_big from '@assets/GeneralUse/UsedInComponents/Ofertas/white_svg_background_big.svg';

//styles
import styles from './OfferTemplate.module.scss';

//Services
import dateFormat from '@services/dateFormat.js';

//Components
import RateOfferSnippet from '../RateOfferSnippet/RateOfferSnippet';
import FacebookShareButton from '@components/GeneralUseComponents/ShareButtons/FacebookShareButton/FacebookShareButton.jsx';
import TwitterShareButton from '@components/GeneralUseComponents/ShareButtons/TwitterShareButton/TwitterShareButton.jsx';
import WhatsAppShareButton from '@components/GeneralUseComponents/ShareButtons/WhatsAppShareButton/WhatsAppShareButton';

const OfferTemplate = ({ offer, children }) => {
  const handleTermsCons = () => {
    //Display modal with sweetalert2
    const customModal = Swal.mixin({
      customClass: {
        confirmButton: 'btn button--red',
      },
      buttonsStyling: false,
    });
    customModal.fire({
      title: 'Términos y condiciones',
      html: offer.terms_and_conds,
      confirmButtonText: 'Aceptar',
    });
  };

  const currentURL = encodeURI(window.location.href);
  return (
    <article className={`${styles.wrapper}`}>
      <div className={`${styles.container}`}>
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
        <section className={styles.info_container}>
          <p className={styles.valid_period}>
            Válido hasta el {dateFormat.shortSlashDate(offer.valid_till)}
          </p>
          <div className={styles.upper_offer_info}>
            <h2>{offer.title}</h2>
            <p>{offer.description}</p>
          </div>

          {children}

          <p className={styles.terms_cons}>
            <span onClick={handleTermsCons}>Términos y condiciones</span>
          </p>

          <RateOfferSnippet offer_id={offer.offer_id} />
        </section>

        {/*/////////////////////////
        //       Brand info     //
        /////////////////////////*/}
        <section className={styles.brand_info}>
          <h4>{offer.brand.brand_name}</h4>
          <p>{offer.brand.brand_description}</p>
        </section>

        {/*/////////////////////////
        //     Share section    //
        /////////////////////////*/}
        <section className={styles.share_section}>
          <FacebookShareButton width={40} height={40} URL={currentURL} />
          <TwitterShareButton
            width={40}
            height={40}
            URL={currentURL}
            postTitle={offer.SEO_meta_title}
          />
          <WhatsAppShareButton
            width={40}
            height={40}
            postTitle={offer.SEO_meta_title}
            URL={currentURL}
          />
        </section>
      </div>
    </article>
  );
};

export default OfferTemplate;
