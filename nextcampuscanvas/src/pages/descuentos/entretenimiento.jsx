import { useState, useRef, useCallback, useEffect } from 'react';

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

const entretenimiento = ({ initialCards }) => {
  const REQUIRED_CARDS = 'entertainment';
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
    staleTime: Infinity,
    getNextPageParam: (prevData) => prevData.next?.PAGE,
  });

  const observer = useRef();
  const lastCardElementRef = useCallback(
    (node) => {
      if (INFINITY_SCROLL_CARDS.isFetching) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && INFINITY_SCROLL_CARDS.hasNextPage) {
          INFINITY_SCROLL_CARDS.fetchNextPage();
        }
      });
      if (node) observer.current.observe(node);
    },
    [INFINITY_SCROLL_CARDS.isFetching, INFINITY_SCROLL_CARDS.hasNextPage]
  );

  //This value updates every time the query is refetched
  const CARDS = INFINITY_SCROLL_CARDS.data?.pages?.flatMap(
    (page) => page.cards
  );

  return (
    <>
      <SEOHeader
        tabTitle={'Descuentos de entretenimiento'}
        metaName={'Descuentos de entretenimiento'}
        description={
          'Explora todos nuestros descuentos de entretenimiento para estudiantes españoles'
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

export default entretenimiento;

export async function getStaticProps() {
  const response = await axiosFetcher({
    url: endPoints.discounts.getCards,
    method: 'get',
    extraHeaders: { required_cards: 'entertainment', page: 1, limit: 30 },
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
