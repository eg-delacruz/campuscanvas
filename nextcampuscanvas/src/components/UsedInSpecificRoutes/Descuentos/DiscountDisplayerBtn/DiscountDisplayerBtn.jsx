//Styles
import styles from './DiscountDisplayerBtn.module.scss';

//Hooks
import useSecureUnverifRoutesInsideFunction from '@hooks/useSecureUnverifRouteInsideFunction';

//CLARIFICATION
//This component renders a different button if the discount is affiliate_link type or discount_code type. Each button has a different behavior depending on the case, which can be opening the affiliate link in both cases, or opening the affiliate link and showing/generating the discount code in a different route, since this route can be accessed by anyone.

const DiscountDisplayerBtn = ({ discount }) => {
  const { redirectUnverifUser, verified, checking } =
    useSecureUnverifRoutesInsideFunction();

  //Handles what happens if the discount if of type discount_code
  const handleDiscount = () => {
    const redirectUserToCouponAndOpenAffLink = () => {
      //Open and focus on this one, since browser will focus in the new opened tab (cc page with generated code)
      //IMPORTANT: in production, the baseURL has to be 'https://www.campuscanvas.net/' , and in local has to be 'http://localhost:3000/'!!!

      const baseURL = 'https://www.campuscanvas.net/';
      //const baseURL = 'http://localhost:3000/';
      const path = 'student/descuentos/';
      const URL = baseURL + path + discount._id;
      const newTabWindow = window.open(URL, '_blank', 'noopener, noreferrer');

      //Open affiliate_link in background and same tab we were in previously.
      const currentTabWindow = window.open(
        discount.affiliate_link,
        '_self',
        'noopener, noreferrer'
      );
      if (newTabWindow) newTabWindow.opener = null;
      if (currentTabWindow) currentTabWindow.opener = null;
    };

    if (discount.available_for === 'publico') {
      redirectUserToCouponAndOpenAffLink();
      return;
    }
    //Check if user is verified en redirect if not (runs if available for verified students only)
    redirectUnverifUser();

    if (verified) {
      redirectUserToCouponAndOpenAffLink();
    }
  };

  //Handles what happens if the discount is of type affiliate_link_only
  const handleAffiliateLink = () => {
    const openAffiliateLink = () => {
      //Open affiliate_link in new tab
      const currentTabWindow = window.open(discount.affiliate_link, '_blank');
      if (currentTabWindow) currentTabWindow.opener = null;
    };

    if (discount.available_for === 'publico') {
      openAffiliateLink();
      return;
    }

    //Check if user is verified en redirect if not (runs if av
    redirectUnverifUser();

    if (verified) {
      openAffiliateLink();
    }
  };

  //TODO: when I know needed info to dynamically generate discount, add those changes here
  return (
    <>
      {!verified &&
        !checking &&
        discount.available_for === 'estudiantes_verificados' && (
          <p className={styles.unverified_message_for_private_discounts}>
            <span
              onClick={redirectUnverifUser}
              className={styles.redirect_to_verif_link}
            >
              Regístrate y verifica
            </span>{' '}
            tu cuenta gratuita de estudiante para acceder a este descuento
          </p>
        )}
      {discount.type === 'discount_code' ? (
        <>
          <button
            onClick={handleDiscount}
            className={`${styles.button} btn button--red`}
          >
            Mostrar cupón y abrir tienda
          </button>
        </>
      ) : discount.type === 'affiliate_link_only' ? (
        <>
          <button
            onClick={handleAffiliateLink}
            className={`${styles.button} btn button--red`}
          >
            {discount.action_btn_phrase
              ? discount.action_btn_phrase
              : 'Ir a la tienda'}
          </button>
          <p className={styles.p}>Se aplica automaticamente en la tienda</p>
        </>
      ) : (
        ''
      )}
      {!verified && !checking && discount.available_for === 'publico' && (
        <p className={styles.unverified_message_for_public_discount}>
          ¡Disfruta tu descuento🎉!{' '}
          <span
            onClick={redirectUnverifUser}
            className={styles.redirect_to_verif_link}
          >
            Verifícate
          </span>{' '}
          como estudiante y accede a más descuentos exclusivos
        </p>
      )}
    </>
  );
};

export default DiscountDisplayerBtn;
