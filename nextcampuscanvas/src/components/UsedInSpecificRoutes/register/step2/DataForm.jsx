import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

//Assets
import arrow_right_white from '@assets/GeneralUse/IconsAndButtons/arrow_right_white.svg';

//hooks
import { useInputValue } from '@hooks/useInputValue';

//Styles
import styles from './DataForm.module.scss';

const DataForm = (props) => {
  //Controlling inputs
  const GENERO = useInputValue('');
  const NOMBRE = useInputValue('');
  const UNIVERSIDAD = useInputValue('');
  const FACULTAD = useInputValue('');

  let UNIVERSITIES = ['Complu', 'Juan Carlos', 'Rey Tercero', 'Carlos 3'];
  let FACULTIES = ['Medicina', 'Fisica', 'Matematicas', 'Ciencias'];
  let GENDERS = ['Masculino', 'Femenino', 'Diverso'];

  const handleSubmit = (e) => {
    {
      /* TODO: Enviar toda esta info a través de redux sin que haya estado de
      cargando, pues esta info se siempre estará correcta al 
      estar siendo validada aquí. Directamente actualizar el estado
      para continuar. Redux no debe hacer ningún tipo de dispatch */
    }
    e.preventDefault();
    setError(null);
    if (!GENDERS.includes(GENERO.value)) {
      setError('Debes escoger un género de la lista');
      return false;
    }
    if (!UNIVERSITIES.includes(UNIVERSIDAD.value)) {
      setError('Debes escoger una universidad de la lista');
      return false;
    }
    if (!FACULTIES.includes(FACULTAD.value)) {
      setError('Debes escoger una facultad de la lista');
      return false;
    }
    console.log({
      Genero: GENERO.value,
      Nombre: NOMBRE.value,
      Universidad: UNIVERSIDAD.value,
      Facultad: FACULTAD.value,
    });
  };

  const [error, setError] = useState(null);

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
          // className={styles.list__input}
          list='generos'
          id='genero'
          name='genero'
          placeholder='Género *'
          {...GENERO}
        />
        <datalist id='generos'>
          {GENDERS.map((university, index) => (
            <option key={index} value={university} />
          ))}
        </datalist>
        {error === 'Debes escoger un género de la lista' && (
          <p className={styles.inputText__errors}>{error}</p>
        )}
      </label>

      <input
        required
        name='nombre'
        id='nombre'
        type='text'
        placeholder='Nombre'
        autoComplete='off'
        {...NOMBRE}
      />

      <label htmlFor='universidad' className={styles.list_label}>
        <input
          required
          // className={styles.list__input}
          list='universidades'
          id='universidad'
          name='universidad'
          placeholder='Universidad *'
          {...UNIVERSIDAD}
        />
        <datalist id='universidades'>
          {UNIVERSITIES.map((university, index) => (
            <option key={index} value={university} />
          ))}
        </datalist>
        {error === 'Debes escoger una universidad de la lista' && (
          <p className={styles.inputText__errors}>{error}</p>
        )}
      </label>

      <label htmlFor='facultad' className={styles.list_label}>
        <input
          required
          // className={styles.list__input}
          list='facultades'
          id='facultad'
          name='facultad'
          placeholder='Facultad *'
          {...FACULTAD}
        />
        <datalist id='facultades'>
          {FACULTIES.map((university, index) => (
            <option key={index} value={university} />
          ))}
        </datalist>
        {error === 'Debes escoger una facultad de la lista' && (
          <p className={styles.inputText__errors}>{error}</p>
        )}
      </label>

      <button
        type='submit'
        className={`${styles.continueButton} btn button--red`}
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
