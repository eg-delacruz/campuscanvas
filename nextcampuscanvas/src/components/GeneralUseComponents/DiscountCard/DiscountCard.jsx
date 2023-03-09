import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { useState, useRef, useEffect } from 'react';

//Styles
import styles from './DiscountCard.module.scss';

//Assets
import white_background_svg from '@assets/GeneralUse/UsedInComponents/DiscountCard/white_svg_background.svg';

//Components
import Loader from '@components/GeneralUseComponents/CircularLoader/CircularLoader';

//CLARIFICATIONS
//1. Brand logos have to be svg. Apply viewBox="0 0 200 200" to the svg tag.
//2. Description does not have to have more than 40 Characters
//3. Banner image has to be jpg and 640 x 320 px
const DiscountCard = ({
  banner,
  brand_name,
  brand_logo,
  title,
  discount_id,
}) => {
  const bannerRef = useRef(null);
  const [loadingImg, setLoadingImg] = useState(true);

  const handleLoadedImg = () => {
    setLoadingImg(false);
  };

  useEffect(() => {
    if (bannerRef.current?.complete) {
      handleLoadedImg();
    }
  }, []);

  //Check if a string has more than 40 characters, including empty spaces
  const checkDescriptionLength = (title) => {
    if (title.length > 40) {
      console.warn(
        `Item ${discount_id} of brand ${brand_name} has ${title.length} characters in its title the information might not be displayed properly`
      );
    }
  };

  checkDescriptionLength(title);

  //To send the id of the post to the post page
  const router = useRouter();

  return (
    <>
      <article
        onClick={() => {
          router.push(
            {
              pathname: `/descuentos/${discount_id}`,
              query: { id: discount_id },
            },
            `/descuentos/${discount_id}`
          );
        }}
        className={styles.discount_card}
      >
        <div className={styles.discount_image_container}>
          {/* Loader while image loads (start) */}
          <div
            className={styles.circular_loader_container}
            style={{ display: loadingImg ? 'flex' : 'none' }}
          >
            <Loader />
          </div>
          {/* Loader while image loads (end) */}
          {/* TODO: check if display none and inline? would work instead of visibility property  */}
          <span style={{ visibility: loadingImg ? 'hidden' : 'visible' }}>
            <img
              ref={bannerRef}
              src={banner}
              alt={brand_name}
              loading='lazy'
              onLoad={handleLoadedImg}
            />
          </span>
        </div>
        <div className={styles.discount_info_container}>
          <div className={styles.discount_logo_container}>
            <span className={styles.span_container}>
              <span>
                <img src={white_background_svg.src} />
              </span>
              <img
                className={styles.brand_img}
                src={brand_logo}
                alt={brand_name}
                loading='lazy'
              />
            </span>
          </div>
          <div className={styles.discount_info_details}>
            <h4>{title}</h4>
          </div>
        </div>
      </article>
    </>
  );
};

export default DiscountCard;

DiscountCard.propTypes = {
  banner: PropTypes.string.isRequired,
  brand_name: PropTypes.string.isRequired,
  brand_logo: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  discount_id: PropTypes.string.isRequired,
};
