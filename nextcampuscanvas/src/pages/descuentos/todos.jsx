//Infinite scroll as in:
//https://www.youtube.com/watch?v=NZKUirTtxcg&list=WL&index=31&t=1258s

import { useEffect, useState, useCallback, useRef } from 'react';

//Components
import SEOHeader from '@components/GeneralUseComponents/SEO_Header/SEOHeader';
import Header from '@components/GeneralUseComponents/Header/Header';
import Footer from '@components/GeneralUseComponents/Footer/Footer';
import ButtonUp from '@components/GeneralUseComponents/ButtonUp/ButtonUp';
import DisplayCardsByCategoryTemplate from '@components/UsedInSpecificRoutes/Descuentos/DisplayCardsByCategoryTemplate/DisplayCardsByCategoryTemplate';

//Endpoints
import endPoints from '@services/api';

//Services
import axiosFetcher from '@services/axiosFetcher';

//CLARIFICATION
//1. The limit of the fetched cards in getStaticProps and the one in useEffect have to be the same
const todos = ({ initialCards }) => {
  //States
  //Current page number
  const [pageNumber, setPageNumber] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [cards, setCards] = useState([...initialCards]);
  const [hasMore, setHasMore] = useState(initialCards.next);

  //const initialCardsFetched = useRef(true);

  // const observer = useRef();
  // const lastCardElementRef = useCallback(
  //   (node) => {
  //     if (loading) return;
  //     // We disconnect the observer from the previous last card so that we can connect it to the new last card
  //     if (observer.current) observer.current.disconnect();
  //     //We connect the observer to the last card, which is the observer.current
  //     observer.current = new IntersectionObserver((entries) => {
  //       //If the last card is intersecting with the viewport and there are more cards, we load more cards
  //       if (entries[0].isIntersecting && hasMore) {
  //         setPageNumber((prevPageNumber) => prevPageNumber + 1);
  //       }
  //     });
  //     //If the node exists, we observe it
  //     if (node) observer.current.observe(node);
  //   },
  //   [loading, hasMore]
  // );

  // //Load more cards on scroll
  // useEffect(() => {
  //   const handleScroll = async () => {
  //     setLoading(true);
  //     setError(null);

  //     const response = await axiosFetcher({
  //       url: endPoints.discounts.getCards,
  //       method: 'get',
  //       extraHeaders: {
  //         required_cards: 'all_available',
  //         page: pageNumber,
  //         limit: 30,
  //       },
  //     });

  //     if (response.error) {
  //       console.log(`Error at fetching data: ${response.error} `);
  //       return setError(response.error);
  //     }

  //     //We add the new cards to the previous ones
  //     setCards((prevCards) => {
  //       return [...prevCards, ...response.body.cards];
  //     });

  //     setHasMore(response.body.next);
  //     setLoading(false);
  //   };

  //   //Avoid that the useEffect runs on the first render
  //   if (initialCardsFetched.current) {
  //     initialCardsFetched.current = false;
  //   } else {
  //     handleScroll();
  //   }
  // }, [pageNumber]);

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
        cards={cards}
        loading={loading}
        error={error}
        //ref={lastCardElementRef}
      />

      <Footer />
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
