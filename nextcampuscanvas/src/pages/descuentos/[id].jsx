import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

//Styles
import styles from '@styles/pagestyles/descuentos/DiscountsDisplayer.module.scss';

//Components
import Layout from '@components/GeneralUseComponents/Layout/Layout';
import SEOHeader from '@components/GeneralUseComponents/SEO_Header/SEOHeader';
import DiscountTemplate from '@components/UsedInSpecificRoutes/Descuentos/DiscountTemplate/DiscountTemplate';
import DiscountDisplayerBtn from '@components/UsedInSpecificRoutes/Descuentos/DiscountDisplayerBtn/DiscountDisplayerBtn';
import Loader from '@components/GeneralUseComponents/Loader/Loader';

//Databases
import { DISCOUNTS } from '@databases/discounts/discountsInfoDatabase.js';

const Discount = () => {
  const [discount, setDiscount] = useState({});
  const [loading, setLoading] = useState(true);
  //Get discount id
  const router = useRouter();

  //When modigying this useEffect, also do it in the one of /student/ofertas/[id].jsx
  useEffect(() => {
    //Await until the route is ready to get the discount_id
    if (!router.isReady) return;
    const id = Number(router.query.id);
    //Find the discount in the DISCOUNTS array that matches the id
    const DISCOUNT = DISCOUNTS.find((discount) => {
      return discount.discount_id === id;
    });

    if (!DISCOUNT) {
      router.push('/404');
      return;
    }

    setDiscount(DISCOUNT);
    setLoading(false);
  }, [router?.isReady]);

  if (loading) {
    return (
      <Layout>
        <div className={styles.loader_container}>
          <Loader />
        </div>
      </Layout>
    );
  }

  return (
    <>
      <SEOHeader
        tabTitle={discount?.SEO_meta_title}
        metaName={discount?.SEO_meta_title}
        description={discount?.description}
      />
      <Layout>
        {discount && Object.keys(discount).length > 0 && (
          <DiscountTemplate discount={discount}>
            <DiscountDisplayerBtn discount={discount} />
          </DiscountTemplate>
        )}
      </Layout>
    </>
  );
};

export default Discount;
