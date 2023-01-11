import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';

const useDisplayIfVerified = () => {
  const [allowDisplay, setAllowDisplay] = useState(false);
  //Session
  const { data: session } = useSession();

  useEffect(() => {
    if (session?.token.stu_verified) {
      setAllowDisplay(true);
    }
  }, [session]);
  return { allowDisplay };
};

export default useDisplayIfVerified;
