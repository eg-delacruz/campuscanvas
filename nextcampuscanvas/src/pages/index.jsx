//ISR
//https://www.youtube.com/watch?v=d5unMDna5ng&t=19s
//https://www.youtube.com/watch?v=FZTaD32ueE8&t=2s
//https://www.youtube.com/watch?v=8iqMWMYng7k

import Link from 'next/link';

//Styles
import styles from '@pagestyles/Index.module.scss';

//Components
import Header from '@components/GeneralUseComponents/Header/Header';
import SEOHeader from '@components/GeneralUseComponents/SEO_Header/SEOHeader';
import DiscountCard from '@components/GeneralUseComponents/DiscountCard/DiscountCard';
import HomeSlider from '@components/UsedInSpecificRoutes/Home/HomeSlider/HomeSlider';
import FooterWithoutSignature from '@components/GeneralUseComponents/FooterWithoutSignature/FooterWithoutSignature';
import FooterSignature from '@components/GeneralUseComponents/FooterSignature/FooterSignature';

//Session
import { useSession } from 'next-auth/react';

//Endpoints
import endPoints from '@services/api';

//Services
import axiosFetcher from '@services/axiosFetcher';

//CLARIFICAIONS:
//1. Don´t use the button up component because it does not work with the parallax background effect, since the window.scrollY does not work, because of the scroll of the parallax container.

export default function Home(props) {
  const { home_data } = props;

  //Session
  const { data: session, status } = useSession();

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
          <div className={`${styles.header_wrapper}`}>
            <Header />
          </div>

          <main className={session && styles.main__loggedInStyles}>
            {/* Home sliders come randomly shuffled from server */}
            <HomeSlider slides={home_data.home_banners} />

            {/* /////////////////////////
            //       Discounts        //
          ///////////////////////// */}

            {/* Should have 4 discounts */}
            {/* /////////////////////////
             //       Sugeridos        //
              ///////////////////////// */}

            {home_data.home_sections_cards.sugeridos.length !== 0 && (
              <section className={`${styles.suggested_discounts} container`}>
                <div className={styles.subtitle_glass_container}>
                  <h2>Sugeridos para ti</h2>
                </div>
                <div className={styles.suggested_discounts_grid}>
                  {home_data.home_sections_cards.sugeridos?.map((card) => (
                    <DiscountCard
                      key={card.discount_id}
                      banner={card.banner.URL}
                      brand_name={card.brand_name}
                      brand_logo={card.brand_logo.brand_logo.URL}
                      title={card.title}
                      discount_id={card.discount_id}
                      card_tag={card.card_tag}
                      brand_slug={card.brand_slug.brand_slug}
                    />
                  ))}
                </div>
              </section>
            )}

            {/* Should have 4 discounts */}
            {/* /////////////////////////
          //       Novedades        //
          ///////////////////////// */}

            {home_data.home_sections_cards.nuevos.length !== 0 && (
              <section className={`${styles.novedades_discounts} container`}>
                <div className={styles.subtitle_glass_container}>
                  <h2>Novedades</h2>
                </div>
                <div className={styles.novedades_discounts_grid}>
                  {home_data.home_sections_cards.nuevos?.map((card) => (
                    <DiscountCard
                      key={card.discount_id}
                      banner={card.banner.URL}
                      brand_name={card.brand_name}
                      brand_logo={card.brand_logo.brand_logo.URL}
                      title={card.title}
                      discount_id={card.discount_id}
                      card_tag={card.card_tag}
                      brand_slug={card.brand_slug.brand_slug}
                    />
                  ))}
                </div>
              </section>
            )}

            {/* Should have 9 */}
            {/* /////////////////////////
            //    Más descuentos     //
             ///////////////////////// */}

            {home_data.home_sections_cards.mas_descuentos_estudiantes.length !==
              0 && (
              <section className={`${styles.more_discounts} container`}>
                <div className={styles.subtitle_glass_container}>
                  <h2>Más descuentos para estudiantes</h2>
                </div>
                <div className={styles.more_discounts_grid}>
                  {home_data.home_sections_cards.mas_descuentos_estudiantes?.map(
                    (card) => (
                      <DiscountCard
                        key={card.discount_id}
                        banner={card.banner.URL}
                        brand_name={card.brand_name}
                        brand_logo={card.brand_logo.brand_logo.URL}
                        title={card.title}
                        discount_id={card.discount_id}
                        card_tag={card.card_tag}
                        brand_slug={card.brand_slug.brand_slug}
                      />
                    )
                  )}
                </div>
              </section>
            )}

            <Link href={'/descuentos/todos'}>
              <button className={`${styles.view_all_btn} btn button--red`}>
                Ver todos
              </button>
            </Link>
          </main>
          <FooterWithoutSignature />
          <FooterSignature />
        </div>
      </div>
    </>
  );
}

export async function getStaticProps() {
  const response = await axiosFetcher({
    url: endPoints.discounts.index,
    method: 'get',
    extraHeaders: {
      needed_info: 'home_data',
    },
  });

  if (response.error) {
    console.log(`Error at fetching data: ${response.error} `);
    return {
      notFound: true,
    };
  }

  return {
    props: {
      home_data: response?.body || null,
    },
    revalidate: 60 * 60 * 24 * 2, //2 days
  };
}
