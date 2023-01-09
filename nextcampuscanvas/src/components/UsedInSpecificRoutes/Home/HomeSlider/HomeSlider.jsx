import Link from 'next/link';

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

//Databases
import { SLIDER_BANNERS } from '@databases/offers/sliderBannersDatabase.js';

//Clarifications
//1. For screens > 767 px, pictures should have a ratio of 3 : 1 , and an optimal size of 1200px x 400 px
//2. For screens < 767 px, pictures have to have a size of 780 px x 520 px BY FORCE

const HomeSlider = () => {
  //TODO: Slider must get info either SSR or from database in client
  //TODO: Info to pass to each slide/get from server: imageBrand, bannerBig, bannerSmall, offerUrl.

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
      >
        {SLIDER_BANNERS.map((item) => (
          <SwiperSlide key={item.offer_id} className={styles.slider_item}>
            {/* TODO: onClick, redirect to needed URL according to offer_id */}
            <Link href={'#'}>
              <picture>
                <source
                  media='(min-width: 767px)'
                  srcSet={item.slider_banner_big_screen}
                />
                <img
                  src={item.slider_banner_small_screen}
                  alt={item.offer_brand}
                />
              </picture>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default HomeSlider;
