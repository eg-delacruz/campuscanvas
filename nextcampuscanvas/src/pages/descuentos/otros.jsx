import { useState, useRef, useCallback, useEffect } from 'react';

//Styles
import styles from '@styles/pagestyles/DisplayDiscountPagesStyles.module.scss';

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

const otros = ({ initialCards }) => {
  //States
  const [currentPageNumber, setPageNumber] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [cards, setCards] = useState([...initialCards.cards]);
  const [hasMore, setHasMore] = useState(initialCards.next);

  const initialCardsFetched = useRef(true);

  const observer = useRef();
  const lastCardElementRef = useCallback(
    (node) => {
      if (loading) return;
      // We disconnect the observer from the previous last card so that we can connect it to the new last card
      if (observer.current) observer.current.disconnect();
      //We connect the observer to the last card, which is the observer.current
      observer.current = new IntersectionObserver((entries) => {
        //If the last card is intersecting with the viewport and there are more cards, we load more cards
        if (entries[0].isIntersecting && hasMore) {
          setPageNumber((prevPageNumber) => prevPageNumber + 1);
        }
      });
      //If the node exists, we observe it
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  //Load more cards on scroll
  useEffect(() => {
    const handleScroll = async () => {
      setLoading(true);
      setError(null);

      const response = await axiosFetcher({
        url: endPoints.discounts.getCards,
        method: 'get',
        extraHeaders: {
          required_cards: 'all_available',
          page: currentPageNumber,
          limit: 12,
        },
      });

      if (response.error) {
        console.log(`Error at fetching data: ${response.error} `);
        return setError(response.error);
      }

      //We add the new cards to the previous ones
      setCards((prevCards) => {
        return [...prevCards, ...response.body.cards];
      });

      setHasMore(response.body.next);
      setLoading(false);
    };

    //Avoid that the useEffect runs on the first render
    if (initialCardsFetched.current) {
      initialCardsFetched.current = false;
    } else {
      handleScroll();
    }
  }, [currentPageNumber]);

  return (
    <>
      <SEOHeader
        tabTitle={'Otros descuentos'}
        metaName={'Otros descuentos'}
        description={'Explora otros descuentos para estudiantes españoles'}
      />
      <ButtonUp />

      <div className={`header_wrapper`}>
        <Header />
      </div>

      <DisplayCardsByCategoryTemplate
        loading={loading}
        error={error}
        ref={lastCardElementRef}
        cards={cards}
      />

      <FooterWithoutSignature />
      <div className={styles.footer_signature_container}>
        <FooterSignature />
      </div>
    </>
  );
};

export default otros;

export async function getStaticProps() {
  const response = await axiosFetcher({
    payload: null,
    url: endPoints.discounts.getCards,
    method: 'get',
    extraHeaders: { required_cards: 'others', page: 1, limit: 12 },
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
