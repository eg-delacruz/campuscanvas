//Clarification: Allows edition and deletion of a discount
import { useRouter } from 'next/router';
import Image from 'next/image';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import dynamic from 'next/dynamic';

//Styles
import styles from '@styles/pagestyles/admin/descuentos/editarDescuento.module.scss';
//Rich text editor styles
//https://www.youtube.com/watch?v=kykC7i9VUE4
import 'react-quill/dist/quill.snow.css';

//Components
import AdminHeader from '@components/UsedInSpecificRoutes/Admin/AdminHeader/AdminHeader';
import Loader from '@components/GeneralUseComponents/Loader/Loader';
import ButtonBack from '@components/GeneralUseComponents/ButtonBack/ButtonBack';
import DisplayEliminateDiscountModal from '@components/UsedInSpecificRoutes/Admin/Descuentos/Discounts/DisplayEliminateDiscountModal/DisplayEliminateDiscountModal';
import ToUploadFilePreview from '@components/GeneralUseComponents/ToUploadFilePreview/ToUploadFilePreview';
import CustomCheckBox from '@components/GeneralUseComponents/CustomCheckBox/CustomCheckBox';
import DiscountCard from '@components/GeneralUseComponents/DiscountCard/DiscountCard';
import ButtonUp from '@components/GeneralUseComponents/ButtonUp/ButtonUp';
import DisplayEliminateHomeBanner from '@components/UsedInSpecificRoutes/Admin/Descuentos/HomeSlider/DisplayEliminateHomeBanner/DisplayEliminateHomeBanner';
import DisplayCreateHomeBannerModal from '@components/UsedInSpecificRoutes/Admin/Descuentos/HomeSlider/DisplayCreateHomeBannerModal/DisplayCreateHomeBannerModal';

//hooks
import useSecureAdminRoute from '@hooks/useSecureAdminRoute';
import useAxios from '@hooks/useAxios';
import { useInputValue } from '@hooks/useInputValue';
import { useCharacterCount } from '@hooks/useCharacterCount';

//Assets
import delete_icon from '@assets/GeneralUse/IconsAndButtons/delete.svg';
import edit_pencil from '@assets/GeneralUse/IconsAndButtons/edit_pencil.svg';

//Redux reducers and actions
import { selectDiscount, getDiscounts } from '@redux/discountsSlice';
import {
  selectHomeSectionsCount,
  getHomeSectionsCount,
} from '@redux/homeSectionsDiscountsCountSlice';
import {
  selectShowFirstInCategoryCount,
  getShowFirstInCategoryCount,
} from '@redux/showDiscountFirstInCategorySlice';

//Services
import dateFormat from '@services/dateFormat';

//Endpoints
import endPoints from '@services/api/index';

//Rich text editor
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

