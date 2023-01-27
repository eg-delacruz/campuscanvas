import { useRouter } from 'next/router';
import Link from 'next/link';

//Styles
import styles from './DiscountsNavbar.module.scss';

const DiscountsNavbar = () => {
  const router = useRouter();
  return (
    <>
      <section className={styles.discounts_header}>
        <ul>
          <Link href={'/descuentos/todos'}>
            <li
              className={
                router.pathname === '/descuentos/todos'
                  ? styles.selected
                  : undefined
              }
            >
              TODOS
            </li>
          </Link>

          <Link href={'/descuentos/moda'}>
            <li
              className={
                router.pathname === '/descuentos/moda'
                  ? styles.selected
                  : undefined
              }
            >
              MODA
            </li>
          </Link>

          <Link href={'/descuentos/belleza'}>
            <li
              className={
                router.pathname === '/descuentos/belleza'
                  ? styles.selected
                  : undefined
              }
            >
              BELLEZA
            </li>
          </Link>

          <Link href={'/descuentos/viajar'}>
            <li
              className={
                router.pathname === '/descuentos/viajar'
                  ? styles.selected
                  : undefined
              }
            >
              VIAJAR
            </li>
          </Link>

          <Link href={'/descuentos/alimentacion'}>
            <li
              className={
                router.pathname === '/descuentos/alimentacion'
                  ? styles.selected
                  : undefined
              }
            >
              ALIMENTOS
            </li>
          </Link>

          <Link href={'/descuentos/entretenimiento'}>
            <li
              className={
                router.pathname === '/descuentos/entretenimiento'
                  ? styles.selected
                  : undefined
              }
            >
              ENTRETENIMIENTO
            </li>
          </Link>

          <Link href={'/descuentos/tecnologia'}>
            <li
              className={
                router.pathname === '/descuentos/tecnologia'
                  ? styles.selected
                  : undefined
              }
            >
              TECNOLOGÍA
            </li>
          </Link>

          <Link href={'/descuentos/otros'}>
            <li
              className={
                router.pathname === '/descuentos/otros'
                  ? styles.selected
                  : undefined
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
