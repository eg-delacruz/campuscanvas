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

const viajar = ({ cards }) => {
  return (
    <>
      <SEOHeader
        tabTitle={'Descuentos para viajar'}
        metaName={'Descuentos para viajar'}
        description={
          'Explora todos nuestros descuentos de viajes para estudiantes españoles'
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

export default viajar;

export async function getStaticProps() {
  const response = await axiosFetcher({
    url: endPoints.discounts.getCards,
    method: 'get',
    extraHeaders: { required_cards: 'travel' },
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
