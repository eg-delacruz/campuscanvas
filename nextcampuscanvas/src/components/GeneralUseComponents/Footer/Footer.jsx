import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

//Styles
import styles from './Footer.module.scss';

//Assets
import Logo_footer from '@assets/GeneralUse/Logos/logo_footer.svg';
import Youtube from '@assets/GeneralUse/IconsAndButtons/youtube_icon.svg';
import Facebook from '@assets/GeneralUse/IconsAndButtons/facebook_icon.svg';
import Instagram from '@assets/GeneralUse/IconsAndButtons/instagram_icon.svg';
import TikTok from '@assets/GeneralUse/IconsAndButtons/tiktok_icon.svg';

//Components
import FooterSignature from '@components/GeneralUseComponents/FooterSignature/FooterSignature';

function Footer() {
  return (
    <footer id='footer' className={styles.footer}>
      <div>
        <section className={styles.footer__navigation}>
          <div className={styles.footer__logo}>
            <figure>
              <Image src={Logo_footer} alt='Logo footer' />
            </figure>
          </div>
          <div className={styles.footer__platform}>
            <h5>Plataforma</h5>
            <ul>
              <li>
                <Link href='/'>Home</Link>
              </li>
              <li>
                <Link href='/nosotros'>Nosotros</Link>
              </li>
              <li>
                <Link href='/empresas'>Empresas</Link>
              </li>
              <li>
                <Link href='/blog'>Blog</Link>
              </li>
              <li className={styles.footer__empleos}>
                <Link href='/empleos'>Empleos</Link>
              </li>
              <li>
                <Link href='/contacto'>Contacto</Link>
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
              href='https://www.instagram.com/cc_campuscanvas/'
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
              href='https://www.tiktok.com/@campuscanvas?is_from_webapp=1&sender_device=pc'
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
          </div>
        </section>
        <FooterSignature />
      </div>
    </footer>
  );
}

export default Footer;
