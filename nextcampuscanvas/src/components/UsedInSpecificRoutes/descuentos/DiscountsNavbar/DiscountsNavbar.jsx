import { useRouter } from 'next/router';
import Link from 'next/link';

//Styles
import styles from './DiscountsNavbar.module.scss';

const DiscountsNavbar = () => {
  const router = useRouter();
  return (
    <>
      <section className={styles.offers_header}>
        <ul>
          <Link href={'/descuentos/todos'}>
            <li
              className={
                router.pathname === '/descuentos/todos' ? styles.selected : ''
              }
            >
              TODOS
            </li>
          </Link>
          <span>•</span>
          <Link href={'/descuentos/moda'}>
            <li
              className={
                router.pathname === '/descuentos/moda' ? styles.selected : ''
              }
            >
              MODA
            </li>
          </Link>
          <span>•</span>
          <Link href={'/descuentos/belleza'}>
            <li
              className={
                router.pathname === '/descuentos/belleza' ? styles.selected : ''
              }
            >
              BELLEZA
            </li>
          </Link>
          <span>•</span>
          <Link href={'/descuentos/viajar'}>
            <li
              className={
                router.pathname === '/descuentos/viajar' ? styles.selected : ''
              }
            >
              VIAJAR
            </li>
          </Link>
          <span>•</span>
          <Link href={'/descuentos/alimentacion'}>
            <li
              className={
                router.pathname === '/descuentos/alimentacion' &&
                styles.selected
              }
            >
              ALIMENTOS
            </li>
          </Link>
          <span>•</span>
          <Link href={'/descuentos/entretenimiento'}>
            <li
              className={
                router.pathname === '/descuentos/entretenimiento' &&
                styles.selected
              }
            >
              ENTRETENIMIENTO
            </li>
          </Link>
          <span>•</span>
          <Link href={'/descuentos/tecnologia'}>
            <li
              className={
                router.pathname === '/descuentos/tecnologia'
                  ? styles.selected
                  : ''
              }
            >
              TECNOLOGÍA
            </li>
          </Link>
          <span>•</span>
          <Link href={'/descuentos/otros'}>
            <li
              className={
                router.pathname === '/descuentos/otros' ? styles.selected : ''
              }
            >
              OTROS
            </li>
          </Link>
        </ul>
      </section>
    </>
  );
};

export default DiscountsNavbar;
