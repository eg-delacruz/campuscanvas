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

//Hooks
import useAxios from '@hooks/useAxios';

//Endpoints
import endPoints from '@services/api/index';

const Discount = () => {
  const { fetchData, cancel } = useAxios();
  //States
  const [state, setState] = useState({
    discount: {},
    loading: true,
    error: null,
  });
  //Get discount id
  const router = useRouter();

  if (state.error) {
    console.error(state.error);
  }

  //TODO: make this work with fetched discount data
  console.log(state);

  //When modigying this useEffect, also do it in the one of /student/ofertas/[id].jsx
  useEffect(() => {
    //Await until the route is ready to get the discount_id
    if (!router.isReady) return;
    const id = router.query.id;

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

  if (state.loading) {
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
      // metaName={discount?.SEO_meta_title}
      // description={discount?.description}
      />
      <Layout>
        {/* {discount && Object.keys(discount).length > 0 && (
          <DiscountTemplate discount={discount}>
            <DiscountDisplayerBtn discount={discount} />
          </DiscountTemplate>
        )} */}
        Descuento
      </Layout>
    </>
  );
};

export default Discount;
