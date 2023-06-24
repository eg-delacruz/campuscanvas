import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

//hooks
import { useInputValue } from '@hooks/useInputValue';

//Styles
import styles from './FooterWithoutSignature.module.scss';

//Assets
import Logo_footer from '@assets/GeneralUse/Logos/logo_footer.svg';
import Youtube from '@assets/GeneralUse/IconsAndButtons/youtube_icon.svg';
import Facebook from '@assets/GeneralUse/IconsAndButtons/facebook_icon.svg';
import Instagram from '@assets/GeneralUse/IconsAndButtons/instagram_icon.svg';
import TikTok from '@assets/GeneralUse/IconsAndButtons/tiktok_icon.svg';
import Twitter from '@assets/GeneralUse/IconsAndButtons/twitter_icon.svg';

//CLARIFICATIONS:
//1. Try to use this componnt instead of the one with the footer and signature together
//2. Changes in this componente should be also made in the other one with the signature
function FooterWithoutSignature() {
  const [state, setState] = useState({
    newsletter_loading: false,
    newsletter_error: '',
    newsletter_success: '',
  });

  //Controlling inputs
  const NEWSLETTER = useInputValue('');

  const handleNewsletter = async () => {
    setState({
      ...state,
      newsletter_error: '',
      newsletter_success: '',
      newsletter_loading: true,
    });
    if (!NEWSLETTER.value) {
      return setState({
        ...state,
        newsletter_success: '',
        newsletter_loading: false,
        newsletter_error: 'Introduce un correo',
      });
    }
    if (!NEWSLETTER.value.includes('@')) {
      return setState({
        ...state,
        newsletter_success: '',
        newsletter_loading: false,
        newsletter_error: 'Introduce un correo válido',
      });
    }

    const URL = 'https://api.sendinblue.com/v3/contacts';
    const APIKEY = process.env.NEXT_PUBLIC_SENDINBLUE_CC_API_KEY;

    try {
      const respuesta = await fetch(URL, {
        method: 'POST',
        headers: {
          accept: 'application/json',
          'content-type': 'application/json',
          'api-key': APIKEY,
        },
        body: JSON.stringify({
          updateEnabled: false,
          email: NEWSLETTER.value,
        }),
      });

      if (!respuesta.ok) {
        return setState({
          ...state,
          newsletter_success: '',
          newsletter_loading: false,
          newsletter_error: 'Hubo un error, vuelve a intentarlo',
        });
      }

      setState({
        ...state,
        newsletter_error: '',
        newsletter_loading: false,
        newsletter_success: '¡Te has suscrito correctamente!',
      });
    } catch (error) {
      setState({
        ...state,
        newsletter_success: '',
        newsletter_loading: false,
        newsletter_error: 'Error al suscribir usuario',
      });
      console.log(error.message);
    }
  };

  return (
    <footer id='footer' className={styles.footer}>
      <div>
        <section className={styles.footer__navigation}>
          <div className={styles.footer__logo}>
            <figure>
              <Image src={Logo_footer} alt='Logo footer' />
            </figure>

            <div className={styles.newsletter}>
              <p className={styles.newsletter__description}>
                ¡Suscríbete a nuestra newsletter!
              </p>
              <div className={styles.newsletter__inputs}>
                <input
                  name='email'
                  id='email'
                  type='email'
                  placeholder='Introduce tu email...'
                  autoComplete='off'
                  value={NEWSLETTER.value}
                  onChange={NEWSLETTER.onChange}
                />
                {state.newsletter_loading ? (
                  <button
                    className={`${styles.loadingBtnSpinner} btn button--red`}
                  >
                    Cargando
                  </button>
                ) : (
                  <button
                    onClick={handleNewsletter}
                    className='btn button--red'
                  >
                    Suscribirme
                  </button>
                )}
              </div>
              {state.newsletter_error && (
                <p className={styles.newsletter__error_displayer}>
                  {state.newsletter_error}
                </p>
              )}
              {state.newsletter_success && (
                <p className={styles.newsletter__success_displayer}>
                  {state.newsletter_success}
                </p>
              )}
            </div>
          </div>
          <div className={styles.footer__platform}>
            <h5>Plataforma</h5>
            <ul>
              <li>
                <Link href='/'>Home</Link>
              </li>
              {/* TODO: uncomment when I start to work with campus box */}
              {/* <li>
                <Link href='/campusbox'>Campus Box</Link>
              </li> */}
              {/* TODO: re-display in the future */}
              {/* <li>
                <Link href='/nosotros'>Nosotros</Link>
              </li> */}
              {/* TODO: re-display in the future */}
              {/* <li>
                <Link href='/empresas'>Empresas</Link>
              </li> */}
              <li>
                <Link href='/blog'>Blog</Link>
              </li>
              <li className={styles.footer__empleos}>
                <Link href='/empleos'>Empleos</Link>
              </li>
              <li>
                <Link href='/contacto'>Contacto</Link>
              </li>
              <li>
                <Link href='/FAQs'>FAQs</Link>
              </li>
            </ul>
          </div>
          <div className={styles.footer__legal}>
            <h5>Legal</h5>
            <ul>
              <li>
                <Link href='/legal'>Aviso legal</Link>
              </li>
              <li>
                <Link href='/privacidad'>Política de privacidad</Link>
              </li>
              <li>
                <Link href='/condiciones'>Términos y condiciones</Link>
              </li>
              <li>
                <Link href='/cookies'>Declaración de cookies</Link>
              </li>
            </ul>
          </div>
          <div className={styles.footer__social}>
            <a
              href='https://www.instagram.com/campuscanvas.es/'
              rel='noreferrer'
              target='_blank'
            >
              <Image src={Instagram} alt='Enlace a nuestro Instagram' />
            </a>
            <a
              href='https://www.facebook.com/spaincampuscanvas'
              rel='noreferrer'
              target='_blank'
            >
              <Image src={Facebook} alt='Enlace a nuestro Facebook' />
            </a>
            <a
              href='https://www.tiktok.com/@campuscanvas.es'
              rel='noreferrer'
              target='_blank'
            >
              <Image src={TikTok} alt='Enlace a nuestro Linkedin' />
            </a>
            <a
              href='https://www.youtube.com/channel/UCZj1h0L7x1QEY-Fx5VwS8Lg'
              rel='noreferrer'
              target='_blank'
            >
              <Image src={Youtube} alt='Enlace a nuestro youtube' />
            </a>
            <a
              href='https://twitter.com/campuscanvases'
              rel='noreferrer'
              target='_blank'
            >
              <Image src={Twitter} alt='Enlace a nuestro Twitter' />
            </a>
          </div>
        </section>
      </div>
    </footer>
  );
}

export default FooterWithoutSignature;
