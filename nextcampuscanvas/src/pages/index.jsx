//ISR
//https://www.youtube.com/watch?v=d5unMDna5ng&t=19s
//https://www.youtube.com/watch?v=FZTaD32ueE8&t=2s
//https://www.youtube.com/watch?v=8iqMWMYng7k

import { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import { hashPassword } from '@server/services/passEncript';

//Styles
import styles from '@pagestyles/Index.module.scss';

//Components
import Header from '@components/GeneralUseComponents/Header/Header';
import Footer from '@components/GeneralUseComponents/Footer/Footer';
import SEOHeader from '@components/GeneralUseComponents/SEO_Header/SEOHeader';
import DiscountCard from '@components/GeneralUseComponents/DiscountCard/DiscountCard';
import HomeSlider from '@components/UsedInSpecificRoutes/Home/HomeSlider/HomeSlider';

//Session
import { useSession } from 'next-auth/react';

//Endpoints
import endPoints from '@services/api';

//Hooks
import useAxios from '@hooks/useAxios';

//CLARIFICAIONS:
//1. Don´t use the button up component because it does not work with the parallax background effect, since the window.scrollY does not work, because of the scroll of the parallax container.
export default function Home(props) {
  console.log(props);
  //Session
  const { data: session, status } = useSession();

  const { fetchData, cancel } = useAxios();

  //Leave this here
  console.log(
    'Revalidation time ' +
      parseInt(process.env.NEXT_PUBLIC_ISR_REVALIDATE_TIME) +
      ' s'
  );

  //States
  const [sliderState, setSliderState] = useState({
    banners: [],
    loading: true,
    error: false,
  });

  const [sectionCards, setSectionCards] = useState({
    cards: {},
    loading: true,
    error: false,
  });

  if (sliderState.error) console.error(sliderState.error);
  if (sectionCards.error) console.error(sectionCards.error);
  //if (newCards.error) console.error(newCards.error);
  //if (homeFeaturedCards.error) console.error(homeFeaturedCards.error);

  //TODO: Slider must get info either SSR or from database in client
  //Getting slider info
  useEffect(() => {
    const getBanners = async () => {
      const response = await fetchData(
        endPoints.discounts.getHomeSliderBanners,
        'get'
      );
      if (response.error) {
        setSliderState({
          ...sliderState,
          error: response.error,
          loading: false,
        });
        return;
      }
      const SHUFFLED_BANNERS = shuffleArray(response.body);
      setSliderState({
        ...sliderState,
        banners: SHUFFLED_BANNERS,
        loading: false,
        error: null,
      });
    };
    if (sliderState.banners.length === 0) {
      getBanners();
    }
  }, []);

  //Fetching section cards
  useEffect(() => {
    const getCards = async () => {
      const response = await fetchData(
        endPoints.discounts.getCards,
        'get',
        null,
        { required_cards: 'home_sections' }
      );

      if (response.error) {
        setSectionCards({
          ...sectionCards,
          error: response.error,
          loading: false,
        });
        return;
      }

      setSectionCards({
        ...sectionCards,
        cards: response.body,
        loading: false,
        error: null,
      });
    };
    if (Object.keys(sectionCards.cards).length === 0) {
      getCards();
    }
  }, []);

  //Functions

  //Randomly change to object order inside array
  //The array has to be shuffled IN THE FRONT END with this function
  function shuffleArray(array) {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = shuffledArray[i];
      shuffledArray[i] = shuffledArray[j];
      shuffledArray[j] = temp;
    }
    return shuffledArray;
  }

  const CardSkeleton_4_tiems = () => {
    return (
      <>
        <div className={styles.skeleton_card}></div>
        <div className={styles.skeleton_card}></div>
        <div className={styles.skeleton_card}></div>
        <div className={styles.skeleton_card}></div>
      </>
    );
  };

  const CardSkeleton_6_tiems = () => {
    return (
      <>
        <div className={styles.skeleton_card}></div>
        <div className={styles.skeleton_card}></div>
        <div className={styles.skeleton_card}></div>
        <div className={styles.skeleton_card}></div>
        <div className={styles.skeleton_card}></div>
        <div className={styles.skeleton_card}></div>
      </>
    );
  };

  return (
    <>
      <SEOHeader
        tabTitle={'Descuentos a estudiantes España'}
        metaName={'Descuentos a estudiantes en España'}
        description={
          'Descuentos exclusivos para estudiantes universitarios en España'
        }
      />

      <div className={`${styles.container} ${styles.parallax}`}>
        <div
          className={`${styles.parallax__layer} ${styles.parallax__back}`}
        ></div>
        <div className={`${styles.parallax__layer} ${styles.parallax__front}`}>
          <div className={`${styles.header_wrapper} header_wrapper`}>
            <Header />
          </div>

          <main className={session && styles.main__loggedInStyles}>
            <HomeSlider state={sliderState} />

            {/* /////////////////////////
            //       Discounts        //
          ///////////////////////// */}

            <section className={`${styles.suggested_discounts} container`}>
              {/* /////////////////////////
            //       Sugeridos        //
          ///////////////////////// */}
              <div className={styles.subtitle_glass_container}>
                <h2>Sugeridos para ti</h2>
              </div>
              <div className={styles.suggested_discounts_grid}>
                {sectionCards.loading ? (
                  CardSkeleton_4_tiems()
                ) : (
                  <>
                    {Object.keys(sectionCards.cards).length > 0 ? (
                      <>
                        {sectionCards.cards.suggested.map((card) => (
                          <DiscountCard
                            key={card.discount_id}
                            banner={card.banner.URL}
                            brand_name={card.brand_name}
                            brand_logo={card.brand_logo}
                            title={card.title}
                            discount_id={card.discount_id}
                          />
                        ))}
                      </>
                    ) : (
                      ''
                    )}
                  </>
                )}
              </div>
            </section>

            <section className={`${styles.novedades_discounts} container`}>
              {/* /////////////////////////
            //       Novedades        //
          ///////////////////////// */}
              <div className={styles.subtitle_glass_container}>
                <h2>Novedades</h2>
              </div>
              <div className={styles.novedades_discounts_grid}>
                {sectionCards.loading ? (
                  CardSkeleton_4_tiems()
                ) : (
                  <>
                    {Object.keys(sectionCards.cards).length > 0 ? (
                      <>
                        {sectionCards.cards.new.map((card) => (
                          <DiscountCard
                            key={card.discount_id}
                            banner={card.banner.URL}
                            brand_name={card.brand_name}
                            brand_logo={card.brand_logo}
                            title={card.title}
                            discount_id={card.discount_id}
                          />
                        ))}
                      </>
                    ) : (
                      ''
                    )}
                  </>
                )}
              </div>
            </section>

            <section className={`${styles.more_discounts} container`}>
              {/* /////////////////////////
            //    Más descuentos     //
          ///////////////////////// */}
              <div className={styles.subtitle_glass_container}>
                <h2>Más descuentos para estudiantes</h2>
              </div>
              <div className={styles.more_discounts_grid}>
                {sectionCards.loading ? (
                  CardSkeleton_6_tiems()
                ) : (
                  <>
                    {Object.keys(sectionCards.cards).length > 0 ? (
                      <>
                        {sectionCards.cards.home_featured.map((card) => (
                          <DiscountCard
                            key={card.discount_id}
                            banner={card.banner.URL}
                            brand_name={card.brand_name}
                            brand_logo={card.brand_logo}
                            title={card.title}
                            discount_id={card.discount_id}
                          />
                        ))}
                      </>
                    ) : (
                      ''
                    )}
                  </>
                )}
              </div>
            </section>

            <Link href={'/descuentos/todos'}>
              <button className={`${styles.view_all_btn} btn button--red`}>
                Ver todos
              </button>
            </Link>
          </main>
          <Footer />
        </div>
      </div>
    </>
  );
}

export async function getStaticProps() {
  console.log('Se ejecuta en el server');

  const response = await axios({
    url: endPoints.discounts.getHomeSliderBanners,
    method: 'get',
    headers: {
      accept: '*/*',
      'Content-Type': 'application/json',
      app_secret_key: await hashPassword(
        process.env.NEXT_PUBLIC_MAIN_NEXT_WEB_APP_SECRET_KEY
      ),
    },
  });
  const data = response.data;

  if (data.error) {
    throw new Error(
      `Error at fetching data: ${data.error} Response status: ${res.status}`
    );
  }

  return {
    props: {
      home_slider_banners: data,
    },
    //Leave this automatic revalidation in case admin forgets to update this page
    revalidate: parseInt(process.env.NEXT_PUBLIC_ISR_REVALIDATE_TIME),
  };
}
