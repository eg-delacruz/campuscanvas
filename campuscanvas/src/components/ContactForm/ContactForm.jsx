import React from 'react';

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
      <input type='text' placeholder='Nombre *' {...NAME} />
      <input type='text' placeholder='Apellido *' {...LAST_NAME} />
      <input type='email' placeholder='Correo empresarial *' {...EMAIL} />
      <input type='text' placeholder='Empresa' {...COMPANY} />
      <input type='tel' placeholder='Número de teléfono' {...PHONE} />
      <input type='text' placeholder='Tus preguntas aquí' {...MESSAGE} />
      <button type='submit'>Enviar</button>
    </form>
  );
};

export default ContactForm;
