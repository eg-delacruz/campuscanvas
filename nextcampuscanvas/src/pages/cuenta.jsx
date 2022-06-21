//Styles
import styles from '@styles/pagestyles/Cuenta.module.scss';

//Components
import UserSidebar from '@components/GeneralUseComponents/UserSidebar/UserSidebar';

//Asegurar ruta
//Mirar SEO
const cuenta = () => {
  return (
    <div className={styles.profile}>
      <div className={styles.profile__container}>
        <UserSidebar />
        <main className={styles.profile__content}>
          Aquí irá todo el contenido de la persona
        </main>
      </div>
    </div>
  );
};

export default cuenta;
