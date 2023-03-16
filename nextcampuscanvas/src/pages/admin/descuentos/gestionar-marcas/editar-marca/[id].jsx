import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Swal from 'sweetalert2';
import Link from 'next/link';

//Styles
import styles from '@styles/pagestyles/admin/descuentos/editarMarca.module.scss';

//Components
import AdminHeader from '@components/UsedInSpecificRoutes/Admin/AdminHeader/AdminHeader';
import ButtonBack from '@components/GeneralUseComponents/ButtonBack/ButtonBack';
import Loader from '@components/GeneralUseComponents/Loader/Loader';
import DisplayEliminateBrandModal from '@components/UsedInSpecificRoutes/Admin/Descuentos/Brands/DisplayEliminateBrandModal/DisplayEliminateBrandModal';
import NotFound404 from '@components/GeneralUseComponents/NotFound404/NotFound404';
import CustomCheckBox from '@components/GeneralUseComponents/CustomCheckBox/CustomCheckBox';

//hooks
import useSecureAdminRoute from '@hooks/useSecureAdminRoute';
import useAxios from '@hooks/useAxios';
import { useInputValue } from '@hooks/useInputValue';
import { useCharacterCount } from '@hooks/useCharacterCount';

//Redux
import { getBrands, selectBrand } from '@redux/brandsSlice';
import { useSelector, useDispatch } from 'react-redux';

//Assets
import delete_icon from '@assets/GeneralUse/IconsAndButtons/delete.svg';
import edit_pencil from '@assets/GeneralUse/IconsAndButtons/edit_pencil.svg';

//Services
import dateFormat from '@services/dateFormat';

//Endpoints
import endPoints from '@services/api/index';

