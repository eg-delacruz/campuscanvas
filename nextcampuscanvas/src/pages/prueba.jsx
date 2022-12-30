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

import white_background_svg from '@assets/PagesImages/Prueba/white_svg_background.svg';

//Components
import Layout from '@components/GeneralUseComponents/Layout/Layout';
import ButtonUp from '@components/GeneralUseComponents/ButtonUp/ButtonUp';
import SEOHeader from '@components/GeneralUseComponents/SEO_Header/SEOHeader';
import OfferCard from '@components/GeneralUseComponents/OfferCard/OfferCard';

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
        metaName={'Campus Canvas descuentos estudiantes España'}
        description={
          'Descuentos exclusivos para estudiantes universitarios en España'
        }
      />

      <Layout>
        <ButtonUp />

        <div className={`${styles.container}`}>
          <section className={`${styles.slider} container`}>
            <h2>Slider placeholder</h2>
          </section>

          {/* /////////////////////////
            //       Discounts        //
            ///////////////////////// */}
          {/* TODO: check other pages to decide which discount to show in main. Eg.: Newest discounts or Discounts that perform good or represent a good revenue for me or the ones that I find more interesting. */}
          {/* TODO: define how many discounts to show as a maximum in main */}

          {/* TODO: Slider must get info either SSR or from database in client */}
          {/* TODO: at 767, autoslide horizontally */}
          {/* TODO: When getting array with offers, get 9 elements. IF Window width is greater than 1100px, eliminate last item to have 9 an make array pretty */}

          <section className={`${styles.main_discounts} container`}>
            <div className={styles.main_discounts_grid}>
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
        </div>
      </Layout>
    </>
  );
}
