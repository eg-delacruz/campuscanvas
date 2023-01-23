import Link from 'next/link';

//styles
import styles from '@styles/pagestyles/admin/descuentos/gestionarDescuentos.module.scss';

//hooks
import useSecureAdminRoute from '@hooks/useSecureAdminRoute';

//Components
import Loader from '@components/GeneralUseComponents/Loader/Loader';
import ButtonBack from '@components/GeneralUseComponents/ButtonBack/ButtonBack';
import SecondaryHeader from '@components/GeneralUseComponents/SecondaryHeader/SecondaryHeader';

//Services
import dateFormat from '@services/dateFormat';

const index = () => {
  const { securingRoute } = useSecureAdminRoute();

  //TODO: Refetch all discounts everytime in a useEffect

  const DESCUENTOS = [
    {
      id: 1,
      SEO_meta_title: '5% de descuento en Grover',
      brand: { brand_name: 'Grover' },
      valid_from: new Date(),
      expiration_date: new Date(),
    },
    {
      id: 2,
      SEO_meta_title: '30% descuento en tiendas físicas Adidas',
      brand: { brand_name: 'Adidas' },
      valid_from: new Date(),
      expiration_date: new Date(),
    },
    {
      id: 3,
      SEO_meta_title: '15% descuento en ASOS',
      brand: { brand_name: 'ASOS' },
      valid_from: new Date(),
      expiration_date: new Date(),
    },
    {
      id: 4,
      SEO_meta_title: 'Rebajas del 60% + 10% descuento en Efeee',
      brand: { brand_name: 'Efeee' },
      valid_from: new Date(),
      expiration_date: new Date(),
    },
  ];

  if (securingRoute) {
    return (
      <div className={styles.loaderContainer}>
        <Loader />
      </div>
    );
  }

  return (
    <>
      <SecondaryHeader />
      <div className={`${styles.container} container`}>
        <ButtonBack prevRoute={'/admin/descuentos'} />

        {/* /////////////////////////
         //Title + button container//
         ///////////////////////// */}
        <div className={styles.title_flex_container}>
          <h1>Descuentos</h1>
          <Link href={'/admin/descuentos/gestionar-descuentos/nuevo-descuento'}>
            <button className='btn button--red'>
              <span>+ </span>Crear descuento
            </button>
          </Link>
        </div>

        {/* /////////////////////////
          //       Discounts        //
          ///////////////////////// */}

        <section className={styles.discounts}>
          {/* TODO: add a loading state as in gestionar-marcas.jsx */}
          {DESCUENTOS.length > 0 ? (
            <>
              <table className={styles.discounts_table}>
                <thead>
                  <tr>
                    <th>Título</th>
                    <th>Marca</th>
                    <th>Válido desde</th>
                    <th>Válido hasta</th>
                  </tr>
                </thead>

                <tbody>
                  {DESCUENTOS.map((discount) => (
                    <tr className={styles.discount} key={discount.id}>
                      <Link href={'#'}>
                        <td className={styles.column1}>
                          <h5>{discount.SEO_meta_title}</h5>
                        </td>
                      </Link>
                      <td className={styles.column2}>
                        {discount.brand.brand_name}
                      </td>
                      <td className={styles.column3}>
                        {dateFormat.SlashDate(discount.valid_from)}
                      </td>
                      {/* TODO: background red if already expired */}
                      <td className={styles.column4}>
                        {dateFormat.SlashDate(discount.valid_from)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          ) : (
            <p>No hay descuentos</p>
          )}
        </section>
      </div>
    </>
  );
};

export default index;
