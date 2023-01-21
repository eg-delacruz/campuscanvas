import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

//Styles
import styles from '@styles/pagestyles/admin/descuentos/nuevoDescuento.module.scss';

//Components
import SecondaryHeader from '@components/GeneralUseComponents/SecondaryHeader/SecondaryHeader';
import Loader from '@components/GeneralUseComponents/Loader/Loader';
import ButtonBack from '@components/GeneralUseComponents/ButtonBack/ButtonBack';

//hooks
import { useInputValue } from '@hooks/useInputValue';
import useSecureAdminRoute from '@hooks/useSecureAdminRoute';
import { useCharacterCount } from '@hooks/useCharacterCount';

//Redux actions
import { getBrands, selectBrand } from '@redux/brandsSlice';

const nuevoDescuento = () => {
  const { securingRoute } = useSecureAdminRoute('all');
  //Allows us to manipulate the appropriate slice/action
  const dispatch = useDispatch();

  //Reducers
  const brandsReducer = useSelector(selectBrand);

  useEffect(() => {
    //TODO: check what happens if ther are no brands
    const setBrands = async () => {
      if (brandsReducer.brands.length === 0) {
        dispatch(getBrands());
      }
    };
    setBrands();
  }, []);

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

  //States
  const [state, setState] = useState({
    error: null,
    uploading: false,
  });
  const [brandDatalistError, setBrandDatalistError] = useState(null);
  const [categoryDatalistError, setCategoryDatalistError] = useState(null);

  //Controlling inputs
  const TITLE = useInputValue('');
  const DESCRIPTION = useInputValue('');
  const BRAND = useInputValue('');
  const CATEGORY = useInputValue('');

  //Setting field counts
  const DESCRIPTION_COUNT = useCharacterCount();

  //Functions
  const handleDescriptionChange = (e) => {
    DESCRIPTION.onChange(e);
    DESCRIPTION_COUNT.onChange(e);
  };

  //Find brand id
  const brand_id = () => {
    const { brands } = brandsReducer;
    const item = brands.find((item) => item.brand_name === BRAND.value);
    if (item === undefined) {
      setBrandDatalistError('Selecciona una marca de la lista');
      BRAND.setValue('');
      return;
    }
    return item._id;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setState({ ...state, error: null });
    setBrandDatalistError(null);
    setCategoryDatalistError(null);

    //Getting brand id
    const BRAND_ID = brand_id();

    //Handling errors
    if (BRAND_ID === undefined) {
      return;
    }
    if (CATEGORY_OPTIONS.indexOf(CATEGORY.value) === -1) {
      setCategoryDatalistError('Selecciona una categoría de la lista');
      CATEGORY.setValue('');
      return;
    }

    const discountData = {
      title: TITLE.value,
      description: DESCRIPTION.value,
      brand: BRAND_ID,
      category: CATEGORY.value,
    };
    console.log(discountData);
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
      <SecondaryHeader />
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

          <h2>Información general</h2>

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
                placeholder=''
                autoComplete='off'
                value={TITLE.value}
                onChange={TITLE.onChange}
                required
              />
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
                required
              />
              <p
                className={`${styles.char_count} ${
                  DESCRIPTION_COUNT.value > 180 ? styles.char_count_warn : ''
                }`}
              >
                <span>{DESCRIPTION_COUNT.value} / 180</span>
              </p>
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
                  //placeholder=''
                  autoComplete='off'
                  value={BRAND.value}
                  onChange={BRAND.onChange}
                  required
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
                  required
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
          </section>

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
