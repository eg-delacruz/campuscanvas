import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';

//Styles
import styles from '@styles/pagestyles/student/VerifDiscountDisplayer.module.scss';

//Databases
import { OFFERS } from '@databases/offers/offersInfoDatabase.js';

//Components
import Layout from '@components/GeneralUseComponents/Layout/Layout';

const VerifDiscountDisplayer = () => {
  // //Get offer id
  const router = useRouter();

  //Session
  const { data: session, status } = useSession();

  //Redirecting according to auth status/securing route
  if (status === 'unauthenticated') {
    router.push('/auth/login');
  }
  if (session) {
    if (!session?.token.stu_data.university && !session?.token.stu_verified) {
      router.push(
        { pathname: '/auth/registro', query: { step: 2 } },
        '/auth/registro'
      );
    }
    if (session?.token.stu_data.university && !session?.token.stu_verified) {
      router.push(
        { pathname: '/auth/registro', query: { step: 3 } },
        '/auth/registro'
      );
    }
  }

  const id = Number(router.query.id);

  if (status === 'loading' || !session?.token.stu_verified) {
    return <div>Loading...</div>;
  }
  return <div>VerifDiscountDisplayer</div>;
};

export default VerifDiscountDisplayer;
