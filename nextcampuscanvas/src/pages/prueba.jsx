import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Link from 'next/link';

//Styles
import styles from '@pagestyles/Prueba.module.scss';

//Assets
import banner1 from '@assets/PagesImages/Prueba/banner1.jpg';
import banner2 from '@assets/PagesImages/Prueba/banner2.jpg';
import banner3 from '@assets/PagesImages/Prueba/banner3.jpg';
import banner4 from '@assets/PagesImages/Prueba/banner4.jpg';

import brand_logo_1 from '@assets/PagesImages/Prueba/brand1.svg';
import brand_logo_2 from '@assets/PagesImages/Prueba/brand2.svg';
import brand_logo_3 from '@assets/PagesImages/Prueba/brand3.svg';
import brand_logo_4 from '@assets/PagesImages/Prueba/brand4.svg';

//Components
import Layout from '@components/GeneralUseComponents/Layout/Layout';
import ButtonUp from '@components/GeneralUseComponents/ButtonUp/ButtonUp';
import SEOHeader from '@components/GeneralUseComponents/SEO_Header/SEOHeader';
import OfferCard from '@components/GeneralUseComponents/OfferCard/OfferCard';
import HomeSlider from '@components/UsedInSpecificRoutes/Home/HomeSlider/HomeSlider';

//Session
import { useSession } from 'next-auth/react';

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
        tabTitle={'Home'}
        metaName={'Descuentos a estudiantes en España'}
        description={
          'Descuentos exclusivos para estudiantes universitarios en España'
        }
      />

      <Layout>
        <ButtonUp />

        <div className={`${styles.container}`}>
          <HomeSlider />

          {/* /////////////////////////
            //       Discounts        //
            ///////////////////////// */}

          <section className={`${styles.suggested_discounts} container`}>
            {/* /////////////////////////
            //       Sugeridos        //
            ///////////////////////// */}
            <h2>Sugeridos para ti</h2>
            <div className={styles.suggested_discounts_grid}>
              <OfferCard
                bannerImg={banner1.src}
                brandName={'Grover'}
                brandLogoSvg={brand_logo_1.src}
                description={'5% de descuento en Grover'}
                offerID={31512335}
              />
              <OfferCard
                bannerImg={banner2.src}
                brandName={'Adidas'}
                brandLogoSvg={brand_logo_2.src}
                description={'30% descuento en tiendas físicas Adidas'}
                offerID={31512335}
              />
              <OfferCard
                bannerImg={banner3.src}
                brandName={'ASOS'}
                brandLogoSvg={brand_logo_3.src}
                description={'15% descuento en ASOS'}
                offerID={31512335}
              />
              <OfferCard
                bannerImg={banner4.src}
                brandName={'Efeee'}
                brandLogoSvg={brand_logo_4.src}
                description={'Rebajas de hasta un 60% + 10% descuento'}
                offerID={31512335}
              />
            </div>
          </section>

          <section className={`${styles.novedades_discounts} container`}>
            {/* /////////////////////////
            //       Novedades        //
            ///////////////////////// */}
            <h2>Novedades</h2>
            <div className={styles.novedades_discounts_grid}>
              <OfferCard
                bannerImg={banner1.src}
                brandName={'Grover'}
                brandLogoSvg={brand_logo_1.src}
                description={'5% de descuento en Grover'}
                offerID={31512335}
              />
              <OfferCard
                bannerImg={banner2.src}
                brandName={'Adidas'}
                brandLogoSvg={brand_logo_2.src}
                description={'30% descuento en tiendas físicas Adidas'}
                offerID={31512335}
              />
              <OfferCard
                bannerImg={banner3.src}
                brandName={'ASOS'}
                brandLogoSvg={brand_logo_3.src}
                description={'15% descuento en ASOS'}
                offerID={31512335}
              />
              <OfferCard
                bannerImg={banner4.src}
                brandName={'Efeee'}
                brandLogoSvg={brand_logo_4.src}
                description={'Rebajas de hasta un 60% + 10% descuento'}
                offerID={31512335}
              />
            </div>
          </section>

          <section className={`${styles.more_discounts} container`}>
            {/* /////////////////////////
            //    Más descuentos     //
            ///////////////////////// */}
            <h2>Más descuentos para estudiantes</h2>
            <div className={styles.more_discounts_grid}>
              <OfferCard
                bannerImg={banner1.src}
                brandName={'Grover'}
                brandLogoSvg={brand_logo_1.src}
                description={'5% de descuento en Grover'}
                offerID={31512335}
              />
              <OfferCard
                bannerImg={banner2.src}
                brandName={'Adidas'}
                brandLogoSvg={brand_logo_2.src}
                description={'30% descuento en tiendas físicas Adidas'}
                offerID={31512335}
              />
              <OfferCard
                bannerImg={banner3.src}
                brandName={'ASOS'}
                brandLogoSvg={brand_logo_3.src}
                description={'15% descuento en ASOS'}
                offerID={31512335}
              />
              <OfferCard
                bannerImg={banner4.src}
                brandName={'Efeee'}
                brandLogoSvg={brand_logo_4.src}
                description={'Rebajas de hasta un 60% + 10% descuento'}
                offerID={31512335}
              />
              <OfferCard
                bannerImg={banner1.src}
                brandName={'Grover'}
                brandLogoSvg={brand_logo_1.src}
                description={'5% de descuento en Grover'}
                offerID={31512335}
              />
              <OfferCard
                bannerImg={banner2.src}
                brandName={'Adidas'}
                brandLogoSvg={brand_logo_2.src}
                description={'30% descuento en tiendas físicas Adidas'}
                offerID={31512335}
              />
              <OfferCard
                bannerImg={banner3.src}
                brandName={'ASOS'}
                brandLogoSvg={brand_logo_3.src}
                description={'15% descuento en ASOS'}
                offerID={31512335}
              />
              <OfferCard
                bannerImg={banner4.src}
                brandName={'Efeee'}
                brandLogoSvg={brand_logo_4.src}
                description={'Rebajas de hasta un 60% + 10% descuento'}
                offerID={31512335}
              />
              <OfferCard
                bannerImg={banner1.src}
                brandName={'Grover'}
                brandLogoSvg={brand_logo_1.src}
                description={'5% de descuento en Grover'}
                offerID={31512335}
              />
              <OfferCard
                bannerImg={banner2.src}
                brandName={'Adidas'}
                brandLogoSvg={brand_logo_2.src}
                description={'30% descuento en tiendas físicas Adidas'}
                offerID={31512335}
              />
              <OfferCard
                bannerImg={banner3.src}
                brandName={'ASOS'}
                brandLogoSvg={brand_logo_3.src}
                description={'15% descuento en ASOS'}
                offerID={31512335}
              />
              <OfferCard
                bannerImg={banner4.src}
                brandName={'Efeee'}
                brandLogoSvg={brand_logo_4.src}
                description={'Rebajas de hasta un 60% + 10% descuento'}
                offerID={31512335}
              />
            </div>
          </section>

          <button className={`${styles.view_all_btn} btn button--red`}>
            Ver todos
          </button>
        </div>
      </Layout>
    </>
  );
}
