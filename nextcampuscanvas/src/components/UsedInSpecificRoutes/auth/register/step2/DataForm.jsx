import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';

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

const DataForm = (props) => {
  //const [error, setError] = useState(null);
  const [state, setState] = useState({
    error: null,
    loading: false,
    responseError: null,
  });
  const router = useRouter();

  //Session
  const { data: session, status } = useSession();
  const loading = status === 'loading';

  //Controlling inputs
  const GENERO = useInputValue('');
  const NOMBRE = useInputValue('');
  const UNIVERSIDAD = useInputValue('');
  const FACULTAD = useInputValue('');

  let UNIVERSITIES = studentInfoDatabase.UNIVERSITIES;
  let FACULTIES = studentInfoDatabase.FACULTIES;
  let GENDERS = studentInfoDatabase.GENDERS;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setState({ ...state, error: null });

    //Handling errors
    if (!GENDERS.includes(GENERO.value)) {
      setState({ ...state, error: 'Debes escoger un género de la lista' });
      return false;
    }
    if (!UNIVERSITIES.includes(UNIVERSIDAD.value)) {
      setState({
        ...state,
        error: 'Debes escoger una universidad de la lista',
      });
      return false;
    }
    if (!FACULTIES.includes(FACULTAD.value)) {
      setState({ ...state, error: 'Debes escoger una facultad de la lista' });
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
          name: NOMBRE.value,
          gender: GENERO.value,
          university: UNIVERSIDAD.value,
          faculty: FACULTAD.value,
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

      <label htmlFor='genero' className={styles.list_label}>
        <input
          required
          list='generos'
          id='genero'
          name='genero'
          placeholder='Género *'
          value={GENERO.value}
          onChange={GENERO.onChange}
        />
        <datalist id='generos'>
          {GENDERS.map((university, index) => (
            <option key={index} value={university} />
          ))}
        </datalist>
        {state.error === 'Debes escoger un género de la lista' && (
          <p className={styles.inputText__errors}>{state.error}</p>
        )}
      </label>

      <input
        required
        name='nombre'
        id='nombre'
        type='text'
        placeholder='Nombre'
        autoComplete='off'
        value={NOMBRE.value}
        onChange={NOMBRE.onChange}
      />

      <label htmlFor='universidad' className={styles.list_label}>
        <input
          required
          list='universidades'
          id='universidad'
          name='universidad'
          placeholder='Universidad *'
          value={UNIVERSIDAD.value}
          onChange={UNIVERSIDAD.onChange}
        />
        <datalist id='universidades'>
          {UNIVERSITIES.map((university, index) => (
            <option key={index} value={university} />
          ))}
        </datalist>
        {state.error === 'Debes escoger una universidad de la lista' && (
          <p className={styles.inputText__errors}>{state.error}</p>
        )}
      </label>

      <label htmlFor='facultad' className={styles.list_label}>
        <input
          required
          list='facultades'
          id='facultad'
          name='facultad'
          placeholder='Facultad *'
          value={FACULTAD.value}
          onChange={FACULTAD.onChange}
        />
        <datalist id='facultades'>
          {FACULTIES.map((university, index) => (
            <option key={index} value={university} />
          ))}
        </datalist>
        {state.error === 'Debes escoger una facultad de la lista' && (
          <p className={styles.inputText__errors}>{state.error}</p>
        )}
      </label>

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
        <div className={`${state.loading && styles.dot_flashing} `}></div>
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
