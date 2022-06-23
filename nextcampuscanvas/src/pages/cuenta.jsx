import { useState } from 'react';
import { useRouter } from 'next/router';

//Styles
import styles from '@styles/pagestyles/Cuenta.module.scss';

//Components
import UserSidebar from '@components/GeneralUseComponents/UserSidebar/UserSidebar';

//Session
import { useSession } from 'next-auth/react';

//Mirar SEO

const cuenta = () => {
  const router = useRouter();

  //Session
  const { data: session, status } = useSession();

  //Redirecting according to auth status/securing route
  if (status === 'unauthenticated') {
    router.push('/auth/login');
  }

  //Send state to UserSidebar to open and close it
  const [openSidebar, setOpenSidebar] = useState(true);
  return (
    <div className={styles.profile}>
      <div className={styles.profile__container}>
        <UserSidebar
          setOpenSidebar={setOpenSidebar}
          openSidebar={openSidebar}
        />
        <main className={styles.profile__content}>
          Aquí irá todo el contenido de la persona
          <button onClick={() => setOpenSidebar(true)}>Open sidebar</button>
        </main>
      </div>
    </div>
  );
};

export default cuenta;
