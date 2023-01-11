import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

//Styles
import styles from '@styles/pagestyles/student/VerifDiscountDisplayer.module.scss';

//Databases
import { OFFERS } from '@databases/offers/offersInfoDatabase.js';

//Components
import Layout from '@components/GeneralUseComponents/Layout/Layout';

//Hooks
import useSecureUnverifRoutes from '@hooks/useSecureUnverifRoutes';

//TODO: secure route only for verified students

const VerifDiscountDisplayer = () => {
  //TODO: inside this hook, display a loading state while checking if logged in or not
  useSecureUnverifRoutes();
  //Get offer id
  const router = useRouter();
  const id = Number(router.query.id);

  return <div>VerifDiscountDisplayer</div>;
};

export default VerifDiscountDisplayer;
