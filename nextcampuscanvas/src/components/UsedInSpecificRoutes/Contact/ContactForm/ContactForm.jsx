import Link from 'next/link';

import React, { useState, useRef } from 'react';
import { connect } from 'react-redux';
import { useRouter } from 'next/router';

//Styles
import styles from './ContactForm.module.scss';

//Assets
import UploadIcon from '@assets/PagesImages/ContactoImages/upload_icon1.png';
import TrashIcon from '@assets/PagesImages/ContactoImages/TrashIcon.png';

//hooks
import { useInputValue } from '@hooks/useInputValue';

const ContactForm = (props) => {
  const data = useRouter();
  //Activates access to data.state.propertyName sent with Link tag

  ////////////Setting elements depending if for contact or for job application////////////
  var FORM_TITLE;
  var UPLOAD_TEXT;
  var EMAIL_PLACEHOLDER;
  var SHOW_COMPANY_FIELD;
  var SHOW_JOBSELECTION_FIELD;
  var MESSAGE_PLACEHOLDER;

  if (Object.keys(data.query).length === 0) {
    //If its just contact
    FORM_TITLE = 'Formulario de contacto';
    UPLOAD_TEXT = 'Sube un documento';
    EMAIL_PLACEHOLDER = 'Correo empresarial *';
    SHOW_COMPANY_FIELD = false;
    SHOW_JOBSELECTION_FIELD = false;
    MESSAGE_PLACEHOLDER = 'Escribe aquí tu mensaje';
  }

  if (data.query.CV === 'false') {
    //If its just contact
    FORM_TITLE = 'Formulario de contacto';
    UPLOAD_TEXT = 'Sube un documento';
    EMAIL_PLACEHOLDER = 'Correo empresarial *';
    SHOW_COMPANY_FIELD = false;
    SHOW_JOBSELECTION_FIELD = false;
    MESSAGE_PLACEHOLDER = 'Escribe aquí tu mensaje';
  }

  if (data.query.CV === 'true') {
    //If its job application
    FORM_TITLE = 'Aplica al empleo';
    UPLOAD_TEXT = 'Sube tu CV aquí';
    EMAIL_PLACEHOLDER = 'Correo *';
    SHOW_COMPANY_FIELD = true;
    SHOW_JOBSELECTION_FIELD = true;
    MESSAGE_PLACEHOLDER = 'Compártenos aquí tu carta de motivación';
  }

  ////////////Setting elements depending if for contact or for job application////////////

  //Controlling inputs
  const NAME = useInputValue('');
  const LAST_NAME = useInputValue('');
  const JOB_NAME = useInputValue('');
  const EMAIL = useInputValue('');
  const PHONE = useInputValue('');
  const COMPANY = useInputValue('');
  const MESSAGE = useInputValue('');

  ///////////////////////Show jobs in datalist in case of job application////////////////////////
  let JOB_POSITIONS = [];
  if (typeof props.jobs === 'object') {
    JOB_POSITIONS = props.jobs.map((position) => {
      return position.JobTitle;
    });
  }
  ///////////////////////Show jobs in datalist in case of job application////////////////////////

  ////////////////////////////////////////////// Input File logic////////////////////////////////////////

  //Controlling files input
  const elemRef = useRef(null);
  const [files, setFiles] = useState({
    value: '',
    uploadedFiles: {},
  });

  //Saving files in state (and controlling input)
  const onChange = (e) => {
    setFiles((prevState) => ({
      ...prevState,
      value: e.target.value,
      uploadedFiles: elemRef.current.files,
    }));
  };

  const deleteUploadedFile = (key) => {
    const updatedFiles = { ...files.uploadedFiles };
    delete updatedFiles[key];

    setFiles((prevState) => ({
      ...prevState,
      uploadedFiles: updatedFiles,
    }));
  };

  const displayUploadedFiles = () =>
    Object.keys(files.uploadedFiles).map((key) => (
      <div key={key}>
        {files.uploadedFiles[key].name}
        <button onClick={() => deleteUploadedFile(key)}>
          <img src={TrashIcon.src} alt='Borrar archivo' />
        </button>
      </div>
    ));

  ////////////////////////////////////////////// Input File logic////////////////////////////////////////
  return (
    <form
      className={styles.form}
      method='POST'
      action='https://formsubmit.co/a6c2cdb34bab8fc6bd2a306139ff5fdb'
      encType='multipart/form-data'
    >
      <h3 className={styles.form__title}>{FORM_TITLE}</h3>

      <label className={styles.form__labelTag}>
        <input
          className={styles.form__input}
          type='text'
          placeholder='nombre'
          required
          name='nombre'
          value={NAME.value}
          onChange={NAME.onChange}
        />
        <span className={styles.form__inputLabel}>Nombre *</span>
      </label>

      <label className={styles.form__labelTag}>
        <input
          className={styles.form__input}
          type='text'
          placeholder='Apellido *'
          required
          name='Apellido'
          value={LAST_NAME.value}
          onChange={LAST_NAME.onChange}
        />
        <span className={styles.form__inputLabel}>Apellido *</span>
      </label>

      {SHOW_JOBSELECTION_FIELD && (
        <label className={styles.form__labelTag}>
          <input
            required
            className={`${styles.form__input} ${styles.non_transparent_placeholder}`}
            list='job_positions'
            name='Posición de interés'
            placeholder='Posición de interés'
            value={JOB_NAME.value}
            onChange={JOB_NAME.onChange}
          />
          <datalist id='job_positions'>
            {JOB_POSITIONS.map((position, index) => (
              <option key={index} value={position} />
            ))}
          </datalist>
        </label>
      )}

      <label className={styles.form__labelTag}>
        <input
          className={styles.form__input}
          type='email'
          placeholder='Correo empresarial *'
          name='email'
          required
          value={EMAIL.value}
          onChange={EMAIL.onChange}
        />
        <span className={styles.form__inputLabel}>{EMAIL_PLACEHOLDER}</span>
      </label>

      <label className={styles.form__labelTag}>
        <input
          className={styles.form__input}
          type='text'
          placeholder='Empresa'
          name='empresa'
          hidden={SHOW_COMPANY_FIELD}
          value={COMPANY.value}
          onChange={COMPANY.onChange}
        />
        <span className={styles.form__inputLabel}>Empresa</span>
      </label>

      <label className={styles.form__labelTag}>
        <input
          className={styles.form__input}
          type='tel'
          placeholder='Número de teléfono'
          name='telefono'
          value={PHONE.value}
          onChange={PHONE.onChange}
        />
        <span className={styles.form__inputLabel}>Teléfono</span>
      </label>

      <label
        className={`${styles.form__labelTag} ${styles.form__FileInputLabelTag}`}
      >
        <img className={styles.form__uploadIcon} src={UploadIcon.src} alt='' />
        <span>{UPLOAD_TEXT}</span>
        <input
          id='fileItem'
          className={`${styles.form__input} ${styles.form__FileInput}`}
          type='file'
          placeholder='Documentos'
          name='documentos'
          ref={elemRef}
          accept='.pdf,.jpg,.jpeg,.png,.doc,.docx,.xlsx,.pptx'
          value={files.value}
          onChange={onChange}
        />
      </label>

      {Object.keys(files.uploadedFiles).length > 0 && (
        <div className={styles.uploadedfiles__Container}>
          {displayUploadedFiles()}
        </div>
      )}

      <textarea
        className={`${styles.form__input} ${styles.form__message}`}
        name='user_message'
        placeholder={MESSAGE_PLACEHOLDER}
        required
        value={MESSAGE.value}
        onChange={MESSAGE.onChange}
      />

      <div className={styles.form__data_warning}>
        <p>
          <strong>Protección de datos personales</strong>
          <br />
          Utilizaremos sus datos para ponernos en contacto con usted. Para más
          información sobre el tratamiento y sus derechos, consulte la{' '}
          <Link href={'/privacidad'}>política de privacidad</Link>.
        </p>

        <div className={styles.checkboxContainer}>
          <input
            className={styles.checkbox}
            type='checkbox'
            id='terms_cons'
            name='terms_cons'
            autoComplete='off'
            required
          />{' '}
          <label className={styles.checkbox__label} htmlFor='terms_cons'>
            {' '}
            Acepto el tratamiento de mis datos para que Campus Canvas se ponga
            en contacto conmigo.
          </label>
        </div>
      </div>

      <br />

      <button className='button--blue btn form__button' type='submit'>
        Enviar
      </button>
    </form>
  );
};

const mapStateToProps = (reducers) => {
  return reducers.jobsReducer;
};

export default connect(mapStateToProps)(ContactForm);

//El servicio para recibir la info por correo solo admite
//subir y enviar un solo archivo.
