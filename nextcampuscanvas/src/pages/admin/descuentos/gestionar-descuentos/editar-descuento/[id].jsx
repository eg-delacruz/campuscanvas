//Clarification: Allows edition and deletion of a discount
import { useRouter } from 'next/router';
import Image from 'next/image';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

//Styles
import styles from '@styles/pagestyles/admin/descuentos/editarDescuento.module.scss';

//Components
import AdminHeader from '@components/UsedInSpecificRoutes/Admin/AdminHeader/AdminHeader';
import Loader from '@components/GeneralUseComponents/Loader/Loader';
import ButtonBack from '@components/GeneralUseComponents/ButtonBack/ButtonBack';
import DisplayEliminateDiscountModal from '@components/UsedInSpecificRoutes/Admin/Descuentos/Discounts/DisplayEliminateDiscountModal/DisplayEliminateDiscountModal';
import ToUploadFilePreview from '@components/GeneralUseComponents/ToUploadFilePreview/ToUploadFilePreview';

//hooks
import useSecureAdminRoute from '@hooks/useSecureAdminRoute';
import useAxios from '@hooks/useAxios';
import { useInputValue } from '@hooks/useInputValue';
import { useCharacterCount } from '@hooks/useCharacterCount';

//Assets
import delete_icon from '@assets/GeneralUse/IconsAndButtons/delete.svg';
import edit_pencil from '@assets/GeneralUse/IconsAndButtons/edit_pencil.svg';

//Redux
import { selectDiscount } from '@redux/discountsSlice';

//Services
import dateFormat from '@services/dateFormat';

//Endpoints
import endPoints from '@services/api/index';

