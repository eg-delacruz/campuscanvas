import React, { useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { connect } from 'react-redux';

//Styles
import './ContactForm.scss';

//Assets
import UploadIcon from '../../../../assets/static/PagesImages/ContactoImages/upload_icon1.png';
import TrashIcon from '../../../../assets/static/PagesImages/ContactoImages/TrashIcon.png';

//hooks
import { useInputValue } from '../../../../hooks/useInputValue';

//

const ContactForm = (props) => {
  //Activates access to data.state.propertyName sent with Link tag
  const data = useLocation();

  ////////////Setting elements depending if for contact or for job application////////////
  let FORM_TITLE;
  let UPLOAD_TEXT;
  let EMAIL_PLACEHOLDER;
  let SHOW_COMPANY_FIELD;
  let SHOW_JOBSELECTION_FIELD;
  let MESSAGE_PLACEHOLDER;

  if (data.state === undefined) {
    //If its just contact
    FORM_TITLE = 'Formulario de contacto';
    UPLOAD_TEXT = 'Sube un documento';
    EMAIL_PLACEHOLDER = 'Correo empresarial *';
    SHOW_COMPANY_FIELD = false;
    SHOW_JOBSELECTION_FIELD = false;
    MESSAGE_PLACEHOLDER = 'Escribe aquí tu mensaje';
  } else {
    if (data.state.CV) {
      //If its job application
      FORM_TITLE = 'Aplica al empleo';
      UPLOAD_TEXT = 'Sube tu CV aquí';
      EMAIL_PLACEHOLDER = 'Correo *';
      SHOW_COMPANY_FIELD = true;
      SHOW_JOBSELECTION_FIELD = true;
      MESSAGE_PLACEHOLDER = 'Compártenos aquí tu carta de motivación';
    } else {
      //If its just contact
      FORM_TITLE = 'Formulario de contacto';
      UPLOAD_TEXT = 'Sube un documento';
      EMAIL_PLACEHOLDER = 'Correo empresarial *';
      SHOW_COMPANY_FIELD = false;
      SHOW_JOBSELECTION_FIELD = false;
      MESSAGE_PLACEHOLDER = 'Escribe aquí tu mensaje';
    }
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
          <img src={TrashIcon} alt='Borrar archivo' />
        </button>
      </div>
    ));

  ////////////////////////////////////////////// Input File logic////////////////////////////////////////

  return (
    <form
      className='form'
      method='POST'
      action='https://formsubmit.co/a6c2cdb34bab8fc6bd2a306139ff5fdb'
      encType='multipart/form-data'
    >
      <h3 className='form__title'>{FORM_TITLE}</h3>

      <label className='form__labelTag'>
        <input
          className='form__input'
          type='text'
          placeholder='nombre'
          required
          name='nombre'
          {...NAME}
        />
        <span className='form__inputLabel'>Nombre *</span>
      </label>

      <label className='form__labelTag'>
        <input
          className='form__input'
          type='text'
          placeholder='Apellido *'
          required
          name='Apellido'
          {...LAST_NAME}
        />
        <span className='form__inputLabel'>Apellido *</span>
      </label>

      <label className='form__labelTag'>
        <input
          required
          className={
            SHOW_JOBSELECTION_FIELD
              ? 'form__input non_transparent_placeholder isActive'
              : 'form__input non_transparent_placeholder'
          }
          list='job_positions'
          name='Posición de interés'
          {...JOB_NAME}
          placeholder='Posición de interés'
        />
        <datalist id='job_positions'>
          {JOB_POSITIONS.map((position, index) => (
            <option key={index} value={position} />
          ))}
        </datalist>
      </label>

      <label className='form__labelTag'>
        <input
          className='form__input'
          type='email'
          placeholder='Correo empresarial *'
          name='email'
          required
          {...EMAIL}
        />
        <span className='form__inputLabel'>{EMAIL_PLACEHOLDER}</span>
      </label>

      <label className='form__labelTag'>
        <input
          className='form__input'
          type='text'
          placeholder='Empresa'
          name='empresa'
          hidden={SHOW_COMPANY_FIELD}
          {...COMPANY}
        />
        <span className='form__inputLabel'>Empresa</span>
      </label>

      <label className='form__labelTag'>
        <input
          className='form__input'
          type='tel'
          placeholder='Número de teléfono'
          name='telefono'
          {...PHONE}
        />
        <span className='form__inputLabel'>Teléfono</span>
      </label>

      <label className='form__labelTag form__FileInputLabelTag'>
        <img className='form__uploadIcon' src={UploadIcon} alt='' />
        <span>{UPLOAD_TEXT}</span>
        <input
          id='fileItem'
          className='form__input form__FileInput'
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
        <div className='uploadedfiles__Container'>{displayUploadedFiles()}</div>
      )}

      <textarea
        className='form__input form__message'
        name='user_message'
        placeholder={MESSAGE_PLACEHOLDER}
        required
        {...MESSAGE}
      />
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
