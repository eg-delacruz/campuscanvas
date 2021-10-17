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
    e.preventDefault();
  };

  return (
    <form className='form' onSubmit={handleSubmit} action=''>
      <h3 className='form__title'>Formulario de contacto</h3>
      <input
        className='form__input'
        type='text'
        placeholder='Nombre *'
        {...NAME}
      />
      <input
        className='form__input'
        type='text'
        placeholder='Apellido *'
        {...LAST_NAME}
      />
      <input
        className='form__input'
        type='email'
        placeholder='Correo empresarial *'
        {...EMAIL}
      />
      <input
        className='form__input'
        type='text'
        placeholder='Empresa'
        {...COMPANY}
      />
      <input
        className='form__input'
        type='tel'
        placeholder='Número de teléfono'
        {...PHONE}
      />
      <textarea
        className='form__input form__message'
        name='user_message'
        placeholder='Tus preguntas aquí'
        {...MESSAGE}
      />
      <button className='form__button' type='submit'>
        Enviar
      </button>
    </form>
  );
};

export default ContactForm;
