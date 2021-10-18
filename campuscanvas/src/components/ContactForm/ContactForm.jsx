import React, { useState, useRef, useEffect } from 'react';

//Styles
import './ContactForm.scss';

//images
import UploadIcon from '../../assets/static/upload_icon1.png';

//hooks
import { useInputValue } from '../../hooks/useInputValue';

const ContactForm = () => {
  const NAME = useInputValue('');
  const LAST_NAME = useInputValue('');
  const EMAIL = useInputValue('');
  const PHONE = useInputValue('');
  const COMPANY = useInputValue('');
  const MESSAGE = useInputValue('');

  ////////////////////////////////////////////// Input File ligic////////////////////////////////////////

  //Controlling files input
  const elemRef = useRef(null);

  const [files, setFiles] = useState({
    value: '',
    uploadedFiles: {},
  });

  //Saving files in state
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
        <button onClick={() => deleteUploadedFile(key)}>Delete</button>
      </div>
    ));

  ////////////////////////////////////////////// Input File ligic////////////////////////////////////////

  return (
    <form
      className='form'
      method='POST'
      action='https://formsubmit.co/a6c2cdb34bab8fc6bd2a306139ff5fdb'
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
        <img src={UploadIcon} alt='' />

        <span>Sube un archivo</span>

        <input
          id='fileItem'
          className='form__input form__FileInput'
          type='file'
          placeholder='Documentos'
          name='documentos'
          multiple
          ref={elemRef}
          value={files.value}
          onChange={onChange}
        />
        {/* <span className='form__inputLabel form__FileInputLabel'>Archivo</span> */}
      </label>

      {Object.keys(files.uploadedFiles).length > 0 && displayUploadedFiles()}

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
