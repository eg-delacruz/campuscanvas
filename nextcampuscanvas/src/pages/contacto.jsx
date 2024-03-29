import React from 'react';
import { useRouter } from 'next/router';

//Styles
import styles from '@pagestyles/Contacto.module.scss';

//Components
import Layout from '@components/GeneralUseComponents/Layout/Layout';
import ContactForm from '@components/UsedInSpecificRoutes/Contact/ContactForm/ContactForm';
import SEOHeader from '@components/GeneralUseComponents/SEO_Header/SEOHeader';

//Assets
import TikTok from '@assets/GeneralUse/IconsAndButtons/tiktok_icon';
import Facebook from '@assets/GeneralUse/IconsAndButtons/facebook_icon';
import Instagram from '@assets/GeneralUse/IconsAndButtons/instagram_icon';
import Youtube from '@assets/GeneralUse/IconsAndButtons/youtube_icon';
import Twitter from '@assets/GeneralUse/IconsAndButtons/twitter_icon';

import PhoneIcon from '@assets/GeneralUse/IconsAndButtons/phone_icon';
import LocationIcon from '@assets/GeneralUse/IconsAndButtons/location_icon';

const Contacto = () => {
  //Activates access to data.query.propertyName sent with Link tag
  const data = useRouter();

  let PAGE_TITLE;

  //Setting elements depending if for contact or for job application
  if (data.query === {}) {
    //If its just contact
    PAGE_TITLE = 'Dejanos aquí tus dudas';
  } else {
    if (data.query.CV === true) {
      //If its job application
      PAGE_TITLE = 'Únete al equipo Campus Canvas';
    } else {
      //If its just contact
      PAGE_TITLE = 'Dejanos aquí tus dudas';
    }
  }

  return (
    <>
      <SEOHeader
        tabTitle={'Contacto'}
        metaName={'Contacto'}
        description={'Contáctanos a través de nuestro formulario de contacto'}
      />

      <Layout>
        <div className={styles.body__gridContainer}>
          {/* /////////////////////////
          //      Contact Form       //
          ///////////////////////// */}

          <section className={`${styles.contactForm} container`}>
            <h1>{PAGE_TITLE}</h1>
            <ContactForm />
          </section>

          {/* /////////////////////////
          //     Contact Details     //
          ///////////////////////// */}

          <section className={`${styles.contactInfo} container`}>
            <div className={styles.contactInfo__container}>
              <h2 className={styles.contactInfo__title}>
                O contacta con nuestro equipo
              </h2>

              <div className={styles.contactInfo__details}>
                {/* Don't erase this in case useful in the future */}
                {/* <div className={styles.contactInfo__address}>
                  <LocationIcon
                    className={styles.contactInfo__addressIcon}
                    alt='Dirección'
                  />
                  <a
                    href='https://goo.gl/maps/XpvDQ12nQwwMkYHy5'
                    rel='noreferrer'
                    target='_blank'
                  >
                    Dirección oficina <br /> 28040 Madrid
                  </a>
                </div> */}

                <div className={styles.contactInfo__phone}>
                  <PhoneIcon
                    className={styles.contactInfo__phoneIcon}
                    alt='Teléfono'
                  />
                  <a href='tel:+34611516396'>+34 611 516 396</a>
                </div>
              </div>

              <div className={styles.contactInfo__media}>
                <h4>También a través de nuestras redes sociales</h4>
                <hr />
                <div className={styles.contactInfo__mediaIcons}>
                  <a
                    href='https://www.instagram.com/cc_campuscanvas/'
                    rel='noreferrer'
                    target='_blank'
                  >
                    <Instagram
                      className={styles.contactInfo__mediaIcon}
                      color='#5B0791'
                      alt='Enlace a nuestro Instagram'
                    />
                  </a>
                  <a
                    href='https://www.facebook.com/spaincampuscanvas'
                    rel='noreferrer'
                    target='_blank'
                  >
                    <Facebook
                      className={styles.contactInfo__mediaIcon}
                      color='#5B0791'
                      alt='Enlace a nuestro Facebook'
                    />
                  </a>
                  <a
                    href='https://www.tiktok.com/@campuscanvas?is_from_webapp=1&sender_device=pc'
                    rel='noreferrer'
                    target='_blank'
                  >
                    <TikTok
                      className={styles.contactInfo__mediaIcon}
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
                      className={styles.contactInfo__mediaIcon}
                      color='#5B0791'
                      alt='Enlace a nuestro YouTube'
                    />
                  </a>
                  <a
                    href='https://twitter.com/campuscanvases'
                    rel='noreferrer'
                    target='_blank'
                  >
                    <Twitter
                      className={styles.contactInfo__mediaIcon}
                      color='#5B0791'
                      alt='Enlace a nuestro Twitter'
                    />
                  </a>
                </div>
              </div>
            </div>
          </section>
        </div>
      </Layout>
    </>
  );
};

export default Contacto;
