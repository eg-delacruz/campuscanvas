//Styles
import styles from '@styles/pagestyles/descuentos/Marcas.module.scss';

//Components
import SEOHeader from '@components/GeneralUseComponents/SEO_Header/SEOHeader';
import Layout from '@components/GeneralUseComponents/Layout/Layout';
import ButtonUp from '@components/GeneralUseComponents/ButtonUp/ButtonUp';

//Endpoints
import endPoints from '@services/api';

//Services
import axiosFetcher from '@services/axiosFetcher';

const Marcas = ({ brands }) => {
  return (
    <>
      <SEOHeader
        tabTitle={`Todas las marcas de descuentos`}
        metaName={`Todas las marcas de descuentos`}
        description={
          'Explora todas las marcas de descuentos que tenemos para ti'
        }
      />

      <ButtonUp />
      <Layout>
        <div className={`${styles.container} container`}>
          <h1>Marcas</h1>
        </div>
      </Layout>
    </>
  );
};

export default Marcas;

// export async function getStaticProps() {
//   const response = await axiosFetcher({
//     url: endPoints.discounts.brands,
//     method: 'get',
//     extraHeaders: { required_info: 'all_brands_clean_for_client' },
//   });

//   if (response.error) {
//     console.log(`Error at fetching data: ${response.error} `);
//     return {
//       notFound: true,
//     };
//   }

//   return {
//     props: {
//       brands: response?.body || null,
//     },
//   };
// }
