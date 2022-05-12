//Swiper required modules
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper';

//Styles
import styles from './SponsorsSlider.module.scss';

//External styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';

//Assets
import DecisionHandler from '@assets/GeneralUse/Sponsors/decisionhandler.png';

const SponsorsSlider = (props) => {
  return (
    <section className={styles.slider}>
      <div className={`${styles.slider__container} container`}>
        <h1 className={styles.title}>{props.titulo}</h1>

        {/* Slider config */}
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          slidesPerView={1}
          slidesPerGroup={1}
          navigation={true}
          speed={1400}
          loop
          loopFillGroupWithBlank={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
            waitForTransition: true,
          }}
          pagination={{ clickable: true }}
          breakpoints={{
            410: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            625: {
              slidesPerView: 3,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 4,
              spaceBetween: 40,
              slidesPerGroup: 4,
            },
          }}
          className={styles.swiper}
        >
          <SwiperSlide className={styles.slider__item_container}>
            <img src={DecisionHandler.src} alt='Desicion handler' />
          </SwiperSlide>
          <SwiperSlide className={styles.slider__item_container}>
            <img src={DecisionHandler.src} alt='Desicion handler' />
          </SwiperSlide>
          <SwiperSlide className={styles.slider__item_container}>
            <img src={DecisionHandler.src} alt='Desicion handler' />
          </SwiperSlide>
          <SwiperSlide className={styles.slider__item_container}>
            <img src={DecisionHandler.src} alt='Desicion handler' />
          </SwiperSlide>
          <SwiperSlide className={styles.slider__item_container}>
            <img src={DecisionHandler.src} alt='Desicion handler' />
          </SwiperSlide>
          <SwiperSlide className={styles.slider__item_container}>
            <img src={DecisionHandler.src} alt='Desicion handler' />
          </SwiperSlide>
          <SwiperSlide className={styles.slider__item_container}>
            <img src={DecisionHandler.src} alt='Desicion handler' />
          </SwiperSlide>
          <SwiperSlide className={styles.slider__item_container}>
            <img src={DecisionHandler.src} alt='Desicion handler' />
          </SwiperSlide>
          <SwiperSlide className={styles.slider__item_container}>
            <img src={DecisionHandler.src} alt='Desicion handler' />
          </SwiperSlide>
          <SwiperSlide className={styles.slider__item_container}>
            <img src={DecisionHandler.src} alt='Desicion handler' />
          </SwiperSlide>
          <SwiperSlide className={styles.slider__item_container}>
            <img src={DecisionHandler.src} alt='Desicion handler' />
          </SwiperSlide>
          <SwiperSlide className={styles.slider__item_container}>
            <img src={DecisionHandler.src} alt='Desicion handler' />
          </SwiperSlide>
        </Swiper>
      </div>
    </section>
  );
};

export default SponsorsSlider;
