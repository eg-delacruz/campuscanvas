import Link from 'next/link';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

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

//Redux
import { getDiscounts, selectDiscount } from '@redux/discountsSlice';

//TODO: display discount amount
const index = () => {
  const { securingRoute } = useSecureAdminRoute();

  //Allows us to manipulate the appropriate slice/action
  const dispatch = useDispatch();
  //Reducers
  const discountsReducer = useSelector(selectDiscount);

  useEffect(() => {
    const setDiscounts = async () => {
      if (discountsReducer.discounts.length === 0) {
        dispatch(getDiscounts());
      }
    };
    setDiscounts();
  }, []);

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

        {discountsReducer.discounts.length > 0 ? (
          <p className={styles.table_explanation}>
            Las fechas de caducidad de los descuentos que hayan expirado se
            marcan en rojo.
          </p>
        ) : (
          ''
        )}
        <section className={styles.discounts}>
          {discountsReducer.loading ? (
            <Loader />
          ) : discountsReducer.discounts.length > 0 ? (
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
                  {discountsReducer.discounts.map((discount) => (
                    <tr className={styles.discount} key={discount._id}>
                      <td className={styles.column1}>
                        <Link
                          href={`/admin/descuentos/gestionar-descuentos/editar-descuento/${discount._id}`}
                        >
                          <h5>{discount.SEO_meta_title}</h5>
                        </Link>
                      </td>
                      <td className={styles.column2}>
                        {discount.brand.brand_name}
                      </td>
                      <td className={styles.column3}>
                        {dateFormat.SlashDate(new Date(discount.valid_from))}
                      </td>
                      <td
                        className={`${styles.column4} ${
                          discount.expiration_date
                            ? new Date() > new Date(discount.expiration_date)
                              ? `${styles.expired}`
                              : ''
                            : ''
                        }`}
                      >
                        {discount.expiration_date
                          ? dateFormat.SlashDate(
                              new Date(discount.expiration_date)
                            )
                          : 'No expira'}
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

        <div className={styles.error_container}>
          {discountsReducer.error && <p>{discountsReducer.error}</p>}
        </div>
      </div>
    </>
  );
};

export default index;
