import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Swal from "sweetalert2";
import Link from "next/link";
import dynamic from "next/dynamic";

//React query
import { useQuery, useQueryClient } from "@tanstack/react-query";
import discountKeys from "@query-key-factory/discountKeys";
import adminKeys from "@query-key-factory/adminKeys";

//Styles
import styles from "@styles/pagestyles/admin/descuentos/editarMarca.module.scss";
//Rich text editor styles
//https://www.youtube.com/watch?v=kykC7i9VUE4
import "react-quill/dist/quill.snow.css";

//Components
import AdminHeader from "@components/UsedInSpecificRoutes/Admin/AdminHeader/AdminHeader";
import ButtonBack from "@components/GeneralUseComponents/ButtonBack/ButtonBack";
import Loader from "@components/GeneralUseComponents/Loader/Loader";
import DisplayEliminateBrandModal from "@components/UsedInSpecificRoutes/Admin/Descuentos/Brands/DisplayEliminateBrandModal/DisplayEliminateBrandModal";
import NotFound404 from "@components/GeneralUseComponents/NotFound404/NotFound404";
import CustomCheckBox from "@components/GeneralUseComponents/CustomCheckBox/CustomCheckBox";

//hooks
import useSecureAdminRoute from "@hooks/useSecureAdminRoute";
import useAxios from "@hooks/useAxios";
import { useInputValue } from "@hooks/useInputValue";

//Assets
import delete_icon from "@assets/GeneralUse/IconsAndButtons/delete.svg";
import edit_pencil from "@assets/GeneralUse/IconsAndButtons/edit_pencil.svg";

//Services
import dateFormat from "@services/dateFormat";

//Endpoints
import endPoints from "@services/api/index";

//Request functions
import discountFunctions from "@request-functions/Discounts";
import requestFn from "@request-functions/Admin/Discounts"; //Admin functions

//Rich text editor
const ReactQuill = dynamic(
  async () => {
    const { default: ReactQuill } = await import("react-quill");
    return ({ forwardedRef, ...props }) => (
      <ReactQuill ref={forwardedRef} {...props} />
    );
  },
  { ssr: false }
);

//React Quill custom options
const modules = {
  clipboard: {
    //avoids Quill creating extra, empty lines if the source of the copy-paste includes a lot of padding before/after things like headings.
    matchVisual: false,
  },
  toolbar: [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [{ list: "ordered" }, { list: "bullet" }],
    //To add images to the editor, uncomment the following line and erase the one below it
    //['link', 'image'],
    ["link"],
    ["clean"],
  ],
};

//React Quill custom formats. The ones that are not included here will be removed from the editor: https://quilljs.com/docs/formats/
const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "link",
  "image",
];

