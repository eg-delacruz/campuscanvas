import { useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';

//Styles
import styles from '@styles/pagestyles/Pedidos.module.scss';

//Assets
import arrow_right_black from '@assets/GeneralUse/IconsAndButtons/arrow_right_black.svg';

//Components
import UserSidebar from '@components/GeneralUseComponents/UserSidebar/UserSidebar';
import SEOHeader from '@components/GeneralUseComponents/SEO_Header/SEOHeader';
import Loader from '@components/GeneralUseComponents/Loader/Loader';
import FooterSignature from '@components/GeneralUseComponents/FooterSignature/FooterSignature';

//Session
import { useSession } from 'next-auth/react';

//Endpoints

const pedidos = (props) => {
  //Session
  const { data: session, status } = useSession();

  const router = useRouter();

  //Securing route
  if (status === 'unauthenticated') {
    router.push('/auth/login');
  }

  //Send state to UserSidebar to open and close it
  const [openSidebar, setOpenSidebar] = useState(false);

  return (
    <>
      <SEOHeader
        tabTitle={'Cuenta'}
        metaName={'Cuenta'}
        description={'Edita los datos de tu cuenta'}
      />
      <div className={styles.page}>
        <div className={styles.page__container}>
          <UserSidebar
            setOpenSidebar={setOpenSidebar}
            openSidebar={openSidebar}
          />

          {/* /////////////////////////
          //    Main content     //
        ///////////////////////// */}
          <main className={styles.pedidos}>
            {/* Loader here */}
            <div className={styles.pedidos__container}>
              {/* Back button for mobile */}
              <button
                className={`${styles.pedidos__goback_button}  btn button--redRedborderTransparentHoverShadowtRed`}
                onClick={() => setOpenSidebar(true)}
              >
                <span className={styles.pedidos__black_arrow}>
                  <Image src={arrow_right_black} />
                </span>
                <div>Atrás</div>
              </button>
              <h1>Pedidos</h1>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default pedidos;
