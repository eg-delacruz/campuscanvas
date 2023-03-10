import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

//styles
import styles from '@styles/pagestyles/admin/descuentos/gestionarDescuentos.module.scss';

//hooks
import useSecureAdminRoute from '@hooks/useSecureAdminRoute';

//Components
import Loader from '@components/GeneralUseComponents/Loader/Loader';
import ButtonBack from '@components/GeneralUseComponents/ButtonBack/ButtonBack';
import AdminHeader from '@components/UsedInSpecificRoutes/Admin/AdminHeader/AdminHeader';

//Services
import dateFormat from '@services/dateFormat';
import axiosFetcher from '@services/axiosFetcher';

//Redux
import { getDiscounts, selectDiscount } from '@redux/discountsSlice';

//endpoints
import endpoints from '@services/api/index';

const index = () => {
  const { securingRoute } = useSecureAdminRoute();

  //States
  const [discountsCount, setDiscountsCount] = useState(0);

  //Allows us to manipulate the appropriate slice/action
  const dispatch = useDispatch();
  //Reducers
  const discountsReducer = useSelector(selectDiscount);

  //Get discounts
  useEffect(() => {
    const setDiscounts = async () => {
      if (discountsReducer.discounts.length === 0) {
        dispatch(getDiscounts());
      }
    };
    setDiscounts();
  }, []);

  //Get discounts count
  useEffect(() => {
    const getDiscountsCount = async () => {
      const discountsCount = await axiosFetcher({
        url: endpoints.discounts.index,
        method: 'get',
        extraHeaders: {
          needed_info: 'discounts_count',
        },
      });

      if (discountsCount.error) {
        return console.error('Ha habido un error: ', discountsCount.error);
      }
      setDiscountsCount(discountsCount.body.count);
    };
    getDiscountsCount();
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
      <AdminHeader />
      <div className={`${styles.container} container`}>
        <ButtonBack prevRoute={'/admin/descuentos'} />

        {/* /////////////////////////
         //Title + button container//
         ///////////////////////// */}
        <div className={styles.title_flex_container}>
          <h1>Descuentos ({discountsCount})</h1>
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
                    <th>Status</th>
                  </tr>
                </thead>

                <tbody>
                  {discountsReducer.discounts.map((discount) => (
                    <tr className={styles.discount} key={discount._id}>
                      <Link
                        href={`/admin/descuentos/gestionar-descuentos/editar-descuento/${discount._id}`}
                      >
                        <td className={styles.column1}>
                          <h5>{discount.SEO_meta_title}</h5>
                        </td>
                      </Link>
                      <Link
                        href={`/admin/descuentos/gestionar-descuentos/editar-descuento/${discount._id}`}
                      >
                        <td className={styles.column2}>
                          {discount.brand.brand_name}
                        </td>
                      </Link>
                      <Link
                        href={`/admin/descuentos/gestionar-descuentos/editar-descuento/${discount._id}`}
                      >
                        <td className={styles.column3}>
                          {dateFormat.SlashDate(new Date(discount.valid_from))}
                        </td>
                      </Link>
                      <Link
                        href={`/admin/descuentos/gestionar-descuentos/editar-descuento/${discount._id}`}
                      >
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
                      </Link>
                      <Link
                        href={`/admin/descuentos/gestionar-descuentos/editar-descuento/${discount._id}`}
                      >
                        <td className={`${styles.column5}`}>
                          <div
                            className={` ${
                              discount.status === 'available'
                                ? styles.available
                                : styles.unavailable
                            }`}
                          >
                            {discount.status}
                          </div>
                        </td>
                      </Link>
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
