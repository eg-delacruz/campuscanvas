//Sanitysing dangerouslySetInnerHTML as in: https://www.npmjs.com/package/isomorphic-dompurify
import DOMPurify from 'isomorphic-dompurify';
import { useState } from 'react';

//Assets
import white_background_svg_big from '@assets/GeneralUse/UsedInComponents/Ofertas/white_svg_background_big.svg';

//styles
import styles from './DiscountTemplate.module.scss';

//Services
import dateFormat from '@services/dateFormat.js';

//Components
import DisplayTermsCondsModal from '../DisplayTermsCondsModal/DisplayTermsCondsModal';
import RateDiscountSnippet from '../RateDiscountSnippet/RateDiscountSnippet';
import FacebookShareButton from '@components/GeneralUseComponents/ShareButtons/FacebookShareButton/FacebookShareButton.jsx';
import TwitterShareButton from '@components/GeneralUseComponents/ShareButtons/TwitterShareButton/TwitterShareButton.jsx';
import WhatsAppShareButton from '@components/GeneralUseComponents/ShareButtons/WhatsAppShareButton/WhatsAppShareButton';

//CLARIFICATIONS:
//1. Don´t apply loader placeholders to banner or logo, since the image payload is not too high and pages load very fast.
const DiscountTemplate = ({ discount, children }) => {
  const [showTermsCondsModal, setShowTermsCondsModal] = useState(false);

  const handleTermsCons = () => {
    return (
      <DisplayTermsCondsModal
        showModal={showTermsCondsModal}
        setShowModal={setShowTermsCondsModal}
        TermsConds={DOMPurify.sanitize(discount.terms_and_conds)}
      />
    );
  };

  let currentURL;
  if (typeof window !== 'undefined') {
    currentURL = encodeURI(window.location.href);
  }

  return (
    <>
      {handleTermsCons()}
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
              <span onClick={() => setShowTermsCondsModal(true)}>
                Términos y condiciones
              </span>
            </p>

            <RateDiscountSnippet discount_id={discount._id} />
          </section>

          {/*/////////////////////////
        //       Brand info     //
        /////////////////////////*/}
          <section className={styles.brand_info}>
            <h4>{discount.brand.brand_name}</h4>
            <div
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(discount.brand.brand_description),
              }}
            ></div>
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
              postTitle={`¡Mira este descuento exclusivo para estudiantes de ${discount.brand.brand_name}!`}
            />
            <WhatsAppShareButton
              width={40}
              height={40}
              postTitle={`¡Mira este descuento exclusivo para estudiantes de ${discount.brand.brand_name}!`}
              URL={currentURL}
            />
          </section>
        </div>
      </article>
    </>
  );
};

export default DiscountTemplate;
