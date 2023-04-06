import { useState, useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Link from 'next/link';

//styles
import styles from '@styles/pagestyles/admin/descuentos/gestionarMarcas.module.scss';

//Components
import AdminHeader from '@components/UsedInSpecificRoutes/Admin/AdminHeader/AdminHeader';
import Loader from '@components/GeneralUseComponents/Loader/Loader';
import DisplayNewBrandModal from '@components/UsedInSpecificRoutes/Admin/Descuentos/Brands/DisplayNewBrandModal/DisplayNewBrandModal';

//hooks
import useSecureAdminRoute from '@hooks/useSecureAdminRoute';
import { useInputValue } from '@hooks/useInputValue';
import useDebouncedSearchValue from '@hooks/useDebouncedSearchValue';

//Redux
import { getBrands, selectBrand } from '@redux/brandsSlice';
import { countBrands, selectCountBrands } from '@redux/brandsCountSlice';

//Services
import dateFormat from '@services/dateFormat';

const gestionarMarcas = () => {
  const { securingRoute } = useSecureAdminRoute();

  //Allows us to manipulate the appropriate slice/action
  const dispatch = useDispatch();

  //Reducers
  const brandsReducer = useSelector(selectBrand);
  const brandsCountReducer = useSelector(selectCountBrands);

  //States
  const [showModal, setShowModal] = useState(false);
  const [filteredBrands, setFilteredBrands] = useState([]);

  //Controlling inputs
  const SEARCH_INPUT = useInputValue('');

  //Get brands data
  useEffect(() => {
    const setBrands = async () => {
      if (brandsReducer.brands.length === 0) {
        dispatch(getBrands());
      }
    };
    setBrands();
  }, []);

  //Set brands to filtered brands state
  useEffect(() => {
    setFilteredBrands(brandsReducer.brands);
  }, [brandsReducer.brands]);

  //Get brands count
  useEffect(() => {
    if (!brandsCountReducer.initial_render_loaded) {
      dispatch(countBrands());
    }
  }, []);

  //Debounce search input
  const debouncedSearchValue = useDebouncedSearchValue(SEARCH_INPUT.value);

  //Filter brands
  useMemo(() => {
    const results = brandsReducer.brands.filter((brand) => {
      return (
        brand.brand_name
          .toLowerCase()
          .includes(SEARCH_INPUT.value.toLowerCase()) ||
        brand.affiliate_program
          .toLowerCase()
          .includes(SEARCH_INPUT.value.toLowerCase())
      );
    });
    setFilteredBrands(results);
  }, [debouncedSearchValue]);

  const displayNewBrandModal = () => {
    return (
      <DisplayNewBrandModal showModal={showModal} setShowModal={setShowModal} />
    );
  };

  if (securingRoute) {
    return (
      <div className={styles.loaderContainer}>
        <Loader />
      </div>
    );
  }

  return (
    <>
      {displayNewBrandModal()}
      <AdminHeader />
      <div className={`${styles.container} container`}>
        <div className={styles.title_create_brand_container}>
          <h1>Marcas ({brandsCountReducer.count})</h1>
          <button
            className='btn button--red'
            onClick={() => setShowModal(true)}
          >
            <span>+ </span>Crear marca
          </button>
        </div>

        {!brandsReducer.loading && (
          <>
            {/* /////////////////////////
             //      Search bar       //
            ///////////////////////// */}
            <div className={styles.search_bar_container}>
              <input
                type='text'
                placeholder='Buscar por marca o programa de afiliación...'
                className={styles.search_bar}
                name='search'
                id='search'
                value={SEARCH_INPUT.value}
                onChange={SEARCH_INPUT.onChange}
                autoFocus
              />
            </div>
          </>
        )}

        <section className={styles.brands}>
          {brandsReducer.loading ? (
            <Loader />
          ) : (
            <>
              {filteredBrands.length > 0 ? (
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <th className={styles.column1}></th>
                      <th>Marca</th>
                      <th>Programa de afiliación</th>
                      <th>
                        Patrocina <br /> Campus Box
                      </th>
                      <th>Actualizado</th>
                    </tr>
                  </thead>

                  <tbody>
                    {filteredBrands.map((brand) => (
                      <tr key={brand._id}>
                        <Link
                          href={`/admin/descuentos/gestionar-marcas/editar-marca/${brand._id}`}
                        >
                          <td className={styles.column1}>
                            <img
                              className={styles.logo}
                              src={brand.brand_logo.URL}
                              alt={brand.brand_name}
                            />
                          </td>
                        </Link>
                        <Link
                          href={`/admin/descuentos/gestionar-marcas/editar-marca/${brand._id}`}
                        >
                          <td className={styles.column2}>
                            <h5>{brand.brand_name}</h5>
                          </td>
                        </Link>
                        <Link
                          href={`/admin/descuentos/gestionar-marcas/editar-marca/${brand._id}`}
                        >
                          <td className={styles.column3}>
                            {brand.affiliate_program}
                          </td>
                        </Link>
                        <Link
                          href={`/admin/descuentos/gestionar-marcas/editar-marca/${brand._id}`}
                        >
                          <td className={styles.column3}>
                            {brand.sponsors_box ? (
                              <span className={styles.check_icon_container}>
                                ✅
                              </span>
                            ) : (
                              <span className={styles.x_icon_container}>x</span>
                            )}
                          </td>
                        </Link>
                        <Link
                          href={`/admin/descuentos/gestionar-marcas/editar-marca/${brand._id}`}
                        >
                          <td className={styles.column4}>
                            {dateFormat.SlashDate(new Date(brand.updated_at))}
                          </td>
                        </Link>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p>No hay marcas</p>
              )}
            </>
          )}
          {brandsReducer.error ? <p>{brandsReducer.error}</p> : null}
        </section>
      </div>
    </>
  );
};

export default gestionarMarcas;
