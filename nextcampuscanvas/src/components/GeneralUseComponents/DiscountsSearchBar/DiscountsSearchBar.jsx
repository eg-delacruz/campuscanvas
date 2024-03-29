import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

//Styles
import styles from './DiscountsSearchBar.module.scss';

//hooks
import useDebouncedSearchValue from '@hooks/useDebouncedSearchValue';

//React query
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import discoutKeys from '@query-key-factory/discountKeys';

//Request functions
import discountFunctions from '@request-functions/Discounts/Cards/index';

//Components
import MiniDiscountCard from '@components/GeneralUseComponents/MiniDiscountCard/MiniDiscountCard';
import CircularLoader from '@components/GeneralUseComponents/CircularLoader/CircularLoader';
import SuggestSearchTermInput from '../SuggestSearchTermInput/SuggestSearchTermInput';

//Redux
import { useSelector, useDispatch } from 'react-redux';
//results cache
import {
  updateCache,
  cleanCache,
  selectDiscountSearchBarCache,
} from '@redux/discountsSearchbar/discountSearchBarCacheSlice';
//searchbar input state
import {
  selectDiscountSearchbarInputState,
  setSearchbarValue,
} from '@redux/discountsSearchbar/discountSearchbarInputStateSlice';
//discounts searchbar general states
import {
  setHasNextPage,
  setFirstSearchExecuted,
  setAllowCleanCache,
  selectDiscountSearchbarGeneralStates,
} from '@redux/discountsSearchbar/discountSearchbarGeneralStatesSlice';

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
  const discountSearchbarInputStateReducer = useSelector(
    selectDiscountSearchbarInputState
  );
  const discountSearchbarGeneralStatesReducer = useSelector(
    selectDiscountSearchbarGeneralStates
  );

  //States
  const [searchBarResults, setSearchBarResults] = useState([]);

  const CLEAN_CACHE_TIMEOUT = 1000 * 60 * 10; //10 minutes

  const debouncedSearchValue = useDebouncedSearchValue(
    discountSearchbarInputStateReducer.value,
    500
  );

  //React query
  const RESULTS_LIMIT = 12;
  const SEARCH_BAR_RESULTS = useInfiniteQuery({
    queryKey: [discoutKeys.cards.get_mini_cards_searchbar_results],
    queryFn: ({ pageParam = 1 }) =>
      discountFunctions.getMiniCardsSearchbarResults({
        query: debouncedSearchValue,
        page: pageParam,
        limit: RESULTS_LIMIT,
      }),
    staleTime: Infinity,
    //Disable the query from automatically running
    enabled: false,
    getNextPageParam: (lastPage) => lastPage?.miniCards?.next?.PAGE,

    onSuccess: (data) => {
      //Setting search results
      const updatedResults = data.pages?.flatMap(
        (page) => page.miniCards?.cards
      );

      //Set the results
      setSearchBarResults(updatedResults);

      //Set if there are more pages by checking the array in the last position
      dispatch(
        setHasNextPage(
          data.pages[data.pages.length - 1].miniCards?.next?.PAGE ? true : false
        )
      );

      //Update cache
      dispatch(
        updateCache({
          searchValue: data.pages[0].query,
          results: updatedResults,
          hasNextPage: data.pages[data.pages.length - 1].miniCards?.next?.PAGE
            ? true
            : false,
        })
      );

      //Clean cache 10 minutes after the first search
      if (!discountSearchbarGeneralStatesReducer.firstSearchExecuted) {
        monitorCleanCache();
        dispatch(setFirstSearchExecuted(true));
      }
    },
  });

  const RECOMMENDATIONS = useQuery({
    queryKey: [discoutKeys.cards.get_minicards_recommendations],
    queryFn: discountFunctions.getMiniCardsRecommendations,
    staleTime: Infinity,
  });

  //Clean cache 10 minutes after the first search
  useEffect(() => {
    if (discountSearchbarGeneralStatesReducer.allowCleanCache) {
      dispatch(cleanCache());
      dispatch(setAllowCleanCache(false));
    }
  }, [discountSearchbarGeneralStatesReducer.allowCleanCache]);

  //Fetch results when the debounced search value changes
  useEffect(() => {
    if (debouncedSearchValue) {
      //Check if the results are already cached
      if (discountSearchBarCacheReducer.cachedResults[debouncedSearchValue]) {
        //If so, set them
        setSearchBarResults(
          discountSearchBarCacheReducer.cachedResults[debouncedSearchValue]
            .results
        );
        dispatch(
          setHasNextPage(
            discountSearchBarCacheReducer.cachedResults[debouncedSearchValue]
              .hasNextPage
          )
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
      dispatch(setAllowCleanCache(true));
      dispatch(setFirstSearchExecuted(false));
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
            value={discountSearchbarInputStateReducer.value}
            onChange={(e) => {
              dispatch(setSearchbarValue(e.target.value));
            }}
            autoFocus
            autoComplete='off'
          />

          <div className={styles.results_container}>
            {discountSearchbarInputStateReducer.value.length === 0 ? (
              // Recommendations (prefetched when the app starts)
              <>
                {RECOMMENDATIONS?.data?.recommendations.length > 0 && (
                  <div className={styles.recommendations}>
                    <h3>Recomendaciones para ti</h3>
                    <div className={styles.recommendations_grid}>
                      {RECOMMENDATIONS.data.recommendations.map((card) => (
                        <MiniDiscountCard
                          closeSearchBar={onClose}
                          key={card.id}
                          discount_id={card.discount_id}
                          title={card.title}
                          brand_logo={card.brand_logo.brand_logo.URL}
                          brand_name={card.brand_name}
                          brand_slug={card.brand_slug.brand_slug}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </>
            ) : //Loading state while fetching search term
            SEARCH_BAR_RESULTS.isLoading ||
              (SEARCH_BAR_RESULTS.isFetching &&
                !discountSearchBarCacheReducer.cachedResults[
                  debouncedSearchValue
                ]) ||
              debouncedSearchValue !==
                discountSearchbarInputStateReducer.value ? (
              <div className={styles.circular_loader_container}>
                <CircularLoader />
              </div>
            ) : searchBarResults?.length === 0 ? (
              //No results found
              <SuggestSearchTermInput />
            ) : (
              //Results are shown here
              <>
                <div className={styles.results}>
                  <h3>Descuentos estudiantes</h3>
                  <div className={styles.results_grid}>
                    {searchBarResults.map((card) => (
                      <MiniDiscountCard
                        closeSearchBar={onClose}
                        clearSearchBar={() => {
                          dispatch(setSearchbarValue(''));
                        }}
                        key={card._id}
                        discount_id={card.discount_id}
                        title={card.title}
                        brand_logo={card.brand_logo.brand_logo.URL}
                        brand_name={card.brand_name}
                        brand_slug={card.brand_slug.brand_slug}
                      />
                    ))}
                  </div>
                  {discountSearchbarGeneralStatesReducer.hasNextPage && (
                    <button
                      onClick={() => {
                        SEARCH_BAR_RESULTS.fetchNextPage();
                      }}
                      className={`${
                        styles.show_more_btn
                      }  btn button--redRedborderTransparentHoverShadowtRed ${
                        SEARCH_BAR_RESULTS.isFetchingNextPage &&
                        styles.buttonLoading
                      }`}
                      disabled={SEARCH_BAR_RESULTS.isFetchingNextPage}
                    >
                      Mostrar más
                    </button>
                  )}
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
