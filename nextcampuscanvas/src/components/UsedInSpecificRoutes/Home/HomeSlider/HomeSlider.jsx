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

//Hooks
import useWindowDimensions from '@hooks/useWindowDimensions';

//assets
import banner1 from '@assets/GeneralUse/UsedInComponents/HomeSlider/banner1.jpeg';
import banner2 from '@assets/GeneralUse/UsedInComponents/HomeSlider/banner2.jpeg';
import banner3 from '@assets/GeneralUse/UsedInComponents/HomeSlider/banner3.jpg';
import banner4 from '@assets/GeneralUse/UsedInComponents/HomeSlider/banner4.jpg';

import banner1_small from '@assets/GeneralUse/UsedInComponents/HomeSlider/banner1_small.jpg';
import banner2_small from '@assets/GeneralUse/UsedInComponents/HomeSlider/banner2_small.jpg';
import banner3_small from '@assets/GeneralUse/UsedInComponents/HomeSlider/banner3_small.jpg';
import banner4_small from '@assets/GeneralUse/UsedInComponents/HomeSlider/banner4_small.jpg';

//Clarifications
//1. For screens > 767 px, pictures should have a ratio of 3 : 1 , and an optimal size of 1200px x 400 px
//2. For screens < 767 px, pictures have to have a size of 780 px x 520 px BY FORCE

const SliderOffers = [
  {
    offerBrand: 'Adidas',
    bannerBig: banner1.src,
    bannerSmall: banner1_small.src,
    offerUrl: '#',
  },
  {
    offerBrand: 'Adidas',
    bannerBig: banner2.src,
    bannerSmall: banner2_small.src,
    offerUrl: '#',
  },
  {
    offerBrand: 'Adidas',
    bannerBig: banner3.src,
    bannerSmall: banner3_small.src,
    offerUrl: '#',
  },
  {
    offerBrand: 'Adidas',
    bannerBig: banner4.src,
    bannerSmall: banner4_small.src,
    offerUrl: '#',
  },
];

const HomeSlider = () => {
  //TODO: Slider must get info either SSR or from database in client
  //TODO: Info to pass to each slide/get from server: imageBrand, bannerBig, bannerSmall, offerUrl.

  const WindowDimensions = useWindowDimensions();

  return (
    <section className={`${styles.slider_container} container`}>
      <Swiper
        modules={[Pagination, Navigation, Autoplay, EffectFade, Keyboard]}
        slidesPerView={1}
        slidesPerGroup={1}
        spaceBetween={20}
        loop={true}
        speed={1400}
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
        {SliderOffers.map((item, index) => (
          <SwiperSlide key={index} className={styles.slider_item}>
            <Link href={item.offerUrl}>
              <picture>
                <source media='(min-width: 767px)' srcSet={item.bannerBig} />
                <img src={item.bannerSmall} alt={item.offerBrand} />
              </picture>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default HomeSlider;
