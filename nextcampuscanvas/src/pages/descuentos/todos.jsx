//Components
import SEOHeader from '@components/GeneralUseComponents/SEO_Header/SEOHeader';
import Header from '@components/GeneralUseComponents/Header/Header';
import Footer from '@components/GeneralUseComponents/Footer/Footer';
import ButtonUp from '@components/GeneralUseComponents/ButtonUp/ButtonUp';
import DisplayCardsByCategoryTemplate from '@components/UsedInSpecificRoutes/Descuentos/DisplayCardsByCategoryTemplate/DisplayCardsByCategoryTemplate';

//Endpoints
import endPoints from '@services/api';

//Services
import axiosFetcher from '@services/axiosFetcher';

//TODO: Apply load on scroll if needed
const todos = ({ cards }) => {
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

      <DisplayCardsByCategoryTemplate cards={cards.cards} />

      <Footer />
    </>
  );
};

export default todos;

export async function getStaticProps() {
  const response = await axiosFetcher({
    url: endPoints.discounts.getCards,
    method: 'get',
    extraHeaders: { required_cards: 'all_available', page: 1, limit: 30 },
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
