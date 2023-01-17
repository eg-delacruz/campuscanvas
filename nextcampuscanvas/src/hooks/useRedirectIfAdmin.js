import { useRouter } from 'next/router';

//Session
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';

const useRedirectIfAdmin = () => {
  //Session
  const { data: session, status } = useSession();

  const router = useRouter();

  useEffect(() => {
    if (
      session?.token.role === 'super_admin' ||
      session?.token.role === 'admin'
    ) {
      router.push('/admin');
    }
  }, [session]);
};

export default useRedirectIfAdmin;
