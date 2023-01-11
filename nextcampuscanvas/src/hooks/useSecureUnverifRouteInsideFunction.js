import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

//CLARIFICATIONS:
//Can only be used INSIDE A FUNCTION after first render. CANNOT BE USED in the first render or within a useEffect. Also, if we want to do something else afterwards, we have to put a condition to do it,since if not, the following code will anyway executed
const useSecureUnverifRoutesInsideFunction = () => {
  //Session
  const { data: session, status } = useSession();

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
  return { redirectUnverifUser };
};

export default useSecureUnverifRoutesInsideFunction;
