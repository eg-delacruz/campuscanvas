import { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import Link from "next/link";

//Input tag library
//https://github.com/i-like-robots/react-tag-autocomplete
import { ReactTags } from "react-tag-autocomplete";
import discount_key_words from "@datalist-options/discount_key_words";

//React query
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import discoutKeys from "@query-key-factory/discountKeys";
import adminKeys from "@query-key-factory/adminKeys";

//Styles
import styles from "@styles/pagestyles/admin/descuentos/nuevoDescuento.module.scss";
//Rich text editor styles
//https://www.youtube.com/watch?v=kykC7i9VUE4
import "react-quill/dist/quill.snow.css";

//Components
import AdminHeader from "@components/UsedInSpecificRoutes/Admin/AdminHeader/AdminHeader";
import Loader from "@components/GeneralUseComponents/Loader/Loader";
import ButtonBack from "@components/GeneralUseComponents/ButtonBack/ButtonBack";
import CustomCheckBox from "@components/GeneralUseComponents/CustomCheckBox/CustomCheckBox";
import DragDropUploadArea from "@components/GeneralUseComponents/DragDropUploadArea/DragDropUploadArea";
import ConfirmationSwal from "@components/GeneralUseComponents/ConfirmationSwal/ConfirmationSwal";

//hooks
import { useInputValue } from "@hooks/useInputValue";
import useSecureAdminRoute from "@hooks/useSecureAdminRoute";
import { useCharacterCount } from "@hooks/useCharacterCount";

//Request functions
import discountFunctions from "@request-functions/Admin/Discounts";

import {
  selectHomeSectionsCount,
  getHomeSectionsCount,
} from "@redux/homeSectionsDiscountsCountSlice";
import {
  selectShowFirstInCategoryCount,
  getShowFirstInCategoryCount,
} from "@redux/showDiscountFirstInCategorySlice";

//Datalist options
import DISPLAY_CARD_IN_SECTION_OPTIONS from "@datalist-options/display_card_in_section_options";
import CARD_TAG_OPTIONS from "@datalist-options/card_tag_options";
import DISCOUNT_CATEGORY_OPTIONS from "@datalist-options/discount_category_options";
import DISCOUNT_STATUS_OPTIONS from "@datalist-options/discount_status_options";

//Rich text editor
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const nuevoDescuento = () => {
  const { securingRoute } = useSecureAdminRoute("all");
  //Allows us to manipulate the appropriate slice/action
  const dispatch = useDispatch();

  //States
  const [state, setState] = useState({
    error: null,
    uploading: false,
  });
  const [bannerFile, setBannerFiles] = useState([]);
  const [bigImageHomeSlider, setBigImageHomeSlider] = useState([]);
  const [smallImageHomeSlider, setSmallImageHomeSlider] = useState([]);
  const [termsCondsText, setTermsCondsText] = useState(
    "<p>Términos y condiciones en la web de la marca</p>"
  );

  //Warning states
  const [affiliateLinkForbiddenWord, setAffiliateLinkForbiddenWord] =
    useState(false);

  //Error states
  const [statusDatalistError, setStatusDatalistError] = useState(null);
  const [titleError, setTitleError] = useState(null);
  const [descriptionError, setDescriptionError] = useState(null);
  const [discountTypeError, setDiscountTypeError] = useState(null);
  const [availableForError, setAvailableForError] = useState(null);
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
  const STATUS = useInputValue("available");
  const TITLE = useInputValue("");
  const DESCRIPTION = useInputValue("");
  const BRAND = useInputValue("");
  const CATEGORY = useInputValue("");
  const DISCOUNT_TYPE = useInputValue("");
  const DISCOUNT_CODE = useInputValue("");
  const AFFILIATE_LINK = useInputValue("");
  const CALL_TO_ACTION = useInputValue("");
  const AVAILABLE_FOR = useInputValue("");
  const VALID_FROM = useInputValue("");
  const EXPIRATION_DATE = useInputValue("");
  const SHOW_IN_HOME_SLIDER = useInputValue(false);
  const HOME_BANNER__REDIRECT_TO_BRAND_PAGE = useInputValue(false);
  const CARD_TITLE = useInputValue("");
  const CARD_TAG = useInputValue("");
  const DISPLAY_CARD_IN_SECTION = useInputValue("");
  const SHOW_FIRST_IN_CATEGORY = useInputValue(false);
  const SHOW_FIRST_IN_HOME_SECTION = useInputValue(false);
  const SHOW_FIRST_IN_ALL_DISCOUNTS = useInputValue(false);

  //Setting field counts
  const TITLE_COUNT = useCharacterCount();
  const DESCRIPTION_COUNT = useCharacterCount();
  const CARD_TITLE_COUNT = useCharacterCount();

  //discountKeyWords input (start)
  const [discountKeyWords, setDiscountKeyWords] = useState([]);

  const onAdd = useCallback(
    (newKeyWord) => {
      setDiscountKeyWords([...discountKeyWords, newKeyWord]);
    },
    [discountKeyWords]
  );

  const onDelete = useCallback(
    (keyWordIndex) => {
      setDiscountKeyWords(
        discountKeyWords.filter((_, index) => index !== keyWordIndex)
      );
    },
    [discountKeyWords]
  );
  //discountKeyWords input (end)

  //React query
  const queryClient = useQueryClient();

  const BRANDS = useQuery({
    queryKey: [adminKeys.brands.all_brands],
    queryFn: discountFunctions.getBrands,
    staleTime: 1000 * 60 * 60 * 24, //24 hours
    initialData: [],
    initialDataUpdatedAt: 1, //prevent initialData from being overwritten by queryFn
  });

  const SHOW_FIRST_IN_ALL_DISCOUNTS_COUNT = useQuery({
    queryKey: [discoutKeys.cards.show_first_in_all_discounts_count],
    queryFn: discountFunctions.getShowFirstInAllDiscountsCount,
    staleTime: Infinity,
  });

  const ADD_DISCOUNT = useMutation({
    mutationFn: (discount) => discountFunctions.addDiscount(discount),
    onSuccess: (data) => {
      const response_brand_id = data.discount.brand._id;

      //Increase the discounts_attached count of the brand in the brands query cache (which is an array of brands) if applies (if the array is not empty)
      queryClient.setQueryData([adminKeys.brands.all_brands], (oldData) => {
        if (oldData?.length > 0) {
          const updatedBrands = oldData.map((brand) => {
            if (brand._id === response_brand_id) {
              return {
                ...brand,
                discounts_attached: brand.discounts_attached + 1,
              };
            } else {
              return brand;
            }
          });
          return updatedBrands;
        }
      });

      // Add the new discount to the discounts query cache (which is an array of discount objects) if applies (if the array is not empty)
      queryClient.setQueryData(
        [adminKeys.discounts.all_discounts],
        (oldData) => {
          if (oldData?.length > 0) {
            return [...oldData, data.discount];
          }
        }
      );

      //Invalidate the home banners info query cache if applies
      if (SHOW_IN_HOME_SLIDER.value) {
        queryClient.invalidateQueries(
          [adminKeys.homeBanner.getHomeSliderBannersInfo],
          { exact: true }
        );
      }

      //Refresh home section card count if applyes
      if (DISPLAY_CARD_IN_SECTION.value) {
        dispatch(getHomeSectionsCount());
      }

      //Refresh show first in category count if applies
      if (SHOW_FIRST_IN_CATEGORY.value) {
        dispatch(getShowFirstInCategoryCount());
      }

      //Refetch show first in all discounts count if applies
      if (SHOW_FIRST_IN_ALL_DISCOUNTS.value) {
        SHOW_FIRST_IN_ALL_DISCOUNTS_COUNT.refetch();
      }

      //Confirmation swal
      ConfirmationSwal({
        message: data.message,
      });

      //Redirect to the created discount
      router.push(
        `/admin/descuentos/gestionar-descuentos/editar-descuento/${data.discount._id}`
      );

      setState({ ...state, error: null });
    },
    onError: (error) => {
      setState({ ...state, uploading: false });
    },
  });

  //Reducers
  const homeSectionsCountReducer = useSelector(selectHomeSectionsCount);
  const showFirstInCategoryCountReducer = useSelector(
    selectShowFirstInCategoryCount
  );

  const router = useRouter();

  //Get home section and show first counts
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

  const handleTitleChange = (e) => {
    TITLE.onChange(e);
    TITLE_COUNT.onChange(e);
  };
  const handleDescriptionChange = (e) => {
    DESCRIPTION.onChange(e);
    DESCRIPTION_COUNT.onChange(e);
  };
  const handleAffiliateLinkChange = (e) => {
    const hasForbiddenWord = (string) => {
      //These words are forbidden because of the PDCookieConcent of RBH, which makes discount pages crash if they have these words
      const FORBIDDEN_WORDS = [
        "adwords",
        "analytics",
        "doubleclick",
        "facebook.",
        "google.com/maps",
        "google.com/recaptcha",
        "googleadservices",
        "googlesyndication",
        "googletagmanager",
        "googletagservices",
        "googletraveladservices",
        "googleusercontent",
        "gstatic",
        "linkedin.",
        "maps.google.com",
        "maps.googleapis",
        "twitter.",
        "vimeo.",
        "youtube.",
        "ytimg",
        "urchin",
      ];
      const hasForbiddenWord = FORBIDDEN_WORDS.some((word) =>
        string.includes(word)
      );
      if (hasForbiddenWord) {
        setAffiliateLinkForbiddenWord(true);
        return true;
      }
      setAffiliateLinkForbiddenWord(false);
    };
    hasForbiddenWord(e.target.value);
    AFFILIATE_LINK.onChange(e);
  };

  const handleCardTitleChange = (e) => {
    CARD_TITLE.onChange(e);
    CARD_TITLE_COUNT.onChange(e);
  };

  //Get brand id
  const brand_id = () => {
    const item = BRANDS.data.find((item) => item.brand_name === BRAND.value);
    if (item === undefined) {
      setBrandDatalistError("Selecciona una marca de la lista");
      setState({
        ...state,
        error: "Selecciona una marca correcta",
      });
      BRAND.setValue("");
      return;
    }
    return item._id;
  };

  //Discount type radio buttons(start)
  const isDiscountTypeRadioSelected = (value) => DISCOUNT_TYPE.value === value;
  const handleRadioDiscountTypeClick = (e) => {
    DISCOUNT_TYPE.setValue(e.currentTarget.value);

    //Reseting input values
    DISCOUNT_CODE.setValue("");
    CALL_TO_ACTION.setValue("");
  };
  //Discount type radio buttons(end)

  //Available for radio buttons(start)
  const isAvailableForRadioSelected = (value) => AVAILABLE_FOR.value === value;
  const handleRadioAvailableForClick = (e) => {
    AVAILABLE_FOR.setValue(e.currentTarget.value);
  };
  //Available for radio buttons(end)

  const handleSubmit = async (e) => {
    e.preventDefault();
    setState({ ...state, error: null });

    //Resetting errors
    setStatusDatalistError(null);
    setTitleError(null);
    setDescriptionError(null);
    setDiscountTypeError(null);
    setAvailableForError(null);
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

    if (DISCOUNT_STATUS_OPTIONS.indexOf(STATUS.value) === -1) {
      setStatusDatalistError("Selecciona un estatus de la lista");
      STATUS.setValue("");
      setState({ ...state, error: "Selecciona un estatus válido" });
      return;
    }

    if (TITLE.value.length === 0) {
      setTitleError("Debes escribir un título");
      setState({ ...state, error: "Completa todos los campos obligatorios" });
      return;
    }

    if (DESCRIPTION.value.length === 0) {
      setDescriptionError("Debes escribir una descripción");
      setState({ ...state, error: "Completa todos los campos obligatorios" });
      return;
    }

    if (DISCOUNT_CATEGORY_OPTIONS.indexOf(CATEGORY.value) === -1) {
      setCategoryDatalistError("Selecciona una categoría de la lista");
      CATEGORY.setValue("");
      setState({ ...state, error: "Selecciona una categoría válida" });
      return;
    }

    if (AFFILIATE_LINK.value.length === 0) {
      setAffiliateLinkError("Debes añadir un enlace de afiliado");
      setState({ ...state, error: "Completa todos los campos obligatorios" });
      return;
    }

    if (DISCOUNT_TYPE.value.length === 0) {
      setDiscountTypeError("Debes seleccionar un tipo de descuento");
      setState({ ...state, error: "Completa todos los campos obligatorios" });
      return;
    }

    if (AVAILABLE_FOR.value.length === 0) {
      setAvailableForError(
        "Debes seleccionar quien puede acceder al descuento"
      );
      setState({ ...state, error: "Completa todos los campos obligatorios" });
      return;
    }

    if (bannerFile.length === 0) {
      setBannerFileError("Debes subir una imagen");
      setState({ ...state, error: "Completa todos los campos obligatorios" });
      return;
    }

    if (SHOW_IN_HOME_SLIDER.value) {
      if (
        bigImageHomeSlider.length === 0 ||
        smallImageHomeSlider.length === 0
      ) {
        setHomeSliderFilesError("Debes subir una imagen de cada tamaño");
        setState({ ...state, error: "Completa todos los campos obligatorios" });
        return;
      }
    }

    if (CARD_TITLE.value.length === 0) {
      setCardTitleError("Debes escribir un título");
      setState({ ...state, error: "Completa todos los campos obligatorios" });
      return;
    }

    if (CARD_TAG.value) {
      if (CARD_TAG_OPTIONS.indexOf(CARD_TAG.value) === -1) {
        setCardTagDatalistError(
          "Solo puedes seleccionar una viñeta que esté en la lista"
        );
        CARD_TAG.setValue("");
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
          "Solo puedes seleccionar una sección que esté en la lista"
        );
        DISPLAY_CARD_IN_SECTION.setValue("");
        return;
      }
    }

    //Only allow to display first in home section if the card appears in any home section
    let IS_SHOW_FIRST_IN_HOME_SECTION_ALLOWED = false;
    if (DISPLAY_CARD_IN_SECTION.value) {
      IS_SHOW_FIRST_IN_HOME_SECTION_ALLOWED = SHOW_FIRST_IN_HOME_SECTION.value;
    }

    const formdata = new FormData();
    formdata.append("status", STATUS.value);
    formdata.append("title", TITLE.value);
    formdata.append("description", DESCRIPTION.value);
    formdata.append("brand", BRAND_ID);
    formdata.append("category", CATEGORY.value);
    formdata.append("type", DISCOUNT_TYPE.value);
    formdata.append("discount_code", DISCOUNT_CODE.value);
    formdata.append("affiliate_link", AFFILIATE_LINK.value);
    formdata.append("action_btn_phrase", CALL_TO_ACTION.value);
    formdata.append("available_for", AVAILABLE_FOR.value);
    formdata.append("valid_from", new Date(VALID_FROM.value));
    formdata.append("expiration_date", EXP_DATE);
    formdata.append("discount_keywords", JSON.stringify(discountKeyWords));
    formdata.append("banner", bannerFile[0]);
    formdata.append("show_in_home_slider", SHOW_IN_HOME_SLIDER.value);
    formdata.append(
      "home_banner__redirect_user_to_brand_page",
      HOME_BANNER__REDIRECT_TO_BRAND_PAGE.value
    );
    formdata.append("big_home_slider_image", bigImageHomeSlider[0]);
    formdata.append("small_home_slider_image", smallImageHomeSlider[0]);
    formdata.append("card_title", CARD_TITLE.value);
    formdata.append("card_tag", CARD_TAG.value);
    formdata.append("display_card_in_section", DISPLAY_CARD_IN_SECTION.value);
    formdata.append("terms_and_conds", termsCondsText);
    formdata.append("show_first_in_category", SHOW_FIRST_IN_CATEGORY.value);
    formdata.append(
      "show_first_in_home_section",
      IS_SHOW_FIRST_IN_HOME_SECTION_ALLOWED
    );
    formdata.append(
      "show_first_in_all_discounts",
      SHOW_FIRST_IN_ALL_DISCOUNTS.value
    );

    //Uploading data
    setState({ ...state, uploading: true });

    ADD_DISCOUNT.mutate(formdata);
  };

  if (securingRoute || BRANDS.isLoading || BRANDS.isFetching) {
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
        <ButtonBack
          message="Descuentos"
          prevRoute={"/admin/descuentos/gestionar-descuentos"}
          disabled={state.uploading}
        />

        <h1>Nuevo descuento</h1>

        <form
          action=""
          method="POST"
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          {/* /////////////////////////
         //       General info       // 
         ///////////////////////// */}

          <div className={styles.flex_container}>
            <h2>Información general</h2>
            <Link href={"/admin/descuentos/gestionar-marcas"}>
              <button
                type="button"
                className={`${styles.manage_brands_btn} btn button--red`}
              >
                Gestionar marcas
              </button>
            </Link>
          </div>

          <section className={styles.general_info_container}>
            <div className={styles.status_container}>
              <div className={styles.label_tooltip_container}>
                <label htmlFor="status" className={`${styles.input_title}`}>
                  Status *
                </label>
                <span className={styles.tooltip_container}>
                  ?{" "}
                  <span className={styles.tooltiptext}>
                    Puedes crear un nuevo descuento sin que este sea visible en
                    ninguna sección de la web a través de una tarjeta eligiendo
                    la opción "unavailable". En el caso de añadirle un banner en
                    home, este sí aparecerá (ver documentación).
                  </span>
                </span>
              </div>
              <input
                className={`${styles.input}`}
                name="status"
                id="status"
                autoComplete="off"
                value={STATUS.value}
                onChange={STATUS.onChange}
                list="statuses"
              />
              <datalist id="statuses">
                {DISCOUNT_STATUS_OPTIONS.map((option, index) => (
                  <option key={index} value={option} />
                ))}
              </datalist>
              {statusDatalistError && (
                <p className={`${styles.error_under_input} error__messagev2`}>
                  {statusDatalistError}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="title" className={`${styles.input_title}`}>
                Título *
              </label>
              <input
                className={`${styles.input}`}
                name="title"
                id="title"
                type="text"
                placeholder="Recomendado: 40 caracteres aprox."
                autoComplete="off"
                value={TITLE.value}
                onChange={handleTitleChange}
                autoFocus
              />
              <p
                className={`${styles.char_count} ${
                  TITLE_COUNT.value > 40 ? styles.char_count_warn : ""
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
              <label htmlFor="description" className={`${styles.input_title}`}>
                Descripción *
              </label>
              <textarea
                className={`${styles.description_text_area}`}
                name="description"
                id="description"
                type="text"
                placeholder="Recomendado: 180 caracteres aprox."
                autoComplete="off"
                value={DESCRIPTION.value}
                onChange={handleDescriptionChange}
              />
              <p
                className={`${styles.char_count} ${
                  DESCRIPTION_COUNT.value > 180 ? styles.char_count_warn : ""
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
                <label htmlFor="brand" className={`${styles.input_title}`}>
                  Marca (previamente creada) *
                </label>
                <input
                  className={`${styles.input}`}
                  name="brand"
                  id="brand"
                  autoComplete="off"
                  value={BRAND.value}
                  onChange={BRAND.onChange}
                  list="brands"
                />
                <datalist id="brands">
                  {BRANDS?.data.map((brand) => (
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
                <label htmlFor="category" className={`${styles.input_title}`}>
                  Categoría *
                </label>
                <input
                  className={`${styles.input}`}
                  name="category"
                  id="category"
                  autoComplete="off"
                  value={CATEGORY.value}
                  onChange={CATEGORY.onChange}
                  //required
                  list="categories"
                />

                <datalist id="categories">
                  {DISCOUNT_CATEGORY_OPTIONS.map((category) => (
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
                htmlFor="affiliate_link"
                className={`${styles.input_title}`}
              >
                Enlace de afiliado o web del anunciante (incluye desde el
                https://www.)*
              </label>
              <input
                className={`${styles.input}`}
                name="affiliate_link"
                id="affiliate_link"
                type="text"
                placeholder=""
                autoComplete="off"
                value={AFFILIATE_LINK.value}
                onChange={handleAffiliateLinkChange}
              />
              {affiliateLinkError && (
                <p className={`${styles.error_under_input} error__messagev2`}>
                  {affiliateLinkError}
                </p>
              )}
              {affiliateLinkForbiddenWord && (
                <p className={`${styles.warning_under_input} warning__message`}>
                  El enlace de afiliado contiene palabras que afectarán la
                  funcionalidad del descuento. Utiliza el{" "}
                  <a target={"_blank"} href="https://free-url-shortener.rb.gy/">
                    acortador de enlaces
                  </a>{" "}
                  para corregirlo o haz cambios al enlace.
                </p>
              )}
            </div>

            <span className={styles.discount_type_title}>
              Tipo de descuento *
            </span>
            <div className={styles.discount_type_radio_btn_container}>
              <div className={styles.radio_input_container}>
                <input
                  className={styles.radio_input}
                  type="radio"
                  id="discount_code"
                  name="discount_type"
                  value="discount_code"
                  checked={isDiscountTypeRadioSelected("discount_code")}
                  onChange={handleRadioDiscountTypeClick}
                />
                <label htmlFor="discount_code">Código de descuento</label>
              </div>

              <div className={styles.radio_input_container}>
                <input
                  className={styles.radio_input}
                  type="radio"
                  id="affiliate_link_only"
                  name="discount_type"
                  value="affiliate_link_only"
                  checked={isDiscountTypeRadioSelected("affiliate_link_only")}
                  onChange={handleRadioDiscountTypeClick}
                />
                <label htmlFor="affiliate_link_only">
                  Solo enlace de afiliado
                </label>
              </div>

              <div className={styles.radio_input_container}>
                <input
                  className={styles.radio_input}
                  type="radio"
                  id="dynamically_generated"
                  name="discount_type"
                  value="dynamically_generated"
                  checked={isDiscountTypeRadioSelected("dynamically_generated")}
                  onChange={handleRadioDiscountTypeClick}
                />
                <label htmlFor="dynamically_generated">
                  Código generado dinámicamente
                </label>
              </div>
              {discountTypeError && (
                <p className={`error__messagev2`}>{discountTypeError}</p>
              )}
            </div>

            <div className={styles.discount_type_container}>
              {DISCOUNT_TYPE.value === "discount_code" ? (
                <div className={styles.discount_code_type_container}>
                  <div className={`${styles.disc_code_input_label_container}`}>
                    <label
                      htmlFor="discount_code"
                      className={`${styles.input_title}`}
                    >
                      Código de descuento *
                    </label>
                    <input
                      className={`${styles.input}`}
                      name="discount_code"
                      id="discount_code"
                      type="text"
                      placeholder=""
                      autoComplete="off"
                      value={DISCOUNT_CODE.value}
                      onChange={DISCOUNT_CODE.onChange}
                      required
                    />
                  </div>
                </div>
              ) : DISCOUNT_TYPE.value === "affiliate_link_only" ? (
                <div className={styles.affiliate_type_container}>
                  <div className={styles.call_to_action_container}>
                    <div
                      className={styles.call_to_action_input_label_container}
                    >
                      <div className={styles.label_tooltip_container}>
                        <label
                          htmlFor="call_to_action"
                          className={`${styles.input_title}`}
                        >
                          Call-to-action
                        </label>
                        <span className={styles.tooltip_container}>
                          ?{" "}
                          <span className={styles.tooltiptext}>
                            Texto que aparecerá en el botón de la oferta. (Ver
                            cambios en botón de ejemplo)
                          </span>
                        </span>
                      </div>
                      <input
                        className={`${styles.input}`}
                        name="call_to_action"
                        id="call_to_action"
                        type="text"
                        placeholder=""
                        autoComplete="off"
                        value={CALL_TO_ACTION.value}
                        onChange={CALL_TO_ACTION.onChange}
                      />
                    </div>
                    <div
                      className={`${styles.call_to_act_btn} btn button--red`}
                    >
                      {CALL_TO_ACTION.value
                        ? CALL_TO_ACTION.value
                        : "Ir a la tienda"}
                    </div>
                  </div>
                </div>
              ) : DISCOUNT_TYPE.value === "dynamically_generated" ? (
                <div className={styles.dynamically_generated_type_container}>
                  Generado dinámicamente. Información incierta
                </div>
              ) : (
                ""
              )}
            </div>

            <span className={styles.available_for_title}>Disponible para:</span>

            <div className={styles.available_for_radio_btn_container}>
              <div className={styles.radio_input_container}>
                <input
                  className={styles.radio_input}
                  type="radio"
                  id="estudiantes_verificados"
                  name="available_for"
                  value="estudiantes_verificados"
                  checked={isAvailableForRadioSelected(
                    "estudiantes_verificados"
                  )}
                  onChange={handleRadioAvailableForClick}
                />
                <label htmlFor="estudiantes_verificados">
                  Estudiantes verificados
                </label>
              </div>

              <div className={styles.radio_input_container}>
                <input
                  className={styles.radio_input}
                  type="radio"
                  id="publico"
                  name="available_for"
                  value="publico"
                  checked={isAvailableForRadioSelected("publico")}
                  onChange={handleRadioAvailableForClick}
                />
                <label htmlFor="publico">Todo público</label>
              </div>
              {availableForError && (
                <p className={`error__messagev2`}>{availableForError}</p>
              )}
            </div>

            <div className={styles.valid_exp_dates_container}>
              <div>
                <label htmlFor="valid_from" className={`${styles.input_title}`}>
                  Válido desde *
                </label>
                <input
                  className={`${styles.input}`}
                  name="valid_from"
                  id="valid_from"
                  type="date"
                  placeholder=""
                  autoComplete="off"
                  value={VALID_FROM.value}
                  onChange={VALID_FROM.onChange}
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="valid_until"
                  className={`${styles.input_title}`}
                >
                  Fecha de expiración
                </label>
                <input
                  className={`${styles.input}`}
                  name="valid_until"
                  id="valid_until"
                  type="date"
                  placeholder=""
                  autoComplete="off"
                  value={EXPIRATION_DATE.value}
                  onChange={EXPIRATION_DATE.onChange}
                />
              </div>
            </div>

            <div className={styles.input_key_words_container}>
              <ReactTags
                labelText="Etiquetas del descuento"
                selected={discountKeyWords}
                onAdd={onAdd}
                onDelete={onDelete}
                suggestions={discount_key_words}
                noOptionsText="No hay opciones"
                placeholderText="Añade etiquetas para facilitar la búsqueda"
              />
            </div>

            <div>
              <label className={`${styles.input_title}`}>
                Banner del descuento en JPG (Debe ser de 640 x 320!){" "}
              </label>

              <DragDropUploadArea
                onFileChange={(files) => {
                  setBannerFiles(files);
                }}
                maxAllowedFiles={1}
                maxSizeFilesBytes={4194304}
                allowedFileFormats={["jpg", "jpeg", "png"]}
                minimizedVersion={true}
              />
              {bannerFileError && (
                <p className={"error__messagev2"}>{bannerFileError}</p>
              )}
            </div>

            <div className={styles.home_slider_section}>
              <div className={styles.add_home_slider_banner_checkbox_container}>
                <CustomCheckBox
                  message="Añadir a slider principal en home"
                  required={false}
                  state={SHOW_IN_HOME_SLIDER}
                />
              </div>

              {SHOW_IN_HOME_SLIDER.value && (
                <div className={styles.upload_images_container}>
                  <label className={`${styles.input_title}`}>
                    Imagen pantalla grande en JPG (Tamaño 1200 x 550!){" "}
                  </label>
                  <DragDropUploadArea
                    onFileChange={(files) => {
                      setBigImageHomeSlider(files);
                    }}
                    maxAllowedFiles={1}
                    maxSizeFilesBytes={4194304}
                    allowedFileFormats={["jpg", "jpeg", "png"]}
                    minimizedVersion={true}
                  />

                  <label
                    className={`${styles.input_title} ${styles.upload_small_Home_slider_img_label}`}
                  >
                    Imagen pantalla movil en JPG (780 x 520!){" "}
                  </label>
                  <DragDropUploadArea
                    onFileChange={(files) => {
                      setSmallImageHomeSlider(files);
                    }}
                    maxAllowedFiles={1}
                    maxSizeFilesBytes={4194304}
                    allowedFileFormats={["jpg", "jpeg", "png"]}
                    minimizedVersion={true}
                  />
                  {homeSliderFilesError && (
                    <p className={"error__messagev2"}>{homeSliderFilesError}</p>
                  )}

                  <div
                    className={
                      styles.home_banner__redirect_user_to_brand_page_checkbox_container
                    }
                  >
                    <CustomCheckBox
                      message="Redirigir al usuario a la página de la marca"
                      required={false}
                      state={HOME_BANNER__REDIRECT_TO_BRAND_PAGE}
                    />
                  </div>
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
                <label htmlFor="card_title" className={`${styles.input_title}`}>
                  Título de la tarjeta *
                </label>
                <input
                  className={`${styles.input}`}
                  name="card_title"
                  id="card_title"
                  type="text"
                  placeholder="Recomendado: 40 caracteres aprox."
                  autoComplete="off"
                  value={CARD_TITLE.value}
                  onChange={handleCardTitleChange}
                  required
                />
                <p
                  className={`${styles.char_count} ${
                    CARD_TITLE_COUNT.value > 40 ? styles.char_count_warn : ""
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
                <label htmlFor="card_tag" className={`${styles.input_title}`}>
                  Viñeta
                </label>
                <input
                  className={`${styles.input}`}
                  name="card_tag"
                  id="card_tag"
                  autoComplete="off"
                  value={CARD_TAG.value}
                  onChange={CARD_TAG.onChange}
                  list="tags"
                />
                <datalist id="tags">
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

            <div className={styles.display_in_section_datalist_container}>
              <div className={styles.label_tooltip_container}>
                <label
                  htmlFor="display_in_section"
                  className={`${styles.input_title}`}
                >
                  Mostrar en sección de home
                </label>
                <span className={styles.tooltip_container}>
                  ?{" "}
                  <span className={styles.tooltiptext}>
                    SUGERIDOS y NOVEDADES se mostrarán solo a estudiantes
                    verificados. SUGERIDOS debe tener 4. NOVEDADES debe tener 4.
                    Solo deberían tener ofertas de verificados. <br />
                    MAS DESCUENTOS se muestra siempre y deberá tener un mix de 9
                    ofertas públicas y privadas.
                  </span>
                </span>
              </div>
              <input
                className={`${styles.input}`}
                name="display_in_section"
                id="display_in_section"
                autoComplete="off"
                value={DISPLAY_CARD_IN_SECTION.value}
                onChange={DISPLAY_CARD_IN_SECTION.onChange}
                list="sections"
              />
              <datalist id="sections">
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

            <div
              className={styles.show_first_in_home_category_checkbox_container}
            >
              <CustomCheckBox
                message="Mostrar primero en la sección de home"
                required={false}
                state={SHOW_FIRST_IN_HOME_SECTION}
              />
            </div>

            <div
              className={styles.current_discounts_per_section_table_container}
            >
              {/* /////////////////////////////////////
                // Current discounts per section table // 
                ///////////////////////////////////// */}
              {homeSectionsCountReducer.loading ? (
                <div>Cargando...</div>
              ) : homeSectionsCountReducer.error ? (
                <div>{homeSectionsCountReducer.error}</div>
              ) : (
                <table className={styles.current_discounts_per_section_table}>
                  <thead>
                    <tr>
                      <th colSpan="4">
                        Descuentos por sección de home actuales
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      {homeSectionsCountReducer.homeSectionsCount.map(
                        (item, index) => (
                          <td className={styles.first_row} key={index}>
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

            <div className={styles.show_first_in_all_discounts_container}>
              <div
                className={
                  styles.show_first_in_all_discounts_checkbox_container
                }
              >
                <CustomCheckBox
                  message="Mostrar primero entre todos los descuentos"
                  required={false}
                  state={SHOW_FIRST_IN_ALL_DISCOUNTS}
                />
              </div>
              <p>
                <strong>Actualmente se muestran primero: </strong>
                {SHOW_FIRST_IN_ALL_DISCOUNTS_COUNT.isLoading ? (
                  "Cargando..."
                ) : SHOW_FIRST_IN_ALL_DISCOUNTS_COUNT.isError ||
                  SHOW_FIRST_IN_ALL_DISCOUNTS_COUNT.data?.error ? (
                  <>
                    {SHOW_FIRST_IN_ALL_DISCOUNTS_COUNT.error.message +
                      SHOW_FIRST_IN_ALL_DISCOUNTS_COUNT.data?.error?.message}
                  </>
                ) : (
                  <>
                    {
                      SHOW_FIRST_IN_ALL_DISCOUNTS_COUNT.data
                        .show_first_in_all_discounts_count
                    }{" "}
                    descuentos
                  </>
                )}
              </p>
            </div>

            <div className={styles.show_first_in_category_container}>
              <div className={styles.checkbox_tooltip_container}>
                <CustomCheckBox
                  message="Mostrar primero en su categoría"
                  required={false}
                  state={SHOW_FIRST_IN_CATEGORY}
                />

                <span className={styles.tooltip_container}>
                  ?{" "}
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
                  className={styles.current_display_first_by_category_table}
                >
                  <thead>
                    <tr>
                      <th colSpan="7">
                        Cantidad de descuentos que se muestran primero en su
                        categoría actualmente
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
          </section>

          {/* /////////////////////////
         //  términos y condiciones  // 
         ///////////////////////// */}

          <h2 className={styles.section_title}>Términos y condiciones</h2>

          <ReactQuill value={termsCondsText} onChange={setTermsCondsText} />

          {state.error && (
            <p className="error__messagev2">{state.error.message}</p>
          )}
          {ADD_DISCOUNT.isError && (
            <p className="error__messagev2">{ADD_DISCOUNT.error.message}</p>
          )}

          <button
            type="submit"
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
