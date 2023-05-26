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
          <li
            className={
              router.pathname === '/descuentos/todos'
                ? styles.selected
                : undefined
            }
          >
            <Link href={'/descuentos/todos'}>TODOS</Link>
          </li>

          <li
            className={
              router.pathname === '/descuentos/moda'
                ? styles.selected
                : undefined
            }
          >
            <Link href={'/descuentos/moda'}>MODA</Link>
          </li>

          <li
            className={
              router.pathname === '/descuentos/belleza'
                ? styles.selected
                : undefined
            }
          >
            <Link href={'/descuentos/belleza'}>BELLEZA</Link>
          </li>

          <li
            className={
              router.pathname === '/descuentos/viajar'
                ? styles.selected
                : undefined
            }
          >
            <Link href={'/descuentos/viajar'}>VIAJAR</Link>
          </li>

          <li
            className={
              router.pathname === '/descuentos/alimentacion'
                ? styles.selected
                : undefined
            }
          >
            <Link href={'/descuentos/alimentacion'}>ALIMENTOS</Link>
          </li>

          <li
            className={
              router.pathname === '/descuentos/entretenimiento'
                ? styles.selected
                : undefined
            }
          >
            <Link href={'/descuentos/entretenimiento'}>ENTRETENIMIENTO</Link>
          </li>

          <li
            className={
              router.pathname === '/descuentos/tecnologia'
                ? styles.selected
                : undefined
            }
          >
            <Link href={'/descuentos/tecnologia'}>TECNOLOGÍA</Link>
          </li>

          <li
            className={
              router.pathname === '/descuentos/otros'
                ? styles.selected
                : undefined
            }
          >
            <Link href={'/descuentos/otros'}>OTROS</Link>
          </li>
        </ul>
      </section>
    </>
  );
};

export default DiscountsNavbar;
