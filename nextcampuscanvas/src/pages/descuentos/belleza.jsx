import { useEffect, useState } from 'react';

//Components
import SEOHeader from '@components/GeneralUseComponents/SEO_Header/SEOHeader';
import Header from '@components/GeneralUseComponents/Header/Header';
import Footer from '@components/GeneralUseComponents/Footer/Footer';
import ButtonUp from '@components/GeneralUseComponents/ButtonUp/ButtonUp';
import DisplayCardsByCategoryTemplate from '@components/UsedInSpecificRoutes/Descuentos/DisplayCardsByCategoryTemplate/DisplayCardsByCategoryTemplate';

//Endpoints
import endPoints from '@services/api';

//Hooks
import useAxios from '@hooks/useAxios';

const belleza = () => {
  const { fetchData, cancel } = useAxios();

  //States
  const [state, setState] = useState({
    cards: [],
    loading: true,
    error: null,
  });

  if (state.error) {
    //Leave this console.error here
    console.error(state.error);
  }

  useEffect(() => {
    const getCards = async () => {
      setState({ ...state, loading: true });

      const response = await fetchData(
        endPoints.discounts.getCards,
        'get',
        null,
        { required_cards: 'beauty' }
      );

      if (response.error) {
        setState({ ...state, error: response.error, loading: false });
        return;
      }
      setState({
        ...state,
        cards: response.body,
        loading: false,
        error: null,
      });
    };
    if (state.cards.length === 0) {
      getCards();
    }
  }, []);
  return (
    <>
      <SEOHeader
        tabTitle={'Descuentos de belleza'}
        metaName={'Descuentos de belleza'}
        description={
          'Explora todos nuestros descuentos de belleza para estudiantes españoles'
        }
      />
      <ButtonUp />

      <div className={`header_wrapper`}>
        <Header />
      </div>

      <DisplayCardsByCategoryTemplate state={state} />

      <Footer />
    </>
  );
};

export default belleza;
