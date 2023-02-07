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

//Services
import axiosFetcher from '@services/axiosFetcher';

//TODO: Apply load on scroll if needed
//TODO: SSG page (therefore, fetchingData here)
const todos = ({ cards }) => {
  const { fetchData, cancel } = useAxios();

  //States
  // const [state, setState] = useState({
  //   cards: [],
  //   loading: true,
  //   error: null,
  // });

  // useEffect(() => {
  //   const getCards = async () => {
  //     setState({ ...state, loading: true });

  //     const response = await fetchData(
  //       endPoints.discounts.getCards,
  //       'get',
  //       null,
  //       { required_cards: 'all_available' }
  //     );

  //     if (response.error) {
  //       setState({ ...state, error: response.error, loading: false });
  //       return;
  //     }
  //     setState({
  //       ...state,
  //       cards: response.body,
  //       loading: false,
  //       error: null,
  //     });
  //   };
  //   if (state.cards.length === 0) {
  //     getCards();
  //   }
  // }, []);

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

      <div className={`header_wrapper`}>
        <Header />
      </div>

      <DisplayCardsByCategoryTemplate cards={cards} />

      <Footer />
    </>
  );
};

export default todos;

export async function getStaticProps() {
  const response = await axiosFetcher({
    url: endPoints.discounts.getCards,
    method: 'get',
    extraHeaders: { required_cards: 'all_available' },
  });

  if (response.error) {
    console.log(`Error at fetching data: ${response.error} `);
    return {
      notFound: true,
    };
  }

  return {
    props: {
      cards: response?.body || null,
    },
  };
}
