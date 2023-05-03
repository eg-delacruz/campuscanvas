import { useState, useMemo } from 'react';
import Link from 'next/link';

//styles
import styles from '@styles/pagestyles/admin/descuentos/gestionarMarcas.module.scss';

//React query
import { useQuery } from '@tanstack/react-query';
import adminKeys from '@query-key-factory/adminKeys';

//Components
import AdminHeader from '@components/UsedInSpecificRoutes/Admin/AdminHeader/AdminHeader';
import Loader from '@components/GeneralUseComponents/Loader/Loader';
import DisplayNewBrandModal from '@components/UsedInSpecificRoutes/Admin/Descuentos/Brands/DisplayNewBrandModal/DisplayNewBrandModal';

//hooks
import useSecureAdminRoute from '@hooks/useSecureAdminRoute';
import { useInputValue } from '@hooks/useInputValue';
import useDebouncedSearchValue from '@hooks/useDebouncedSearchValue';

//Services
import dateFormat from '@services/dateFormat';

//Request functions
import requestFn from '@request-functions/Admin/Discounts';

const gestionarMarcas = () => {
  const { securingRoute } = useSecureAdminRoute();

  //States
  const [showModal, setShowModal] = useState(false);
  const [filteredBrands, setFilteredBrands] = useState([]);

  //Controlling inputs
  const SEARCH_INPUT = useInputValue('');

  //React query
  const BRANDS = useQuery({
    queryKey: [adminKeys.brands.all_brands],
    queryFn: requestFn.getBrands,
    staleTime: 1000 * 60 * 60 * 24, //24 hours
    initialData: [],
    initialDataUpdatedAt: 1, //prevent initialData from being overwritten by queryFn
    onSuccess: (data) => {
      //Set brands to filtered brands state
      setFilteredBrands(data);
    },
  });

  //Debounce search input
  const debouncedSearchValue = useDebouncedSearchValue(SEARCH_INPUT.value);

  //Filter brands
  useMemo(() => {
    if (BRANDS.data === undefined) return;

    const results = BRANDS?.data.filter((brand) => {
      //If search input is empty, the filter returns all brands
      return (
        brand.brand_name
          .toLowerCase()
          .includes(debouncedSearchValue.toLowerCase()) ||
        brand.affiliate_program
          .toLowerCase()
          .includes(debouncedSearchValue.toLowerCase())
      );
    });
    setFilteredBrands(results);
  }, [debouncedSearchValue]);

  const displayNewBrandModal = () => {
    return (
      <DisplayNewBrandModal showModal={showModal} setShowModal={setShowModal} />
    );
  };

  if (securingRoute || BRANDS.isLoading || BRANDS.isFetching) {
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
          <h1>Marcas ({BRANDS.data?.length})</h1>
          <button
            className='btn button--red'
            onClick={() => setShowModal(true)}
          >
            <span>+ </span>Crear marca
          </button>
        </div>

        {!BRANDS.isLoading && (
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
          {BRANDS.isLoading ? (
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
                      <th>Descuentos asociados</th>
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
                            {brand.discounts_attached}
                          </td>
                        </Link>
                        <Link
                          href={`/admin/descuentos/gestionar-marcas/editar-marca/${brand._id}`}
                        >
                          <td className={styles.column5}>
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
          {BRANDS.isError ? <p>{BRANDS.error?.message}</p> : null}
        </section>
      </div>
    </>
  );
};

export default gestionarMarcas;
