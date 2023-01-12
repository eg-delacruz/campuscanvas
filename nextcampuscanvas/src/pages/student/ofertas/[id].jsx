import { useRouter } from 'next/router';

//Styles
import styles from '@styles/pagestyles/student/VerifDiscountDisplayer.module.scss';

//Databases
import { OFFERS } from '@databases/offers/offersInfoDatabase.js';

//Components
import Layout from '@components/GeneralUseComponents/Layout/Layout';

//Hooks
import useSecureUnverifRouteOnMount from '@hooks/useSecureUnverifRouteOnMount';

const VerifDiscountDisplayer = () => {
  const { verifyingSession } = useSecureUnverifRouteOnMount();

  // //Get offer id
  const router = useRouter();

  const id = Number(router.query.id);

  if (verifyingSession) {
    return <div>Loading...</div>;
  }
  return <div>VerifDiscountDisplayer</div>;
};

export default VerifDiscountDisplayer;
