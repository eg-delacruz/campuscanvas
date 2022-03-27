import React from 'react';
import { useLocation } from 'react-router-dom';

//Styles
import './Contacto.scoped.scss';

//Components
import HelmetLayout from '../../components/GeneralUseComponents/HelmetLayout/HelmetLayout';
import Layout from '../../components/GeneralUseComponents/Layout/Layout';
import ContactForm from '../../components/UsedInSpecificRoutes/Contact/ContactForm/ContactForm';

//Assets
import LinkedIn from '../../assets/static/GeneralUse/IconsAndButtons/linkedIn_icon';
import Facebook from '../../assets/static/GeneralUse/IconsAndButtons/facebook_icon';
import Instagram from '../../assets/static/GeneralUse/IconsAndButtons/instagram_icon';
import Youtube from '../../assets/static/GeneralUse/IconsAndButtons/youtube_icon';

import PhoneIcon from '../../assets/static/GeneralUse/IconsAndButtons/phone_icon';
import LocationIcon from '../../assets/static/GeneralUse/IconsAndButtons/location_icon';

const Contacto = () => {
  //Activates access to data.state.propertyName sent with Link tag
  const data = useLocation();

  let PAGE_TITLE;

  //Setting elements depending if for contact or for job application
  if (data.state === undefined) {
    //If its just contact
    PAGE_TITLE = 'Dejanos aquí tus dudas';
  } else {
    if (data.state.CV) {
      //If its job application
      PAGE_TITLE = 'Únete al equipo Campus Canvas';
    } else {
      //If its just contact
      PAGE_TITLE = 'Dejanos aquí tus dudas';
    }
  }

  return (
    <Layout>
      <HelmetLayout
        title='Contacto'
        subtitle='Contáctanos a través de nuestro formulario de contacto'
      />
      <div className='body__gridContainer'>
        {/* /////////////////////////
//      Contact Form       //
///////////////////////// */}

        <section className='contactForm container'>
          <h1>{PAGE_TITLE}</h1>
          <ContactForm />
        </section>

        {/* /////////////////////////
//     Contact Details     //
///////////////////////// */}

        <section className='contactInfo container'>
          <div className='contactInfo__container'>
            <h2 className='contactInfo__title'>
              O contacta con nuestro equipo
            </h2>

            <div className='contactInfo__details'>
              <div className='contactInfo__address'>
                <LocationIcon
                  className='contactInfo__addressIcon'
                  alt='Dirección'
                />
                <a
                  href='https://goo.gl/maps/JjgpMFoT4GF4rTyP6'
                  rel='noreferrer'
                  target='_blank'
                >
                  C/ Juan Montalvo 29 <br /> 28040 Madrid
                </a>
              </div>

              <div className='contactInfo__phone'>
                <PhoneIcon className='contactInfo__phoneIcon' alt='Teléfono' />
                <a href='tel:+4915736449626'>+34 611 516 396</a>
              </div>
            </div>

            <div className='contactInfo__media'>
              <h4>También a través de nuestras redes sociales</h4>
              <hr />
              <div className='contactInfo__mediaIcons'>
                <a
                  href='https://www.instagram.com/campuscanvas.info/'
                  rel='noreferrer'
                  target='_blank'
                >
                  <Instagram
                    className='contactInfo__mediaIcon'
                    color='#5B0791'
                    alt='Enlace a nuestro Instagram'
                  />
                </a>
                <a
                  href='https://www.facebook.com/campuscanvas.net'
                  rel='noreferrer'
                  target='_blank'
                >
                  <Facebook
                    className='contactInfo__mediaIcon'
                    color='#5B0791'
                    alt='Enlace a nuestro Facebook'
                  />
                </a>
                <a
                  href='https://www.linkedin.com'
                  rel='noreferrer'
                  target='_blank'
                >
                  <LinkedIn
                    className='contactInfo__mediaIcon'
                    color='#5B0791'
                    alt='Enlace a nuestro LinkedIn'
                  />
                </a>
                <a
                  href='https://www.youtube.com/channel/UCZj1h0L7x1QEY-Fx5VwS8Lg'
                  rel='noreferrer'
                  target='_blank'
                >
                  <Youtube
                    className='contactInfo__mediaIcon'
                    color='#5B0791'
                    alt='Enlace a nuestro YouTube'
                  />
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Contacto;
