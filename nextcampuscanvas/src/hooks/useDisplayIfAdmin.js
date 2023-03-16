import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';

//CLARIFICATIONS:
//To use this hook, just import it and get the allowDisplay at the beginning of the component, like this:
//const { allowDisplay } = useDisplayIfAdmin('all' || 'master');
const useDisplayIfAdmin = (adminsAllowed) => {
  const [allowDisplay, setAllowDisplay] = useState(false);

  //Session
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === 'unauthenticated') {
      return;
    }

    if (session) {
      switch (adminsAllowed) {
        case 'all':
          if (
            session?.token.role === 'super_admin' ||
            session?.token.role === 'admin'
          ) {
            setAllowDisplay(true);
          }
          break;
        case 'master':
          if (session?.token.role === 'super_admin') {
            setAllowDisplay(true);
          }
          break;
        default:
          break;
      }
    }
  }, [session]);

  return { allowDisplay };
};

export default useDisplayIfAdmin;
