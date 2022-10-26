import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

//Session
import { useSession } from 'next-auth/react';

//Styles
import styles from './StudentConfirmForm.module.scss';

//Components
import EmailVerification from '@components/UsedInSpecificRoutes/auth/register/step3_email_verification/EmailVerification';
import StuIdVerification from '@components/UsedInSpecificRoutes/auth/register/step3_stu_id_verification/StuIdVerification';

//Assets
import email_verification_icon from '@assets/GeneralUse/IconsAndButtons/send_email_2.svg';
import stu_id_verification_icon from '@assets/GeneralUse/IconsAndButtons/stu_id_upload.svg';

const StudentConfirmForm = () => {
  const { data: session, status } = useSession();

  const [verificationMethod, setVerificationMethod] = useState('');

  //Redirecting if not logged in
  if (status === 'unauthenticated') {
    router.push('/auth/login');
  }

  {
    /* //////////////////////////////
       //  Stu email verification  //
      /////////////////////////////*/
  }

  if (verificationMethod === 'stu_email') {
    return (
      <EmailVerification
        setVerificationMethod={setVerificationMethod}
        user_id={session?.token.sub}
      />
    );
  }

  {
    /* /////////////////////////
   //   Stu ID verification   //
   ////////////////////////////*/
  }

  if (verificationMethod === 'stu_id') {
    return <StuIdVerification setVerificationMethod={setVerificationMethod} />;
  }

  {
    /*///////////////////////////////
   // Choose option/default screen //
   ////////////////////////////////*/
  }
  return (
    <div className={styles.container}>
      <h1>Regístrate gratis</h1>
      <h4>Paso 3 de 3</h4>
      <p className={styles.subtitle}>Selecciona un método de verificación</p>

      <ul className={styles.options}>
        <li
          onClick={() => {
            setVerificationMethod('stu_email');
          }}
        >
          <div className={styles.iconContainer}>
            <Image src={email_verification_icon} />
          </div>
          <div>
            <h4>Verificar con mi correo de estudiante</h4>
            <p>Te enviaremos un enlace de verificación</p>
          </div>
        </li>
        <li
          onClick={() => {
            setVerificationMethod('stu_id');
          }}
        >
          <div className={styles.iconContainer}>
            <Image src={stu_id_verification_icon} />
          </div>
          <div>
            <h4>Subir mi identificación de estudiante</h4>
            <p>Verificaremos tu cuenta manualmente</p>
          </div>
        </li>
      </ul>

      <p className={styles.pause_verif_process_message}>
        Si no quieres verificar tu estatus de estudiante ahora, puedes continuar
        más tarde. Para ello, simplemente inicia sesión con tu dirección de
        Email y contraseña, y finaliza el proceso de verificación. Ten en cuenta
        que mientras no te hayas verificado, no tendrás acceso total a nuestras
        ofertas.
      </p>
      <div className={styles.contactButton}>
        <Link href={'/contacto'}>Contáctanos</Link>
      </div>
    </div>
  );
};

export default StudentConfirmForm;
