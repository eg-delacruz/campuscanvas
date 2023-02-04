import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

//styles
import styles from '@styles/pagestyles/admin/descuentos/gestionarMarcas.module.scss';

//Components
import AdminHeader from '@components/UsedInSpecificRoutes/Admin/AdminHeader/AdminHeader';
import Loader from '@components/GeneralUseComponents/Loader/Loader';
import ButtonBack from '@components/GeneralUseComponents/ButtonBack/ButtonBack';
import DisplayNewBrandModal from '@components/UsedInSpecificRoutes/Admin/Descuentos/Brands/DisplayNewBrandModal';

//hooks
import useSecureAdminRoute from '@hooks/useSecureAdminRoute';

//Redux actions
import { getBrands, selectBrand } from '@redux/brandsSlice';

const gestionarMarcas = () => {
  const { securingRoute } = useSecureAdminRoute();

  const [showModal, setShowModal] = useState(false);

  //Allows us to manipulate the appropriate slice/action
  const dispatch = useDispatch();

  //Reducers
  const brandsReducer = useSelector(selectBrand);

  useEffect(() => {
    const setBrands = async () => {
      dispatch(getBrands());
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
                brandsReducer.brands.map((brand) => (
                  <div className={styles.brand} key={brand._id}>
                    <h5>{brand.brand_name}</h5>{' '}
                    <div>
                      <span> Editar </span> <span> Eliminar </span>
                    </div>
                  </div>
                ))
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
