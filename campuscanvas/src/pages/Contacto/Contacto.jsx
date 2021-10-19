import React from 'react';

//Styles
import './Contacto.scoped.scss';

//Components
import ContactForm from '../../components/ContactForm/ContactForm';

//Assets
import LinkedIn from '../../assets/static/SVGComponents/linkedIn_icon';
import Facebook from '../../assets/static/SVGComponents/facebook_icon';
import Instagram from '../../assets/static/SVGComponents/instagram_icon';
import Youtube from '../../assets/static/SVGComponents/youtube_icon';

import PhoneIcon from '../../assets/static/SVGComponents/phone_icon';
import LocationIcon from '../../assets/static/SVGComponents/location_icon';

const Contacto = () => {
  return (
    <div className='body__gridContainer'>
      {/* /////////////////////////
//      Contact Form       //
///////////////////////// */}

      <section className='contactForm container'>
        <h1>Déjanos aquí tus dudas</h1>
        <ContactForm />
      </section>

      {/* /////////////////////////
//      Contact Details       //
///////////////////////// */}

      <section className='contactInfo container'>
        <div className='contactInfo'>
          <h2 className='contactInfo__title'>O contacta con nuestro equipo</h2>

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
                C/ Tren de Arganda. 11 <br /> 29188 Madrid
              </a>
            </div>

            <div className='contactInfo__phone'>
              <PhoneIcon className='contactInfo__phoneIcon' alt='Teléfono' />
              <a href='tel:+4915736449626'>+49 1573 6449 626</a>
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
  );
};

export default Contacto;
