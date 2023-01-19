import { useState, useEffect } from 'react';

//styles
import styles from '@styles/pagestyles/admin/descuentos/gestionarMarcas.module.scss';

//Components
import SecondaryHeader from '@components/GeneralUseComponents/SecondaryHeader/SecondaryHeader';
import Loader from '@components/GeneralUseComponents/Loader/Loader';
import ButtonBack from '@components/GeneralUseComponents/ButtonBack/ButtonBack';
import DisplayNewBrandModal from '@components/UsedInSpecificRoutes/Admin/Descuentos/DisplayNewBrandModal';

//hooks
import useSecureAdminRoute from '@hooks/useSecureAdminRoute';
import useAxios from '@hooks/useAxios';

//Endpoints
import endPoints from '@services/api';

const gestionarMarcas = () => {
  const { securingRoute } = useSecureAdminRoute();

  const [showModal, setShowModal] = useState(false);
  const [brands, setBrands] = useState([]);
  const [state, setState] = useState({
    loading: true,
    error: '',
  });

  const { fetchData, cancel } = useAxios();
  console.log(brands);
  //TODO: get brands in global state to reuse later
  useEffect(() => {
    getBrands();
  }, []);

  const getBrands = async () => {
    const response = await fetchData(endPoints.discounts.brands, 'get');

    if (response?.error) {
      setState({ ...state, error: response.error });
    }
    setBrands(response.body);
    setState({ ...state, loading: false });
  };

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
      <SecondaryHeader />
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
          {state.loading ? (
            <Loader />
          ) : (
            <>
              {brands.length > 0 ? (
                brands.map((brand) => (
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
        </section>
      </div>
    </>
  );
};

export default gestionarMarcas;
