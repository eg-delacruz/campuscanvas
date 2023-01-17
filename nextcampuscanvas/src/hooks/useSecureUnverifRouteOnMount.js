import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

const useSecureUnverifRouteOnMount = () => {
  const [verifyingSession, setVerifyingSession] = useState(true);
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/login');
    }
    if (session) {
      if (!session?.token.stu_data.university && !session?.token.stu_verified) {
        router.push(
          { pathname: 'auth/registro', query: { step: 2 } },
          'auth/registro'
        );
      }
      if (session?.token.stu_data.university && !session?.token.stu_verified) {
        router.push(
          { pathname: 'auth/registro', query: { step: 3 } },
          'auth/registro'
        );
      }
    }
    if (session?.token.stu_verified) {
      setVerifyingSession(false);
    }
  }, [session, status]);

  return { verifyingSession };
};

export default useSecureUnverifRouteOnMount;
