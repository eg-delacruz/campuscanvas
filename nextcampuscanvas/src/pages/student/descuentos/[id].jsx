import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

//Styles
import styles from '@styles/pagestyles/student/VerifDiscountDisplayer.module.scss';

//Databases
import { DISCOUNTS } from '@databases/discounts/discountsInfoDatabase.js';

//Components
import Layout from '@components/GeneralUseComponents/Layout/Layout';
import Loader from '@components/GeneralUseComponents/Loader/Loader';
import SEOHeader from '@components/GeneralUseComponents/SEO_Header/SEOHeader';
import DiscountTemplate from '@components/UsedInSpecificRoutes/Descuentos/DiscountTemplate/DiscountTemplate';
import DisplayDiscountSnippet from '@components/UsedInSpecificRoutes/Descuentos/DisplayDiscountSnippet/DisplayDiscountSnippet';

//Hooks
import useSecureUnverifRouteOnMount from '@hooks/useSecureUnverifRouteOnMount';

const VerifDiscountDisplayer = () => {
  //Securing route only for verified students
  const { verifyingSession } = useSecureUnverifRouteOnMount();

  const [discount, setDiscount] = useState({});
  const [verifyingIfAffiliateLinkDiscount, setVerifyingIfAffiliateDiscount] =
    useState(true);

  //Get discount id
  const router = useRouter();

  const id = Number(router.query.id);

  //When modigying this useEffect, also do it in the one of /ofertas/[id].jsx
  useEffect(() => {
    //Await until the route is ready to get the discount_id
    if (!router.isReady) return;
    //Find the discount in the DISCOUNTS array that matches the id
    const DISCOUNT = DISCOUNTS.find((discount) => {
      return discount.discount_id === id;
    });

    if (!DISCOUNT) {
      router.push('/404');
      return;
    }

    setDiscount(DISCOUNT);
  }, [router?.isReady]);

  useEffect(() => {
    if (discount.type === 'affiliate_link') {
      router.push(`/descuentos/${id}`);
    }
    setVerifyingIfAffiliateDiscount(false);
  }, [discount]);

  if (verifyingSession || verifyingIfAffiliateLinkDiscount) {
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
            <DisplayDiscountSnippet discount={discount} />
          </DiscountTemplate>
        )}
      </Layout>
    </>
  );
};

export default VerifDiscountDisplayer;
