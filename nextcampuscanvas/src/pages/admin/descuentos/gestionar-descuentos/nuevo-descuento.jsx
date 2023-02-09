import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import dynamic from 'next/dynamic';
import Swal from 'sweetalert2';
import { useRouter } from 'next/router';
import Link from 'next/link';

//Styles
import styles from '@styles/pagestyles/admin/descuentos/nuevoDescuento.module.scss';
//Rich text editor styles
//https://www.youtube.com/watch?v=kykC7i9VUE4
import 'react-quill/dist/quill.snow.css';

//Components
import AdminHeader from '@components/UsedInSpecificRoutes/Admin/AdminHeader/AdminHeader';
import Loader from '@components/GeneralUseComponents/Loader/Loader';
import ButtonBack from '@components/GeneralUseComponents/ButtonBack/ButtonBack';
import CustomCheckBox from '@components/GeneralUseComponents/CustomCheckBox/CustomCheckBox';
import DragDropUploadArea from '@components/GeneralUseComponents/DragDropUploadArea/DragDropUploadArea';

//hooks
import { useInputValue } from '@hooks/useInputValue';
import useSecureAdminRoute from '@hooks/useSecureAdminRoute';
import { useCharacterCount } from '@hooks/useCharacterCount';
import useAxios from '@hooks/useAxios';

//Redux actions
import { getBrands, selectBrand } from '@redux/brandsSlice';
import { getDiscounts } from '@redux/discountsSlice';

//Endpoints
import endPoints from '@services/api';

//Rich text editor
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

