import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

//Styles
import styles from '@styles/pagestyles/student/VerifDiscountDisplayer.module.scss';

//Databases
import { OFFERS } from '@databases/offers/offersInfoDatabase.js';

//Components
import Layout from '@components/GeneralUseComponents/Layout/Layout';
import Loader from '@components/GeneralUseComponents/Loader/Loader';
import SEOHeader from '@components/GeneralUseComponents/SEO_Header/SEOHeader';
import OfferTemplate from '@components/UsedInSpecificRoutes/ofertas/OfferTemplate/OfferTemplate';
import DisplayDiscountSnippet from '@components/UsedInSpecificRoutes/ofertas/DisplayDiscountSnippet/DisplayDiscountSnippet';

//Hooks
import useSecureUnverifRouteOnMount from '@hooks/useSecureUnverifRouteOnMount';

const VerifDiscountDisplayer = () => {
  //Securing route only for verified students
  const { verifyingSession } = useSecureUnverifRouteOnMount();

  const [offer, setOffer] = useState({});
  const [verifyingIfAffiliateLinkOffer, setVerifyingIfAffiliateOffer] =
    useState(true);

  //Get offer id
  const router = useRouter();

  const id = Number(router.query.id);

  //When modigying this useEffect, also do it in the one of /ofertas/[id].jsx
  useEffect(() => {
    if (!router.isReady) return;
    //Find the offer in the OFFERS array that matches the id
    const OFFER = OFFERS.find((offer) => {
      return offer.offer_id === id;
    });

    if (!OFFER) {
      router.push('/404');
      return;
    }

    setOffer(OFFER);
  }, [router?.isReady]);

  useEffect(() => {
    if (offer.type === 'affiliate_link') {
      router.push(`/ofertas/${id}`);
    }
    setVerifyingIfAffiliateOffer(false);
  }, [offer]);

  if (verifyingSession || verifyingIfAffiliateLinkOffer) {
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
            <DisplayDiscountSnippet offer={offer} />
          </OfferTemplate>
        )}
      </Layout>
    </>
  );
};

export default VerifDiscountDisplayer;
