import { useState } from 'react';

//styles
import styles from '@styles/pagestyles/admin/descuentos/gestionarMarcas.module.scss';

//Components
import SecondaryHeader from '@components/GeneralUseComponents/SecondaryHeader/SecondaryHeader';
import Loader from '@components/GeneralUseComponents/Loader/Loader';
import ButtonBack from '@components/GeneralUseComponents/ButtonBack/ButtonBack';
import DisplayNewBrandModal from '@components/UsedInSpecificRoutes/Admin/Descuentos/DisplayNewBrandModal';

//hooks
import useSecureAdminRoute from '@hooks/useSecureAdminRoute';

const gestionarMarcas = () => {
  const { securingRoute } = useSecureAdminRoute();

  const [showModal, setShowModal] = useState(false);

  const BRANDS = [
    {
      id: 1,
      name: 'Marca 1',
    },
    {
      id: 2,
      name: 'Marca 2',
    },
    {
      id: 3,
      name: 'Marca 3',
    },
    {
      id: 4,
      name: 'Marca 4',
    },
  ];

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
          {BRANDS.length > 0 ? (
            BRANDS.map((brand) => (
              <div className={styles.brand} key={brand.id}>
                <h5>{brand.name}</h5>{' '}
                <div>
                  <span> Editar </span> <span> Eliminar </span>
                </div>
              </div>
            ))
          ) : (
            <p>No hay marcas</p>
          )}
        </section>
      </div>
    </>
  );
};

export default gestionarMarcas;
