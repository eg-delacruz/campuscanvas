//Styles
import styles from './DiscountDisplayerBtn.module.scss';

//Session
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

//Hooks
import useSecureUnverifRoutesInsideFunction from '@hooks/useSecureUnverifRouteInsideFunction';

//CLARIFICATION
//This component renders a different button if the offer is affiliate_link type or discount_code type. Each button has a different behavior depending on the case, which can be opening the affiliate link in both cases, or opening the affiliate link and showing/generating the discount code in a different route, since this route can be accessed by anyone.

const DiscountDisplayerBtn = ({ offer }) => {
  //Session
  const { data: session, status } = useSession();

  const { redirectUnverifUser } = useSecureUnverifRoutesInsideFunction();

  const handleDiscount = () => {
    redirectUnverifUser();
    if (session?.token.stu_verified) {
      //Open and focus on this one, since browser will focus in the new opened tab (cc page with generated code)
      //TODO: IMPORTANT: in production, the baseURL has to be 'https://www.campuscanvas.net/' !!!
      const baseURL = 'https://www.campuscanvas.net/';
      const path = 'student/ofertas/';
      const URL = baseURL + path + offer.offer_id;
      const newTabWindow = window.open(URL, '_blank', 'noopener, noreferrer');

      //Open affiliate_link in background and same tab we were in previously.
      const currentTabWindow = window.open(
        offer.affiliate_link,
        '_self',
        'noopener, noreferrer'
      );
      if (newTabWindow) newTabWindow.opener = null;
      if (currentTabWindow) currentTabWindow.opener = null;
    }
  };

  const handleAffiliateLink = () => {
    redirectUnverifUser();
    if (session?.token.stu_verified) {
      //Open affiliate_link in new tab
      const currentTabWindow = window.open(offer.affiliate_link, '_blank');

      if (currentTabWindow) currentTabWindow.opener = null;
    }
  };

  return (
    <>
      {offer.type === 'discount_code' ? (
        <>
          <button
            onClick={handleDiscount}
            className={`${styles.button} btn button--red`}
          >
            Mostrar cupón y abrir tienda
          </button>
        </>
      ) : (
        <>
          <button
            onClick={handleAffiliateLink}
            className={`${styles.button} btn button--red`}
          >
            {offer.action_btn_phrase
              ? offer.action_btn_phrase
              : 'Ir a la tienda'}
          </button>
        </>
      )}
    </>
  );
};

export default DiscountDisplayerBtn;
