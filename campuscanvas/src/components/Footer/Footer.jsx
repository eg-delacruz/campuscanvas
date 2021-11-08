import React from 'react';
import { Link } from 'react-router-dom';

//Styles
import './Footer.scoped.scss';

//Assets
import Logo_footer from '../../assets/static/logo_footer.svg';
import Youtube from '../../assets/static/youtube_icon.svg';
import Facebook from '../../assets/static/facebook_icon.svg';
import Instagram from '../../assets/static/instagram_icon.svg';
import LinkedIn from '../../assets/static/linkedin_icon.svg';

function Footer() {
  return (
    <footer className='footer'>
      <div>
        <section className='footer__navigation'>
          <div className='footer__logo'>
            <figure>
              <img src={Logo_footer} alt='Logo footer' />
            </figure>
          </div>
          <div className='footer__platform'>
            <h5>Plataforma</h5>
            <ul>
              <li>
                <Link to='/'>Home</Link>
              </li>
              <li>
                <Link to='/nosotros'>Nosotros</Link>
              </li>
              <li>
                <Link to='/empresas'>Empresas</Link>
              </li>
              <li>
                <Link to='/blog'>Blog</Link>
              </li>
              <li className='footer__empleos'>
                <Link className='footer__empleos-enlace' to='/empleos'>
                  Empleos
                </Link>
              </li>
              <li>
                <Link to='/contacto'>Contacto</Link>
              </li>
            </ul>
          </div>
          <div className='footer__legal'>
            <h5>Legal</h5>
            <ul>
              <li>
                <Link to='/privacidad'>Política de privacidad</Link>
              </li>
              <li>
                <Link to='/condiciones'>Términos y condiciones</Link>
              </li>
              <li>
                <Link to='/cookies'>Declaración de cookies</Link>
              </li>
            </ul>
          </div>
          <div className='footer__social'>
            <a
              href='https://www.instagram.com/campuscanvas.info/'
              rel='noreferrer'
              target='_blank'
            >
              <img src={Instagram} alt='Enlace a nuestro Instagram' />
            </a>
            <a
              href='https://www.facebook.com/campuscanvas.net'
              rel='noreferrer'
              target='_blank'
            >
              <img src={Facebook} alt='Enlace a nuestro Facebook' />
            </a>
            <a href='https://www.linkedin.com' rel='noreferrer' target='_blank'>
              <img src={LinkedIn} alt='Enlace a nuestro Linkedin' />
            </a>
            <a
              href='https://www.youtube.com/channel/UCZj1h0L7x1QEY-Fx5VwS8Lg'
              rel='noreferrer'
              target='_blank'
            >
              <img src={Youtube} alt='Enlace a nuestro youtube' />
            </a>
          </div>
        </section>
        <section className='footer__signature'>
          <p>®Campus Canvas 2021. Todos los derechos reservados</p>
          <p>Dedicado a los estudiantes desde Madrid ❤️</p>
        </section>
      </div>
    </footer>
  );
}

export default Footer;
