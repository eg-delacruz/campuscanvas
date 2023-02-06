import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

//Styles
import styles from '@styles/pagestyles/admin/descuentos/editarMarca.module.scss';

//Components
import AdminHeader from '@components/UsedInSpecificRoutes/Admin/AdminHeader/AdminHeader';
import ButtonBack from '@components/GeneralUseComponents/ButtonBack/ButtonBack';
import Loader from '@components/GeneralUseComponents/Loader/Loader';

//hooks
import useSecureAdminRoute from '@hooks/useSecureAdminRoute';
import useAxios from '@hooks/useAxios';

//Redux
import { selectBrand } from '@redux/brandsSlice';
import { useSelector } from 'react-redux';

//Assets
import delete_icon from '@assets/GeneralUse/IconsAndButtons/delete.svg';

//Endpoints
import endPoints from '@services/api/index';

//TODO: this component will be responsible to refresh the global brands data if modified/deleted
const editarMarca = () => {
  const { securingRoute } = useSecureAdminRoute('all');

  const { fetchData, cancel } = useAxios();

  //States
  const [state, setState] = useState({
    //TODO: prove if brand.updated_by comes and conditionally render something, since not all brands have that property
    brand: {},
    loading: true,
    error: null,
  });

  console.log(state);

  const [showEliminateModal, setShowEliminateModal] = useState(false);

  //Get brand id
  const router = useRouter();
  const id = router.query.id;

  //Reducers
  const brandsReducer = useSelector(selectBrand);
  //Get brand info
  useEffect(() => {
    //Await until the route is ready to get the brand_id
    if (!router.isReady) return;

    //Get the brand from global state if available to avoid unnecessary requests
    if (brandsReducer.brands.length > 0) {
      const brand = brandsReducer.brands.find((brand) => brand._id === id);
      if (brand) {
        setState({ ...state, brand, loading: false });
      }
      return;
    }

    //If the brand is not available in global state, get it from the server
    if (Object.keys(state.brand).length === 0) {
      const getBrand = async () => {
        const response = await fetchData(
          endPoints.discounts.getBrandById(id),
          'get',
          null,
          { required_info: 'single_brand' }
        );

        if (response.error) {
          //Redirect if discount doesn´t exist
          if (response.error === 'No se ha encontrado la marca') {
            //Show a swal
            const customSwal = Swal.mixin({
              customClass: {
                confirmButton: 'btn button--red',
              },
              buttonsStyling: false,
            });
            customSwal
              .fire({
                title: response.error,
                text: 'La marca que intenta editar no existe',
                icon: 'error',
                confirmButtonText: 'Aceptar',
              })
              .then(() => {
                router.push('/admin/descuentos/gestionar-marcas');
              });
          }
          setState({
            ...state,
            error: response.error,
            loading: false,
          });
          return;
        }
        setState({
          ...state,
          brand: response.body,
          loading: false,
          error: null,
        });
      };
      getBrand();
    }
  }, [brandsReducer, router?.isReady]);

  const displayEliminateModal = () => {
    return <></>;
  };

  if (securingRoute || state.loading) {
    return (
      <div className={styles.loaderContainer}>
        <Loader />
      </div>
    );
  }
  return (
    <>
      <AdminHeader />
      {displayEliminateModal()}
      <div className={`${styles.container} container`}>
        <ButtonBack prevRoute={'/admin/descuentos/gestionar-marcas'} />
        <h1>{id}</h1>
      </div>
    </>
  );
};

export default editarMarca;
