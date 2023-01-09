import Link from 'next/link';
import PropTypes from 'prop-types';

//Styles
import styles from './OfferCard.module.scss';

//Assets
import white_background_svg from '@assets/GeneralUse/UsedInComponents/OfferCard/white_svg_background.svg';

//CLARIFICATIONS
//1. Brand logos have to be svg. Apply viewBox="0 0 200 200" to the svg tag.
//2. Description does not have to have more than 40 Characters
//3. Banner image has to be jpg and 640 x 320 px
const OfferCard = ({ banner, brand_name, brand_logo, title, offer_id }) => {
  //Check if a string has more than 40 characters, including empty spaces
  const checkDescriptionLength = (title) => {
    if (title.length > 40) {
      console.warn(
        `Item ${offer_id} of brand ${brand_name} has ${title.length} characters in its title the information might not be displayed properly`
      );
    }
  };

  checkDescriptionLength(title);
  return (
    <>
      {/* TODO: open and display according to the offerID */}
      {/* TODO: Change OfferCard  properties according to DB object names. description -> card_title, brandName -> brand_name, brandName -> brand_name, bannerImg -> banner, brandLogoSvg -> brand_logo, offerID -> id*/}
      <Link href='#'>
        <article className={styles.offer_card}>
          <div className={styles.offer_image_container}>
            <span>
              <img src={banner} alt={brand_name} />
            </span>
          </div>
          <div className={styles.offer_info_container}>
            <div className={styles.offer_logo_container}>
              <span className={styles.span_container}>
                <span>
                  <img src={white_background_svg.src} alt='Grover' />
                </span>
                <img
                  className={styles.brand_img}
                  src={brand_logo}
                  alt={brand_name}
                />
              </span>
            </div>
            <div className={styles.offer_info_details}>
              <h4>{title}</h4>
            </div>
          </div>
        </article>
      </Link>
    </>
  );
};

export default OfferCard;

OfferCard.propTypes = {
  banner: PropTypes.string.isRequired,
  brand_name: PropTypes.string.isRequired,
  brand_logo: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  offer_id: PropTypes.number.isRequired,
};