const nuevoDescuento = () => {
  const { securingRoute } = useSecureAdminRoute('all');
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

  const { fetchData: uploadData, cancel } = useAxios();

  const router = useRouter();

  //TODO: fetch this data and erase this place holder
  const CARDS_CURRENTLY_DISPLAYED_AS = {
    suggested: 4,
    new: 4,
    most_searched: 4,
    home_featured: 9,
  };

  //TODO: fetch this data and erase this place holder
  const DISPLAY_FIRST_IN_CATEGORY_AMOUNT = {
    travel: 4,
    fashion: 4,
    beauty: 4,
    eatordrink: 4,
    entertainment: 4,
    technology: 4,
    others: 4,
  };

  //Datalist options
  const CATEGORY_OPTIONS = [
    'travel',
    'fashion',
    'beauty',
    'eatordrink',
    'entertainment',
    'technology',
    'others',
  ];
  const CARD_TAG_OPTIONS = ['exclusivo', 'nuevo'];

  const DISPLAY_CARD_IN_SECTION_OPTIONS = [
    'sugeridos',
    'novedades',
    'mas_buscados',
    'mas_descuentos',
  ];

  //States
  const [state, setState] = useState({
    error: null,
    uploading: false,
  });
  const [bannerFile, setBannerFiles] = useState([]);
  const [showInHomeSlider, setShowInHomeSlider] = useState(false);
  const [bigImageHomeSlider, setBigImageHomeSlider] = useState([]);
  const [smallImageHomeSlider, setSmallImageHomeSlider] = useState([]);
  const [termsCondsText, setTermsCondsText] = useState('');
  const [showFirstInCategory, setShowFirstInCategory] = useState(false);

  //Error states
  const [titleError, setTitleError] = useState(null);
  const [descriptionError, setDescriptionError] = useState(null);
  const [discountTypeError, setDiscountTypeError] = useState(null);
  const [brandDatalistError, setBrandDatalistError] = useState(null);
  const [categoryDatalistError, setCategoryDatalistError] = useState(null);
  const [affiliateLinkError, setAffiliateLinkError] = useState(null);
  const [bannerFileError, setBannerFileError] = useState(null);
  const [homeSliderFilesError, setHomeSliderFilesError] = useState(null);
  const [cardTitleError, setCardTitleError] = useState(null);
  const [cardTagDatalistError, setCardTagDatalistError] = useState(null);
  const [
    displayCardInSectionDatalistError,
    setDisplayCardInSectionDatalistError,
  ] = useState(null);

  //Controlling inputs
  const TITLE = useInputValue('');
  const DESCRIPTION = useInputValue('');
  const BRAND = useInputValue('');
  const CATEGORY = useInputValue('');
  const DISCOUNT_TYPE = useInputValue('');
  const DISCOUNT_CODE = useInputValue('');
  const DISCOUNT_KEY = useInputValue('');
  const AFFILIATE_LINK = useInputValue('');
  const CALL_TO_ACTION = useInputValue('');
  const VALID_FROM = useInputValue('');
  const EXPIRATION_DATE = useInputValue('');
  const CARD_TITLE = useInputValue('');
  const CARD_TAG = useInputValue('');
  const DISPLAY_CARD_IN_SECTION = useInputValue('');

  //Setting field counts
  const TITLE_COUNT = useCharacterCount();
  const DESCRIPTION_COUNT = useCharacterCount();
  const CARD_TITLE_COUNT = useCharacterCount();

  //Functions
  const handleTitleChange = (e) => {
    TITLE.onChange(e);
    TITLE_COUNT.onChange(e);
  };
  const handleDescriptionChange = (e) => {
    DESCRIPTION.onChange(e);
    DESCRIPTION_COUNT.onChange(e);
  };

  const handleCardTitleChange = (e) => {
    CARD_TITLE.onChange(e);
    CARD_TITLE_COUNT.onChange(e);
  };

  //Get brand id
  const brand_id = () => {
    const { brands } = brandsReducer;
    const item = brands.find((item) => item.brand_name === BRAND.value);
    if (item === undefined) {
      setBrandDatalistError('Selecciona una marca de la lista');
      setState({
        ...state,
        error: 'Selecciona una marca correcta',
      });
      BRAND.setValue('');
      return;
    }
    return item._id;
  };

  //Discount type radio buttons(start)
  const isDiscountTypeRadioSelected = (value) => DISCOUNT_TYPE.value === value;
  const handleRadioDiscountTypeClick = (e) => {
    DISCOUNT_TYPE.setValue(e.currentTarget.value);

    //Reseting input values
    DISCOUNT_CODE.setValue('');
    DISCOUNT_KEY.setValue('');
    CALL_TO_ACTION.setValue('');
  };
  //Discount type radio buttons(end)

  const handleSubmit = async (e) => {
    e.preventDefault();
    setState({ ...state, error: null });
    setTitleError(null);
    setDescriptionError(null);
    setDiscountTypeError(null);
    setBrandDatalistError(null);
    setCategoryDatalistError(null);
    setAffiliateLinkError(null);
    setBannerFileError(null);
    setHomeSliderFilesError(null);
    setCardTitleError(null);
    setCardTagDatalistError(null);
    setDisplayCardInSectionDatalistError(null);

    //Getting brand id
    const BRAND_ID = brand_id();

    //Getting expiration date
    let EXP_DATE = null;
    if (EXPIRATION_DATE.value) {
      EXP_DATE = new Date(EXPIRATION_DATE.value);
    }

    //Handling errors
    if (BRAND_ID === undefined) {
      return;
    }

    if (TITLE.value.length === 0) {
      setTitleError('Debes escribir un título');
      setState({ ...state, error: 'Completa todos los campos obligatorios' });
      return;
    }

    if (DESCRIPTION.value.length === 0) {
      setDescriptionError('Debes escribir una descripción');
      setState({ ...state, error: 'Completa todos los campos obligatorios' });
      return;
    }

    if (CATEGORY_OPTIONS.indexOf(CATEGORY.value) === -1) {
      setCategoryDatalistError('Selecciona una categoría de la lista');
      CATEGORY.setValue('');
      setState({ ...state, error: 'Selecciona una categoría válida' });
      return;
    }

    if (AFFILIATE_LINK.value.length === 0) {
      setAffiliateLinkError('Debes añadir un enlace de afiliado');
      setState({ ...state, error: 'Completa todos los campos obligatorios' });
      return;
    }

    if (DISCOUNT_TYPE.value.length === 0) {
      setDiscountTypeError('Debes seleccionar un tipo de descuento');
      setState({ ...state, error: 'Completa todos los campos obligatorios' });
      return;
    }

    if (bannerFile.length === 0) {
      setBannerFileError('Debes subir una imagen');
      setState({ ...state, error: 'Completa todos los campos obligatorios' });
      return;
    }

    if (showInHomeSlider) {
      if (
        bigImageHomeSlider.length === 0 ||
        smallImageHomeSlider.length === 0
      ) {
        setHomeSliderFilesError('Debes subir una imagen de cada tamaño');
        setState({ ...state, error: 'Completa todos los campos obligatorios' });
        return;
      }
    }

    if (CARD_TITLE.value.length === 0) {
      setCardTitleError('Debes escribir un título');
      setState({ ...state, error: 'Completa todos los campos obligatorios' });
      return;
    }

    if (CARD_TAG.value) {
      if (CARD_TAG_OPTIONS.indexOf(CARD_TAG.value) === -1) {
        setCardTagDatalistError(
          'Solo puedes seleccionar una viñeta que esté en la lista'
        );
        CARD_TAG.setValue('');
        return;
      }
    }

    //Only allow to put already established values in the options
    if (DISPLAY_CARD_IN_SECTION.value) {
      if (
        DISPLAY_CARD_IN_SECTION_OPTIONS.indexOf(
          DISPLAY_CARD_IN_SECTION.value
        ) === -1
      ) {
        setDisplayCardInSectionDatalistError(
          'Solo puedes seleccionar una sección que esté en la lista'
        );
        DISPLAY_CARD_IN_SECTION.setValue('');
        return;
      }
    }

    //Translate chosen card section to english
    let DISPLAY_CARD_IN_SECTION_ENG = '';
    switch (DISPLAY_CARD_IN_SECTION.value) {
      case 'sugeridos':
        DISPLAY_CARD_IN_SECTION_ENG = 'suggested';
        break;
      case 'novedades':
        DISPLAY_CARD_IN_SECTION_ENG = 'new';
        break;
      case 'mas_buscados':
        DISPLAY_CARD_IN_SECTION_ENG = 'most_searched';
        break;
      case 'mas_descuentos':
        DISPLAY_CARD_IN_SECTION_ENG = 'home_featured';
      default:
        break;
    }

    const formdata = new FormData();
    formdata.append('title', TITLE.value);
    formdata.append('description', DESCRIPTION.value);
    formdata.append('brand', BRAND_ID);
    formdata.append('category', CATEGORY.value);
    formdata.append('type', DISCOUNT_TYPE.value);
    formdata.append('discount_code', DISCOUNT_CODE.value);
    formdata.append('discount_external_key', DISCOUNT_KEY.value);
    formdata.append('affiliate_link', AFFILIATE_LINK.value);
    formdata.append('action_btn_phrase', CALL_TO_ACTION.value);
    formdata.append('valid_from', new Date(VALID_FROM.value));
    formdata.append('expiration_date', EXP_DATE);
    formdata.append('banner', bannerFile[0]);
    formdata.append('show_in_home_slider', showInHomeSlider);
    formdata.append('big_home_slider_image', bigImageHomeSlider[0]);
    formdata.append('small_home_slider_image', smallImageHomeSlider[0]);
    formdata.append('card_title', CARD_TITLE.value);
    formdata.append('card_tag', CARD_TAG.value);
    formdata.append('display_card_in_section', DISPLAY_CARD_IN_SECTION_ENG);
    formdata.append('terms_and_conds', termsCondsText);
    formdata.append('show_first_in_category', showFirstInCategory);

    //Uploading data
    setState({ ...state, uploading: true });

    //No try catch needed, since done in the useAxios hook
    const response = await uploadData(
      endPoints.admin.discounts.index,
      'post',
      formdata,
      { 'Content-Type': 'multipart/form-data' }
    );

    if (response?.error) {
      return setState({ ...state, error: response.error, uploading: false });
    }

    dispatch(getDiscounts());

    setState({ ...state, uploading: false, error: null });

    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      width: 400,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer);
        toast.addEventListener('mouseleave', Swal.resumeTimer);
      },
    });

    Toast.fire({
      icon: 'success',
      title: response.body,
    });

    //Redirect to /gestionar-descuentos
    router.push('/admin/descuentos/gestionar-descuentos');
  };

  if (securingRoute || brandsReducer.loading) {
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
        <ButtonBack prevRoute={'/admin/descuentos/gestionar-descuentos'} />

        <h1>Nuevo descuento</h1>

        <form
          action=''
          method='POST'
          autoComplete='off'
          onSubmit={handleSubmit}
        >
          {/* /////////////////////////
         //       General info       // 
         ///////////////////////// */}

          <div className={styles.flex_container}>
            <h2>Información general</h2>
            <Link href={'/admin/descuentos/gestionar-marcas'}>
              <button className={`${styles.manage_brands_btn} btn button--red`}>
                Gestionar marcas
              </button>
            </Link>
          </div>

          <section className={styles.general_info_container}>
            <div>
              <label htmlFor='title' className={`${styles.input_title}`}>
                Título *
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
                //required
              />
              <p
                className={`${styles.char_count} ${
                  TITLE_COUNT.value > 40 ? styles.char_count_warn : ''
                }`}
              >
                <span>{TITLE_COUNT.value} / 40</span>
              </p>
              {titleError && (
                <p className={`${styles.error_under_input} error__messagev2`}>
                  {titleError}
                </p>
              )}
            </div>

            <div>
              <label htmlFor='description' className={`${styles.input_title}`}>
                Descripción *
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
                //required
              />
              <p
                className={`${styles.char_count} ${
                  DESCRIPTION_COUNT.value > 180 ? styles.char_count_warn : ''
                }`}
              >
                <span>{DESCRIPTION_COUNT.value} / 180</span>
              </p>
              {descriptionError && (
                <p className={`${styles.error_under_input} error__messagev2`}>
                  {descriptionError}
                </p>
              )}
            </div>

            <div className={styles.brand_category_container}>
              <div className={styles.brand_datalist_container}>
                <label htmlFor='brand' className={`${styles.input_title}`}>
                  Marca (previamente creada) *
                </label>
                <input
                  className={`${styles.input}`}
                  name='brand'
                  id='brand'
                  autoComplete='off'
                  value={BRAND.value}
                  onChange={BRAND.onChange}
                  //required
                  list='brands'
                />
                <datalist id='brands'>
                  {brandsReducer.brands.map((brand) => (
                    <option key={brand._id} value={brand.brand_name} />
                  ))}
                </datalist>
                {brandDatalistError && (
                  <p className={`${styles.error_under_input} error__messagev2`}>
                    {brandDatalistError}
                  </p>
                )}
              </div>

              <div className={styles.category_datalist_container}>
                <label htmlFor='category' className={`${styles.input_title}`}>
                  Categoría *
                </label>
                <input
                  className={`${styles.input}`}
                  name='category'
                  id='category'
                  autoComplete='off'
                  value={CATEGORY.value}
                  onChange={CATEGORY.onChange}
                  //required
                  list='categories'
                />

                <datalist id='categories'>
                  {CATEGORY_OPTIONS.map((category) => (
                    <option key={category} value={category} />
                  ))}
                </datalist>
                {categoryDatalistError && (
                  <p className={`${styles.error_under_input} error__messagev2`}>
                    {categoryDatalistError}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor='affiliate_link'
                className={`${styles.input_title}`}
              >
                Enlace de afiliado o web del anunciante (incluye desde el
                https://www.)*
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
                <p className={`${styles.error_under_input} error__messagev2`}>
                  {affiliateLinkError}
                </p>
              )}
            </div>

            <span className={styles.discount_type_title}>
              Tipo de descuento *
            </span>
            <div className={styles.discount_type_radio_btn_container}>
              <div className={styles.radio_input_container}>
                <input
                  //required
                  className={styles.radio_input}
                  type='radio'
                  id='discount_code'
                  name='discount_type'
                  value='discount_code'
                  checked={isDiscountTypeRadioSelected('discount_code')}
                  onChange={handleRadioDiscountTypeClick}
                />
                <label htmlFor='discount_code'>Código de descuento</label>
              </div>

              <div className={styles.radio_input_container}>
                <input
                  className={styles.radio_input}
                  type='radio'
                  id='affiliate_link_only'
                  name='discount_type'
                  value='affiliate_link_only'
                  checked={isDiscountTypeRadioSelected('affiliate_link_only')}
                  onChange={handleRadioDiscountTypeClick}
                />
                <label htmlFor='affiliate_link_only'>
                  Solo enlace de afiliado
                </label>
              </div>

              <div className={styles.radio_input_container}>
                <input
                  className={styles.radio_input}
                  type='radio'
                  id='dynamically_generated'
                  name='discount_type'
                  value='dynamically_generated'
                  checked={isDiscountTypeRadioSelected('dynamically_generated')}
                  onChange={handleRadioDiscountTypeClick}
                />
                <label htmlFor='dynamically_generated'>
                  Código generado dinámicamente
                </label>
              </div>
              {discountTypeError && (
                <p className={`error__messagev2`}>{discountTypeError}</p>
              )}
            </div>

            <div className={styles.discount_type_container}>
              {DISCOUNT_TYPE.value === 'discount_code' ? (
                <div className={styles.discount_code_type_container}>
                  <div className={styles.disc_code_ext_key_container}>
                    <div
                      className={`${styles.disc_code_input_label_container}`}
                    >
                      <label
                        htmlFor='discount_code'
                        className={`${styles.input_title}`}
                      >
                        Código de descuento *
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
                </div>
              ) : DISCOUNT_TYPE.value === 'affiliate_link_only' ? (
                <div className={styles.affiliate_type_container}>
                  <div className={styles.call_to_action_container}>
                    <div
                      className={styles.call_to_action_input_label_container}
                    >
                      <div className={styles.label_tooltip_container}>
                        <label
                          htmlFor='call_to_action'
                          className={`${styles.input_title}`}
                        >
                          Call-to-action
                        </label>
                        <span className={styles.tooltip_container}>
                          ?{' '}
                          <span className={styles.tooltiptext}>
                            Texto que aparecerá en el botón de la oferta. (Ver
                            cambios en botón de ejemplo)
                          </span>
                        </span>
                      </div>
                      <input
                        className={`${styles.input}`}
                        name='call_to_action'
                        id='call_to_action'
                        type='text'
                        placeholder=''
                        autoComplete='off'
                        value={CALL_TO_ACTION.value}
                        onChange={CALL_TO_ACTION.onChange}
                      />
                    </div>
                    <div
                      className={`${styles.call_to_act_btn} btn button--red`}
                    >
                      {CALL_TO_ACTION.value
                        ? CALL_TO_ACTION.value
                        : 'Ir a la tienda'}
                    </div>
                  </div>
                </div>
              ) : DISCOUNT_TYPE.value === 'dynamically_generated' ? (
                <div className={styles.dynamically_generated_type_container}>
                  Generado dinámicamente. Información incierta
                </div>
              ) : (
                ''
              )}
            </div>

            <div className={styles.valid_exp_dates_container}>
              <div>
                <label htmlFor='valid_from' className={`${styles.input_title}`}>
                  Válido desde *
                </label>
                <input
                  className={`${styles.input}`}
                  name='valid_from'
                  id='valid_from'
                  type='date'
                  placeholder=''
                  autoComplete='off'
                  value={VALID_FROM.value}
                  onChange={VALID_FROM.onChange}
                  required
                />
              </div>

              <div>
                <label
                  htmlFor='valid_until'
                  className={`${styles.input_title}`}
                >
                  Fecha de expiración
                </label>
                <input
                  className={`${styles.input}`}
                  name='valid_until'
                  id='valid_until'
                  type='date'
                  placeholder=''
                  autoComplete='off'
                  value={EXPIRATION_DATE.value}
                  onChange={EXPIRATION_DATE.onChange}
                />
              </div>
            </div>

            <div>
              <label className={`${styles.input_title}`}>
                Banner del descuento en JPG (Debe ser de 640 x 320!){' '}
              </label>

              <DragDropUploadArea
                onFileChange={(files) => {
                  setBannerFiles(files);
                }}
                maxAllowedFiles={1}
                maxSizeFilesBytes={4194304}
                allowedFileFormats={['jpg', 'jpeg', 'png']}
                minimizedVersion={true}
              />
              {bannerFileError && (
                <p className={'error__messagev2'}>{bannerFileError}</p>
              )}
            </div>

            <div className={styles.home_slider_section}>
              <CustomCheckBox
                message={'Añadir a slider principal en home'}
                required={false}
                defaultChecked={false}
                onBoxCheck={() => {
                  setShowInHomeSlider(!showInHomeSlider);
                }}
              />
              {showInHomeSlider && (
                <div className={styles.upload_images_container}>
                  <label className={`${styles.input_title}`}>
                    Imagen pantalla grande en JPG (Ratio de 3 : 1 , tamaño
                    óptimo de 1200 x 400!){' '}
                  </label>
                  <DragDropUploadArea
                    onFileChange={(files) => {
                      setBigImageHomeSlider(files);
                    }}
                    maxAllowedFiles={1}
                    maxSizeFilesBytes={4194304}
                    allowedFileFormats={['jpg', 'jpeg', 'png']}
                    minimizedVersion={true}
                  />

                  <label
                    className={`${styles.input_title} ${styles.upload_small_Home_slider_img_label}`}
                  >
                    Imagen pantalla mobil en JPG (780 x 520!){' '}
                  </label>
                  <DragDropUploadArea
                    onFileChange={(files) => {
                      setSmallImageHomeSlider(files);
                    }}
                    maxAllowedFiles={1}
                    maxSizeFilesBytes={4194304}
                    allowedFileFormats={['jpg', 'jpeg', 'png']}
                    minimizedVersion={true}
                  />
                  {homeSliderFilesError && (
                    <p className={'error__messagev2'}>{homeSliderFilesError}</p>
                  )}
                </div>
              )}
            </div>
          </section>

          <h2 className={styles.section_title}>Información de la tarjeta</h2>

          {/* /////////////////////////
         //       Card info       // 
         ///////////////////////// */}

          <section className={styles.card_info_container}>
            <div className={styles.card_title_tag_container}>
              <div>
                <label htmlFor='card_title' className={`${styles.input_title}`}>
                  Título de la tarjeta *
                </label>
                <input
                  className={`${styles.input}`}
                  name='card_title'
                  id='card_title'
                  type='text'
                  placeholder='Recomendado: 40 caracteres aprox.'
                  autoComplete='off'
                  value={CARD_TITLE.value}
                  onChange={handleCardTitleChange}
                  required
                />
                <p
                  className={`${styles.char_count} ${
                    CARD_TITLE_COUNT.value > 40 ? styles.char_count_warn : ''
                  }`}
                >
                  <span>{CARD_TITLE_COUNT.value} / 40</span>
                </p>
                {cardTitleError && (
                  <p className={`${styles.error_under_input} error__messagev2`}>
                    {cardTitleError}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor='card_tag' className={`${styles.input_title}`}>
                  Viñeta
                </label>
                <input
                  className={`${styles.input}`}
                  name='card_tag'
                  id='card_tag'
                  autoComplete='off'
                  value={CARD_TAG.value}
                  onChange={CARD_TAG.onChange}
                  list='tags'
                />
                <datalist id='tags'>
                  {CARD_TAG_OPTIONS.map((tag, index) => (
                    <option key={index} value={tag} />
                  ))}
                </datalist>
                {cardTagDatalistError && (
                  <p className={`${styles.error_under_input} error__messagev2`}>
                    {cardTagDatalistError}
                  </p>
                )}
              </div>
            </div>

            <div className={styles.display_in_section_container}>
              <div className={styles.disabled_in_section_datalist_container}>
                <label
                  htmlFor='display_in_section'
                  className={`${styles.input_title}`}
                >
                  Mostrar en sección
                </label>
                <input
                  className={`${styles.input}`}
                  name='display_in_section'
                  id='display_in_section'
                  autoComplete='off'
                  value={DISPLAY_CARD_IN_SECTION.value}
                  onChange={DISPLAY_CARD_IN_SECTION.onChange}
                  list='sections'
                />
                <datalist id='sections'>
                  {DISPLAY_CARD_IN_SECTION_OPTIONS.map((section, index) => (
                    <option key={index} value={section} />
                  ))}
                </datalist>
                {displayCardInSectionDatalistError && (
                  <p className={`${styles.error_under_input} error__messagev2`}>
                    {displayCardInSectionDatalistError}
                  </p>
                )}
              </div>
              <div>
                {/* /////////////////////////////////////
                // Current discounts per section table // 
                ///////////////////////////////////// */}
                {/* TODO: display actual current information in table */}
                <table className={styles.current_discounts_per_section_table}>
                  <thead>
                    <tr>
                      <th colSpan='4'>
                        Descuentos por sección actuales (falta actualizar)
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className={styles.first_row}>
                      <td>Sugeridos</td>
                      <td>Novedades</td>
                      <td>Más buscados</td>
                      <td>Destacados home</td>
                    </tr>
                    <tr className={styles.second_row}>
                      <td>{CARDS_CURRENTLY_DISPLAYED_AS.suggested}</td>
                      <td>{CARDS_CURRENTLY_DISPLAYED_AS.new}</td>
                      <td>{CARDS_CURRENTLY_DISPLAYED_AS.most_searched}</td>
                      <td>{CARDS_CURRENTLY_DISPLAYED_AS.home_featured}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className={styles.show_first_in_category_container}>
              <div className={styles.checkbox_tooltip_container}>
                <CustomCheckBox
                  message={'Mostrar primero en su categoría'}
                  required={false}
                  defaultChecked={false}
                  onBoxCheck={() => {
                    setShowFirstInCategory(!showFirstInCategory);
                  }}
                />

                <span className={styles.tooltip_container}>
                  ?{' '}
                  <span className={styles.tooltiptext}>
                    No exceder a más de 4 por categoría
                  </span>
                </span>
              </div>

              {/* TODO: display actual current information in table */}
              <table className={styles.current_display_first_by_category_table}>
                <thead>
                  <tr>
                    <th colSpan='7'>
                      Cantidad de descuentos que se muestran primero en su
                      categoría actualmente (falta actualizar)
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className={styles.first_row}>
                    <td>Travel</td>
                    <td>Fashion</td>
                    <td>Beauty</td>
                    <td>Eat or Drink</td>
                    <td>Entertainment</td>
                    <td>Technology</td>
                    <td>Others</td>
                  </tr>
                  <tr className={styles.second_row}>
                    <td>{DISPLAY_FIRST_IN_CATEGORY_AMOUNT.travel}</td>
                    <td>{DISPLAY_FIRST_IN_CATEGORY_AMOUNT.fashion}</td>
                    <td>{DISPLAY_FIRST_IN_CATEGORY_AMOUNT.beauty}</td>
                    <td>{DISPLAY_FIRST_IN_CATEGORY_AMOUNT.eatordrink}</td>
                    <td>{DISPLAY_FIRST_IN_CATEGORY_AMOUNT.entertainment}</td>
                    <td>{DISPLAY_FIRST_IN_CATEGORY_AMOUNT.technology}</td>
                    <td>{DISPLAY_FIRST_IN_CATEGORY_AMOUNT.others}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* /////////////////////////
         //  términos y condiciones  // 
         ///////////////////////// */}

          <h2 className={styles.section_title}>Términos y condiciones</h2>

          <ReactQuill value={termsCondsText} onChange={setTermsCondsText} />

          {state.error && <p className='error__messagev2'>{state.error}</p>}

          <button
            type='submit'
            className={`${styles.submit_btn} ${
              state.uploading && styles.buttonLoading
            } btn button--red`}
            disabled={state.uploading}
          >
            Crear
          </button>
        </form>
      </div>
    </>
  );
};

export default nuevoDescuento;
