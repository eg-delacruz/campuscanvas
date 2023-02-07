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

const belleza = ({ cards }) => {
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

      <DisplayCardsByCategoryTemplate cards={cards} />

      <Footer />
    </>
  );
};

export default belleza;

export async function getStaticProps() {
  const response = await axiosFetcher({
    url: endPoints.discounts.getCards,
    method: 'get',
    extraHeaders: { required_cards: 'beauty' },
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
