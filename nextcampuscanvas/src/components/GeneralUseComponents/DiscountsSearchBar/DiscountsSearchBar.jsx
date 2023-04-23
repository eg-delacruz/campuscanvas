import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

//Styles
import styles from './DiscountsSearchBar.module.scss';

//hooks
import { useInputValue } from '@hooks/useInputValue';
import useDebouncedSearchValue from '@hooks/useDebouncedSearchValue';

//React query
import { useQuery } from '@tanstack/react-query';
import discoutKeys from '@query-key-factory/discountKeys';

//Request functions
import discountFunctions from '@request-functions/Discounts/Cards/index';

//Components
import MiniDiscountCard from '@components/GeneralUseComponents/MiniDiscountCard/MiniDiscountCard';
import CircularLoader from '@components/GeneralUseComponents/CircularLoader/CircularLoader';

//Redux
import { useSelector, useDispatch } from 'react-redux';
import {
  updateCache,
  cleanCache,
  selectDiscountSearchBarCache,
} from '@redux/discountSearchBarCacheSlice';

const DiscountsSearchBar = ({ showDiscountsSearchBar, onClose }) => {
  //Needed to avoid problems with the SSR (start)
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);
  //Needed to avoid problems with the SSR (end)

  //Reducers
  const dispatch = useDispatch();
  const discountSearchBarCacheReducer = useSelector(
    selectDiscountSearchBarCache
  );

  //States
  const [searchBarResults, setSearchBarResults] = useState([]);
  const [firstSearchExecuted, setFirstSearchExecuted] = useState(false);
  const [allowCleanCache, setAllowCleanCache] = useState(false);

  const CLEAN_CACHE_TIMEOUT = 1000 * 60 * 10;

  //Controlling inputs
  const SEARCH_INPUT = useInputValue('');

  const debouncedSearchValue = useDebouncedSearchValue(
    SEARCH_INPUT.value.toLowerCase(),
    500
  );

  //React query
  const SEARCH_BAR_RESULTS = useQuery({
    queryKey: [discoutKeys.cards.get_mini_cards_searchbar_results],
    queryFn: () =>
      discountFunctions.getMiniCardsSearchbarResults(debouncedSearchValue),
    staleTime: Infinity,
    //Disable the query from automatically running
    enabled: false,

    onSuccess: (data) => {
      //Setting search results
      setSearchBarResults(data);

      //Add result to cache
      dispatch(
        updateCache({ searchValue: debouncedSearchValue, results: data })
      );

      //Clean cache 10 minutes after the first search
      if (!firstSearchExecuted) {
        monitorCleanCache();
        setFirstSearchExecuted(true);
      }
    },
  });

  //Clean cache 10 minutes after the first search
  useEffect(() => {
    if (allowCleanCache) {
      dispatch(cleanCache());
      setAllowCleanCache(false);
    }
  }, [allowCleanCache]);

  useEffect(() => {
    if (debouncedSearchValue) {
      //Check if the results are already cached
      if (discountSearchBarCacheReducer.cachedResults[debouncedSearchValue]) {
        setSearchBarResults(
          discountSearchBarCacheReducer.cachedResults[debouncedSearchValue]
        );
      } else {
        //If not, fetch them
        SEARCH_BAR_RESULTS.refetch();
      }
    }
  }, [debouncedSearchValue]);

  //Functions
  const handleClose = (e) => {
    e.preventDefault();
    onClose();
  };

  function monitorCleanCache() {
    //Clean cache 10 minutes after the first search
    setTimeout(() => {
      setAllowCleanCache(true);
      setFirstSearchExecuted(false);
    }, CLEAN_CACHE_TIMEOUT);
  }

  const discountsSearchBarContent = showDiscountsSearchBar ? (
    //The overlay is the black background
    <div className={styles.overlay} onClick={handleClose}>
      {/*The modal is the white box*/}
      <div
        onClick={(e) => {
          //Needed to avoid that the modal closes if clicked
          e.stopPropagation();
        }}
        className={styles.modal}
      >
        <div className={styles.content}>
          <button className={styles.close_button} onClick={handleClose}>
            X
          </button>
          <input
            type='text'
            placeholder='Marcas, artículos o categorías'
            className={styles.search_bar}
            name='search'
            id='search'
            value={SEARCH_INPUT.value}
            onChange={SEARCH_INPUT.onChange}
            autoFocus
            autoComplete='off'
          />

          <div className={styles.results_container}>
            {/* Prefetch and render suggested results here or fetch them when user open searc bar (see how to do it on hover or on click down). Don´t do this server side, since not so important for SEO and also very complicated to achieve */}
            {SEARCH_INPUT.value.length === 0 ? (
              ''
            ) : SEARCH_BAR_RESULTS.isLoading ||
              SEARCH_BAR_RESULTS.isFetching ? (
              <div className={styles.circular_loader_container}>
                <CircularLoader />
              </div>
            ) : searchBarResults?.length === 0 ? (
              <h4>No hay resultados</h4>
            ) : (
              <>
                <div className={styles.results}>
                  <h3>Descuentos estudiantes</h3>
                  <div className={styles.results_grid}>
                    {searchBarResults.map((card) => (
                      <MiniDiscountCard
                        closeSearchBar={onClose}
                        clearSearchBar={() => {
                          SEARCH_INPUT.setValue('');
                        }}
                        key={card._id}
                        discount_id={card.discount_id}
                        title={card.title}
                        brand_logo={card.brand_logo.brand_logo.URL}
                        brand_name={card.brand_name}
                      />
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  ) : null;

  return isClient
    ? createPortal(
        discountsSearchBarContent,
        document.getElementById('modal-root')
      )
    : null;
};

export default DiscountsSearchBar;
