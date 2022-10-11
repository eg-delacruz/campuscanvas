import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
//import { browserName, CustomView, isBrowser } from 'react-device-detect';
import DataList from 'react-select';

//Session
import { useSession } from 'next-auth/react';

//Endpoints
import endPoints from '@services/api';

//Assets
import arrow_right_white from '@assets/GeneralUse/IconsAndButtons/arrow_right_white.svg';

//hooks
import { useInputValue } from '@hooks/useInputValue';

//Styles
import styles from './DataForm.module.scss';

//Databases for datalists
import studentInfoDatabase from '@databases/studentInfoDatabase';

//Browser identifyer
import identifyBrowser from '@services/identifyBrowser';
const { getBrowserName } = identifyBrowser;

const DataForm = (props) => {
  const [state, setState] = useState({
    error: null,
    loading: false,
    responseError: null,
  });
  const router = useRouter();

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

  const [gender, setGender] = useState({});
  const [university, setUniversity] = useState({});
  const [faculty, setFaculty] = useState({});

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
      height: '45px',
      //$color--secondary-light
      backgroundColor: '#e3efff',
    }),
  };

  /////////////////////Datalists (end)/////////////////////////////
  //Session
  const { data: session, status } = useSession();
  const loading = status === 'loading';

  //Controlling inputs
  const NOMBRE = useInputValue('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setState({ ...state, error: null });

    //Handling errors
    if (Object.keys(gender).length === 0) {
      setState({ ...state, error: 'Debes escoger un género de la lista' });
      return false;
    }
    if (Object.keys(university).length === 0) {
      setState({
        ...state,
        error: 'Debes escoger una universidad de la lista',
      });
      return false;
    }
    if (Object.keys(faculty).length === 0) {
      setState({
        ...state,
        error: 'Debes escoger una facultad de la lista',
      });
      return false;
    }

    //Updating student info
    try {
      setState({ ...state, loading: true });
      const respuesta = await fetch(endPoints.user.updateStuInfo, {
        method: 'PATCH',
        headers: {
          accept: '*/*',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: session.token.sub,
          nickname: NOMBRE.value,
          gender: gender.value,
          university: university.value,
          faculty: faculty.value,
          website_location: 'register_step_2',
          browserName: getBrowserName(navigator.userAgent),
        }),
      });
      const data = await respuesta.json();
      if (data.error) {
        setState({ ...state, responseError: data.error });
      } else {
        setState({ ...state, loading: false });
        props.setStep(3);
      }
    } catch (error) {
      setState({ ...state, responseError: error.message });
    }
  };

  //Redirecting if not logged in
  if (status === 'unauthenticated') {
    router.push('/auth/login');
  }

  return (
    <form
      className={styles.form}
      method='POST'
      onSubmit={handleSubmit}
      action=''
      autoComplete='off'
    >
      <h1>Regístrate gratis</h1>
      <h4>Paso 2 de 3</h4>

      <div className={styles.datalistWrapper}>
        <DataList
          theme={DataListTheme}
          styles={datalistStyles}
          options={genderOptions}
          placeholder='Género *'
          isSearchable
          autoFocus
          onChange={setGender}
          noOptionsMessage={() => 'No hay opciones'}
          className={styles.datalist_container}
          id='long-value-select'
          instanceId='long-value-select'
        />
        {state.error === 'Debes escoger un género de la lista' && (
          <p className={styles.inputText__errors}>{state.error}</p>
        )}
      </div>

      <input
        className={styles.input}
        required
        name='nombre'
        id='nombre'
        type='text'
        placeholder='Nombre de usuario *'
        autoComplete='off'
        value={NOMBRE.value}
        onChange={NOMBRE.onChange}
      />

      <div className={styles.datalistWrapper}>
        <DataList
          theme={DataListTheme}
          styles={datalistStyles}
          options={universityOptions}
          placeholder='Universidad *'
          isSearchable
          autoFocus
          onChange={setUniversity}
          noOptionsMessage={() => 'No hay opciones'}
          className={styles.datalist_container}
          id='long-value-select-2'
          instanceId='long-value-select-2'
        />
        {state.error === 'Debes escoger una universidad de la lista' && (
          <p className={styles.inputText__errors}>{state.error}</p>
        )}
      </div>

      <div className={styles.datalistWrapper}>
        <DataList
          theme={DataListTheme}
          styles={datalistStyles}
          options={facultyOptions}
          placeholder='Facultad *'
          isSearchable
          autoFocus
          onChange={setFaculty}
          noOptionsMessage={() => 'No hay opciones'}
          className={styles.datalist_container}
          id='long-value-select-3'
          instanceId='long-value-select-3'
        />
        {state.error === 'Debes escoger una facultad de la lista' && (
          <p className={styles.inputText__errors}>{state.error}</p>
        )}
      </div>
      {state.responseError && (
        <p className={styles.responseError}>{state.responseError}</p>
      )}

      <button
        type='submit'
        className={`${styles.continueButton} ${
          state.loading && styles.buttonLoading
        } btn button--red`}
        disabled={state.loading}
      >
        Continuar{' '}
        <span className={styles.nextArrowContainer}>
          <Image src={arrow_right_white} />
        </span>
      </button>
      <div className={styles.contactButton}>
        <Link href={'/contacto'}>Contáctanos</Link>
      </div>
    </form>
  );
};

export default DataForm;
