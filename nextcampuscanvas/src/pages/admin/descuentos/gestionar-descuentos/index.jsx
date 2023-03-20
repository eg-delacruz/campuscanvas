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
import AdminHeader from '@components/UsedInSpecificRoutes/Admin/AdminHeader/AdminHeader';

//Services
import dateFormat from '@services/dateFormat';

//Redux
import { getDiscounts, selectDiscount } from '@redux/discountsSlice';
import {
  countDiscounts,
  selectCountDiscounts,
} from '@redux/discountsCountSlice';

//TODO: complete the display in section column/workflow
const index = () => {
  const { securingRoute } = useSecureAdminRoute();

  //Allows us to manipulate the appropriate slice/action
  const dispatch = useDispatch();

  //Reducers
  const discountsReducer = useSelector(selectDiscount);
  const discountsCountReducer = useSelector(selectCountDiscounts);

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
    if (!discountsCountReducer.initial_render_loaded) {
      dispatch(countDiscounts());
    }
  }, []);

  const valid_till_date_color = (date) => {
    const today = new Date();
    const valid_till_date = new Date(date);

    //Expired styles
    if (today > valid_till_date) {
      return styles.expired;
    }
    //Expires in the following 5 days
    else if (today < valid_till_date) {
      const difference = valid_till_date - today;
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      if (days < 5) {
        return styles.expiring_soon;
      }
    }
  };

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
          <h1>Descuentos ({discountsCountReducer.count})</h1>
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
            Las fechas de caducidad de los descuentos que expiren durante los
            próximos 5 días se marcarán en amarillo, los que ya hayan expirado
            se marcan en rojo.
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
                    <th>Categoría</th>
                    <th>Sección en Home</th>
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
                        <td className={styles.column3}>{discount.category}</td>
                      </Link>
                      <Link
                        href={`/admin/descuentos/gestionar-descuentos/editar-descuento/${discount._id}`}
                      >
                        <td>
                          {discount.display_in_section ? (
                            <>{discount.display_in_section}</>
                          ) : (
                            ''
                          )}
                        </td>
                      </Link>
                      <Link
                        href={`/admin/descuentos/gestionar-descuentos/editar-descuento/${discount._id}`}
                      >
                        <td className={styles.column4}>
                          {dateFormat.SlashDate(new Date(discount.valid_from))}
                        </td>
                      </Link>
                      <Link
                        href={`/admin/descuentos/gestionar-descuentos/editar-descuento/${discount._id}`}
                      >
                        <td
                          className={`${styles.column5} ${
                            discount.expiration_date
                              ? valid_till_date_color(discount.expiration_date)
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
                        <td className={`${styles.column6}`}>
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
