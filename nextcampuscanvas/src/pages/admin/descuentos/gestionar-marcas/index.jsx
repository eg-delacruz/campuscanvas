import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Link from 'next/link';

//styles
import styles from '@styles/pagestyles/admin/descuentos/gestionarMarcas.module.scss';

//Components
import AdminHeader from '@components/UsedInSpecificRoutes/Admin/AdminHeader/AdminHeader';
import Loader from '@components/GeneralUseComponents/Loader/Loader';
import ButtonBack from '@components/GeneralUseComponents/ButtonBack/ButtonBack';
import DisplayNewBrandModal from '@components/UsedInSpecificRoutes/Admin/Descuentos/Brands/DisplayNewBrandModal/DisplayNewBrandModal';

//hooks
import useSecureAdminRoute from '@hooks/useSecureAdminRoute';

//Redux
import { getBrands, selectBrand } from '@redux/brandsSlice';

//Services
import dateFormat from '@services/dateFormat';

//TODO: show brands count
const gestionarMarcas = () => {
  const { securingRoute } = useSecureAdminRoute();

  const [showModal, setShowModal] = useState(false);

  //Allows us to manipulate the appropriate slice/action
  const dispatch = useDispatch();

  //Reducers
  const brandsReducer = useSelector(selectBrand);

  useEffect(() => {
    const setBrands = async () => {
      if (brandsReducer.brands.length === 0) {
        dispatch(getBrands());
      }
    };
    setBrands();
  }, []);

  const displayNewBrandModal = () => {
    return (
      <DisplayNewBrandModal showModal={showModal} setShowModal={setShowModal} />
    );
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
      {displayNewBrandModal()}
      <AdminHeader />
      <div className={`${styles.container} container`}>
        <ButtonBack prevRoute={'/admin/descuentos'} />

        <div className={styles.title_create_brand_container}>
          <h1>Marcas</h1>
          <button
            className='btn button--red'
            onClick={() => setShowModal(true)}
          >
            <span>+ </span>Crear marca
          </button>
        </div>

        <section className={styles.brands}>
          {brandsReducer.loading ? (
            <Loader />
          ) : (
            <>
              {brandsReducer.brands.length > 0 ? (
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <th className={styles.column1}></th>
                      <th>Marca</th>
                      <th>
                        Patrocina <br /> Campus Box
                      </th>
                      <th>Actualizado</th>
                    </tr>
                  </thead>

                  <tbody>
                    {brandsReducer.brands.map((brand) => (
                      <tr key={brand._id}>
                        <Link
                          href={`/admin/descuentos/gestionar-marcas/editar-marca/${brand._id}`}
                        >
                          <td className={styles.column1}>
                            <img
                              className={styles.logo}
                              src={brand.brand_logo.URL}
                              alt={brand.brand_name}
                            />
                          </td>
                        </Link>
                        <Link
                          href={`/admin/descuentos/gestionar-marcas/editar-marca/${brand._id}`}
                        >
                          <td className={styles.column2}>
                            <h5>{brand.brand_name}</h5>
                          </td>
                        </Link>
                        <Link
                          href={`/admin/descuentos/gestionar-marcas/editar-marca/${brand._id}`}
                        >
                          <td className={styles.column3}>
                            {brand.sponsors_box ? (
                              <span className={styles.check_icon_container}>
                                ✅
                              </span>
                            ) : (
                              <span className={styles.x_icon_container}>x</span>
                            )}
                          </td>
                        </Link>
                        <Link
                          href={`/admin/descuentos/gestionar-marcas/editar-marca/${brand._id}`}
                        >
                          <td className={styles.column4}>
                            {dateFormat.SlashDate(new Date(brand.updated_at))}
                          </td>
                        </Link>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p>No hay marcas</p>
              )}
            </>
          )}
          {brandsReducer.error ? <p>{brandsReducer.error}</p> : null}
        </section>
      </div>
    </>
  );
};

export default gestionarMarcas;
