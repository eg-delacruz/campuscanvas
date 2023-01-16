import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Link from 'next/link';

//Styles
import styles from '@pagestyles/Index.module.scss';

//Databases
import { DISCOUNT_CARDS } from '@databases/discounts/discountCardsDatabase.js';

//Components
import Header from '@components/GeneralUseComponents/Header/Header';
import Footer from '@components/GeneralUseComponents/Footer/Footer';
import SEOHeader from '@components/GeneralUseComponents/SEO_Header/SEOHeader';
import DiscountCard from '@components/GeneralUseComponents/DiscountCard/DiscountCard';
import HomeSlider from '@components/UsedInSpecificRoutes/Home/HomeSlider/HomeSlider';

//Session
import { useSession } from 'next-auth/react';

//CLARIFICAIONS:
//1. Don´t use the button up component because it does not work with the parallax background effect, since the window.scrollY does not work, because of the scroll of the parallax container.
export default function Home() {
  //Session
  const { data: session, status } = useSession();

  const router = useRouter();

  useEffect(() => {
    if (
      session?.token.role === 'super_admin' ||
      session?.token.role === 'admin'
    ) {
      router.push('/admin');
    }
  }, [session]);

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
            <HomeSlider />

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
                {DISCOUNT_CARDS.map((card) => (
                  <DiscountCard
                    key={card.discount_id}
                    banner={card.banner}
                    brand_name={card.brand_name}
                    brand_logo={card.brand_logo}
                    title={card.title}
                    discount_id={card.discount_id}
                  />
                ))}
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
                {DISCOUNT_CARDS.map((card) => (
                  <DiscountCard
                    key={card.discount_id}
                    banner={card.banner}
                    brand_name={card.brand_name}
                    brand_logo={card.brand_logo}
                    title={card.title}
                    discount_id={card.discount_id}
                  />
                ))}
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
                {DISCOUNT_CARDS.map((card) => (
                  <DiscountCard
                    key={card.discount_id}
                    banner={card.banner}
                    brand_name={card.brand_name}
                    brand_logo={card.brand_logo}
                    title={card.title}
                    discount_id={card.discount_id}
                  />
                ))}
                {DISCOUNT_CARDS.map((card) => (
                  <DiscountCard
                    key={card.discount_id}
                    banner={card.banner}
                    brand_name={card.brand_name}
                    brand_logo={card.brand_logo}
                    title={card.title}
                    discount_id={card.discount_id}
                  />
                ))}
                {DISCOUNT_CARDS.map((card) => (
                  <DiscountCard
                    key={card.discount_id}
                    banner={card.banner}
                    brand_name={card.brand_name}
                    brand_logo={card.brand_logo}
                    title={card.title}
                    discount_id={card.discount_id}
                  />
                ))}
              </div>
            </section>

            <Link href={'/ofertas/todas'}>
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
