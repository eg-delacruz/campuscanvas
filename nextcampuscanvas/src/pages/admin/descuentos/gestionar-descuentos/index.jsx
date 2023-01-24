import Link from 'next/link';
import { useEffect, useState } from 'react';

//styles
import styles from '@styles/pagestyles/admin/descuentos/gestionarDescuentos.module.scss';

//hooks
import useSecureAdminRoute from '@hooks/useSecureAdminRoute';
import useAxios from '@hooks/useAxios';

//Components
import Loader from '@components/GeneralUseComponents/Loader/Loader';
import ButtonBack from '@components/GeneralUseComponents/ButtonBack/ButtonBack';
import SecondaryHeader from '@components/GeneralUseComponents/SecondaryHeader/SecondaryHeader';

//Services
import dateFormat from '@services/dateFormat';

//Endpoints
import endPoints from '@services/api';

const index = () => {
  const { securingRoute } = useSecureAdminRoute();

  const { fetchData, cancel } = useAxios();

  const [state, setState] = useState({
    discounts: [],
    error: null,
    loadingDiscounts: true,
  });

  useEffect(() => {
    const getDiscounts = async () => {
      const discounts = await fetchData(
        endPoints.discounts.getAllDiscounts,
        'get'
      );
      if (discounts.error) {
        setState({ ...state, error: discounts.error, loadingDiscounts: false });
        return;
      }
      setState({
        ...state,
        discounts: discounts.body,
        error: null,
        loadingDiscounts: false,
      });
    };
    getDiscounts();
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

        {state.discounts.length > 0 ? (
          <p className={styles.table_explanation}>
            Las fechas de caducidad de los descuentos que hayan expirado se
            marcan en rojo.
          </p>
        ) : (
          ''
        )}
        <section className={styles.discounts}>
          {state.loadingDiscounts ? (
            <Loader />
          ) : state.discounts.length > 0 ? (
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
                  {state.discounts.map((discount) => (
                    <tr className={styles.discount} key={discount._id}>
                      <Link href={'#'}>
                        <td className={styles.column1}>
                          <h5>{discount.SEO_meta_title}</h5>
                        </td>
                      </Link>
                      <td className={styles.column2}>{discount.brand}</td>
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
          {state.error && <p>{state.error}</p>}
        </div>
      </div>
    </>
  );
};

export default index;
