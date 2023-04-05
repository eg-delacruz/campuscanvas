import Link from 'next/link';
import { useEffect, useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';

//React query
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import adminKeys from '@query-key-factory/adminKeys';

//styles
import styles from '@styles/pagestyles/admin/descuentos/gestionarDescuentos.module.scss';

//hooks
import useSecureAdminRoute from '@hooks/useSecureAdminRoute';
import { useInputValue } from '@hooks/useInputValue';
import useDebouncedSearchValue from '@hooks/useDebouncedSearchValue';

//Components
import Loader from '@components/GeneralUseComponents/Loader/Loader';
import AdminHeader from '@components/UsedInSpecificRoutes/Admin/AdminHeader/AdminHeader';
import AdminDiscountsTable from '@components/UsedInSpecificRoutes/Admin/Descuentos/Discounts/AdminDiscountsTable/AdminDiscountsTable';
import Pagination from '@components/GeneralUseComponents/Pagination/Pagination';

//Redux
import { getDiscounts, selectDiscount } from '@redux/discountsSlice';
import {
  countDiscounts,
  selectCountDiscounts,
} from '@redux/discountsCountSlice';

//Data requests
import adminFunctions from '@request-functions/Admin';

const index = () => {
  const { securingRoute } = useSecureAdminRoute();

  //React query
  const queryClient = useQueryClient();

  const ADMIN_SETTINGS = useQuery({
    queryKey: [adminKeys.admin_settings],
    queryFn: adminFunctions.getAdminSettings,
    staleTime: Infinity,
  });

  const UPDATE_ADMIN_SETTINGS = useMutation({
    mutationFn: (data) => adminFunctions.updateAdminSettings(data),
    //Update the cached settings- The data containes the settings from the DB, so we can just update the cache with the new data without having to do a new request
    onSuccess: (data) => {
      queryClient.setQueryData([adminKeys.admin_settings], (oldData) => {
        return {
          ...oldData,
          settings: {
            ...oldData.settings,
            entries_per_admin_discouns_table_page:
              data.settings.entries_per_admin_discouns_table_page,
          },
        };
      });
    },
  });

  //Allows us to manipulate the appropriate slice/action
  const dispatch = useDispatch();

  //Reducers
  const discountsReducer = useSelector(selectDiscount);
  const discountsCountReducer = useSelector(selectCountDiscounts);

  //Controlling inputs
  const SEARCH_INPUT = useInputValue('');

  //States
  const [filteredDiscounts, setFilteredDiscounts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  //Get discounts
  useEffect(() => {
    const setDiscounts = async () => {
      if (discountsReducer.discounts.length === 0) {
        dispatch(getDiscounts());
      }
    };
    setDiscounts();
  }, []);

  //Set discounts to filtered discounts state
  useEffect(() => {
    setFilteredDiscounts(discountsReducer.discounts);
  }, [discountsReducer.discounts]);

  //Get discounts count
  useEffect(() => {
    if (!discountsCountReducer.initial_render_loaded) {
      dispatch(countDiscounts());
    }
  }, []);

  //Set debounced search value
  const debouncedSearchValue = useDebouncedSearchValue(SEARCH_INPUT.value);

  //Filter discounts
  useMemo(() => {
    //Reset page to 1 when filtering because if we are in page 2 and we filter, we will get an empty page
    setCurrentPage(1);
    const results = discountsReducer.discounts.filter((discount) => {
      return (
        discount.SEO_meta_title.toLowerCase().includes(
          SEARCH_INPUT.value.toLowerCase()
        ) ||
        discount.brand.brand_name
          .toLowerCase()
          .includes(SEARCH_INPUT.value.toLowerCase()) ||
        discount.category
          .toLowerCase()
          .includes(SEARCH_INPUT.value.toLowerCase()) ||
        discount.type
          .toLowerCase()
          .includes(SEARCH_INPUT.value.toLowerCase()) ||
        discount.display_in_section
          .toLowerCase()
          .includes(SEARCH_INPUT.value.toLowerCase())
      );
    });
    setFilteredDiscounts(results);
  }, [debouncedSearchValue]);

  const DISCOUNTS_PER_PAGE = ADMIN_SETTINGS.data?.settings
    ?.entries_per_admin_discouns_table_page
    ? ADMIN_SETTINGS.data?.settings.entries_per_admin_discouns_table_page
    : 10;

  //Get discounts of current page
  const indexOfLastDiscount = currentPage * DISCOUNTS_PER_PAGE;
  const indexOfFirstDiscount = indexOfLastDiscount - DISCOUNTS_PER_PAGE;
  const currentDiscounts = filteredDiscounts.slice(
    indexOfFirstDiscount,
    indexOfLastDiscount
  );

  //Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const setDiscountsPerPage = (e) => {
    UPDATE_ADMIN_SETTINGS.mutate({
      settings_to_update: 'entries_per_admin_discouns_table_page',
      update_value: parseInt(e.target.value),
    });
    setCurrentPage(1);
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
      <AdminHeader />
      <div className={`${styles.container} container`}>
        {/* /////////////////////////
         //Title + button container//
         ///////////////////////// */}
        <div className={styles.title_flex_container}>
          <h1>Descuentos ({discountsCountReducer.count})</h1>

          <Link href={'/admin/descuentos/gestionar-descuentos/nuevo-descuento'}>
            <button type='button' className='btn button--red'>
              <span>+ </span>Crear descuento
            </button>
          </Link>
        </div>

        <h5>
          Mostrando{' '}
          <select
            onChange={setDiscountsPerPage}
            value={
              ADMIN_SETTINGS.data?.settings
                ?.entries_per_admin_discouns_table_page
                ? ADMIN_SETTINGS.data?.settings
                    .entries_per_admin_discouns_table_page
                : 10
            }
          >
            <option value='10'>10</option>
            <option value='20'>20</option>
            <option value='30'>30</option>
            <option value='40'>40</option>
            <option value='50'>50</option>
          </select>{' '}
          por página
        </h5>

        {!discountsReducer.loading && (
          <>
            {/* /////////////////////////
          //      Search bar       //
          ///////////////////////// */}
            <div className={styles.search_bar_display_per_page_flex_container}>
              <div className={styles.search_bar_container}>
                <input
                  type='text'
                  placeholder='Buscar por título del descuento, marca, categoría o tipo de descuento...'
                  className={styles.search_bar}
                  name='search'
                  id='search'
                  value={SEARCH_INPUT.value}
                  onChange={SEARCH_INPUT.onChange}
                  autoFocus
                />
              </div>
            </div>

            {discountsCountReducer.count !== filteredDiscounts.length && (
              <p className={styles.filtered_discounts_count}>
                Descuentos encontrados:{' '}
                <strong>{filteredDiscounts.length}</strong>
              </p>
            )}
          </>
        )}

        {/* /////////////////////////
          //       Discounts        //
          ///////////////////////// */}

        {discountsReducer.discounts.length > 0 ? (
          <p className={styles.table_explanation}>
            Las fechas de caducidad de los descuentos que expiren durante los
            próximos 5 días se marcarán en amarillo, los que ya hayan expirado
            se marcan en rojo.
          </p>
        ) : (
          ''
        )}

        <AdminDiscountsTable
          discounts={
            discountsReducer.discounts.length > 0 ? currentDiscounts : []
          }
          loading={
            discountsReducer.loading ||
            ADMIN_SETTINGS.isLoading ||
            UPDATE_ADMIN_SETTINGS.isLoading
          }
          error={discountsReducer.error}
        />

        {!discountsReducer.loading && filteredDiscounts.length > 0 && (
          <Pagination
            itemsPerPage={DISCOUNTS_PER_PAGE}
            totalItems={filteredDiscounts.length}
            paginate={paginate}
            currentPage={currentPage}
          />
        )}
      </div>
    </>
  );
};

export default index;
