import PropTypes from 'prop-types';
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';

//Styeles
import styles from './SimpleBrandCard.module.scss';

//Components
import CC_LogoLoader from '@components/GeneralUseComponents/CC_LogoLoader/CC_LogoLoader';

//Assets
import white_background_svg from '@assets/GeneralUse/UsedInComponents/BrandSimpleCard/white_svg_background.svg';

const SimpleBrandCard = ({ brand_name, brand_logo, brand_slug }) => {
  //States
  const [loadingLogo, setLoadingLogo] = useState(true);

  //Refs
  const brandLogoRef = useRef(null);

  useEffect(() => {
    if (brandLogoRef.current?.complete) {
      handleLoadedLogo();
    }
  }, [brandLogoRef.current]);

  //Functions
  const handleLoadedLogo = () => {
    setLoadingLogo(false);
  };

  return (
    <>
      <article className={styles.card}>
        <Link href={`/descuentos/${brand_slug}`}>
          <a>
            <h3>{brand_name}</h3>

            <div className={styles.logo_container}>
              <span className={styles.span_container}>
                <span>
                  <img src={white_background_svg.src} />
                </span>
                <div
                  style={{
                    visibility: loadingLogo ? 'hidden' : 'visible',
                  }}
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
          </a>
        </Link>
      </article>
    </>
  );
};

export default SimpleBrandCard;

SimpleBrandCard.propTypes = {
  brand_name: PropTypes.string.isRequired,
  brand_logo: PropTypes.string.isRequired,
  brand_slug: PropTypes.string.isRequired,
};
