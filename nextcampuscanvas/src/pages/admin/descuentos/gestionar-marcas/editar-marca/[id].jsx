import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';

//Styles
import styles from '@styles/pagestyles/admin/descuentos/editarMarca.module.scss';

//Components
import AdminHeader from '@components/UsedInSpecificRoutes/Admin/AdminHeader/AdminHeader';
import ButtonBack from '@components/GeneralUseComponents/ButtonBack/ButtonBack';
import Loader from '@components/GeneralUseComponents/Loader/Loader';
import CustomCheckBox from '@components/GeneralUseComponents/CustomCheckBox/CustomCheckBox';

//hooks
import useSecureAdminRoute from '@hooks/useSecureAdminRoute';
import useAxios from '@hooks/useAxios';
import { useInputValue } from '@hooks/useInputValue';
import { useCharacterCount } from '@hooks/useCharacterCount';

//Redux
import { selectBrand } from '@redux/brandsSlice';
import { useSelector } from 'react-redux';

//Assets
import delete_icon from '@assets/GeneralUse/IconsAndButtons/delete.svg';

//Services
import dateFormat from '@services/dateFormat';

//Endpoints
import endPoints from '@services/api/index';

//TODO: this component will be responsible to refresh the global brands data if modified/deleted
//TODO: don´t forget to  refresh pertinent SSG pertinent paths if brand is modified/deleted
const editarMarca = () => {
  const { securingRoute } = useSecureAdminRoute('all');

  const { fetchData, cancel } = useAxios();

  //States
  const [state, setState] = useState({
    brand: {},
    loading: true,
    error: null,
    saving_changes: false,
  });

  const [discounts, setDiscounts] = useState({
    discounts: [],
    loading: true,
    error: null,
  });

  const [sponsorsBox, setSponsorsBox] = useState(false);

  console.log(state);

  const [showEliminateModal, setShowEliminateModal] = useState(false);

  //Get brand id
  const router = useRouter();
  const id = router.query.id;

  //Reducers
  const brandsReducer = useSelector(selectBrand);
  //Get brand info (start)
  useEffect(() => {
    //Await until the route is ready to get the brand_id
    if (!router.isReady) return;

    //Get the brand from global state if available to avoid unnecessary requests
    if (brandsReducer.brands.length > 0) {
      const brand = brandsReducer.brands.find((brand) => brand._id === id);
      if (brand) {
        setState({ ...state, brand, loading: false });
        setSponsorsBox(brand.sponsors_box);
        BRAND_DESCRIPTION.setValue(brand.brand_description);
        DESCRIPTION_COUNT.setValue(brand.brand_description.length);
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
        setSponsorsBox(response.body.sponsors_box);
        BRAND_DESCRIPTION.setValue(response.body.brand_description);
        DESCRIPTION_COUNT.setValue(response.body.brand_description.length);
      };
      getBrand();
    }
  }, [brandsReducer, router?.isReady]);
  //Get brand info (end)

  //Controlling inputs
  const BRAND_DESCRIPTION = useInputValue('');

  //Setting field counts
  const DESCRIPTION_COUNT = useCharacterCount();

  //Functions
  const handleDescriptionChange = (e) => {
    BRAND_DESCRIPTION.onChange(e);
    DESCRIPTION_COUNT.onChange(e);
  };

  const displayEliminateModal = () => {
    console.log('El modal para eliminaar');
    return <></>;
  };

  const handleEditBrand = async (e) => {
    e.preventDefault();
    //Handle errors and display them:
    //1. Don´t allow empty description

    const data = {
      sponsors_box: sponsorsBox,
      brand_description: BRAND_DESCRIPTION.value,
    };

    console.log(data);
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

        <form
          action=''
          method='POST'
          autoComplete='off'
          onSubmit={handleEditBrand}
        >
          {/* /////////////////////////
            //   Logo + brand name   //
             ///////////////////////// */}
          <div className={styles.logo_brand_container}>
            <div className={styles.logo_container}>
              {/* //on hover: iluminate a bit + cursor:pointer */}
              <img
                src={state.brand.brand_logo.URL}
                alt={state.brand.brand_name}
              />
            </div>
            <h1>{state.brand.brand_name}</h1>
          </div>

          {/* /////////////////////////
            //General info container//
             ///////////////////////// */}
          <div className={styles.general_info_container}>
            <div className={styles.general_info}>
              <p>
                <strong>Creado por: </strong>
                {state.brand.created_by}
              </p>
              <p>
                <strong>Actualizado por: </strong>
                {state.brand.updated_by ? state.brand.updated_by : ''}
              </p>
              <p>
                <strong>Actualizado por última vez: </strong>
                {dateFormat.SlashDate(new Date(state.brand.updated_at))}
              </p>
            </div>
            <CustomCheckBox
              message={'La marca patrocina Campus Box 🎁'}
              required={false}
              defaultChecked={state.brand.sponsors_box}
              onBoxCheck={() => {
                setSponsorsBox(!sponsorsBox);
              }}
            />
          </div>

          <div className={styles.description_container}>
            <label
              htmlFor='brand_description'
              className={`${styles.input_title}`}
            >
              Descripción
            </label>
            <textarea
              className={`${styles.description_text_area}`}
              name='brand_description'
              id='brand_description'
              type='text'
              placeholder='Recomendado: 520 caracteres aprox.'
              autoComplete='off'
              value={BRAND_DESCRIPTION.value}
              onChange={handleDescriptionChange}
              required
            />
            <p
              className={`${styles.char_count} ${
                DESCRIPTION_COUNT.value > 520 ? styles.char_count_warn : ''
              }`}
            >
              <span>{DESCRIPTION_COUNT.value} / 520</span>
            </p>
          </div>

          <button
            type='submit'
            className={`${styles.submit_btn} ${
              state.saving_changes && styles.buttonLoading
            } btn button--red`}
            disabled={state.saving_changes}
          >
            Guardar
          </button>
        </form>

        <div className={styles.eliminate_container}>
          <Image src={delete_icon} />
          <div
            className={styles.eliminate_text}
            onClick={displayEliminateModal}
          >
            Eliminar marca
          </div>
        </div>
        <div className={styles.discounts_container}>
          <h2>Descuentos asociados</h2>
          {/* TODO: show a loading state and error state */}
          {discounts.discounts.length === 0 ? (
            <p>No hay descuentos asociados a esta marca</p>
          ) : (
            <p>Aquí los descuentooos</p>
          )}
        </div>
      </div>
    </>
  );
};

export default editarMarca;