//TODO: handle the creation and deletion of home slider banners displaying a modal
const editarDescuento = () => {
  const { securingRoute } = useSecureAdminRoute('all');
  //Allows us to manipulate the appropriate slice/action

  const { fetchData } = useAxios();

  //States
  const [state, setState] = useState({
    discount: {},
    loading: true,
    error: null,
    saving_changes: false,
    form_error: null,
  });

  const [homeBanner, setHomeBanner] = useState({
    homeBanner: {},
    loading: true,
    error: null,
  });

  const [discountCard, setDiscountCard] = useState({
    discountCard: {},
    loading: true,
    error: null,
  });

  console.log('discountCard', discountCard);

  const [newBanner, setNewBanner] = useState([]);
  const [showEliminateModal, setShowEliminateModal] = useState(false);

  //Error states
  const [newBannerError, setNewBannerError] = useState(null);
  const [statusDatalistError, setStatusDatalistError] = useState(null);
  const [titleError, setTitleError] = useState(null);
  const [descriptionError, setDescriptionError] = useState(null);
  const [affiliateLinkError, setAffiliateLinkError] = useState(null);
  const [expirationDateError, setExpirationDateError] = useState(null);

  //Datalist options
  const STATUS_OPTIONS = ['available', 'unavailable'];

  //Other varialbes
  const DISCOUNT_TYPE_DICTIONARY = {
    discount_code: 'Código de descuento',
    affiliate_link_only: 'Solo enlace de afiliado',
    dynamically_generated: 'Generado dinámicamente',
  };
  let CARD_WAS_MODIFIED = false;

  //Controlling inputs
  const STATUS = useInputValue('');
  const TITLE = useInputValue('');
  const DESCRIPTION = useInputValue('');
  const AFFILIATE_LINK = useInputValue('');
  const DISCOUNT_CODE = useInputValue('');
  const DISCOUNT_KEY = useInputValue('');
  const EXPIRATION_DATE = useInputValue('');

  //Setting field counts
  const TITLE_COUNT = useCharacterCount(0);
  const DESCRIPTION_COUNT = useCharacterCount(0);

  //Get discount id
  const router = useRouter();
  const id = router.query.id;

  //Reducers
  const discountsReducer = useSelector(selectDiscount);
  useEffect(() => {
    //Await until the route is ready to get the discount_id
    if (!router.isReady) return;

    //Get the discount from global state if available to avoid unnecessary requests
    if (discountsReducer.discounts.length > 0) {
      const discount = discountsReducer.discounts.find(
        (discount) => discount._id === id
      );
      if (discount) {
        setState({ ...state, discount, loading: false });

        //Setting initial input values
        STATUS.setValue(discount.status);
        TITLE.setValue(discount.title);
        TITLE_COUNT.setValue(discount.title.length);
        DESCRIPTION.setValue(discount.description);
        DESCRIPTION_COUNT.setValue(discount.description.length);
        AFFILIATE_LINK.setValue(discount.affiliate_link);
        DISCOUNT_CODE.setValue(discount.discount_code.code);
        DISCOUNT_KEY.setValue(discount.discount_external_key);
        if (discount.expiration_date) {
          EXPIRATION_DATE.setValue(
            dateFormat.dateToYMD(new Date(discount.expiration_date))
          );
        }
      }
      return;
    }

    //Get the discount from the server if it's not available in global state
    if (Object.keys(state.discount).length === 0) {
      const getDiscount = async () => {
        const response = await fetchData(
          endPoints.discounts.getDiscountById(id),
          'get'
        );

        if (response.error) {
          //Redirect if discount doesn´t exist
          if (response.error === 'Descuento no encontrado') {
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
                text: 'El descuento que intenta editar no existe',
                icon: 'error',
                confirmButtonText: 'Aceptar',
              })
              .then(() => {
                router.push('/admin/descuentos/gestionar-descuentos');
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
          discount: response.body,
          loading: false,
          error: null,
        });

        //Setting initial input values
        STATUS.setValue(response.body.status);
        TITLE.setValue(response.body.title);
        TITLE_COUNT.setValue(response.body.title.length);
        DESCRIPTION.setValue(response.body.description);
        DESCRIPTION_COUNT.setValue(response.body.description.length);
        AFFILIATE_LINK.setValue(response.body.affiliate_link);
        DISCOUNT_CODE.setValue(response.body.discount_code.code);
        DISCOUNT_KEY.setValue(response.body.discount_external_key);
        if (response.body.expiration_date) {
          EXPIRATION_DATE.setValue(
            dateFormat.dateToYMD(new Date(response.body.expiration_date))
          );
        }
      };
      getDiscount();
    }

    //If discount doesn´t exist, redirect to 404 page
  }, [discountsReducer, router?.isReady]);

  //Get home slider banner (if applies)
  useEffect(() => {
    if (Object.keys(state.discount).length === 0) return;

    const getHomeBanner = async () => {
      const response = await fetchData(
        endPoints.admin.discounts.getHomeSliderBannerByDiscountId(
          state.discount._id
        ),
        'get',
        null,
        { required_info: 'banner_by_discount_id' }
      );

      if (response.error) {
        setHomeBanner({
          ...homeBanner,
          error: response.error,
          loading: false,
        });
        return;
      }

      setHomeBanner({
        ...homeBanner,
        homeBanner: response.body,
        loading: false,
        error: null,
      });
    };

    getHomeBanner();
  }, [state.discount]);

  //Get card info
  useEffect(() => {
    //Await until the route is ready to get the discount_id
    if (!router.isReady) return;

    const getCardInfo = async () => {
      const response = await fetchData(
        endPoints.discounts.getCardByDiscountId(id),
        'get'
      );

      if (response.error) {
        setDiscountCard({
          ...discountCard,
          error: response.error,
          loading: false,
        });
        return;
      }

      setDiscountCard({
        ...discountCard,
        discountCard: response.body,
        loading: false,
        error: null,
      });
    };

    getCardInfo();
  }, [router?.isReady]);

  console.log(state.discount);

  //Functions

  const handleTitleChange = (e) => {
    TITLE.onChange(e);
    TITLE_COUNT.onChange(e);
  };

  const handleDescriptionChange = (e) => {
    DESCRIPTION.onChange(e);
    DESCRIPTION_COUNT.onChange(e);
  };

  //Handle change brand logo (start)
  const onNewBannerFile = (e) => {
    const allowedFileFormats = ['svg', 'jpg', 'jpeg', 'png'];
    const newFile = e.target.files[0];
    //4 MB aprox.
    const maxSizeAllowed = 4194304;

    //Allow only certain file formats
    const dots = newFile.name.split('.');
    const newFileType = dots[dots.length - 1];

    if (!allowedFileFormats.includes(newFileType)) {
      setNewBannerError(
        'Debes subir un archivo en formato SVG, JPG, JPEG o PNG'
      );
      setTimeout(() => {
        setNewBannerError(null);
      }, 3000);
      return false;
    }

    if (newFile) {
      //Max size allowed files
      if (newFile.size > maxSizeAllowed) {
        setNewBannerError('El documento pesa demasiado');
        setTimeout(() => {
          setNewBannerError(null);
        }, 3000);
        return false;
      }

      //If everything is ok, add the file to newBanner and set a preview
      setNewBanner([newFile]);
    }
  };
  //Handle change brand logo (end)

  //TODO: prove if card was modified to update those routes
  const handleEditDiscount = async (e) => {
    e.preventDefault();
    setState({ ...state, saving_changes: true, form_error: null });
    setStatusDatalistError(null);
    setTitleError(null);
    setDescriptionError(null);
    setAffiliateLinkError(null);
    setExpirationDateError(null);

    //Handling errors
    if (STATUS_OPTIONS.indexOf(STATUS.value) === -1) {
      setStatusDatalistError('Selecciona un estatus de la lista');
      STATUS.setValue(state.discount.status);
      setState({ ...state, form_error: 'Selecciona un estatus válido' });
      return;
    }

    if (TITLE.value.length === 0) {
      setTitleError('Debes escribir un título');
      setState({
        ...state,
        form_error: 'Completa todos los campos obligatorios',
      });
      return;
    }

    if (DESCRIPTION.value.length === 0) {
      setDescriptionError('Debes escribir una descripción');
      setState({
        ...state,
        form_error: 'Completa todos los campos obligatorios',
      });
      return;
    }

    if (AFFILIATE_LINK.value.length === 0) {
      setAffiliateLinkError('Debes introducir un enlace de afiliado');
      setState({
        ...state,
        form_error: 'Completa todos los campos obligatorios',
      });
      return;
    }

    //Don't let to edit if expiration date is prior to today
    if (EXPIRATION_DATE.value) {
      //Today at the end of the day
      const today_end_of_day = new Date().setHours(23, 59, 59, 999);
      const exp_date_end_of_day = new Date(EXPIRATION_DATE.value).setHours(
        23,
        59,
        59,
        999
      );
      if (exp_date_end_of_day < today_end_of_day) {
        setExpirationDateError(
          'La fecha de expiración no puede ser anterior a hoy'
        );
        setState({
          ...state,
          form_error: 'Completa los campos correctamente',
        });
        return;
      }
    }

    const data = {
      newBanner: newBanner[0],
      status: STATUS.value,
      title: TITLE.value,
      description: DESCRIPTION.value,
      affiliate_link: AFFILIATE_LINK.value,
      discount_code: DISCOUNT_CODE.value,
      discount_external_key: DISCOUNT_KEY.value,
      expiration_date: EXPIRATION_DATE.value,
    };

    console.log(data);

    //TODO: put everything in a formData

    //TODO: idea: send original values and new values, and compare if there are changes to create the revalidate routes?

    setState({ ...state, saving_changes: false, form_error: null });
  };

  const enableSaveChangesButton = () => {
    //If user did a change, disabled will be false

    //Needed because if expiration date comes as null from db, the exp date input will be '' if empty, and '' and null cannot be compared to properly disable submit btn
    let exp_date_same_format;

    //TODO: when all discounts that don´t expire have the '' and not null anymore, directly compare with: dateFormat.dateToYMD(new Date(state.discount?.expiration_date)), because now, some discounts have null, which should be ''
    if (
      state.discount?.expiration_date === null ||
      state.discount?.expiration_date === ''
    ) {
      exp_date_same_format = '';
    } else {
      exp_date_same_format = dateFormat.dateToYMD(
        new Date(state.discount?.expiration_date)
      );
    }

    if (
      newBanner.length > 0 ||
      state.discount?.status !== STATUS.value ||
      state.discount?.title !== TITLE.value ||
      state.discount?.description !== DESCRIPTION.value ||
      state.discount?.affiliate_link !== AFFILIATE_LINK.value ||
      state.discount?.discount_code.code !== DISCOUNT_CODE.value ||
      state.discount?.discount_external_key !== DISCOUNT_KEY.value ||
      exp_date_same_format !== EXPIRATION_DATE.value
    ) {
      return false;
    }
    //TODO: set to true when finished
    return true;
  };

  const displayEliminateModal = () => {
    return (
      <DisplayEliminateDiscountModal
        showModal={showEliminateModal}
        setShowModal={setShowEliminateModal}
        id={id}
        bannerName={state.discount.banner.name}
      />
    );
  };

  const displayCreateHomeBanner = () => {
    console.log('Poner aquí el modal para añadir un home slider');
  };

  const displayEliminateHomeBannerModal = (
    banner_id,
    slider_banner_big_screen_name,
    slider_banner_small_screen_name
  ) => {
    console.log('Poner aquí el modal para eliminar un home slider.');
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
      {state.error ? (
        <>
          <div className={styles.error_container}>
            <h1>{state.error}</h1>
          </div>
        </>
      ) : (
        <>
          {displayEliminateModal()}
          <div className={`${styles.container} container`}>
            <div className={styles.button_back_eliminate_icon_flex_container}>
              <ButtonBack
                prevRoute={'/admin/descuentos/gestionar-descuentos'}
              />
              <div className={styles.delete_icon}>
                <span
                  onClick={() => {
                    setShowEliminateModal(true);
                  }}
                >
                  <img src={delete_icon.src} />
                </span>
              </div>
            </div>
            <h1>Editar descuento</h1>

            <form
              action=''
              method='PATCH'
              autoComplete='off'
              onSubmit={handleEditDiscount}
            >
              {/* /////////////////////////
            //       Banner       //
          ///////////////////////// */}

              <div className={styles.drop_file_input}>
                <div className={styles.banner}>
                  <img
                    src={state.discount.banner.URL}
                    alt={state.discount.title}
                  />
                  <div className={styles.change_img_on_hover}>
                    <Image src={edit_pencil} width={80} height={80} />
                  </div>
                </div>
                <input
                  type='file'
                  value=''
                  accept='.jpg,.jpeg,.png,.svg'
                  onChange={onNewBannerFile}
                />
              </div>
              {newBannerError && (
                <div className='error_message'>{newBannerError}</div>
              )}
              {newBanner.length > 0 && (
                <>
                  <h4 className={styles.new_banner_preview}>Nuevo banner: </h4>
                  <ToUploadFilePreview
                    fileList={newBanner}
                    setFileList={setNewBanner}
                  />
                </>
              )}

              {/* /////////////////////////
                 //     General info     //
                ///////////////////////// */}

              <div className={styles.general_info_status_container}>
                <div className={styles.general_info}>
                  <div className={styles.brand_logo_container}>
                    <div className={styles.logo_container}>
                      <img
                        src={state.discount.brand.brand_logo.URL}
                        alt={state.discount.brand.brand_name}
                      />
                    </div>
                    <h2>{state.discount.brand.brand_name}</h2>
                  </div>
                  <p>
                    <strong>Categoría: </strong>
                    {state.discount.category}
                  </p>
                  <p>
                    <strong>Creado por: </strong>
                    {state.discount.created_by}
                  </p>
                  <p>
                    <strong>Actualizado por: </strong>
                    {state.discount.modified_last_time_by}
                  </p>
                  {/* TODO: add this property to model in DB */}
                  <p>
                    <strong>Actualizado por última vez: </strong>
                    {state.discount?.updated_at}
                  </p>
                </div>

                <div className={styles.status_datalist_container}>
                  <label htmlFor='status' className={`${styles.input_title}`}>
                    Status
                  </label>
                  <input
                    className={`${styles.input}`}
                    name='status'
                    id='status'
                    autoComplete='off'
                    value={STATUS.value}
                    onChange={STATUS.onChange}
                    list='statuses'
                  />
                  <datalist id='statuses'>
                    {STATUS_OPTIONS.map((option, index) => (
                      <option key={index} value={option} />
                    ))}
                  </datalist>
                  {statusDatalistError && (
                    <p className={`error__messagev2`}>{statusDatalistError}</p>
                  )}
                </div>
              </div>

              {/* /////////////////////////
               //  Discount general info  //
               ///////////////////////// */}

              <h2 className={styles.section_title}>Información general</h2>

              <section className={styles.general_info_section}>
                <div>
                  <label htmlFor='title' className={`${styles.input_title}`}>
                    Título
                  </label>
                  <input
                    className={`${styles.input}`}
                    name='title'
                    id='title'
                    type='text'
                    placeholder='Recomendado: 40 caracteres aprox.'
                    autoComplete='off'
                    value={TITLE.value}
                    onChange={handleTitleChange}
                  />
                  <p
                    className={`${styles.char_count} ${
                      TITLE_COUNT.value > 40 ? styles.char_count_warn : ''
                    }`}
                  >
                    <span>{TITLE_COUNT.value} / 40</span>
                  </p>
                  {titleError && (
                    <p
                      className={`${styles.error_under_input} error__messagev2`}
                    >
                      {titleError}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor='description'
                    className={`${styles.input_title}`}
                  >
                    Descripción
                  </label>
                  <textarea
                    className={`${styles.description_text_area}`}
                    name='description'
                    id='description'
                    type='text'
                    placeholder='Recomendado: 180 caracteres aprox.'
                    autoComplete='off'
                    value={DESCRIPTION.value}
                    onChange={handleDescriptionChange}
                  />
                  <p
                    className={`${styles.char_count} ${
                      DESCRIPTION_COUNT.value > 180
                        ? styles.char_count_warn
                        : ''
                    }`}
                  >
                    <span>{DESCRIPTION_COUNT.value} / 180</span>
                  </p>
                  {descriptionError && (
                    <p
                      className={`${styles.error_under_input} error__messagev2`}
                    >
                      {descriptionError}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor='affiliate_link'
                    className={`${styles.input_title}`}
                  >
                    Enlace de afiliado o web del anunciante (incluye desde el
                    https://www.)
                  </label>
                  <input
                    className={`${styles.input}`}
                    name='affiliate_link'
                    id='affiliate_link'
                    type='text'
                    placeholder=''
                    autoComplete='off'
                    value={AFFILIATE_LINK.value}
                    onChange={AFFILIATE_LINK.onChange}
                  />
                  {affiliateLinkError && (
                    <p
                      className={`${styles.error_under_input} error__messagev2`}
                    >
                      {affiliateLinkError}
                    </p>
                  )}
                </div>

                <div className={styles.discount_type_section}>
                  <p className={styles.discount_type}>
                    <strong>Tipo de descuento: </strong>
                    {DISCOUNT_TYPE_DICTIONARY[state.discount.type]}
                  </p>

                  {state.discount?.type === 'discount_code' && (
                    <div className={styles.discount_code_ext_key_container}>
                      <div
                        className={`${styles.disc_code_input_label_container}`}
                      >
                        <label
                          htmlFor='discount_code'
                          className={`${styles.input_title}`}
                        >
                          Código de descuento
                        </label>
                        <input
                          className={`${styles.input}`}
                          name='discount_code'
                          id='discount_code'
                          type='text'
                          placeholder=''
                          autoComplete='off'
                          value={DISCOUNT_CODE.value}
                          onChange={DISCOUNT_CODE.onChange}
                          required
                        />
                      </div>

                      <div className={styles.ext_key_input_label_container}>
                        <div className={styles.label_tooltip_container}>
                          <label
                            htmlFor='external_key'
                            className={`${styles.input_title}`}
                          >
                            Llave externa
                          </label>
                          <span className={styles.tooltip_container}>
                            ?{' '}
                            <span className={styles.tooltiptext}>
                              Llave externa para generar el descuento
                              dinamicamente o para identificarlo
                            </span>
                          </span>
                        </div>
                        <input
                          className={`${styles.input}`}
                          name='external_key'
                          id='external_key'
                          type='text'
                          placeholder=''
                          autoComplete='off'
                          value={DISCOUNT_KEY.value}
                          onChange={DISCOUNT_KEY.onChange}
                        />
                      </div>
                    </div>
                  )}

                  {state.discount?.type === 'dynamically_generated' && (
                    <div
                      className={styles.dynamically_generated_type_container}
                    >
                      Generado dinámicamente. Información incierta
                    </div>
                  )}
                </div>

                <div className={styles.valid_period_container}>
                  <div className={styles.valid_from_container}>
                    <span className={`${styles.input_title}`}>
                      Válido desde
                    </span>
                    <div className={`${styles.fake_disabled_input}`}>
                      {dateFormat.SlashDate(
                        new Date(state.discount.valid_from)
                      )}
                    </div>
                  </div>

                  <div className={styles.valid_till_container}>
                    <label
                      htmlFor='valid_till'
                      className={`${styles.input_title}`}
                    >
                      Fecha de expiración
                    </label>
                    <input
                      className={`${styles.input}`}
                      name='valid_till'
                      id='valid_till'
                      type='date'
                      placeholder=''
                      autoComplete='off'
                      value={EXPIRATION_DATE.value}
                      onChange={EXPIRATION_DATE.onChange}
                    />
                    {expirationDateError && (
                      <p
                        className={`${styles.error_under_input} error__messagev2`}
                      >
                        {expirationDateError}
                      </p>
                    )}
                  </div>
                </div>

                {/* /////////////////////////
               //   Home slider banners   //
               ///////////////////////// */}

                <div className={styles.slider_banner_container}>
                  <p className={styles.home_slider_banner_title}>
                    <strong>Slider principal en home</strong>
                  </p>
                  {homeBanner.loading ? (
                    <Loader />
                  ) : homeBanner.error ? (
                    <p className='error__messagev2'>{homeBanner.error}</p>
                  ) : (
                    <>
                      {homeBanner.homeBanner.length === 0 ? (
                        <>
                          <p>
                            Este descuento no tienen ningún banner en el slider
                            principal.
                          </p>
                          {/* This is not a button because if we click on a button inside a form, the submit handler function is triggered */}
                          <div
                            className={`${styles.add_home_banner_btn} btn button--red`}
                            onClick={displayCreateHomeBanner}
                          >
                            + Añadir home banner
                          </div>
                        </>
                      ) : (
                        <div className={styles.images_container}>
                          <div
                            className={
                              styles.big_image_title_delete_banner_container
                            }
                          >
                            <h5>Pantalla grande (1200 x 400)</h5>
                            <div className={styles.eliminate_container}>
                              <Image src={delete_icon} />
                              <div
                                className={styles.eliminate_text}
                                onClick={() =>
                                  displayEliminateHomeBannerModal()
                                }
                              >
                                Eliminar home banners
                              </div>
                            </div>
                          </div>
                          <div className={styles.big_banner}>
                            <img
                              src={
                                homeBanner.homeBanner.slider_banner_big_screen
                                  .URL
                              }
                              alt={`Banner de home pantalla grande `}
                            />
                          </div>
                          <h5>Pantalla movil (780 x 520)</h5>
                          <div className={styles.small_banner}>
                            <img
                              src={
                                homeBanner.homeBanner.slider_banner_small_screen
                                  .URL
                              }
                              alt={`Banner de home pantalla movil `}
                            />
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </section>

              {/* /////////////////////////
                //        Card info        //
                ///////////////////////// */}

              <h2 className={styles.section_title}>
                Información de la tarjeta
              </h2>

              <section className={styles.card_section}>
                {discountCard.loading ? (
                  <Loader />
                ) : discountCard.error ? (
                  <p className='error__messagev2'>{discountCard.error}</p>
                ) : (
                  <>
                    {Object.keys(discountCard.discountCard).length > 0 && (
                      <div className={styles.title_tag_container}>
                        <div>Title</div>
                        <div>Tag</div>
                      </div>
                    )}
                  </>
                )}
              </section>

              {state.form_error && (
                <div className='error__messagev2'>{state.form_error}</div>
              )}

              <button
                type='submit'
                //Disable button if there are no changes or changes are being submitted
                className={`${styles.submit_btn} ${
                  state.saving_changes && styles.buttonLoading
                } ${
                  enableSaveChangesButton() ? styles.disabled : ''
                } btn button--red`}
                //Disable button if there are no changes or changes are being submitted
                disabled={state.saving_changes || enableSaveChangesButton()}
              >
                Guardar cambios
              </button>
            </form>
          </div>
        </>
      )}
    </>
  );
};

export default editarDescuento;
