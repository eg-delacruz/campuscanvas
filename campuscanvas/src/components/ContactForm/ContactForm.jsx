import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

//Styles
import './ContactForm.scss';

//images
import UploadIcon from '../../assets/static/upload_icon1.png';
import TrashIcon from '../../assets/static/TrashIcon.png';

//hooks
import { useInputValue } from '../../hooks/useInputValue';

const ContactForm = ({ UploadText = 'Sube un documento' }) => {
  const NAME = useInputValue('');
  const LAST_NAME = useInputValue('');
  const EMAIL = useInputValue('');
  const PHONE = useInputValue('');
  const COMPANY = useInputValue('');
  const MESSAGE = useInputValue('');

  ////////////////////////////////////////////// Input File logic////////////////////////////////////////

  //Controlling files input
  const elemRef = useRef(null);

  const [files, setFiles] = useState({
    value: '',
    uploadedFiles: {},
  });

  //Saving files in state (an controlling input)
  const onChange = (e) => {
    setFiles((prevState) => ({
      ...prevState,
      value: e.target.value,
      uploadedFiles: elemRef.current.files,
    }));
  };

  //needed to se changes every time state is changes, since useState async!
  // useEffect(() => {
  //   console.log(files);
  // }, [files]);

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
      <h3 className='form__title'>Formulario de contacto</h3>

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
          className='form__input'
          type='email'
          placeholder='Correo empresarial *'
          name='email'
          required
          {...EMAIL}
        />
        <span className='form__inputLabel'>Correo empresarial *</span>
      </label>

      <label className='form__labelTag'>
        <input
          className='form__input'
          type='text'
          placeholder='Empresa'
          name='empresa'
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
        <span>{UploadText}</span>
        <input
          id='fileItem'
          className='form__input form__FileInput'
          type='file'
          placeholder='Documentos'
          name='documentos'
          ref={elemRef}
          multiple
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
        placeholder='Escribe aquí tu mensaje'
        required
        {...MESSAGE}
      />
      <button className='button--blue btn form__button' type='submit'>
        Enviar
      </button>
    </form>
  );
};

export default ContactForm;

ContactForm.propTypes = {
  UploadText: PropTypes.string,
};

//El servicio para recibir la info por correo solo admite
//subir y enviar un solo archivo.
