import { useEffect, useState } from 'react';

//Styles
import styles from '@styles/pagestyles/descuentos/Todos.module.scss';

//Components
import SEOHeader from '@components/GeneralUseComponents/SEO_Header/SEOHeader';
import Header from '@components/GeneralUseComponents/Header/Header';
import DiscountsNavbar from '@components/UsedInSpecificRoutes/Descuentos/DiscountsNavbar/DiscountsNavbar';
import Footer from '@components/GeneralUseComponents/Footer/Footer';
import DiscountCard from '@components/GeneralUseComponents/DiscountCard/DiscountCard';
import ButtonUp from '@components/GeneralUseComponents/ButtonUp/ButtonUp';
import Loader from '@components/GeneralUseComponents/Loader/Loader';

//Databases
import { DISCOUNT_CARDS } from '@databases/discounts/discountCardsDatabase.js';

//Hooks
import useAxios from '@hooks/useAxios';

//Endpoints
import endPoints from '@services/api';

//TODO: Apply load on scroll if needed
//TODO: SSG page
const todos = () => {
  const { fetchData, cancel } = useAxios();

  //States
  const [state, setState] = useState({
    discounts: [],
    loading: false,
    error: null,
  });

  console.log(state);
  if (state.error) {
    //Leave this console.error here
    console.error(state.error);
  }

  useEffect(() => {
    const getAllAvailableDiscounts = async () => {
      setState({ ...state, loading: true });

      const response = await fetchData(
        endPoints.discounts.getCards,
        'get',
        null,
        { required_cards: 'all_available' }
      );

      if (response.error) {
        setState({ ...state, error: response.error, loading: false });
        return;
      }
      setState({
        ...state,
        discounts: response.body,
        loading: false,
        error: null,
      });
    };
    if (state.discounts.length === 0) {
      getAllAvailableDiscounts();
    }
  }, [state.discounts]);

  return (
    <>
      <SEOHeader
        tabTitle={'Todos nuestros descuentos'}
        metaName={'Todos nuestros descuentos'}
        description={
          'Explora todos nuestros descuentos a estudiantes españoles'
        }
      />

      <ButtonUp />

      <div className={styles.page_wrapper}>
        <div className={`${styles.header_wrapper} header_wrapper`}>
          <Header />
        </div>
        <div className={`${styles.container} container`}>
          <DiscountsNavbar />

          {state.loading ? (
            <div className={styles.loaderContainer}>
              <Loader />
            </div>
          ) : (
            <section className={styles.grid_container}>
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
            </section>
          )}
        </div>
        <Footer />
      </div>
    </>
  );
};

export default todos;