const editarMarca = () => {
  const { securingRoute } = useSecureAdminRoute('all');

  const { fetchData, cancel } = useAxios();

  //Allows us to manipulate the appropriate slice/action
  const dispatch = useDispatch();

  //States
  const [state, setState] = useState({
    brand: {},
    loading: true,
    error: null,
    saving_changes: false,
    saving_changes_error: null,
  });

  const [discounts, setDiscounts] = useState({
    discounts: [],
    loading: true,
    error: null,
  });

  const [newBrandLogo, setNewBrandLogo] = useState({
    newLogo: [],
    error: null,
    logoPreview: '',
  });
  const [discountsCount, setDiscountsCount] = useState(0);
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
        SPONSORS_BOX.setValue(brand.sponsors_box);
        BRAND_DESCRIPTION.setValue(brand.brand_description);
        DESCRIPTION_COUNT.setValue(brand.brand_description.length);
        return;
      }
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
        SPONSORS_BOX.setValue(response.body.sponsors_box);
        BRAND_DESCRIPTION.setValue(response.body.brand_description);
        DESCRIPTION_COUNT.setValue(response.body.brand_description.length);
      };
      getBrand();
    }
  }, [brandsReducer, router?.isReady]);
  //Get brand info (end)

  //Get discounts asociated to this brand (start)
  useEffect(() => {
    //Await until the route is ready to get the brand_id
    if (!router.isReady) return;

    const getDiscounts = async () => {
      const responses = await Promise.allSettled([
        fetchData(endPoints.discounts.index, 'get', null, {
          needed_info: 'discounts_by_brand',
          brand_id: id,
        }),
        fetchData(endPoints.discounts.index, 'get', null, {
          needed_info: 'discounts_count_by_brand',
          brand_id: id,
        }),
      ]);

      const [discountsResponse, discountsCountResponse] = responses;

      if (discountsResponse.status === 'rejected') {
        setDiscounts({
          ...discounts,
          error: discountsResponse.reason,
          loading: false,
        });
        return;
      }

      if (discountsCountResponse.status === 'rejected') {
        setDiscounts({
          ...discounts,
          error: discountsCountResponse.reason,
          loading: false,
        });
        return;
      }

      setDiscounts({
        ...discounts,
        discounts: discountsResponse.value.body,
        loading: false,
        error: null,
      });
      setDiscountsCount(discountsCountResponse.value.body.count);
    };
    getDiscounts();
  }, [router?.isReady]);
  //Get discounts asociated to this brand (end)

  //Controlling inputs
  const BRAND_DESCRIPTION = useInputValue('');
  const SPONSORS_BOX = useInputValue(state.brand?.sponsors_box);

  //Setting field counts
  const DESCRIPTION_COUNT = useCharacterCount();

  //Functions
  const handleDescriptionChange = (e) => {
    BRAND_DESCRIPTION.onChange(e);
    DESCRIPTION_COUNT.onChange(e);
  };

  const displayEliminateModal = () => {
    // If this brand has any asociated discounts, show a swal and dont allow to delete
    if (discounts.discounts.length > 0) {
      const customSwal = Swal.mixin({
        customClass: {
          confirmButton: 'btn button--red',
        },
        buttonsStyling: false,
      });
      customSwal.fire(
        '¡Hay descuentos asociados!',
        'Elimina los descuentos asociados antes de eliminar la marca',
        'error'
      );
      return false;
    }

    setShowEliminateModal(true);
  };

  const handleDisplayEliminateModal = () => {
    return (
      <DisplayEliminateBrandModal
        showModal={showEliminateModal}
        setShowModal={setShowEliminateModal}
        id={id}
        brandLogoFileName={state.brand.brand_logo.name}
      />
    );
  };

  //Handle change brand logo (start)
  const onNewFile = (e) => {
    const allowedFileFormats = ['svg', 'png'];
    const newFile = e.target.files[0];
    //4 MB aprox.
    const maxSizeAllowed = 4194304;

    //Allow only certain file formats
    const dots = newFile.name.split('.');
    const newFileType = dots[dots.length - 1];

    if (!allowedFileFormats.includes(newFileType)) {
      setNewBrandLogo({
        ...newBrandLogo,
        error:
          'Debes subir un archivo preferentemente en formato SVG, o un PNG de 230 x 230 px',
      });
      setTimeout(() => {
        setNewBrandLogo({ ...newBrandLogo, error: null });
      }, 7000);
      return false;
    }

    if (newFile) {
      //Max size allowed files
      if (newFile.size > maxSizeAllowed) {
        setNewBrandLogo({
          ...newBrandLogo,
          error: `El documento pesa demasiado`,
        });
        setTimeout(() => {
          setNewBrandLogo({ ...newBrandLogo, error: null });
        }, 3000);
        return false;
      }

      //If everything is ok, add the file to newBrandLogo and set a preview
      setNewBrandLogo({
        ...newBrandLogo,
        newLogo: [newFile],
        logoPreview: URL.createObjectURL(newFile),
      });
    }
  };
  //Handle change brand logo (end)

  const handleEditBrand = async (e) => {
    e.preventDefault();

    if (!BRAND_DESCRIPTION.value) {
      setState({
        ...state,
        saving_changes_error: 'Debes escribir una descripción',
      });
      setTimeout(() => {
        setState({
          ...state,
          saving_changes_error: null,
        });
      }, 3000);
      return false;
    }

    const formdata = new FormData();
    formdata.append('id', id);
    formdata.append('sponsors_box', SPONSORS_BOX.value);
    formdata.append('brand_logo', newBrandLogo.newLogo[0]);

    //Send new description only if it was changed
    if (state.brand.brand_description !== BRAND_DESCRIPTION.value) {
      formdata.append('brand_description', BRAND_DESCRIPTION.value);
    } else {
      formdata.append('brand_description', '');
    }

    setState({
      ...state,
      saving_changes: true,
    });

    //Send data to update information
    const response = await fetchData(
      endPoints.admin.discounts.brands,
      'patch',
      formdata,
      { 'Content-Type': 'multipart/form-data' }
    );

    if (response.error) {
      setState({
        ...state,
        saving_changes: false,
        saving_changes_error: response.error,
      });
      return false;
    }

    setState({
      ...state,
      saving_changes: false,
      saving_changes_error: null,
    });

    //Reset states
    setNewBrandLogo({
      ...newBrandLogo,
      newLogo: [],
      logoPreview: '',
    });

    dispatch(getBrands());
  };

  if (securingRoute || state.loading || brandsReducer.loading) {
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
        <ButtonBack prevRoute={'/admin/descuentos/gestionar-marcas'} />

        <main>
          {state.error ? (
            <NotFound404
              title={state.error}
              message={
                'No se ha podido encontrar esta marca. Probablemente no exista o fue borrada'
              }
            />
          ) : (
            <>
              {handleDisplayEliminateModal()}
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
                  <div className={styles.drop_file_input}>
                    <div className={styles.logo_container}>
                      <img
                        src={state.brand.brand_logo.URL}
                        alt={state.brand.brand_name}
                      />
                      <div className={styles.change_img_on_hover}>
                        <Image src={edit_pencil} />
                      </div>
                    </div>
                    <input
                      type='file'
                      value=''
                      accept='.jpg,.jpeg,.png,.svg'
                      onChange={onNewFile}
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
                    message='La marca patrocina Campus Box 🎁'
                    required={false}
                    state={SPONSORS_BOX}
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
                      DESCRIPTION_COUNT.value > 520
                        ? styles.char_count_warn
                        : ''
                    }`}
                  >
                    <span>{DESCRIPTION_COUNT.value} / 520</span>
                  </p>
                </div>

                {newBrandLogo.error ? (
                  <p className='error__messagev2'>{newBrandLogo.error}</p>
                ) : (
                  ''
                )}

                {/* /////////////////////////
                   // New brand logo preview //
                    ///////////////////////// */}

                {newBrandLogo.newLogo.length > 0 ? (
                  <div className={styles.new_logo_preview_wrapper}>
                    <h4 className={styles.new_logo_h4}>Nuevo logo: </h4>
                    <div className={styles.new_logo_preview_container}>
                      <div className={styles.new_logo_preview}>
                        <Image
                          src={newBrandLogo.logoPreview}
                          alt='Logo de la marca'
                          height={80}
                          width={80}
                        />
                      </div>
                      <p>
                        <strong>{newBrandLogo.newLogo[0].name}</strong>
                      </p>
                    </div>
                  </div>
                ) : (
                  ''
                )}
                {/* Display if there were errors at updating brand */}
                {state.saving_changes_error ? (
                  <p className='error__messagev2'>
                    {state.saving_changes_error}
                  </p>
                ) : (
                  ''
                )}

                <button
                  type='submit'
                  className={`${styles.submit_btn} ${
                    state.saving_changes && styles.buttonLoading
                  } ${
                    state.brand.brand_description === BRAND_DESCRIPTION.value &&
                    newBrandLogo.newLogo.length === 0 &&
                    state.brand.sponsors_box === SPONSORS_BOX.value
                      ? styles.disabled
                      : ''
                  } btn button--red`}
                  //Disable button if there are no changes or changes are being submitted
                  disabled={
                    state.saving_changes ||
                    (state.brand.brand_description ===
                      BRAND_DESCRIPTION.value &&
                      newBrandLogo.newLogo.length === 0 &&
                      state.brand.sponsors_box === SPONSORS_BOX.value)
                  }
                >
                  Guardar cambios
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

              {/* /////////////////////////
                // Associated discounts //
                ///////////////////////// */}
              <div className={styles.discounts_container}>
                <h2>Descuentos asociados ({discountsCount})</h2>
                {discounts.loading ? (
                  <Loader />
                ) : (
                  <>
                    {discounts.error ? (
                      <p className='error__message'>{discounts.error}</p>
                    ) : (
                      <>
                        {discounts.discounts.length === 0 ? (
                          <p>No hay descuentos asociados a esta marca</p>
                        ) : (
                          <div className={styles.discounts_table_container}>
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
                                {discounts.discounts.map((discount) => (
                                  <tr
                                    className={styles.discount}
                                    key={discount._id}
                                  >
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
                                        {dateFormat.SlashDate(
                                          new Date(discount.valid_from)
                                        )}
                                      </td>
                                    </Link>
                                    <Link
                                      href={`/admin/descuentos/gestionar-descuentos/editar-descuento/${discount._id}`}
                                    >
                                      <td
                                        className={`${styles.column4} ${
                                          discount.expiration_date
                                            ? new Date() >
                                              new Date(discount.expiration_date)
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
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        )}
                      </>
                    )}
                  </>
                )}
              </div>
            </>
          )}
        </main>
      </div>
    </>
  );
};

export default editarMarca;