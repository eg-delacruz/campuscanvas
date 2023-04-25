//Infinite scroll as in:
//https://www.youtube.com/watch?v=NZKUirTtxcg&list=WL&index=31&t=1258s

import { useCallback, useRef } from 'react';

//Styles
import styles from '@styles/pagestyles/DisplayDiscountPagesStyles.module.scss';

//React query
import { useInfiniteQuery } from '@tanstack/react-query';
import discoutKeys from '@query-key-factory/discountKeys';

//Components
import SEOHeader from '@components/GeneralUseComponents/SEO_Header/SEOHeader';
import Header from '@components/GeneralUseComponents/Header/Header';
import ButtonUp from '@components/GeneralUseComponents/ButtonUp/ButtonUp';
import DisplayCardsByCategoryTemplate from '@components/UsedInSpecificRoutes/Descuentos/DisplayCardsByCategoryTemplate/DisplayCardsByCategoryTemplate';
import FooterWithoutSignature from '@components/GeneralUseComponents/FooterWithoutSignature/FooterWithoutSignature';
import FooterSignature from '@components/GeneralUseComponents/FooterSignature/FooterSignature';

//Endpoints
import endPoints from '@services/api';

//Services
import axiosFetcher from '@services/axiosFetcher';

//Request functions
import discountFunctions from '@request-functions/Discounts/Cards/index';

//CLARIFICATION
//1. The limit of the fetched cards in getStaticProps and the one of the CARDS_PER_PAGE have to be the same
const todos = ({ initialCards }) => {
  const REQUIRED_CARDS = 'all_available';
  const CARDS_PER_PAGE = 30;

  //React query
  const INFINITY_SCROLL_CARDS = useInfiniteQuery({
    queryKey: [discoutKeys.cards.get_by_category(REQUIRED_CARDS)],
    queryFn: ({ pageParam }) =>
      discountFunctions.getCardsByCategory({
        category: REQUIRED_CARDS,
        requiredPage: pageParam,
        limit: CARDS_PER_PAGE,
      }),
    //Avoid that the query runs on the first render
    enabled: false,
    //Initial data has to have this structure
    initialData: {
      pages: [
        {
          previous: initialCards?.previous,
          next: initialCards?.next,
          cards: initialCards.cards,
        },
      ],
      pageParams: [1],
    },
    //Avoid refetching the data when the component is unmounted and mounted again
    staleTime: Infinity,
    //This functin sets the pageParam of the queryFn. Last page is all the data of the last fetched page and we are just storing the next page that we need to fetch in the fetchParam.
    getNextPageParam: (prevData) => prevData.next?.PAGE,
  });

  //This value updates every time the query is refetched
  const CARDS = INFINITY_SCROLL_CARDS.data?.pages?.flatMap(
    (page) => page.cards
  );

  const observer = useRef();
  const lastCardElementRef = useCallback(
    (node) => {
      if (INFINITY_SCROLL_CARDS.isFetching) return;
      // We disconnect the observer from the previous last card so that we can connect it to the new last card
      if (observer.current) observer.current.disconnect();
      //We connect the observer to the last card, which is the observer.current
      observer.current = new IntersectionObserver((entries) => {
        //If the last card is intersecting with the viewport and there are more cards, we load more cards
        if (entries[0].isIntersecting && INFINITY_SCROLL_CARDS.hasNextPage) {
          INFINITY_SCROLL_CARDS.fetchNextPage();
        }
      });
      //If the node exists, we observe it
      if (node) observer.current.observe(node);
    },
    [INFINITY_SCROLL_CARDS.isFetching, INFINITY_SCROLL_CARDS.hasNextPage]
  );

  return (
    <>
      <SEOHeader
        tabTitle={'Todos nuestros descuentos'}
        metaName={'Todos nuestros descuentos'}
        description={
          'Explora todos nuestros descuentos a estudiantes españoles'
        }
      />

      <ButtonUp />

      <div className={`header_wrapper`}>
        <Header />
      </div>

      <DisplayCardsByCategoryTemplate
        cards={CARDS}
        loading={INFINITY_SCROLL_CARDS.isFetching}
        error={INFINITY_SCROLL_CARDS.error}
        ref={lastCardElementRef}
      />

      <FooterWithoutSignature />
      <div className={styles.footer_signature_container}>
        <FooterSignature />
      </div>
    </>
  );
};

export default todos;

export async function getStaticProps() {
  const response = await axiosFetcher({
    url: endPoints.discounts.getCards,
    method: 'get',
    extraHeaders: { required_cards: 'all_available', page: 1, limit: 30 },
  });

  if (response.error) {
    console.log(`Error at fetching data: ${response.error} `);
    return {
      notFound: true,
    };
  }

  return {
    props: {
      initialCards: response?.body || null,
    },
  };
}
