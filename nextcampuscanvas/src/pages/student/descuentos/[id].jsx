import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

//Styles
import styles from '@styles/pagestyles/student/VerifDiscountDisplayer.module.scss';

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
  const [verifyingIfAffiliateLinkDiscount, setVerifyingIfAffiliateDiscount] =
    useState(true);
  const [state, setState] = useState({
    discount: {},
    loading: true,
    error: null,
  });

  //Get discount id
  const router = useRouter();
  const id = router.query.id;

  //When modigying this useEffect, also do it in the one of /ofertas/[id].jsx
  useEffect(() => {
    //Await until the route is ready to get the discount_id
    if (!router.isReady) return;

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

  //Redirect to /descuentos/id, since that route verifyes if user is verifyed to send to vendor's web or to registration
  useEffect(() => {
    if (state.discount.type === 'affiliate_link_only') {
      router.push(`/descuentos/${id}`);
    }
    setVerifyingIfAffiliateDiscount(false);
  }, [state.discount]);

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
        tabTitle={state.discount.SEO_meta_title}
        metaName={state.discount.SEO_meta_title}
        description={state.discount.description}
      />
      <Layout>
        {Object.keys(state.discount).length > 0 && (
          <DiscountTemplate discount={state.discount}>
            <DisplayDiscountSnippet discount={state.discount} />
          </DiscountTemplate>
        )}
      </Layout>
    </>
  );
};

export default VerifDiscountDisplayer;
