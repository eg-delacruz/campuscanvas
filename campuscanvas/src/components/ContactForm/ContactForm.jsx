import React from 'react';

//Styles
import './ContactForm.scss';

//hooks
import { useInputValue } from '../../hooks/useInputValue';

const ContactForm = () => {
  const NAME = useInputValue('');
  const LAST_NAME = useInputValue('');
  const EMAIL = useInputValue('');
  const PHONE = useInputValue('');
  const COMPANY = useInputValue('');
  const MESSAGE = useInputValue('');

  const handleSubmit = (e) => {
    //e.preventDefault();
  };

  return (
    <form
      className='form'
      method='POST'
      onSubmit={handleSubmit}
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

      <textarea
        className='form__input form__message'
        name='user_message'
        placeholder='Escribe aquí tu mensaje'
        required
        {...MESSAGE}
      />
      <button className='button-blue btn form__button' type='submit'>
        Enviar
      </button>
    </form>
  );
};

export default ContactForm;
