import Image from 'next/image';

//Styles
import styles from './NotFound404.module.scss';

//Assets
import NotFoundImage from '@assets/PagesImages/NotFoundImages/NotFound404.svg';

const NotFound404 = ({
  title = 'No se ha encontrado lo que buscabas',
  message = 'Probablemente no existe o ha sido eliminado. Inténtalo más tarde o ponte en contacto con el administrador',
}) => {
  return (
    <div className={styles.container}>
      <main>
        <h2>{title}</h2>
        <figure>
          <Image src={NotFoundImage} alt='Página no encontrada' />
        </figure>
        <p>{message}</p>
      </main>
    </div>
  );
};

export default NotFound404;
