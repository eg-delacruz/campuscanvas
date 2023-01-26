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
import useAxios from '@hooks/useAxios';

//Endpoints
import endPoints from '@services/api/index';

const VerifDiscountDisplayer = () => {
  //Securing route only for verified students
  const { verifyingSession } = useSecureUnverifRouteOnMount();

  const { fetchData, cancel } = useAxios();

  //States
  const [discount, setDiscount] = useState({});
  const [verifyingIfAffiliateLinkDiscount, setVerifyingIfAffiliateDiscount] =
    useState(true);
  const [state, setState] = useState({
    discount: {},
    loading: true,
    error: null,
  });

  console.log(state);

  //Get discount id
  const router = useRouter();

  //When modigying this useEffect, also do it in the one of /ofertas/[id].jsx
  useEffect(() => {
    //Await until the route is ready to get the discount_id
    if (!router.isReady) return;
    const id = router.query.id;
    //Find the discount in the DISCOUNTS array that matches the id
    //const DISCOUNT = DISCOUNTS.find((discount) => {
    //return discount.discount_id === id;
    //});

    // if (!DISCOUNT) {
    //router.push('/404');
    //return;
    //  }

    // setDiscount(DISCOUNT);

    const getDiscount = async () => {
      const response = await fetchData(
        endPoints.discounts.getDiscountById(id),
        'get'
      );

      if (response.error) {
        //Redirect if discount doesn´t exist
        if (response.error === 'Descuento no encontrado') {
          router.push('/404');
          return;
        }
        setState({
          ...state,
          error: response.error,
          loading: false,
        });
        return;
      }

      setState({
        ...state,
        discount: response.body,
        loading: false,
        error: null,
      });
    };

    getDiscount();
  }, [router?.isReady]);

  //Redirect to /descuentos/id, since that component verifyes is user is verifyed to send to vendor's web or to registration
  //TODO: uncomment this and make it work with fetched discount data
  // useEffect(() => {
  //   if (discount.type === 'affiliate_link') {
  //     router.push(`/descuentos/${id}`);
  //   }
  //   setVerifyingIfAffiliateDiscount(false);
  // }, [discount]);

  //TODO: check if loading state actually needed (I think not)
  if (verifyingSession || verifyingIfAffiliateLinkDiscount || state.loading) {
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
      // tabTitle={discount?.SEO_meta_title}
      //  metaName={discount?.SEO_meta_title}
      //  description={discount?.description}
      />
      <Layout>
        {/* {discount && Object.keys(discount).length > 0 && (
          <DiscountTemplate discount={discount}>
            <DisplayDiscountSnippet discount={discount} />
          </DiscountTemplate>
        )} */}
      </Layout>
    </>
  );
};

export default VerifDiscountDisplayer;
