import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { useState, useRef, useEffect } from 'react';

import styles from './MiniDiscountCard.module.scss';

//Assets
import white_background_svg from '@assets/GeneralUse/UsedInComponents/DiscountCard/white_svg_background.svg';
import CC_LogoLoader from '@components/GeneralUseComponents/CC_LogoLoader/CC_LogoLoader';

//CLARIFICATIONS:
//1. This component can get a closeSearchBar function as a prop to close the search bar when the user clicks on the card
const MiniDiscountCard = ({
  discount_id,
  title,
  brand_logo,
  brand_name,
  closeSearchBar,
}) => {
  //Loader placeholder while images render (start)
  const brandLogoRef = useRef(null);

  const [loadingLogo, setLoadingLogo] = useState(true);

  const handleLoadedLogo = () => {
    setLoadingLogo(false);
  };

  useEffect(() => {
    if (brandLogoRef.current?.complete) {
      handleLoadedLogo();
    }
  }, [brandLogoRef.current]);

  //Loader placeholder while images render (end)

  //To send the id of the post to the post page
  const router = useRouter();

  return (
    <div
      onClick={() => {
        if (closeSearchBar) {
          closeSearchBar();
        }
        router.push(
          {
            pathname: `/descuentos/${discount_id}`,
            query: { id: discount_id },
          },
          `/descuentos/${discount_id}`
        );
      }}
      className={styles.card}
    >
      <div className={styles.discount_logo_container}>
        <span className={styles.span_container}>
          <span>
            <img src={white_background_svg.src} />
          </span>
          <div style={{ visibility: loadingLogo ? 'hidden' : 'visible' }}>
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
      <div className={styles.info_container}>
        <h4 className={styles.brand}>{brand_name}</h4>
        <p className={styles.title}>{title}</p>
      </div>
    </div>
  );
};

export default MiniDiscountCard;
