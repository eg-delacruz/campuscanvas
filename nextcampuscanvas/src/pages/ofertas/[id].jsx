import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

//Styles
import styles from '@styles/pagestyles/ofertas/OffersDisplayer.module.scss';

//Components
import Layout from '@components/GeneralUseComponents/Layout/Layout';
import SEOHeader from '@components/GeneralUseComponents/SEO_Header/SEOHeader';
import OfferTemplate from '@components/UsedInSpecificRoutes/ofertas/OfferTemplate/OfferTemplate';
import DiscountDisplayerBtn from '@components/UsedInSpecificRoutes/ofertas/DiscountDisplayerBtn/DiscountDisplayerBtn';

//Databases
import { OFFERS } from '@databases/offers/offersInfoDatabase.js';

const Offer = () => {
  const [offer, setOffer] = useState({});
  //Get offer id
  const router = useRouter();

  useEffect(() => {
    if (!router.isReady) return;
    const id = Number(router.query.id);
    //Find the offer in the OFFERS array that matches the id
    const OFFER = OFFERS.find((offer) => {
      return offer.offer_id === id;
    });

    setOffer(OFFER);
  }, [router?.isReady]);

  //TODO: Create a loading state if needed as in /blog

  return (
    <>
      <SEOHeader
        tabTitle={offer?.SEO_meta_title}
        metaName={offer?.SEO_meta_title}
        description={offer?.description}
      />
      <Layout>
        {Object.keys(offer).length > 0 && (
          <OfferTemplate offer={offer}>
            <DiscountDisplayerBtn offer={offer} />
          </OfferTemplate>
        )}
      </Layout>
    </>
  );
};

export default Offer;
