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

//Testing
import banner1 from '@assets/GeneralUse/UsedInComponents/HomeSlider/banner1.jpg';
import banner2 from '@assets/GeneralUse/UsedInComponents/HomeSlider/banner2.jpg';
import banner3 from '@assets/GeneralUse/UsedInComponents/HomeSlider/banner3.jpg';
import banner4 from '@assets/GeneralUse/UsedInComponents/HomeSlider/banner4.jpg';

import banner1_small from '@assets/GeneralUse/UsedInComponents/HomeSlider/banner1_small.jpg';
import banner2_small from '@assets/GeneralUse/UsedInComponents/HomeSlider/banner2_small.jpg';
import banner3_small from '@assets/GeneralUse/UsedInComponents/HomeSlider/banner3_small.jpg';
import banner4_small from '@assets/GeneralUse/UsedInComponents/HomeSlider/banner4_small.jpg';

const SLIDER_BANNERS = [
  {
    discount_id: 1,
    slider_banner_big_screen: { URL: banner1.src },
    slider_banner_small_screen: { URL: banner1_small.src },
  },
  {
    discount_id: 1,
    slider_banner_big_screen: { URL: banner1.src },
    slider_banner_small_screen: { URL: banner1_small.src },
  },
  {
    discount_id: 2,
    slider_banner_big_screen: { URL: banner2.src },
    slider_banner_small_screen: { URL: banner2_small.src },
  },
  {
    discount_id: 3,
    slider_banner_big_screen: { URL: banner3.src },
    slider_banner_small_screen: { URL: banner3_small.src },
  },
  {
    discount_id: 4,
    slider_banner_big_screen: { URL: banner4.src },
    slider_banner_small_screen: { URL: banner4_small.src },
  },
];

//Clarifications
//1. For screens > 767 px, pictures should have a ratio of 24 : 11 , and an optimal size of 1200px x 550 px
//2. For screens < 767 px, pictures have to have a size of 780 px x 520 px BY FORCE
//3. All images have to have the same size to avoid layout shift

const HomeSlider = ({ slides }) => {
  //To send the id of the post to the post page
  const router = useRouter();

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
              router.push(
                {
                  pathname: `/descuentos/${item.discount_id}`,
                  query: { id: item.discount_id },
                },
                `/descuentos/${item.discount_id}`
              );
            }}
            key={item.discount_id}
            className={styles.slider_item}
          >
            <picture>
              <source
                media='(min-width: 767px)'
                srcSet={item.slider_banner_big_screen.URL}
              />
              <img
                src={item.slider_banner_small_screen.URL}
                alt={item.discount_brand}
              />
            </picture>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default HomeSlider;
