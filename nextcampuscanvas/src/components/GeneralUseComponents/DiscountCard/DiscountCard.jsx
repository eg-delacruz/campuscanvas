import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { useState, useRef, useEffect, forwardRef, memo } from 'react';

//Styles
import styles from './DiscountCard.module.scss';

//Assets
import white_background_svg from '@assets/GeneralUse/UsedInComponents/DiscountCard/white_svg_background.svg';

//Components
import Loader from '@components/GeneralUseComponents/CircularLoader/CircularLoader';
import CC_LogoLoader from '@components/GeneralUseComponents/CC_LogoLoader/CC_LogoLoader';

//CLARIFICATIONS
//1. Brand logos have to be svg. Apply viewBox="0 0 200 200" to the svg tag.
//2. Description does not have to have more than 40 Characters
//3. Banner image has to be jpg and 640 x 320 px
//4. The memo is used to avoid re-rendering the component if the props are the same when component is part of a list that gets more items on scroll. (performance improvement)

//This might get a lastCardElementRef prop if it is the last card in a list
//TODO: Test if we pass a ref=null to the component, it will still work in production. If not, we have to check if the ref is null and conditionally render the component content
const DiscountCard = memo(
  forwardRef(
    (
      { banner, brand_name, brand_logo, title, discount_id, card_tag },
      lastCardElementRef
    ) => {
      //Loader placeholder while images render (start)
      const bannerRef = useRef(null);
      const brandLogoRef = useRef(null);

      const [loadingBanner, setLoadingBanner] = useState(true);
      const [loadingLogo, setLoadingLogo] = useState(true);

      const handleLoadedBanner = () => {
        setLoadingBanner(false);
      };

      const handleLoadedLogo = () => {
        setLoadingLogo(false);
      };

      useEffect(() => {
        if (bannerRef.current?.complete) {
          handleLoadedBanner();
        }
      }, [bannerRef.current]);

      useEffect(() => {
        if (brandLogoRef.current?.complete) {
          handleLoadedLogo();
        }
      }, [brandLogoRef.current]);
      //Loader placeholder while images render (end)

      //Check if a string has more than 40 characters, including empty spaces
      const checkDescriptionLength = (title) => {
        if (title.length > 40) {
          console.warn(
            `Item ${discount_id} of brand ${brand_name} has ${title.length} characters in its title the information might not be displayed properly`
          );
        }
      };

      //Leave this here in case needed
      //checkDescriptionLength(title);

      //To send the id of the post to the post page
      const router = useRouter();

      return (
        <>
          <article
            ref={lastCardElementRef}
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
              {/* Loader while banner loads (start) */}
              <div
                className={styles.circular_loader_container}
                style={{ display: loadingBanner ? 'flex' : 'none' }}
              >
                <Loader />
              </div>
              {/* Loader while banner loads (end) */}
              <span
                style={{ visibility: loadingBanner ? 'hidden' : 'visible' }}
              >
                <img
                  ref={bannerRef}
                  src={banner}
                  alt={brand_name}
                  loading='lazy'
                  onLoad={handleLoadedBanner}
                />
              </span>
              {card_tag && (
                <div
                  className={`${styles.card_tag} ${
                    card_tag === 'exclusivo' ? styles.card_tag_exclusivo : ''
                  } ${card_tag === 'nuevo' ? styles.card_tag_nuevo : ''}`}
                >
                  {card_tag}
                </div>
              )}
            </div>
            <div className={styles.discount_info_container}>
              <div className={styles.discount_logo_container}>
                <span className={styles.span_container}>
                  <span>
                    <img src={white_background_svg.src} />
                  </span>
                  <div
                    style={{ visibility: loadingLogo ? 'hidden' : 'visible' }}
                  >
                    <img
                      ref={brandLogoRef}
                      className={styles.brand_img}
                      src={brand_logo}
                      alt={brand_name}
                      loading='lazy'
                      onLoad={handleLoadedLogo}
                    />
                  </div>
                  {/* Loader while logo loads (start) */}
                  <div
                    className={styles.cc_logo_loader_container}
                    style={{ display: loadingLogo ? 'block' : 'none' }}
                  >
                    <CC_LogoLoader />
                  </div>
                  {/* Loader while logo loads (end) */}
                </span>
              </div>
              <div className={styles.discount_info_details}>
                <h4>{title}</h4>
              </div>
            </div>
          </article>
        </>
      );
    }
  )
);

export default DiscountCard;

DiscountCard.propTypes = {
  banner: PropTypes.string.isRequired,
  brand_name: PropTypes.string.isRequired,
  brand_logo: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  discount_id: PropTypes.string.isRequired,
  card_tag: PropTypes.string,
};
