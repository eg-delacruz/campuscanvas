import { useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import DataList from 'react-select';
import Link from 'next/link';

//TODO: Uncomment cookiebot script in _document.js when finished

//Styles
import styles from '@styles/pagestyles/Cuenta.module.scss';

//Assets
import arrow_right_black from '@assets/GeneralUse/IconsAndButtons/arrow_right_black.svg';
import user_icon from '@assets/PagesImages/Cuenta/user_icon.svg';
import address_icon from '@assets/PagesImages/Cuenta/address_icon.svg';
import studies_icon from '@assets/PagesImages/Cuenta/studies_icon.svg';
import edit_icon from '@assets/PagesImages/Cuenta/edit_icon.svg';
import key_icon from '@assets/GeneralUse/IconsAndButtons/key.svg';
import delete_icon from '@assets/GeneralUse/IconsAndButtons/delete.svg';

//hooks
import { useInputValue } from '@hooks/useInputValue';

//Components
import UserSidebar from '@components/GeneralUseComponents/UserSidebar/UserSidebar';
import SEOHeader from '@components/GeneralUseComponents/SEO_Header/SEOHeader';
import Loader from '@components/GeneralUseComponents/Loader/Loader';

//Session
import { useSession } from 'next-auth/react';

//Databases for datalists
import studentInfoDatabase from '@databases/studentInfoDatabase';

const cuenta = () => {
  const [state, setState] = useState({
    pageLoading: false,
    submitLoading: false,
    error: null,
  });
  const router = useRouter();

  //Session
  const { data: session, status } = useSession();

  //Securing route
  if (status === 'unauthenticated') {
    router.push('/auth/login');
  }

  //TODO: get actual data from the actual session
  const FAKESESSION = {
    name: 'Gerar',
    gender: 'Masculino',
    birthdate: '1996-07-31',
    phone: '611516396',
    email: 'netoxas3107@hotmail.com',
    stu_id: '123456',
    stu_email: 'noseque@stu.urjc.es',
    street: 'Los Planes',
    city: '',
    house_number: '',
    postal_code: '1234',
    observations: '',
    country: 'España',
    faculty: 'Mediseina',
    degree: 'Bachelor',
    university: 'URJC',
    finish_study_year: '2029',
    season: 'autumn',
  };

  //Send state to UserSidebar to open and close it
  const [openSidebar, setOpenSidebar] = useState(true);

  /////////////////////Datalists (start)/////////////////////////////
  const genderOptions = studentInfoDatabase.GENDERS.map((gender) => ({
    value: gender,
    label: gender,
  }));
  const universityOptions = studentInfoDatabase.UNIVERSITIES.map(
    (university) => ({
      value: university,
      label: university,
    })
  );
  const facultyOptions = studentInfoDatabase.FACULTIES.map((faculty) => ({
    value: faculty,
    label: faculty,
  }));
  const degreeOptions = studentInfoDatabase.ACADEMIC_DEGREES.map((faculty) => ({
    value: faculty,
    label: faculty,
  }));
  const yearOptions = studentInfoDatabase.YEARS.map((faculty) => ({
    value: faculty,
    label: faculty,
  }));

  //States to save datalists data
  const [gender, setGender] = useState({});
  const [university, setUniversity] = useState({});
  const [faculty, setFaculty] = useState({});
  const [degree, setDegree] = useState({});
  const [year, setYear] = useState({});

  //States to modify datalist values
  const [activateGenderDatalist, setActivateGenderDatalist] = useState(false);
  const [activateUniversityDatalist, setActivateUniversityDatalist] =
    useState(false);
  const [activateFacultyDatalist, setActivateFacultyDatalist] = useState(false);
  const [activateDegreeDatalist, setActivateDegreeDatalist] = useState(false);
  const [activateYearDatalist, setActivateYearDatalist] = useState(false);

  const DataListTheme = (theme) => {
    return {
      ...theme,
      borderRadius: 5,
      colors: {
        ...theme.colors,
        primary25: '#dee2e6',
        //Border color
        neutral20: 'black',
        //Border color on hover
        neutral30: 'black',
      },
    };
  };

  const datalistStyles = {
    selectContainer: (base) => ({
      ...base,
      height: '40px',
    }),

    valueContainer: (base) => ({
      ...base,
      padding: '4px',
    }),
    control: (base, state) => ({
      ...base,
      height: '40px',
      backgroundColor: '#e3efff',
    }),
  };
  /////////////////////Datalists (end)/////////////////////////////

  //Controlling inputs handled without datalist
  const NOMBRE = useInputValue(FAKESESSION.name);
  const BIRTHDATE = useInputValue(FAKESESSION.birthdate);
  const PHONE = useInputValue(FAKESESSION.phone);
  const STREET = useInputValue(FAKESESSION.street);
  const CITY = useInputValue(FAKESESSION.city);
  const HOUSE_NUMBER = useInputValue(FAKESESSION.house_number);
  const POSTAL_CODE = useInputValue(FAKESESSION.postal_code);
  const OBSERVATIONS = useInputValue(FAKESESSION.observations);
  const COUNTRY = useInputValue(FAKESESSION.country);
  const SELECTED_END_SEASON = useInputValue(FAKESESSION.season);

  //Functions/handlers
  const handleSubmit = async (e) => {
    e.preventDefault();
    setState({ ...state, error: null });

    //Handling errors
    if (activateGenderDatalist && Object.keys(gender).length === 0) {
      setState({ ...state, error: 'Debes escoger un género de la lista' });
      return false;
    }
    if (activateFacultyDatalist && Object.keys(faculty).length === 0) {
      setState({
        ...state,
        error: 'Debes escoger una universidad de la lista',
      });
      return false;
    }
    if (activateDegreeDatalist && Object.keys(degree).length === 0) {
      setState({
        ...state,
        error: 'Debes escoger un grado de la lista',
      });
      return false;
    }
    if (activateUniversityDatalist && Object.keys(university).length === 0) {
      setState({
        ...state,
        error: 'Debes escoger una universidad',
      });
      return false;
    }
    if (activateYearDatalist && Object.keys(year).length === 0) {
      setState({
        ...state,
        error: 'Debes escoger un año',
      });
      return false;
    }
    const data = {
      gender:
        Object.keys(gender).length > 0 ? gender.value : FAKESESSION.gender,
      name: NOMBRE.value,
      birthdate: BIRTHDATE.value,
      phone: PHONE.value,
      street: STREET.value,
      city: CITY.value,
      house_number: HOUSE_NUMBER.value,
      postal_code: POSTAL_CODE.value,
      observations: OBSERVATIONS.value,
      country: 'España',
      faculty:
        Object.keys(faculty).length > 0 ? faculty.value : FAKESESSION.faculty,
      academic_degree:
        Object.keys(degree).length > 0 ? degree.value : FAKESESSION.degree,
      university:
        Object.keys(university).length > 0
          ? university.value
          : FAKESESSION.university,
      year:
        Object.keys(year).length > 0
          ? year.value
          : FAKESESSION.finish_study_year,
      season: SELECTED_END_SEASON.value,
      website_location: 'edit_account',
    };
    console.log(data);
    //Reload location to refresh uploaded data
    //TODO: uncomment
    //location.reload();
  };

  const isRadioSelected = (value) => SELECTED_END_SEASON.value === value;

  const handleRadioClick = (e) => {
    SELECTED_END_SEASON.setValue(e.currentTarget.value);
  };

  //Displayer functions

  return (
    <>
      <SEOHeader
        tabTitle={'Cuenta'}
        metaName={'Cuenta'}
        description={'Edita los datos de tu cuenta'}
      />
      <div className={styles.page}>
        <div className={styles.page__container}>
          <UserSidebar
            setOpenSidebar={setOpenSidebar}
            openSidebar={openSidebar}
          />

          {/* /////////////////////////
          //    Main content     //
        ///////////////////////// */}

          <main className={styles.profile}>
            {status === 'loading' ? (
              <div className={styles.Loader__container}>
                <Loader />
              </div>
            ) : (
              <>
                <div className={styles.profile__container}>
                  {/* Back button for mobile */}
                  <button
                    className={`${styles.profile__goback_button}  btn button--redRedborderTransparentHoverShadowtRed`}
                    onClick={() => setOpenSidebar(true)}
                  >
                    <span className={styles.profile__black_arrow}>
                      <Image src={arrow_right_black} />
                    </span>
                    <div>Atrás</div>
                  </button>
                  <h3 className={styles.profile__name}>
                    Hola{' '}
                    {session?.token.name
                      ? session?.token.name
                      : session?.token.email}
                    !
                  </h3>
                  <div className={styles.profile__name_underline}></div>

                  {/* /////////////////////////
          //    Datos personales     //
        ///////////////////////// */}

                  <form
                    className={styles.profile__form}
                    action=''
                    method='POST'
                    autoComplete='off'
                    onSubmit={handleSubmit}
                  >
                    <section
                      className={`${styles.profile__personal} ${styles.personal}`}
                    >
                      <div className={styles.personal__title_container}>
                        <div className={styles.personal__title_icon}>
                          <Image src={user_icon} alt='Usuario' />
                        </div>
                        <h3 className={styles.personal__title}>
                          Datos personales
                        </h3>
                      </div>

                      <div className={styles.personal__inputs}>
                        {/* Gender input */}
                        {activateGenderDatalist ? (
                          <div>
                            <label
                              for='gender'
                              className={`${styles.input_title}`}
                            >
                              Género
                            </label>
                            <div className={styles.datalist_wrapper}>
                              <DataList
                                name='gender'
                                theme={DataListTheme}
                                styles={datalistStyles}
                                options={genderOptions}
                                placeholder='Género *'
                                isSearchable
                                autoFocus
                                onChange={setGender}
                                noOptionsMessage={() => 'No hay opciones'}
                                className={styles.datalist}
                                id='long-value-select'
                                instanceId='long-value-select'
                              />
                              {state.error ===
                                'Debes escoger un género de la lista' && (
                                <p className={styles.inputText__errors}>
                                  {state.error}
                                </p>
                              )}
                            </div>
                          </div>
                        ) : (
                          <div>
                            <label className={`${styles.input_title}`}>
                              Género
                            </label>
                            <div className={styles.fake_input_container}>
                              <div
                                className={`${styles.input} ${
                                  styles.fake_input
                                } ${
                                  !FAKESESSION.gender &&
                                  styles.fake_input_placeholder
                                }`}
                              >
                                {FAKESESSION.gender
                                  ? FAKESESSION.gender
                                  : 'Selecciona tu género'}
                              </div>
                              <div
                                className={styles.edit_button}
                                onClick={() => setActivateGenderDatalist(true)}
                              >
                                <Image src={edit_icon} />
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Name input */}

                        <div>
                          <label
                            for='nombre'
                            className={`${styles.input_title}`}
                          >
                            Nombre de usuario
                          </label>
                          <input
                            className={`${styles.input}`}
                            required
                            name='nombre'
                            id='nombre'
                            type='text'
                            placeholder='Nombre de usuario'
                            autoComplete='off'
                            value={NOMBRE.value}
                            onChange={NOMBRE.onChange}
                          />
                        </div>

                        {/* Birthdate Input */}

                        <div>
                          <label
                            for='birthdate'
                            className={`${styles.input_title}`}
                          >
                            Fecha de nacimiento
                          </label>
                          <input
                            className={`${styles.input}`}
                            name='birthdate'
                            id='birthdate'
                            type='date'
                            placeholder='Fecha de nacimiento'
                            autoComplete='off'
                            value={BIRTHDATE.value}
                            onChange={BIRTHDATE.onChange}
                          />
                        </div>

                        {/* Phone Input */}

                        <div>
                          <label
                            for='phone'
                            className={`${styles.input_title}`}
                          >
                            Número de teléfono
                          </label>
                          <input
                            className={`${styles.input}`}
                            name='phone'
                            id='phone'
                            type='tel'
                            placeholder='Número de teléfono'
                            autoComplete='off'
                            value={PHONE.value}
                            onChange={PHONE.onChange}
                          />
                        </div>

                        {/* Email fake Input */}

                        <div>
                          <label className={`${styles.input_title}`}>
                            Correo electrónico
                          </label>
                          <div
                            className={`${styles.last_input_480} ${styles.input} ${styles.fake_input} ${styles.last_input}`}
                          >
                            {FAKESESSION.email}
                          </div>
                        </div>

                        {/* Student id fake Input */}

                        <div>
                          <label className={`${styles.input_title}`}>
                            Identificación de estudiante
                          </label>
                          <div
                            className={`${styles.input} ${styles.fake_input} ${
                              styles.last_input
                            } ${
                              !FAKESESSION.stu_id & !FAKESESSION.stu_email &&
                              styles.fake_input_placeholder
                            }`}
                          >
                            {/* {FAKESESSION.stu_id
                              ? FAKESESSION.stu_id
                              : 'Verifica tu cuenta'} */}
                            {!FAKESESSION.stu_id & !FAKESESSION.stu_email
                              ? 'Verifica tu cuenta'
                              : `${
                                  FAKESESSION.stu_id
                                    ? FAKESESSION.stu_id
                                    : FAKESESSION.stu_email
                                }`}
                          </div>
                        </div>
                      </div>
                    </section>

                    {/* /////////////////////////
          //   Dirección de envío    //
        ///////////////////////// */}

                    <section
                      className={`${styles.profile__address} ${styles.address}`}
                    >
                      <div className={styles.address__title_container}>
                        <div className={styles.address__title_icon}>
                          <Image src={address_icon} alt='Usuario' />
                        </div>
                        <h3 className={styles.address__title}>
                          Dirección de envío
                        </h3>
                      </div>

                      <div className={styles.address__inputs}>
                        {/* Street input */}

                        <div>
                          <label
                            for='calle'
                            className={`${styles.input_title}`}
                          >
                            Calle
                          </label>
                          <input
                            className={`${styles.input}`}
                            name='calle'
                            id='calle'
                            type='text'
                            placeholder='Calle'
                            autoComplete='off'
                            value={STREET.value}
                            onChange={STREET.onChange}
                          />
                        </div>

                        {/* City input */}

                        <div>
                          <label
                            for='ciudad'
                            className={`${styles.input_title}`}
                          >
                            Ciudad
                          </label>
                          <input
                            className={`${styles.input}`}
                            name='ciudad'
                            id='ciudad'
                            type='text'
                            placeholder='Ciudad'
                            autoComplete='off'
                            value={CITY.value}
                            onChange={CITY.onChange}
                          />
                        </div>

                        {/* House number input */}

                        <div>
                          <label
                            for='numero_casa'
                            className={`${styles.input_title}`}
                          >
                            Número de casa
                          </label>
                          <input
                            className={`${styles.input}`}
                            name='numero_casa'
                            id='numero_casa'
                            type='text'
                            placeholder='Número de casa'
                            autoComplete='off'
                            value={HOUSE_NUMBER.value}
                            onChange={HOUSE_NUMBER.onChange}
                          />
                        </div>

                        {/* Postal code input */}

                        <div>
                          <label
                            for='codigo_postal'
                            className={`${styles.input_title}`}
                          >
                            Código postal
                          </label>
                          <input
                            className={`${styles.input}`}
                            name='codigo_postal'
                            id='codigo_postal'
                            type='text'
                            placeholder='Código postal'
                            autoComplete='off'
                            value={POSTAL_CODE.value}
                            onChange={POSTAL_CODE.onChange}
                          />
                        </div>

                        {/* Observations input */}

                        <div>
                          <label
                            for='observations'
                            className={`${styles.input_title}`}
                          >
                            Observaciones
                          </label>
                          <input
                            className={`${styles.input} ${styles.last_input}`}
                            name='observations'
                            id='observations'
                            type='text'
                            placeholder='Observaciones'
                            autoComplete='off'
                            value={OBSERVATIONS.value}
                            onChange={OBSERVATIONS.onChange}
                          />
                        </div>

                        {/* Country fake input */}

                        <div>
                          <label className={`${styles.input_title}`}>
                            País
                          </label>
                          <div
                            className={`${styles.last_input_480} ${styles.input} ${styles.fake_input} ${styles.last_input}`}
                          >
                            España
                          </div>
                        </div>
                      </div>
                    </section>

                    {/* /////////////////////////
          //    Sobre mi estudio     //
        ///////////////////////// */}

                    <section
                      className={`${styles.profile__studies} ${styles.studies}`}
                    >
                      <div className={styles.studies__title_container}>
                        <div className={styles.studies__title_icon}>
                          <Image src={studies_icon} alt='Usuario' />
                        </div>
                        <h3 className={styles.studies__title}>
                          Sobre mi estudio
                        </h3>
                      </div>

                      <div className={styles.address__inputs}>
                        {/* Faculty input */}

                        {activateFacultyDatalist ? (
                          <div>
                            <label
                              for='faculty'
                              className={`${styles.input_title}`}
                            >
                              Facultad
                            </label>
                            <div className={styles.datalist_wrapper}>
                              <DataList
                                name='faculty'
                                theme={DataListTheme}
                                styles={datalistStyles}
                                options={facultyOptions}
                                placeholder='Facultad *'
                                isSearchable
                                autoFocus
                                onChange={setFaculty}
                                noOptionsMessage={() => 'No hay opciones'}
                                className={styles.datalist}
                                id='long-value-select'
                                instanceId='long-value-select'
                              />
                              {state.error ===
                                'Debes escoger una universidad de la lista' && (
                                <p className={styles.inputText__errors}>
                                  {state.error}
                                </p>
                              )}
                            </div>
                          </div>
                        ) : (
                          <div>
                            <label className={`${styles.input_title}`}>
                              Facultad
                            </label>
                            <div className={styles.fake_input_container}>
                              <div
                                className={`${styles.input} ${
                                  styles.fake_input
                                } ${
                                  !FAKESESSION.faculty &&
                                  styles.fake_input_placeholder
                                }`}
                              >
                                {FAKESESSION.faculty
                                  ? FAKESESSION.faculty
                                  : 'Selecciona tu género'}
                              </div>
                              <div
                                className={styles.edit_button}
                                onClick={() => setActivateFacultyDatalist(true)}
                              >
                                <Image src={edit_icon} />
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Academic degree input */}

                        {activateDegreeDatalist ? (
                          <div>
                            <label
                              for='degree'
                              className={`${styles.input_title}`}
                            >
                              Grado académico
                            </label>
                            <div className={styles.datalist_wrapper}>
                              <DataList
                                name='degree'
                                theme={DataListTheme}
                                styles={datalistStyles}
                                options={degreeOptions}
                                placeholder='Grado académico'
                                isSearchable
                                autoFocus
                                onChange={setDegree}
                                noOptionsMessage={() => 'No hay opciones'}
                                className={styles.datalist}
                                id='long-value-select'
                                instanceId='long-value-select'
                              />
                              {state.error ===
                                'Debes escoger un grado de la lista' && (
                                <p className={styles.inputText__errors}>
                                  {state.error}
                                </p>
                              )}
                            </div>
                          </div>
                        ) : (
                          <div>
                            <label className={`${styles.input_title}`}>
                              Grado académico
                            </label>
                            <div className={styles.fake_input_container}>
                              <div
                                className={`${styles.input} ${
                                  styles.fake_input
                                } ${
                                  !FAKESESSION.degree &&
                                  styles.fake_input_placeholder
                                }`}
                              >
                                {FAKESESSION.degree
                                  ? FAKESESSION.degree
                                  : 'Seleccionar grado'}
                              </div>
                              <div
                                className={styles.edit_button}
                                onClick={() => setActivateDegreeDatalist(true)}
                              >
                                <Image src={edit_icon} />
                              </div>
                            </div>
                          </div>
                        )}

                        {/* University input */}

                        {activateUniversityDatalist ? (
                          <div>
                            <label
                              for='university'
                              className={`${styles.input_title}`}
                            >
                              Universidad
                            </label>
                            <div className={styles.datalist_wrapper}>
                              <DataList
                                name='university'
                                theme={DataListTheme}
                                styles={datalistStyles}
                                options={universityOptions}
                                placeholder='Universidad'
                                isSearchable
                                autoFocus
                                onChange={setUniversity}
                                noOptionsMessage={() => 'No hay opciones'}
                                className={styles.datalist}
                                id='long-value-select'
                                instanceId='long-value-select'
                              />
                              {state.error ===
                                'Debes escoger una universidad' && (
                                <p className={styles.inputText__errors}>
                                  {state.error}
                                </p>
                              )}
                            </div>
                          </div>
                        ) : (
                          <div>
                            <label className={`${styles.input_title}`}>
                              Universidad
                            </label>
                            <div className={styles.fake_input_container}>
                              <div
                                className={`${styles.input} ${
                                  styles.fake_input
                                } ${
                                  !FAKESESSION.university &&
                                  styles.fake_input_placeholder
                                }`}
                              >
                                {FAKESESSION.university
                                  ? FAKESESSION.university
                                  : 'Seleccionar universidad'}
                              </div>
                              <div
                                className={styles.edit_button}
                                onClick={() =>
                                  setActivateUniversityDatalist(true)
                                }
                              >
                                <Image src={edit_icon} />
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </section>

                    {/* /////////////////////////
                //   Fin del estudio   //
              ///////////////////////// */}

                    <section
                      className={`${styles.profile__finish_studies} ${styles.finish_studies}`}
                    >
                      <h3 className={styles.finish_studies__title}>
                        ¿Cuándo esperas terminar tus estudios?
                      </h3>

                      <div className={styles.finish_studies__inputs}>
                        <div>
                          <div
                            className={styles.finish_studies__input_container}
                          >
                            <input
                              className={styles.finish_studies__radio_input}
                              type='radio'
                              id='spring'
                              name='final_semester'
                              value='spring'
                              checked={isRadioSelected('spring')}
                              onChange={handleRadioClick}
                            />
                            <label htmlFor='spring'>Primavera / Verano</label>
                          </div>
                          <br />
                          <div
                            className={`${styles.finish_studies__input_container} ${styles.last_input_480}`}
                          >
                            <input
                              className={`${styles.finish_studies__radio_input}`}
                              type='radio'
                              id='autumn'
                              name='final_semester'
                              value='autumn'
                              checked={isRadioSelected('autumn')}
                              onChange={handleRadioClick}
                            />
                            <label htmlFor='autumn'>Otoño / Invierno</label>
                          </div>
                        </div>

                        {/* End year input */}

                        {activateYearDatalist ? (
                          <div>
                            <label
                              for='year'
                              className={`${styles.input_title}`}
                            >
                              Año
                            </label>
                            <div className={styles.datalist_wrapper}>
                              <DataList
                                name='year'
                                theme={DataListTheme}
                                styles={datalistStyles}
                                options={yearOptions}
                                placeholder='Año'
                                isSearchable
                                autoFocus
                                onChange={setYear}
                                noOptionsMessage={() => 'No hay opciones'}
                                className={styles.datalist}
                                id='long-value-select'
                                instanceId='long-value-select'
                              />
                              {state.error === 'Debes escoger un año' && (
                                <p className={styles.inputText__errors}>
                                  {state.error}
                                </p>
                              )}
                            </div>
                          </div>
                        ) : (
                          <div>
                            <label className={`${styles.input_title}`}>
                              Año
                            </label>
                            <div className={styles.fake_input_container}>
                              <div
                                className={`${styles.input} ${
                                  styles.fake_input
                                } ${
                                  !FAKESESSION.finish_study_year &&
                                  styles.fake_input_placeholder
                                }`}
                              >
                                {FAKESESSION.finish_study_year
                                  ? FAKESESSION.finish_study_year
                                  : 'Selecciona un año'}
                              </div>
                              <div
                                className={styles.edit_button}
                                onClick={() => setActivateYearDatalist(true)}
                              >
                                <Image src={edit_icon} />
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </section>
                    <div className={styles.profile__submit_button_container}>
                      <button
                        type='submit'
                        className={`${styles.profile__submit_button} ${
                          state.submitLoading && styles.buttonLoading
                        } btn button--red`}
                        disabled={state.submitLoading}
                      >
                        Guardar cambios
                      </button>
                    </div>
                  </form>
                </div>

                <div className={styles.horizontal_divider}></div>

                <section className={styles.edit_delete}>
                  <div className={styles.edit_delete__option}>
                    <div className={styles.edit_delete__icon}>
                      <Image src={key_icon} />
                    </div>
                    <Link href={'/construccion'}>Cambiar contraseña</Link>
                  </div>
                  <div
                    className={`${styles.edit_delete__option} ${styles.edit_delete__delete_option}`}
                  >
                    <div
                      className={`${styles.edit_delete__icon} ${styles.edit_delete__delete_icon}`}
                    >
                      <Image src={delete_icon} />
                    </div>
                    <Link href={'/construccion'}>Eliminar mi cuenta</Link>
                  </div>
                </section>
              </>
            )}
          </main>
        </div>
      </div>
    </>
  );
};

export default cuenta;
