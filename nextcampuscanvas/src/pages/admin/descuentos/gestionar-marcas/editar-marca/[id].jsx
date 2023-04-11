import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Swal from 'sweetalert2';
import Link from 'next/link';
import dynamic from 'next/dynamic';

//Styles
import styles from '@styles/pagestyles/admin/descuentos/editarMarca.module.scss';
//Rich text editor styles
//https://www.youtube.com/watch?v=kykC7i9VUE4
import 'react-quill/dist/quill.snow.css';

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

//Rich text editor
const ReactQuill = dynamic(
  async () => {
    const { default: ReactQuill } = await import('react-quill');
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
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{ list: 'ordered' }, { list: 'bullet' }],
    ['link', 'image'],
    ['clean'],
  ],
};

//React Quill custom formats. The ones that are not included here will be removed from the editor: https://quilljs.com/docs/formats/
const formats = [
  'header',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'link',
  'image',
];

const editarMarca = () => {
  const { securingRoute } = useSecureAdminRoute('all');

  const { fetchData, cancel } = useAxios();

  //Allows us to manipulate the appropriate slice/action
  const dispatch = useDispatch();

  //Refs
  const descriptionRef = useRef();

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
  const [description, setDescription] = useState('');
  const [descriptionLength, setDescriptionLength] = useState(0);
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
        setDescription(brand.brand_description);
        AFFILIATE_PROGRAM.setValue(brand.affiliate_program);
        NOTES.setValue(brand.notes);

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
        setDescription(response.body.brand_description);
        AFFILIATE_PROGRAM.setValue(response.body.affiliate_program);
        NOTES.setValue(response.body?.notes);
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

  //Count description length
  useEffect(() => {
    setDescriptionLength(
      descriptionRef.current?.unprivilegedEditor.getLength() - 1
    );
  }, [description]);

  //Controlling inputs
  //const BRAND_DESCRIPTION = useInputValue('');
  const SPONSORS_BOX = useInputValue(state.brand?.sponsors_box);
  const AFFILIATE_PROGRAM = useInputValue('');
  const NOTES = useInputValue('');

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

    if (!descriptionLength) {
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
    formdata.append('brand_description', description);
    formdata.append('sponsors_box', SPONSORS_BOX.value);
    formdata.append('brand_logo', newBrandLogo.newLogo[0]);
    formdata.append('affiliate_program', AFFILIATE_PROGRAM.value);
    formdata.append('notes', NOTES.value);

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
                      <strong>Fecha de creación: </strong>
                      {dateFormat.SlashDate(new Date(state.brand.created_at))}
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

                <div className={styles.description_container}>
                  <label
                    htmlFor='brand_description'
                    className={`${styles.input_title}`}
                  >
                    Descripción
                  </label>
                  <ReactQuill
                    id='brand_description'
                    modules={modules}
                    formats={formats}
                    value={description}
                    onChange={setDescription}
                    forwardedRef={descriptionRef}
                  />
                  <p
                    className={`${styles.char_count} ${
                      styles.description_char_count
                    } ${descriptionLength > 520 ? styles.char_count_warn : ''}`}
                  >
                    <span>{descriptionLength} / 520</span>
                  </p>
                </div>

                <div>
                  <label
                    htmlFor='affiliate_program'
                    className={`${styles.input_title} `}
                  >
                    Plataforma de afiliado de la marca
                  </label>
                  <input
                    className={`${styles.input} ${styles.affiliate_program_input}`}
                    name='affiliate_program'
                    id='affiliate_program'
                    type='text'
                    placeholder='Awin, Tradedoubler, etc.'
                    autoComplete='off'
                    value={AFFILIATE_PROGRAM.value}
                    onChange={AFFILIATE_PROGRAM.onChange}
                  />
                </div>

                <div>
                  <label htmlFor='notes' className={`${styles.input_title}`}>
                    Notas
                  </label>
                  <textarea
                    className={`${styles.notes_text_area}`}
                    name='notes'
                    id='notes'
                    type='text'
                    placeholder='Por ejemplo, forma de trabajar con la marca, etc.'
                    autoComplete='off'
                    value={NOTES.value}
                    onChange={NOTES.onChange}
                  />
                </div>

                {/* Display if there were errors at updating brand */}
                {state.saving_changes_error ? (
                  <p className='error__messagev2'>
                    {state.saving_changes_error}
                  </p>
                ) : (
                  ''
                )}

                {newBrandLogo.error ? (
                  <p className='error__messagev2'>{newBrandLogo.error}</p>
                ) : (
                  ''
                )}

                <button
                  type='submit'
                  className={`${styles.submit_btn} ${
                    state.saving_changes && styles.buttonLoading
                  } ${
                    state.brand.brand_description === description &&
                    newBrandLogo.newLogo.length === 0 &&
                    state.brand.sponsors_box === SPONSORS_BOX.value &&
                    state.brand.affiliate_program === AFFILIATE_PROGRAM.value &&
                    state.brand.notes === NOTES.value
                      ? styles.disabled
                      : ''
                  } btn button--red`}
                  //Disable button if there are no changes or changes are being submitted
                  disabled={
                    state.saving_changes ||
                    (state.brand.brand_description === description &&
                      newBrandLogo.newLogo.length === 0 &&
                      state.brand.sponsors_box === SPONSORS_BOX.value &&
                      state.brand.affiliate_program ===
                        AFFILIATE_PROGRAM.value &&
                      state.brand.notes === NOTES.value)
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
                                  <th>Categoría</th>
                                  <th>Tipo de descuento</th>
                                  <th>Sección en Home</th>
                                  <th>Válido desde</th>
                                  <th>Válido hasta</th>
                                  <th>Status</th>
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
                                    <Link
                                      href={`/admin/descuentos/gestionar-descuentos/editar-descuento/${discount._id}`}
                                    >
                                      <td className={styles.column7}>
                                        <div
                                          className={` ${
                                            discount.status === 'available'
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
