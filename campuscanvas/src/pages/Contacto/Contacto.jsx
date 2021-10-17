import React from 'react';

//Styles
import './Contacto.scoped.scss';

//Components
import ContactForm from '../../components/ContactForm/ContactForm';

const Contacto = () => {
  return (
    <div className='body__gridContainer'>
      <div className='contact container'>
        <h1>Déjanos aquí tus dudas</h1>
        <ContactForm />
      </div>
    </div>
  );
};

export default Contacto;
