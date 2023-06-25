import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

//CLARIFICATIONS:
//Can only be used INSIDE A FUNCTION after first render (Eg. onClick). CANNOT BE USED in the first render or within a useEffect. Use the verified state to conditionally continue with the desired code.
const useSecureUnverifRoutesInsideFunction = () => {
  const [verified, setVerified] = useState(false);
  const [checking, setChecking] = useState(true);
  
  //Session
  const { data: session, status } = useSession();

  useEffect(() => {
    if (session?.token.stu_verified) {
      setVerified(true);
      setChecking(false);
      return;
    }
    setChecking(false);
  }, [session]);

  const router = useRouter();
  const redirectUnverifUser = () => {
    //Redirecting according to auth status/securing route
    if (status === 'unauthenticated') {
      return router.push({ pathname: '/auth/login' }, 'auth/login');
    }
    if (!session?.token.stu_data.university && !session?.token.stu_verified) {
      return router.push(
        { pathname: '/auth/registro', query: { step: 2 } },
        'auth/registro'
      );
    }
    if (session?.token.stu_data.university && !session?.token.stu_verified) {
      return router.push(
        { pathname: '/auth/registro', query: { step: 3 } },
        'auth/registro'
      );
    }
  };
  return { redirectUnverifUser, verified, checking };
};

export default useSecureUnverifRoutesInsideFunction;
