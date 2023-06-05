import Link from 'next/link';

//Styles
import styles from './AdminDiscountsTable.module.scss';

//Services
import dateFormat from '@services/dateFormat';

//Components
import Loader from '@components/GeneralUseComponents/Loader/Loader';

const AdminDiscountsTable = ({ discounts, loading, error }) => {
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

  return (
    <>
      <section className={styles.discounts}>
        {loading ? (
          <Loader />
        ) : discounts.length > 0 ? (
          <>
            <table className={styles.discounts_table}>
              <thead>
                <tr>
                  <th>Título</th>
                  <th>Marca</th>
                  <th>Categoría</th>
                  <th>Tipo de descuento</th>
                  <th>Sección en Home</th>
                  <th>Disponible para</th>
                  <th>Válido desde</th>
                  <th>Válido hasta</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {discounts.map((discount) => (
                  <tr className={styles.discount} key={discount._id}>
                    <Link
                      href={`/admin/descuentos/gestionar-descuentos/editar-descuento/${discount._id}`}
                    >
                      <td className={styles.column1}>
                        <h5>{discount.title}</h5>
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
                      <td className={styles.column4}>{discount.type}</td>
                    </Link>
                    <Link
                      href={`/admin/descuentos/gestionar-descuentos/editar-descuento/${discount._id}`}
                    >
                      <td className={styles.column5}>
                        {discount.display_in_section}
                      </td>
                    </Link>
                    <Link
                      href={`/admin/descuentos/gestionar-descuentos/editar-descuento/${discount._id}`}
                    >
                      <td className={styles.column6}>
                        {discount.available_for}
                      </td>
                    </Link>
                    <Link
                      href={`/admin/descuentos/gestionar-descuentos/editar-descuento/${discount._id}`}
                    >
                      <td className={styles.column7}>
                        {dateFormat.SlashDate(new Date(discount.valid_from))}
                      </td>
                    </Link>
                    <Link
                      href={`/admin/descuentos/gestionar-descuentos/editar-descuento/${discount._id}`}
                    >
                      <td
                        className={`${styles.column8} ${
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
                      <td className={`${styles.column9}`}>
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
          <p className={styles.no_discounts_message}>No hay descuentos</p>
        )}
      </section>

      <div className={styles.error_container}>{error && <p>{error}</p>}</div>
    </>
  );
};

export default AdminDiscountsTable;