const editarMarca = () => {
  const { securingRoute } = useSecureAdminRoute("all");

  const { fetchData, cancel } = useAxios();

  //Refs
  const descriptionRef = useRef();
  const upperHeadingsRef = useRef();
  const FAQsRef = useRef();

  //States
  const [state, setState] = useState({
    brand: {},
    loading: true,
    error: null,
    saving_changes: false,
    saving_changes_error: null,
  });

  const [newBrandLogo, setNewBrandLogo] = useState({
    newLogo: [],
    error: null,
    logoPreview: "",
  });
  const [description, setDescription] = useState("");
  const [descriptionLength, setDescriptionLength] = useState(0);
  const [upperHeadings, setUpperHeadings] = useState("");
  const [FAQs, setFAQs] = useState("");
  const [showEliminateModal, setShowEliminateModal] = useState(false);

  //Warning states
  const [homeTrackedURLForbiddenWord, setHomeTrackedURLForbiddenWord] =
    useState(false);

  //Controlling inputs
  const SPONSORS_BOX = useInputValue(state.brand?.sponsors_box);
  const BRAND_SLUG = useInputValue(state.brand?.brand_slug);
  const BRAND_HOME_TRACKED_URL = useInputValue("");
  const TAB_TITLE = useInputValue("");
  const META_NAME = useInputValue("");
  const META_DESCRIPTION = useInputValue("");
  const AFFILIATE_PROGRAM = useInputValue("");
  const NOTES = useInputValue("");

  //Get brand id
  const router = useRouter();
  const id = router.query.id;

  //React query
  const queryClient = useQueryClient();

  //React query
  const BRANDS = useQuery({
    queryKey: [adminKeys.brands.all_brands],
    queryFn: requestFn.getBrands,
    staleTime: 1000 * 60 * 60 * 24, //24 hours
    initialData: [],
    initialDataUpdatedAt: 1, //prevent initialData from being overwritten by queryFn
    enabled: false,
  });

  const ATTACHED_DISCOUNTS = useQuery({
    queryKey: [discountKeys.brands.get_discounts_attached(id)],
    queryFn: () => discountFunctions.getDiscountsOfBrand(id),
    staleTime: 1000 * 60 * 60 * 5, //5 hours
    enabled:
      state.brand?.discounts_attached !== 0 &&
      state.brand?.discounts_attached !== undefined,
  });

  //Get brand info (start)
  useEffect(() => {
    //Await until the route is ready to get the brand_id
    if (!router.isReady) return;

    //Get the brand from global state if available to avoid unnecessary requests
    if (BRANDS?.data?.length > 0 && BRANDS.data !== undefined) {
      const brand = BRANDS.data.find((brand) => brand._id === id);
      if (brand) {
        setState({ ...state, brand, loading: false });
        SPONSORS_BOX.setValue(brand.sponsors_box);
        BRAND_SLUG.setValue(brand.brand_slug);
        BRAND_HOME_TRACKED_URL.setValue(brand.brand_home_tracked_url);
        setDescription(brand.brand_description);
        setUpperHeadings(brand.upper_headings);
        setFAQs(brand.faqs);
        TAB_TITLE.setValue(brand.tab_title);
        META_NAME.setValue(brand.meta_name);

        META_DESCRIPTION.setValue(brand.meta_description);
        AFFILIATE_PROGRAM.setValue(brand.affiliate_program);
        NOTES.setValue(brand.notes);
        //Wait a second to avoid the editor to be undefined
        setTimeout(() => {
          setDescriptionLength(
            descriptionRef.current?.unprivilegedEditor.getLength() - 1
          );
        }, 1000);
        return;
      }
    }

    //If the brand is not available in global state, get it from the server
    if (Object.keys(state.brand).length === 0) {
      const getBrand = async () => {
        const response = await fetchData(
          endPoints.discounts.getBrandById(id),
          "get",
          null,
          { required_info: "single_brand" }
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
        setDescription(response.body.brand_description);
        BRAND_SLUG.setValue(response.body.brand_slug);
        BRAND_HOME_TRACKED_URL.setValue(response.body.brand_home_tracked_url);
        setUpperHeadings(response.body.upper_headings);
        setFAQs(response.body.faqs);
        TAB_TITLE.setValue(response.body.tab_title);
        META_NAME.setValue(response.body.meta_name);
        META_DESCRIPTION.setValue(response.body.meta_description);
        AFFILIATE_PROGRAM.setValue(response.body.affiliate_program);
        NOTES.setValue(response.body?.notes);
      };
      getBrand();
    }
  }, [BRANDS?.data, router?.isReady]);
  //Get brand info (end)

  //Count description length on Mount
  useEffect(() => {
    //Set a timer to set the description length after 1 second to avoid the editor to be undefined
    const timer = setTimeout(() => {
      setDescriptionLength(
        descriptionRef.current?.unprivilegedEditor.getLength() - 1
      );
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  //Count description length on change
  useEffect(() => {
    setDescriptionLength(
      descriptionRef.current?.unprivilegedEditor.getLength() - 1
    );
  }, [description]);

  const displayEliminateModal = () => {
    // If this brand has any asociated discounts, show a swal and dont allow to delete
    if (state.brand?.discounts_attached > 0) {
      const customSwal = Swal.mixin({
        customClass: {
          confirmButton: "btn button--red",
        },
        buttonsStyling: false,
      });
      customSwal.fire(
        "¡Hay descuentos asociados!",
        "Elimina los descuentos asociados antes de eliminar la marca",
        "error"
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

  //Functions

  //Handle change brand logo (start)
  const onNewFile = (e) => {
    const allowedFileFormats = ["svg", "png"];
    const newFile = e.target.files[0];
    //4 MB aprox.
    const maxSizeAllowed = 4194304;

    //Allow only certain file formats
    const dots = newFile.name.split(".");
    const newFileType = dots[dots.length - 1];

    if (!allowedFileFormats.includes(newFileType)) {
      setNewBrandLogo({
        ...newBrandLogo,
        error:
          "Debes subir un archivo preferentemente en formato SVG, o un PNG de 230 x 230 px",
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

  const handleTrackedBrandHomeUrl = (e) => {
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
        setHomeTrackedURLForbiddenWord(true);
        return true;
      }
      setHomeTrackedURLForbiddenWord(false);
    };
    hasForbiddenWord(e.target.value);
    BRAND_HOME_TRACKED_URL.onChange(e);
  };

  const handleEditBrand = async (e) => {
    e.preventDefault();

    if (!descriptionLength) {
      setState({
        ...state,
        saving_changes_error: "Debes escribir una descripción",
      });
      setTimeout(() => {
        setState({
          ...state,
          saving_changes_error: null,
        });
      }, 3000);
      return false;
    }

    if (BRAND_HOME_TRACKED_URL.value.length === 0) {
      setState({
        ...state,
        saving_changes_error:
          "Debes escribir una URL trackeada de la página de inicio de la marca",
      });
      setTimeout(() => {
        setState({
          ...state,
          saving_changes_error: null,
        });
      }, 3000);
      return false;
    }

    if (
      TAB_TITLE.value.length === 0 ||
      META_NAME.value.length === 0 ||
      META_DESCRIPTION.value.length === 0
    ) {
      setState({
        ...state,
        saving_changes_error: "Debes llenar todos los campos de metadatos",
      });
      setTimeout(() => {
        setState({
          ...state,
          saving_changes_error: null,
        });
      }, 3000);
      return false;
    }

    const APPROVED_UPPER_HEADINGS =
      upperHeadingsRef.current?.unprivilegedEditor.getLength() - 1 < 5
        ? ""
        : upperHeadings;
    const APPROVED_FAQS =
      FAQsRef.current?.unprivilegedEditor.getLength() - 1 < 5 ? "" : FAQs;

    const formdata = new FormData();
    formdata.append("id", id);
    formdata.append("brand_logo", newBrandLogo.newLogo[0]);
    formdata.append("brand_slug", BRAND_SLUG.value);
    formdata.append("sponsors_box", SPONSORS_BOX.value);
    formdata.append("brand_home_tracked_url", BRAND_HOME_TRACKED_URL.value);
    formdata.append("brand_description", description);
    formdata.append("upper_headings", APPROVED_UPPER_HEADINGS);
    formdata.append("faqs", APPROVED_FAQS);
    formdata.append("tab_title", TAB_TITLE.value);
    formdata.append("meta_name", META_NAME.value);
    formdata.append("meta_description", META_DESCRIPTION.value);
    formdata.append("affiliate_program", AFFILIATE_PROGRAM.value);
    formdata.append("notes", NOTES.value);

    setState({
      ...state,
      saving_changes: true,
    });

    //Send data to update information
    const response = await fetchData(
      endPoints.admin.discounts.brands,
      "patch",
      formdata,
      { "Content-Type": "multipart/form-data" }
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

    //Update cache only instead of fetching all brands again only if the following fields have changed
    let update_cache_only = false;

    if (
      state.brand.brand_slug !== BRAND_SLUG.value ||
      state.brand.brand_home_tracked_url !== BRAND_HOME_TRACKED_URL.value ||
      state.brand.brand_description !== description ||
      state.brand.upper_headings !== upperHeadings ||
      state.brand.faqs !== FAQs ||
      state.brand.tab_title !== TAB_TITLE.value ||
      state.brand.meta_name !== META_NAME.value ||
      state.brand.meta_description !== META_DESCRIPTION.value ||
      state.brand.affiliate_program !== AFFILIATE_PROGRAM.value ||
      state.brand.notes !== NOTES.value
    ) {
      update_cache_only = true;
    }

    //Reset states
    setNewBrandLogo({
      ...newBrandLogo,
      newLogo: [],
      logoPreview: "",
    });
    if (APPROVED_UPPER_HEADINGS === "") {
      //Set upper headings to empty if it's less than 5 characters
      setUpperHeadings("");
    }
    if (APPROVED_FAQS === "") {
      //Set FAQs to empty if it's less than 5 characters
      setFAQs("");
    }

    //Update brands
    if (update_cache_only) {
      //Update brands from cache with the local information
      queryClient.setQueryData([adminKeys.brands.all_brands], (oldData) => {
        if (oldData?.length > 0) {
          const updatedBrands = oldData.map((brand) => {
            if (brand._id === id) {
              return {
                ...brand,
                brand_slug: BRAND_SLUG.value,
                brand_home_tracked_url: BRAND_HOME_TRACKED_URL.value,
                brand_description: description,
                upper_headings: APPROVED_UPPER_HEADINGS,
                faqs: APPROVED_FAQS,
                tab_title: TAB_TITLE.value,
                meta_name: META_NAME.value,
                meta_description: META_DESCRIPTION.value,
                affiliate_program: AFFILIATE_PROGRAM.value,
                notes: NOTES.value,
              };
            }
            return brand;
          });
          return updatedBrands;
        } else {
          return oldData;
        }
      });
    } else {
      //Update brands from DB if brand logo has changed, since the logo URL is not stored in cache
      BRANDS.refetch();
    }

    //Scroll to top
    window.scrollTo(0, 0);
  };

  const valid_till_date_color = (date) => {
    const today = new Date();
    const valid_till_date = new Date(date);

    //Expired styles
    if (today > valid_till_date) {
      return styles.expired;
    }
    //Expires in the following 5 days
    else if (today < valid_till_date) {
      const difference = valid_till_date - today;
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      if (days < 5) {
        return styles.expiring_soon;
      }
    }
  };

  if (
    securingRoute ||
    state.loading ||
    BRANDS.isLoading ||
    BRANDS.isFetching ||
    BRANDS.isRefetching
  ) {
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
          prevRoute={"/admin/descuentos/gestionar-marcas"}
          message="Marcas"
          disabled={state.saving_changes}
        />

        <main>
          {state.error ? (
            <NotFound404
              title={state.error}
              message={
                "No se ha podido encontrar esta marca. Probablemente no exista o fue borrada"
              }
            />
          ) : (
            <>
              {handleDisplayEliminateModal()}
              <form
                action=""
                method="POST"
                autoComplete="off"
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
                      type="file"
                      value=""
                      accept=".jpg,.jpeg,.png,.svg"
                      onChange={onNewFile}
                    />
                  </div>
                  <h1>
                    <a
                      href={`https://campuscanvas.net/descuentos/${state.brand.brand_slug}`}
                      target="_blank"
                    >
                      {state.brand.brand_name}
                    </a>
                  </h1>
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
                      <strong>Fecha de creación: </strong>
                      {dateFormat.SlashDate(new Date(state.brand.created_at))}
                    </p>
                    <p>
                      <strong>Actualizado por: </strong>
                      {state.brand.updated_by ? state.brand.updated_by : ""}
                    </p>
                    <p>
                      <strong>Actualizado por última vez: </strong>
                      {dateFormat.SlashDate(new Date(state.brand.updated_at))}
                    </p>
                  </div>
                  <CustomCheckBox
                    message="La marca patrocina Campus Box 🎁"
                    required={false}
                    state={SPONSORS_BOX}
                  />
                </div>

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
                          alt="Logo de la marca"
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
                  ""
                )}

                <div className={styles.brand_slug_container}>
                  <div className={styles.label_tooltip_container}>
                    <label
                      htmlFor="brand_slug"
                      className={`${styles.input_title} `}
                    >
                      Slug de la marca *
                    </label>
                    <span className={styles.tooltip_container}>
                      ?{" "}
                      <span className={styles.tooltiptext}>
                        Necesario para generar la URL de la marca. Evitar usar
                        tildes y caracteres especiales.
                      </span>
                    </span>
                  </div>
                  <input
                    className={`${styles.input} ${styles.brand_slug_input}`}
                    name="brand_slug"
                    id="brand_slug"
                    type="text"
                    placeholder="Slug de la marca"
                    autoComplete="off"
                    value={BRAND_SLUG.value}
                    onChange={(e) => {
                      //Eliminate accents, special characters and spaces
                      BRAND_SLUG.setValue(
                        e.target.value
                          .normalize("NFD")
                          .replace(/[\u0300-\u036f]/g, "")
                          .replace(/\s+/g, "-")
                          .replace(/\./g, "")
                          .toLowerCase()
                      );
                    }}
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="tracked_home_url"
                    className={`${styles.input_title}`}
                  >
                    Enlace trackeado a la web de la marca (incluye desde el
                    https://www.)*
                  </label>
                  <input
                    className={`${styles.input}`}
                    name="tracked_home_url"
                    id="tracked_home_url"
                    type="text"
                    placeholder=""
                    autoComplete="off"
                    value={BRAND_HOME_TRACKED_URL.value}
                    onChange={handleTrackedBrandHomeUrl}
                  />
                  {homeTrackedURLForbiddenWord && (
                    <p
                      className={`${styles.warning_under_input} warning__message`}
                    >
                      El enlace de afiliado contiene palabras que afectarán la
                      funcionalidad del sitio web de Campus Canvas. Utiliza el{" "}
                      <a
                        target={"_blank"}
                        href="https://free-url-shortener.rb.gy/"
                      >
                        acortador de enlaces
                      </a>{" "}
                      para corregirlo o haz cambios al enlace.
                    </p>
                  )}
                </div>

                <div className={styles.description_container}>
                  <label
                    htmlFor="brand_description"
                    className={`${styles.input_title}`}
                  >
                    Descripción de la marca *
                  </label>
                  <div className={styles.quill_editor}>
                    <ReactQuill
                      id="brand_description"
                      modules={modules}
                      formats={formats}
                      value={description}
                      onChange={setDescription}
                      forwardedRef={descriptionRef}
                    />
                  </div>
                  <p
                    className={`${styles.char_count} ${
                      styles.description_char_count
                    } ${descriptionLength > 520 ? styles.char_count_warn : ""}`}
                  >
                    <span>{descriptionLength} / 520</span>
                  </p>
                </div>

                <div className={styles.upper_headings_container}>
                  <label
                    htmlFor="upper_headings"
                    className={`${styles.input_title}`}
                  >
                    Contenido principal (H1 + párrafo + contenido)
                  </label>
                  <div className={styles.quill_editor}>
                    <ReactQuill
                      id="upper_headings"
                      modules={modules}
                      formats={formats}
                      value={upperHeadings}
                      onChange={setUpperHeadings}
                      forwardedRef={upperHeadingsRef}
                    />
                  </div>
                </div>

                <div className={styles.FAQs_container}>
                  <label htmlFor="FAQs" className={`${styles.input_title}`}>
                    Preguntas frecuentes (Pequeña descripción + H3 + párrafo por
                    pregunta)
                  </label>
                  <div className={styles.quill_editor}>
                    <ReactQuill
                      id="FAQs"
                      modules={modules}
                      formats={formats}
                      value={FAQs}
                      onChange={setFAQs}
                      forwardedRef={FAQsRef}
                    />
                  </div>
                </div>

                <h3>Meta datos</h3>
                <div className={styles.meta_data_container}>
                  <div className={styles.tab_title_meta_name_container}>
                    <div className={styles.tab_title}>
                      <label
                        htmlFor="tab_title"
                        className={`${styles.input_title}`}
                      >
                        Título de la pestaña *
                      </label>
                      <input
                        className={`${styles.input} ${styles.tab_title_input}`}
                        name="tab_title"
                        id="tab_title"
                        type="text"
                        placeholder="Título de la pestaña"
                        autoComplete="off"
                        value={TAB_TITLE.value}
                        onChange={TAB_TITLE.onChange}
                        required
                      />
                    </div>

                    <div className={styles.meta_name}>
                      <label
                        htmlFor="meta_name"
                        className={`${styles.input_title}`}
                      >
                        Nombre de la etiqueta meta *
                      </label>
                      <input
                        className={`${styles.input} ${styles.meta_name_input}`}
                        name="meta_name"
                        id="meta_name"
                        type="text"
                        placeholder="Nombre de la etiqueta meta"
                        autoComplete="off"
                        value={META_NAME.value}
                        onChange={META_NAME.onChange}
                        required
                      />
                    </div>
                  </div>

                  <div className={styles.meta_description_container}>
                    <label
                      htmlFor="meta_description"
                      className={`${styles.input_title}`}
                    >
                      Meta descripción *
                    </label>
                    <textarea
                      className={`${styles.meta_description_text_area}`}
                      name="meta_description"
                      id="meta_description"
                      type="text"
                      placeholder="Meta descripción"
                      autoComplete="off"
                      value={META_DESCRIPTION.value}
                      onChange={META_DESCRIPTION.onChange}
                      required
                    />
                  </div>
                </div>

                <h3>Información extra</h3>
                <div>
                  <label
                    htmlFor="affiliate_program"
                    className={`${styles.input_title} `}
                  >
                    Plataforma de afiliado de la marca
                  </label>
                  <input
                    className={`${styles.input} ${styles.affiliate_program_input}`}
                    name="affiliate_program"
                    id="affiliate_program"
                    type="text"
                    placeholder="Awin, Tradedoubler, etc."
                    autoComplete="off"
                    value={AFFILIATE_PROGRAM.value}
                    onChange={AFFILIATE_PROGRAM.onChange}
                  />
                </div>

                <div>
                  <label htmlFor="notes" className={`${styles.input_title}`}>
                    Notas
                  </label>
                  <textarea
                    className={`${styles.notes_text_area}`}
                    name="notes"
                    id="notes"
                    type="text"
                    placeholder="Por ejemplo, forma de trabajar con la marca, etc."
                    autoComplete="off"
                    value={NOTES.value}
                    onChange={NOTES.onChange}
                  />
                </div>

                {/* Display if there were errors at updating brand */}
                {state.saving_changes_error ? (
                  <p className="error__messagev2">
                    {state.saving_changes_error}
                  </p>
                ) : (
                  ""
                )}

                {newBrandLogo.error ? (
                  <p className="error__messagev2">{newBrandLogo.error}</p>
                ) : (
                  ""
                )}

                <button
                  type="submit"
                  className={`${styles.submit_btn} ${
                    state.saving_changes && styles.buttonLoading
                  } ${
                    state.brand.brand_description === description &&
                    state.brand.brand_slug === BRAND_SLUG.value &&
                    state.brand?.brand_home_tracked_url ===
                      BRAND_HOME_TRACKED_URL.value &&
                    state.brand.upper_headings === upperHeadings &&
                    state.brand.faqs === FAQs &&
                    state.brand.tab_title === TAB_TITLE.value &&
                    state.brand.meta_name === META_NAME.value &&
                    state.brand.meta_description === META_DESCRIPTION.value &&
                    newBrandLogo.newLogo.length === 0 &&
                    state.brand.sponsors_box === SPONSORS_BOX.value &&
                    state.brand.affiliate_program === AFFILIATE_PROGRAM.value &&
                    state.brand.notes === NOTES.value
                      ? styles.disabled
                      : ""
                  } btn button--red`}
                  //Disable button if there are no changes or changes are being submitted
                  disabled={
                    state.saving_changes ||
                    (state.brand.brand_description === description &&
                      state.brand.brand_slug === BRAND_SLUG.value &&
                      state.brand?.brand_home_tracked_url ===
                        BRAND_HOME_TRACKED_URL.value &&
                      state.brand.upper_headings === upperHeadings &&
                      state.brand.faqs === FAQs &&
                      state.brand.tab_title === TAB_TITLE.value &&
                      state.brand.meta_name === META_NAME.value &&
                      state.brand.meta_description === META_DESCRIPTION.value &&
                      newBrandLogo.newLogo.length === 0 &&
                      state.brand.sponsors_box === SPONSORS_BOX.value &&
                      state.brand.affiliate_program ===
                        AFFILIATE_PROGRAM.value &&
                      state.brand.notes === NOTES.value) ||
                    BRANDS.isFetching ||
                    BRANDS.isRefetching ||
                    BRANDS.isLoading
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
                <h2>
                  Descuentos asociados ({state.brand?.discounts_attached})
                </h2>
                {state.brand?.discounts_attached === 0 ? (
                  <p>No hay descuentos asociados a esta marca</p>
                ) : (
                  <>
                    {ATTACHED_DISCOUNTS.isLoading ||
                    ATTACHED_DISCOUNTS.isFetching ? (
                      <Loader />
                    ) : (
                      <>
                        {ATTACHED_DISCOUNTS.isError ? (
                          <p className="error__message">
                            {ATTACHED_DISCOUNTS.error?.message}
                          </p>
                        ) : (
                          <div className={styles.discounts_table_container}>
                            <table className={styles.discounts_table}>
                              <thead>
                                <tr>
                                  <th>Título</th>
                                  <th>Categoría</th>
                                  <th>Tipo de descuento</th>
                                  <th>Sección en Home</th>
                                  <th>Válido desde</th>
                                  <th>Válido hasta</th>
                                  <th>Status</th>
                                </tr>
                              </thead>

                              <tbody>
                                {ATTACHED_DISCOUNTS.data.map((discount) => (
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
                                        {discount.category}
                                      </td>
                                    </Link>
                                    <Link
                                      href={`/admin/descuentos/gestionar-descuentos/editar-descuento/${discount._id}`}
                                    >
                                      <td className={styles.column3}>
                                        {discount.type}
                                      </td>
                                    </Link>
                                    <Link
                                      href={`/admin/descuentos/gestionar-descuentos/editar-descuento/${discount._id}`}
                                    >
                                      <td className={styles.column4}>
                                        {discount.display_in_section}
                                      </td>
                                    </Link>
                                    <Link
                                      href={`/admin/descuentos/gestionar-descuentos/editar-descuento/${discount._id}`}
                                    >
                                      <td className={styles.column5}>
                                        {dateFormat.SlashDate(
                                          new Date(discount.valid_from)
                                        )}
                                      </td>
                                    </Link>
                                    <Link
                                      href={`/admin/descuentos/gestionar-descuentos/editar-descuento/${discount._id}`}
                                    >
                                      <td
                                        className={`${styles.column6} ${
                                          discount.expiration_date
                                            ? valid_till_date_color(
                                                discount.expiration_date
                                              )
                                            : ""
                                        }`}
                                      >
                                        {discount.expiration_date
                                          ? dateFormat.SlashDate(
                                              new Date(discount.expiration_date)
                                            )
                                          : "No expira"}
                                      </td>
                                    </Link>
                                    <Link
                                      href={`/admin/descuentos/gestionar-descuentos/editar-descuento/${discount._id}`}
                                    >
                                      <td className={styles.column7}>
                                        <div
                                          className={` ${
                                            discount.status === "available"
                                              ? styles.available
                                              : styles.unavailable
                                          }`}
                                        >
                                          {discount.status}
                                        </div>
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
