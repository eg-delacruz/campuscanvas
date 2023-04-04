import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

//Session
import { useSession } from 'next-auth/react';

//AllowedAdmin possible values: all, master
const useSecureAdminRoute = (allowedAdmins = 'all') => {
  const [securingRoute, setSecuringRoute] = useState(true);
  //Session
  const { data: session, status } = useSession();

  const router = useRouter();

  useEffect(() => {
    //Securing route
    if (status === 'unauthenticated') {
      router.push('/auth/login');
    }

    switch (allowedAdmins) {
      case 'all':
        if (session) {
          if (
            !(
              session?.token.role === 'super_admin' ||
              session?.token.role === 'admin'
            )
          ) {
            router.push('/');
          }
          //This is needed to only display things if we are 100% secure that its an admin, since if we only redirect, there is a short moment of 1s when any user can see inside the secured route
          if (
            session?.token.role === 'super_admin' ||
            session?.token.role === 'admin'
          ) {
            setSecuringRoute(false);
          }
        }
        break;

      case 'master':
        if (session) {
          if (!(session?.token.role === 'super_admin')) {
            router.push('/');
          }
          if (session?.token.role === 'super_admin') {
            setSecuringRoute(false);
          }
        }

      default:
        break;
    }
  }, [session, status]);
  return { securingRoute, session };
};

export default useSecureAdminRoute;
