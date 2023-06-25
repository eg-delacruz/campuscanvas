import { useRef, useEffect, useState } from 'react';
import { useRouter } from 'next/router';

//Swiper required modules
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade, Keyboard } from 'swiper';

//Styles
import styles from './HomeSlider.module.scss';

//External styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import 'swiper/css/effect-fade';

//Components
import CC_LogoLoader from '@components/GeneralUseComponents/CC_LogoLoader/CC_LogoLoader';

//Clarifications
//1. For screens > 767 px, pictures should have a ratio of 24 : 11 , and an optimal size of 1200px x 550 px
//2. For screens < 767 px, pictures have to have a size of 780 px x 520 px BY FORCE
//3. All images have to have the same size to avoid layout shift

const HomeSlider = ({ slides }) => {
  //To send the id of the post to the post page
  const router = useRouter();

  //States
  const [loadingBanner, setLoadingBanner] = useState(true);

  //Monitor if images are loaded with
  const bannerRef = useRef(null);

  const handleLoadedBanner = () => {
    setLoadingBanner(false);
  };

  useEffect(() => {
    if (bannerRef.current?.complete) {
      handleLoadedBanner();
    }
  }, [bannerRef.current]);

  return (
    //noArrow767 class comes from Globals, and is to disable arrows at 767 and smaller of the Swiper.
    <section className={`${styles.slider_container} container noArrows767`}>
      <Swiper
        modules={[Pagination, Navigation, Autoplay, EffectFade, Keyboard]}
        slidesPerView={1}
        slidesPerGroup={1}
        spaceBetween={20}
        effect={'fade'}
        loop={true}
        speed={800}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
          waitForTransition: true,
        }}
        keyboard={{
          enabled: true,
        }}
        pagination={{ clickable: true }}
        navigation={true}
        className={styles.swiper}
        autoHeight={true}
      >
        {slides.map((item) => (
          <SwiperSlide
            onClick={() => {
              //Redirect user to the brand page if applies
              if (item.redirect_user_to_brand_page) {
                router.push(
                  {
                    pathname: `/descuentos/${item.brand_slug}`,
                    query: { id: item.brand_slug },
                  },
                  `/descuentos/${item.brand_slug}`
                );
                return;
              }

              //Directly open the affiliate link if discount only has affiliate link and is available for public
              if (
                item.type === 'affiliate_link_only' &&
                item.available_for === 'publico'
              ) {
                window.open(
                  item.affiliate_link,
                  '_blank',
                  'noopener,noreferrer'
                );
                return;
              }

              //Or open the discount page in every other case
              router.push(
                {
                  pathname: `/descuentos/${item.brand_slug}/${item.discount_id}`,
                  query: { id: item.discount_id },
                },
                `/descuentos/${item.brand_slug}/${item.discount_id}`
              );
            }}
            key={item.discount_id}
            className={styles.slider_item}
          >
            <div
              className={styles.home_banner_loader_container}
              style={{ display: loadingBanner ? 'block' : 'none' }}
            >
              <CC_LogoLoader />
            </div>
            <picture>
              <source
                media='(min-width: 767px)'
                srcSet={item.slider_banner_big_screen.URL}
              />

              <img
                style={{ visibility: loadingBanner ? 'hidden' : 'visible' }}
                src={item.slider_banner_small_screen.URL}
                alt={item.discount_brand}
                ref={bannerRef}
                onLoad={handleLoadedBanner}
              />
            </picture>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default HomeSlider;
