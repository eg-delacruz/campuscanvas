import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

//Styles
import styles from '@styles/pagestyles/ofertas/OffersDisplayer.module.scss';

//Components
import Layout from '@components/GeneralUseComponents/Layout/Layout';
import SEOHeader from '@components/GeneralUseComponents/SEO_Header/SEOHeader';
import OfferTemplate from '@components/UsedInSpecificRoutes/ofertas/OfferTemplate/OfferTemplate';
import DiscountDisplayerBtn from '@components/UsedInSpecificRoutes/ofertas/DiscountDisplayerBtn/DiscountDisplayerBtn';
import Loader from '@components/GeneralUseComponents/Loader/Loader';

//Databases
import { OFFERS } from '@databases/offers/offersInfoDatabase.js';

const Offer = () => {
  const [offer, setOffer] = useState({});
  const [loading, setLoading] = useState(true);
  //Get offer id
  const router = useRouter();

  //When modigying this useEffect, also do it in the one of /student/ofertas/[id].jsx
  useEffect(() => {
    if (!router.isReady) return;
    const id = Number(router.query.id);
    //Find the offer in the OFFERS array that matches the id
    const OFFER = OFFERS.find((offer) => {
      return offer.offer_id === id;
    });

    if (!OFFER) {
      router.push('/404');
      return;
    }

    setOffer(OFFER);
    setLoading(false);
  }, [router?.isReady]);

  if (loading) {
    return (
      <Layout>
        <div className={styles.loader_container}>
          <Loader />
        </div>
      </Layout>
    );
  }

  return (
    <>
      <SEOHeader
        tabTitle={offer?.SEO_meta_title}
        metaName={offer?.SEO_meta_title}
        description={offer?.description}
      />
      <Layout>
        {offer && Object.keys(offer).length > 0 && (
          <OfferTemplate offer={offer}>
            <DiscountDisplayerBtn offer={offer} />
          </OfferTemplate>
        )}
      </Layout>
    </>
  );
};

export default Offer;
