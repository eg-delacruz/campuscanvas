//Components
import Layout from '@components/GeneralUseComponents/Layout/Layout';
import SEOHeader from '@components/GeneralUseComponents/SEO_Header/SEOHeader';
import PublicBrandPageTemplate from '@components/UsedInSpecificRoutes/Descuentos/PublicBrandPageTemplate/PublicBrandPageTemplate';

//Endpoints
import endPoints from '@services/api/index';

//Services
import axiosFetcher from '@services/axiosFetcher';

const index = ({ brand }) => {
  return (
    <>
      <SEOHeader
        tabTitle={`Descuentos ${brand.brand_name}`}
        metaName={`Descuentos ${brand.brand_name}`}
        description={brand.brand_description}
      />
      <Layout>
        <PublicBrandPageTemplate brand={brand} />
      </Layout>
    </>
  );
};

export default index;

//TODO: Check if the getStaicPaths and getStaticProps are working correctly in production
//Pre-render these paths when building the app and fallback: 'blocking' to build new added discounts on demand in production.
export async function getStaticPaths() {
  const response = await axiosFetcher({
    url: endPoints.discounts.brands,
    method: 'get',
    extraHeaders: { required_info: 'all_brands' },
  });

  const paths = response.body.map((brand) => ({
    params: {
      brand_slug: brand.brand_slug,
    },
  }));

  //console.log(paths);

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
  const brand_slug = params?.brand_slug;

  //Necesitamos que sea un string, pues puede venir un array o undefined, dependiendo de cuántos parámetros ponemos en el slug separados por un /, o si directamente no ponemos nada. (Creo)
  if (typeof brand_slug !== 'string') {
    return {
      notFound: true,
    };
  }

  const response = await axiosFetcher({
    url: endPoints.discounts.getBrandBySlug(brand_slug),
    method: 'get',
    extraHeaders: { required_info: 'single_brand_by_slug_clean_for_client' },
  });

  if (response.error || response.body.status === 'unavailable') {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      //Should be returned like this to avoid errors on next js production build
      brand: response?.body || null,
    },
  };
}
