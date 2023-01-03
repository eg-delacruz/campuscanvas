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
const OfferCard = ({
  bannerImg,
  brandName,
  brandLogoSvg,
  description,
  offerID,
}) => {
  //Check if a string has more than 40 characters, including empty spaces
  const checkDescriptionLength = (description) => {
    if (description.length > 40) {
      console.warn(
        `Item ${offerID} of brand ${brandName} has ${description.length} characters and its information might not be displayed properly`
      );
    }
  };

  checkDescriptionLength(description);
  return (
    <>
      {/* TODO: open and display according to the offerID */}
      <Link href='#'>
        <article className={styles.offer_card}>
          <div className={styles.offer_image_container}>
            <span>
              <img src={bannerImg} alt={brandName} />
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
                  src={brandLogoSvg}
                  alt={brandName}
                />
              </span>
            </div>
            <div className={styles.offer_info_details}>
              <h4>{description}</h4>
            </div>
          </div>
        </article>
      </Link>
    </>
  );
};

export default OfferCard;

OfferCard.propTypes = {
  bannerImg: PropTypes.string.isRequired,
  brandName: PropTypes.string.isRequired,
  brandLogoSvg: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  offerID: PropTypes.number.isRequired,
};
