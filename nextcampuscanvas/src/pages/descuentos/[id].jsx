//Components
import Layout from '@components/GeneralUseComponents/Layout/Layout';
import SEOHeader from '@components/GeneralUseComponents/SEO_Header/SEOHeader';
import DiscountTemplate from '@components/UsedInSpecificRoutes/Descuentos/DiscountTemplate/DiscountTemplate.jsx';
import DiscountDisplayerBtn from '@components/UsedInSpecificRoutes/Descuentos/DiscountDisplayerBtn/DiscountDisplayerBtn.jsx';

//Endpoints
import endPoints from '@services/api/index';

//Services
import axiosFetcher from '@services/axiosFetcher';

const Discount = ({ discount }) => {
  return (
    <>
      <SEOHeader
        tabTitle={discount.SEO_meta_title}
        metaName={discount.SEO_meta_title}
        description={discount.description}
      />
      <Layout>
        <DiscountTemplate discount={discount}>
          <DiscountDisplayerBtn discount={discount} />
        </DiscountTemplate>
      </Layout>
    </>
  );
};

export default Discount;

//Pre-render these paths and fallback: 'blocking' to build new added discounts on demand in productios.
export async function getStaticPaths() {
  const response = await axiosFetcher({
    url: endPoints.discounts.getCards,
    method: 'get',
    extraHeaders: { required_cards: 'all_available' },
  });

  const paths = response.body.map((card) => ({
    params: {
      id: card._id,
    },
  }));

  return {
    paths,
    // true | false | blocking
    // true: Si no fue pre-renderizado en getStaticPaths, lo renderiza en el client, con lo cual podemos mostrar un estado de carga en el cliente con router.isFallback (lo cual vendría siendo como un estado de cargando)
    // false: Si no fue pre-renderizado en getStaticPaths, muestra un 404
    // blocking: Si no fue pre-renderizado en getStaticPaths, renderiza en el server
    fallback: 'blocking',
  };
}

//Pre-render the discount with the id passed in the path
export async function getStaticProps({ params }) {
  //with the optional chaining, since params could be undefined
  const id = params?.id;

  //Necesitamos que sea un string, pues puede venir un array o undefined, dependiendo de cuántos parámetros ponemos en el slug separados por un /, o si directamente no ponemos nada. (Creo)
  if (typeof id !== 'string') {
    return {
      notFound: true,
    };
  }

  const response = await axiosFetcher({
    url: endPoints.discounts.getDiscountById(id),
    method: 'get',
  });

  if (response.error) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      discount: response?.body || null,
    },
  };
}
