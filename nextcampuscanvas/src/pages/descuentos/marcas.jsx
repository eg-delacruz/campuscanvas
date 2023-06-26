import { useState, useMemo } from 'react';
import Image from 'next/image';

//Styles
import styles from '@styles/pagestyles/descuentos/Marcas.module.scss';

//Components
import SEOHeader from '@components/GeneralUseComponents/SEO_Header/SEOHeader';
import Layout from '@components/GeneralUseComponents/Layout/Layout';
import ButtonUp from '@components/GeneralUseComponents/ButtonUp/ButtonUp';
import SimpleBrandCard from '@components/GeneralUseComponents/SimpleBrandCard/SimpleBrandCard';

//Assets
import sad_face_img from '@assets/GeneralUse/sad_face_img.svg';

//Hooks
import useDebouncedSearchValue from '@hooks/useDebouncedSearchValue';
import { useInputValue } from '../../hooks/useInputValue';

//Endpoints
import endPoints from '@services/api';

//Services
import axiosFetcher from '@services/axiosFetcher';

const Marcas = ({ brands }) => {
  //States
  const [filteredBrands, setFilteredBrands] = useState(brands);
  //Controlling inputs
  const SEARCH_VALUE = useInputValue('');

  //Set debounced search value
  const DEBOUNCED_SEARCH_VALUE = useDebouncedSearchValue(
    SEARCH_VALUE.value,
    500
  );

  //Filtering brands
  useMemo(() => {
    const results = brands?.filter((brand) =>
      brand.brand_name
        .toLowerCase()
        .includes(DEBOUNCED_SEARCH_VALUE.toLowerCase())
    );
    setFilteredBrands(results);
  }, [DEBOUNCED_SEARCH_VALUE]);

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
          <p className={styles.search_bar_clarification}>
            Busca entre todas nuestras marcas
          </p>
          <div className={styles.search_bar_container}>
            <input
              type='text'
              placeholder='Busca tu marca...'
              className={styles.search_bar}
              name='search'
              id='search'
              value={SEARCH_VALUE.value}
              onChange={SEARCH_VALUE.onChange}
              autoFocus
            />
          </div>

          {filteredBrands?.length === 0 ? (
            <div className={styles.no_results_container}>
              <h4>No hemos encontrado la marca que buscas</h4>
              <Image src={sad_face_img} />
            </div>
          ) : (
            <section className={styles.brands_grid}>
              {filteredBrands?.map((brand) => (
                <SimpleBrandCard
                  key={brand._id}
                  brand_name={brand.brand_name}
                  brand_logo={brand.brand_logo.URL}
                  brand_slug={brand.brand_slug}
                />
              ))}
            </section>
          )}
        </div>
      </Layout>
    </>
  );
};

export default Marcas;

export async function getStaticProps() {
  const response = await axiosFetcher({
    url: endPoints.discounts.brands,
    method: 'get',
    extraHeaders: { required_info: 'all_brands_clean_for_client' },
  });

  if (response.error) {
    console.log(`Error at fetching data: ${response.error} `);
    return {
      notFound: true,
    };
  }

  return {
    props: {
      brands: response?.body || null,
    },
  };
}
