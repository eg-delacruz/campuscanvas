//Sanitysing dangerouslySetInnerHTML as in: https://www.npmjs.com/package/isomorphic-dompurify
import DOMPurify from 'isomorphic-dompurify';

import Swal from 'sweetalert2';

//Assets
import white_background_svg_big from '@assets/GeneralUse/UsedInComponents/Ofertas/white_svg_background_big.svg';

//styles
import styles from './DiscountTemplate.module.scss';

//Services
import dateFormat from '@services/dateFormat.js';

//Components
import RateDiscountSnippet from '../RateDiscountSnippet/RateDiscountSnippet';
import FacebookShareButton from '@components/GeneralUseComponents/ShareButtons/FacebookShareButton/FacebookShareButton.jsx';
import TwitterShareButton from '@components/GeneralUseComponents/ShareButtons/TwitterShareButton/TwitterShareButton.jsx';
import WhatsAppShareButton from '@components/GeneralUseComponents/ShareButtons/WhatsAppShareButton/WhatsAppShareButton';

const DiscountTemplate = ({ discount, children }) => {
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
      html: DOMPurify.sanitize(discount.terms_and_conds),
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
                src={discount.banner.URL}
                alt={discount.brand.brand_name}
              />
            </span>
          </div>
          <div className={styles.logo_container}>
            <span>
              <img src={discount.brand.brand_logo.URL} alt='' />
            </span>
          </div>
        </section>

        {/*/////////////////////////
        //       Discount info     //
        /////////////////////////*/}
        <section className={styles.info_container}>
          {discount.expiration_date && (
            <p className={styles.valid_period}>
              Válido hasta el{' '}
              {dateFormat.shortSlashDate(new Date(discount.expiration_date))}
            </p>
          )}
          <div className={styles.upper_discount_info}>
            <h2>{discount.title}</h2>
            <p>{discount.description}</p>
          </div>

          {children}

          <p className={styles.terms_cons}>
            <span onClick={handleTermsCons}>Términos y condiciones</span>
          </p>

          <RateDiscountSnippet discount_id={discount._id} />
        </section>

        {/*/////////////////////////
        //       Brand info     //
        /////////////////////////*/}
        <section className={styles.brand_info}>
          <h4>{discount.brand.brand_name}</h4>
          <p>{discount.brand.brand_description}</p>
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
            postTitle={`¡Mira este descuento exclusivo para estudiantes en ${discount.brand.brand_name}!`}
          />
          <WhatsAppShareButton
            width={40}
            height={40}
            postTitle={`¡Mira este descuento exclusivo para estudiantes en ${discount.brand.brand_name}!`}
            URL={currentURL}
          />
        </section>
      </div>
    </article>
  );
};

export default DiscountTemplate;