const editarDescuento = () => {
  const { securingRoute } = useSecureAdminRoute('all');

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

  const [newBanner, setNewBanner] = useState([]);
  const [showEliminateModal, setShowEliminateModal] = useState(false);
  const [termsCondsText, setTermsCondsText] = useState('');
  const [showEliminateHomeBannerModal, setShowEliminateHomeBannerModal] =
    useState(false);
  const [showCreateHomeBannerModal, setShowCreateHomeBannerModal] =
    useState(false);

  //Error states
  const [newBannerError, setNewBannerError] = useState(null);
  const [statusDatalistError, setStatusDatalistError] = useState(null);
  const [titleError, setTitleError] = useState(null);
  const [descriptionError, setDescriptionError] = useState(null);
  const [affiliateLinkError, setAffiliateLinkError] = useState(null);
  const [expirationDateError, setExpirationDateError] = useState(null);
  const [cardTitleError, setCardTitleError] = useState(null);
  const [cardTagDatalistError, setCardTagDatalistError] = useState(null);
  const [
    displayCardInSectionDatalistError,
    setDisplayCardInSectionDatalistError,
  ] = useState(null);

  //Datalist options
  const STATUS_OPTIONS = ['available', 'unavailable'];
  const CARD_TAG_OPTIONS = ['exclusivo', 'nuevo'];
  const DISPLAY_CARD_IN_SECTION_OPTIONS = [
    'sugeridos',
    'nuevos',
    'descubre_ofertas',
    'mas_descuentos_estudiantes',
  ];

  //Other varialbes
  const DISCOUNT_TYPE_DICTIONARY = {
    discount_code: 'Código de descuento',
    affiliate_link_only: 'Solo enlace de afiliado',
    dynamically_generated: 'Generado dinámicamente',
  };

  //Controlling inputs
  const STATUS = useInputValue('');
  const TITLE = useInputValue('');
  const DESCRIPTION = useInputValue('');
  const AFFILIATE_LINK = useInputValue('');
  const DISCOUNT_CODE = useInputValue('');
  const DISCOUNT_KEY = useInputValue('');
  const EXPIRATION_DATE = useInputValue('');
  const CARD_TITLE = useInputValue('');
  const CARD_TAG = useInputValue('');
  const DISPLAY_CARD_IN_SECTION = useInputValue('');
  const SHOW_FIRST_IN_CATEGORY = useInputValue(false);

  //Setting field counts
  const TITLE_COUNT = useCharacterCount(0);
  const DESCRIPTION_COUNT = useCharacterCount(0);
  const CARD_TITLE_COUNT = useCharacterCount(0);

  //Get discount id
  const router = useRouter();
  const id = router.query.id;

  //Reducers
  const discountsReducer = useSelector(selectDiscount);
  const homeSectionsCountReducer = useSelector(selectHomeSectionsCount);
  const showFirstInCategoryCountReducer = useSelector(
    selectShowFirstInCategoryCount
  );

  //Allows us to manipulate the appropriate slice/action
  const dispatch = useDispatch();

  //Get the discount
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
        } else if (!discount.expiration_date) {
          EXPIRATION_DATE.setValue('');
        }
        setTermsCondsText(discount.terms_and_conds);
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
        setTermsCondsText(response.body.terms_and_conds);
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

    getCardInfo();
  }, [router?.isReady]);

  //Get home section count and show first count
  useEffect(() => {
    const setCounts = async () => {
      if (homeSectionsCountReducer.homeSectionsCount.length === 0) {
        dispatch(getHomeSectionsCount());
      }
      if (
        showFirstInCategoryCountReducer.showFirstInCategoryCount.length === 0
      ) {
        dispatch(getShowFirstInCategoryCount());
      }
    };

    setCounts();
  }, [router?.isReady]);

  //Functions

  //Get card info
  async function getCardInfo() {
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

    //Setting initial input values
    CARD_TITLE.setValue(response.body.title);
    CARD_TITLE_COUNT.setValue(response.body.title.length);
    CARD_TAG.setValue(response.body.card_tag);
    DISPLAY_CARD_IN_SECTION.setValue(response.body.display_in_section);
    SHOW_FIRST_IN_CATEGORY.setValue(response.body.show_first_in_category);

    setDiscountCard({
      ...discountCard,
      discountCard: response.body,
      loading: false,
      error: null,
    });
  }

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

  const handleEditDiscount = async (e) => {
    e.preventDefault();
    setState({ ...state, saving_changes: true, form_error: null });
    setStatusDatalistError(null);
    setTitleError(null);
    setDescriptionError(null);
    setAffiliateLinkError(null);
    setExpirationDateError(null);
    setCardTitleError(null);
    setCardTagDatalistError(null);
    setDisplayCardInSectionDatalistError(null);

    //Other variables
    //Shows if any information was modified, IMAGE NOT INCLUDED IN THIS EVALUATION
    let EXCLUSIVE_DISCOUNT_INFORMATION_WAS_MODIFIED = false;
    let EXCLUSIVE_CARD_INFORMATION_WAS_MODIFIED = false;
    let SHARED_CARD_DISCOUNT_INFORMATION_WAS_MODIFIED = false;

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

    if (CARD_TITLE.value.length === 0) {
      setCardTitleError('Debes escribir un título');
      setState({
        ...state,
        form_error: 'Completa todos los campos obligatorios',
      });
      return;
    }

    if (CARD_TAG.value) {
      if (CARD_TAG_OPTIONS.indexOf(CARD_TAG.value) === -1) {
        setCardTagDatalistError(
          'Solo puedes seleccionar una viñeta que esté en la lista'
        );
        setState({
          ...state,
          form_error: 'Completa los campos correctamente',
        });
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
        setState({
          ...state,
          form_error: 'Completa los campos correctamente',
        });
        DISPLAY_CARD_IN_SECTION.setValue('');
        return;
      }
    }

    //Check which areas were modified
    //Needed because if expiration date comes as null from db, the exp date input will be '' if empty, and '' and null cannot be compared to properly disable submit btn
    let prev_exp_date_same_format = null;
    let updated_exp_date_same_format = null;

    if (state.discount?.expiration_date) {
      prev_exp_date_same_format = dateFormat.dateToYMD(
        new Date(state.discount?.expiration_date)
      );
    }

    if (EXPIRATION_DATE.value) {
      updated_exp_date_same_format = dateFormat.dateToYMD(
        new Date(EXPIRATION_DATE.value)
      );
    }

    if (
      state.discount?.title !== TITLE.value ||
      state.discount?.description !== DESCRIPTION.value ||
      state.discount?.affiliate_link !== AFFILIATE_LINK.value ||
      state.discount?.discount_code.code !== DISCOUNT_CODE.value ||
      state.discount?.discount_external_key !== DISCOUNT_KEY.value ||
      state.discount?.terms_and_conds !== termsCondsText
    ) {
      EXCLUSIVE_DISCOUNT_INFORMATION_WAS_MODIFIED = true;
    }

    if (
      discountCard.discountCard.title !== CARD_TITLE.value ||
      discountCard.discountCard.card_tag !== CARD_TAG.value ||
      discountCard.discountCard.display_in_section !==
        DISPLAY_CARD_IN_SECTION.value ||
      discountCard.discountCard.show_first_in_category !==
        SHOW_FIRST_IN_CATEGORY.value
    ) {
      EXCLUSIVE_CARD_INFORMATION_WAS_MODIFIED = true;
    }

    if (
      prev_exp_date_same_format !== updated_exp_date_same_format ||
      newBanner[0] ||
      state.discount?.status !== STATUS.value
    ) {
      SHARED_CARD_DISCOUNT_INFORMATION_WAS_MODIFIED = true;
    }

    //Put everything in a formData:
    const formData = new FormData();

    formData.append('discount_id', id);
    if (newBanner[0]) {
      formData.append('banner', newBanner[0]);
    } else {
      formData.append('banner', '');
    }
    formData.append(
      'EXCLUSIVE_DISCOUNT_INFORMATION_WAS_MODIFIED',
      EXCLUSIVE_DISCOUNT_INFORMATION_WAS_MODIFIED
    );
    formData.append(
      'EXCLUSIVE_CARD_INFORMATION_WAS_MODIFIED',
      EXCLUSIVE_CARD_INFORMATION_WAS_MODIFIED
    );
    formData.append(
      'SHARED_CARD_DISCOUNT_INFORMATION_WAS_MODIFIED',
      SHARED_CARD_DISCOUNT_INFORMATION_WAS_MODIFIED
    );
    formData.append('status', STATUS.value);
    formData.append('title', TITLE.value);
    formData.append('description', DESCRIPTION.value);
    formData.append('affiliate_link', AFFILIATE_LINK.value);
    formData.append('discount_code', DISCOUNT_CODE.value);
    formData.append('discount_external_key', DISCOUNT_KEY.value);
    formData.append('expiration_date', updated_exp_date_same_format);
    formData.append('card_title', CARD_TITLE.value);
    formData.append('card_tag', CARD_TAG.value);
    formData.append('display_in_section', DISPLAY_CARD_IN_SECTION.value);
    formData.append('show_first_in_category', SHOW_FIRST_IN_CATEGORY.value);
    formData.append('terms_and_conds', termsCondsText);

    //Send changes to server
    const response = await fetchData(
      endPoints.admin.discounts.index,
      'patch',
      formData,
      {
        'Content-Type': 'multipart/form-data',
      }
    );

    if (response.error) {
      setState({ ...state, saving_changes: false, form_error: response.error });
      return;
    }

    //Refresh the discounts reducer
    if (
      EXCLUSIVE_DISCOUNT_INFORMATION_WAS_MODIFIED ||
      SHARED_CARD_DISCOUNT_INFORMATION_WAS_MODIFIED
    ) {
      dispatch(getDiscounts());
    }

    //Refetch the card info if the card was modified
    if (
      EXCLUSIVE_CARD_INFORMATION_WAS_MODIFIED ||
      SHARED_CARD_DISCOUNT_INFORMATION_WAS_MODIFIED
    ) {
      getCardInfo();
    }

    //Refresh home section card count if applyes
    if (
      discountCard.discountCard.display_in_section !==
      DISPLAY_CARD_IN_SECTION.value
    ) {
      dispatch(getHomeSectionsCount());
    }

    //Refresh show first in category count if applies
    if (
      discountCard.discountCard.show_first_in_category !==
      SHOW_FIRST_IN_CATEGORY.value
    ) {
      dispatch(getShowFirstInCategoryCount());
    }

    //Reset the new banner if a new one was uploaded
    if (newBanner[0]) {
      setNewBanner([]);
    }

    //Refresh the exp date input value
    if (!updated_exp_date_same_format) {
      EXPIRATION_DATE.setValue('');
    }

    setState({ ...state, saving_changes: false, form_error: null });

    //Show a confirmation swal
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
  };

  const enableSaveChangesButton = () => {
    //If user did a change, disabled will be false. Not sure why this works, since for some cases, no state is modified, but the button behaves as espected.

    //Needed because if expiration date comes as null from db, the exp date input will be '' if empty, and '' and null cannot be compared to properly disable submit btn

    let prev_exp_date_same_format = null;
    let updated_exp_date_same_format = null;

    if (state.discount?.expiration_date) {
      prev_exp_date_same_format = dateFormat.dateToYMD(
        new Date(state.discount?.expiration_date)
      );
    }

    if (EXPIRATION_DATE.value) {
      updated_exp_date_same_format = dateFormat.dateToYMD(
        new Date(EXPIRATION_DATE.value)
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
      prev_exp_date_same_format !== updated_exp_date_same_format ||
      discountCard.discountCard.title !== CARD_TITLE.value ||
      discountCard.discountCard.card_tag !== CARD_TAG.value ||
      discountCard.discountCard.display_in_section !==
        DISPLAY_CARD_IN_SECTION.value ||
      discountCard.discountCard.show_first_in_category !==
        SHOW_FIRST_IN_CATEGORY.value ||
      state.discount?.terms_and_conds !== termsCondsText
    ) {
      return false;
    }
    return true;
  };

  const displayEliminateModal = () => {
    const has_home_banner = Object.keys(homeBanner.homeBanner).length > 0;
    return (
      <DisplayEliminateDiscountModal
        showModal={showEliminateModal}
        setShowModal={setShowEliminateModal}
        id={id}
        bannerName={state.discount.banner.name}
        has_home_banner={has_home_banner}
      />
    );
  };

  const displayCreateHomeBanner = () => {
    if (Object.keys(homeBanner.homeBanner).length === 0) {
      return (
        <DisplayCreateHomeBannerModal
          showModal={showCreateHomeBannerModal}
          setShowModal={setShowCreateHomeBannerModal}
          setHomeBanner={setHomeBanner}
          discount_id={id}
          currentHomeBannerState={homeBanner}
          available_for={state.discount.available_for}
          affiliate_link={state.discount.affiliate_link}
          type={state.discount.type}
        />
      );
    }
  };

  const displayEliminateHomeBannerModal = () => {
    if (Object.keys(homeBanner.homeBanner).length) {
      return (
        <DisplayEliminateHomeBanner
          showModal={showEliminateHomeBannerModal}
          setShowModal={setShowEliminateHomeBannerModal}
          banner_id={homeBanner.homeBanner._id}
          discount_title={state.discount.title}
          slider_banner_big_screen_name={
            homeBanner.homeBanner?.slider_banner_big_screen?.name
          }
          slider_banner_small_screen_name={
            homeBanner.homeBanner?.slider_banner_small_screen?.name
          }
          setHomeBanner={setHomeBanner}
        />
      );
    }
  };

  if (securingRoute || state.loading || discountsReducer.loading) {
    return (
      <div className={styles.loaderContainer}>
        <Loader />
      </div>
    );
  }

  return (
    <>
      <AdminHeader />
      <ButtonUp />
      {state.error ? (
        <>
          <div className={styles.error_container}>
            <h1>{state.error}</h1>
          </div>
        </>
      ) : (
        <>
          {displayEliminateModal()}
          {displayEliminateHomeBannerModal()}
          {displayCreateHomeBanner()}
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
                    {/* Cannot use Link to redirect user onClick to the brand, since we don´t have the brand ID and it would be too many requests if we got the brand from the DB just for that */}
                    <h2>{state.discount.brand.brand_name}</h2>
                  </div>
                  <p>
                    <strong>Categoría: </strong>
                    {state.discount.category}
                  </p>
                  <p>
                    <strong>Disponible para: </strong>
                    {state.discount?.available_for}
                  </p>
                  <p>
                    <strong>Creado por: </strong>
                    {state.discount.created_by}
                  </p>
                  <p>
                    <strong>Actualizado por: </strong>
                    {state.discount.modified_last_time_by}
                  </p>
                  <p>
                    <strong>Actualizado por última vez: </strong>
                    {state.discount?.updated_at &&
                      dateFormat.dateToDMYHM(
                        new Date(state.discount?.updated_at)
                      )}
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
                      {Object.keys(homeBanner.homeBanner).length === 0 ? (
                        <>
                          <p>
                            Este descuento no tienen ningún banner en el slider
                            principal.
                          </p>
                          {/* This is not a button because if we click on a button inside a form, the submit handler function is triggered automatically*/}
                          <div
                            className={`${styles.add_home_banner_btn} btn button--red`}
                            onClick={() => setShowCreateHomeBannerModal(true)}
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
                            <h5>Pantalla grande (1200 x 550)</h5>
                            <div className={styles.eliminate_container}>
                              <Image src={delete_icon} />
                              <div
                                className={styles.eliminate_text}
                                onClick={() =>
                                  setShowEliminateHomeBannerModal(true)
                                }
                              >
                                Eliminar home banners
                              </div>
                            </div>
                          </div>
                          <div className={styles.big_banner}>
                            <img
                              src={
                                homeBanner.homeBanner?.slider_banner_big_screen
                                  ?.URL
                              }
                              alt={`Banner de home pantalla grande `}
                            />
                          </div>
                          <h5>Pantalla movil (780 x 520)</h5>
                          <div className={styles.small_banner}>
                            <img
                              src={
                                homeBanner.homeBanner
                                  ?.slider_banner_small_screen?.URL
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
                      <>
                        <div className={styles.card_title_tag_container}>
                          <div>
                            <label
                              htmlFor='card_title'
                              className={`${styles.input_title}`}
                            >
                              Título de la tarjeta
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
                            />
                            <p
                              className={`${styles.char_count} ${
                                CARD_TITLE_COUNT.value > 40
                                  ? styles.char_count_warn
                                  : ''
                              }`}
                            >
                              <span>{CARD_TITLE_COUNT.value} / 40</span>
                            </p>
                            {cardTitleError && (
                              <p
                                className={`${styles.error_under_input} error__messagev2`}
                              >
                                {cardTitleError}
                              </p>
                            )}
                          </div>

                          <div>
                            <label
                              htmlFor='card_tag'
                              className={`${styles.input_title}`}
                            >
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
                              <p
                                className={`${styles.error_under_input} error__messagev2`}
                              >
                                {cardTagDatalistError}
                              </p>
                            )}
                          </div>
                        </div>

                        <div className={styles.display_in_section_container}>
                          <div
                            className={
                              styles.disabled_in_section_datalist_container
                            }
                          >
                            <div className={styles.label_tooltip_container}>
                              <label
                                htmlFor='display_in_section'
                                className={`${styles.input_title}`}
                              >
                                Mostrar en sección de home
                              </label>
                              <span className={styles.tooltip_container}>
                                ?{' '}
                                <span className={styles.tooltiptext}>
                                  SUGERIDOS y NOVEDADES se mostrarán solo a
                                  estudiantes verificados. Solo debería tener
                                  ofertas de verificados. DESCUBRE OFERTAS se
                                  mostrará a todo aquel que no sea estudiante
                                  verificado, y solo deberá tener ofertas
                                  públicas. MAS DESCUENTOS se muestra siempre
                                </span>
                              </span>
                            </div>
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
                              {DISPLAY_CARD_IN_SECTION_OPTIONS.map(
                                (section, index) => (
                                  <option key={index} value={section} />
                                )
                              )}
                            </datalist>
                            {displayCardInSectionDatalistError && (
                              <p
                                className={`${styles.error_under_input} error__messagev2`}
                              >
                                {displayCardInSectionDatalistError}
                              </p>
                            )}
                          </div>
                          <div>
                            {/* /////////////////////////////////////
                             // Current discounts per section table // 
                               ///////////////////////////////////// */}
                            {homeSectionsCountReducer.loading ? (
                              <div>Cargando...</div>
                            ) : homeSectionsCountReducer.error ? (
                              <div>{homeSectionsCountReducer.error}</div>
                            ) : (
                              <table
                                className={
                                  styles.current_discounts_per_section_table
                                }
                              >
                                <thead>
                                  <tr>
                                    <th colSpan='4'>
                                      Descuentos por sección de home actuales
                                    </th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr>
                                    {homeSectionsCountReducer.homeSectionsCount.map(
                                      (item, index) => (
                                        <td
                                          className={styles.first_row}
                                          key={index}
                                        >
                                          {item.section}
                                        </td>
                                      )
                                    )}
                                  </tr>
                                  <tr className={styles.second_row}>
                                    {homeSectionsCountReducer.homeSectionsCount.map(
                                      (item, index) => (
                                        <td key={index}>{item.count}</td>
                                      )
                                    )}
                                  </tr>
                                </tbody>
                              </table>
                            )}
                          </div>
                        </div>

                        <div
                          className={styles.show_first_in_category_container}
                        >
                          <div className={styles.checkbox_tooltip_container}>
                            <CustomCheckBox
                              message='Mostrar primero en su categoría'
                              required={false}
                              state={SHOW_FIRST_IN_CATEGORY}
                            />

                            <span className={styles.tooltip_container}>
                              ?{' '}
                              <span className={styles.tooltiptext}>
                                No exceder a más de 4 por categoría
                              </span>
                            </span>
                          </div>

                          {showFirstInCategoryCountReducer.loading ? (
                            <div>Cargando...</div>
                          ) : showFirstInCategoryCountReducer.error ? (
                            <div>{showFirstInCategoryCountReducer.error}</div>
                          ) : (
                            <table
                              className={
                                styles.current_display_first_by_category_table
                              }
                            >
                              <thead>
                                <tr>
                                  <th colSpan='7'>
                                    Cantidad de descuentos que se muestran
                                    primero en su categoría actualmente
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr className={styles.first_row}>
                                  {showFirstInCategoryCountReducer.showFirstInCategoryCount.map(
                                    (item, index) => (
                                      <td key={index}>{item.category}</td>
                                    )
                                  )}
                                </tr>
                                <tr className={styles.second_row}>
                                  {showFirstInCategoryCountReducer.showFirstInCategoryCount.map(
                                    (item, index) => (
                                      <td key={index}>{item.count}</td>
                                    )
                                  )}
                                </tr>
                              </tbody>
                            </table>
                          )}
                        </div>

                        <p>
                          <strong>Preview</strong>
                        </p>
                        <div className={styles.card_preview_container}>
                          <DiscountCard
                            banner={discountCard.discountCard.banner.URL}
                            title={CARD_TITLE.value}
                            brand_name={discountCard.discountCard.brand_name}
                            brand_logo={
                              discountCard.discountCard.brand_logo.brand_logo
                                .URL
                            }
                            discount_id={discountCard.discountCard.discount_id}
                            card_tag={CARD_TAG.value}
                          />

                          {/* /////////////////////////
                          //    Card creation info    //
                          ///////////////////////// */}

                          <div className={styles.card_creation_info}>
                            <p>
                              <strong>Creada por: </strong>
                              {discountCard.discountCard?.created_by}
                            </p>
                            <p>
                              <strong>Fecha de creación: </strong>
                              {discountCard.discountCard?.createdAt &&
                                dateFormat.dateToDMYHM(
                                  new Date(discountCard.discountCard?.createdAt)
                                )}
                            </p>
                            <p>
                              <strong>Actualizada por: </strong>
                              {discountCard.discountCard?.modified_last_time_by}
                            </p>
                            <p>
                              <strong>Actualizada por última vez: </strong>
                              {discountCard.discountCard?.updated_at &&
                                dateFormat.dateToDMYHM(
                                  new Date(
                                    discountCard.discountCard?.updated_at
                                  )
                                )}
                            </p>
                          </div>
                        </div>
                      </>
                    )}
                  </>
                )}
              </section>

              <h2 className={styles.section_title}>Términos y condiciones</h2>

              <ReactQuill value={termsCondsText} onChange={setTermsCondsText} />

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
