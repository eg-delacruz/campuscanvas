//Assets
import banner1 from '@assets/PagesImages/Prueba/banner1.jpg';
import banner2 from '@assets/PagesImages/Prueba/banner2.jpg';
import banner3 from '@assets/PagesImages/Prueba/banner3.jpg';
import banner4 from '@assets/PagesImages/Prueba/banner4.jpg';

import brand_logo_1 from '@assets/PagesImages/Prueba/brand1.svg';
import brand_logo_2 from '@assets/PagesImages/Prueba/brand2.svg';
import brand_logo_3 from '@assets/PagesImages/Prueba/brand3.svg';
import brand_logo_4 from '@assets/PagesImages/Prueba/brand4.svg';

//CLARIFICATIONS:
// 1. brand_logo should be svg or at least a big ennough png

export const DISCOUNTS = [
  {
    discount_id: 1,
    discount_external_key: '123ABC',
    title: '5% de descuento en la tienda de Grover',
    SEO_meta_title: '5% de descuento en Grover',
    brand: {
      brand_name: 'Grover',
      brand_description:
        'Grover es una tienda especializada en artículos de bla bla bla Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    },
    category: 'beauty',
    brand_logo: brand_logo_1.src,
    banner: banner1.src,
    description:
      'Gracias al cupón de descuento para estudiantes en Grover conseguirás un 20% de descuento en tus compras, ahorra dinero en una gran gama de productos en la tienda de cosméticos Grover',
    affiliate_link: 'http://campuscanvas.net',
    discount_code: { code: 'discount_code', dynamically_generated: false },
    terms_and_conds: `<p>Set inner HTML. Allow p-tags and ul-tags only</p><ul><li>Condición 1, la cual debería tener mucho texto para que se vea bien. Pero este es un texto de ejemplo</li><li>Condición 2</li><li>Condición 1, la cual debería tener mucho texto para que se vea bien. Pero este es un texto de ejemplo</li><li>Condición 2</li><li>Condición 1, la cual debería tener mucho texto para que se vea bien. Pero este es un texto de ejemplo</li><li>Condición 2</li><li>Condición 1, la cual debería tener mucho texto para que se vea bien. Pero este es un texto de ejemplo</li><li>Condición 2</li><li>Condición 1, la cual debería tener mucho texto para que se vea bien. Pero este es un texto de ejemplo</li><li>Condición 2</li><li>Condición 1, la cual debería tener mucho texto para que se vea bien. Pero este es un texto de ejemplo</li><li>Condición 2</li></ul>`,
    creation_date: new Date(),
    valid_from: new Date(),
    valid_till: new Date(),
    type: 'discount_code',
    action_btn_phrase: '',
    likes: 0,
    dislikes: 0,
    status: 'available',
  },
  {
    discount_id: 2,
    discount_external_key: '5dw6g1',
    title: '30% de descuento en la tienda de Adidas',
    SEO_meta_title: '30% de descuento en Adidas',
    brand: {
      brand_name: 'Adidas',
      brand_description:
        'Adidas es una tienda especializada en artículos de Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    },
    category: 'travel',
    brand_logo: brand_logo_2.src,
    banner: banner2.src,
    description:
      'Gracias al cupón de descuento para estudiantes en Adidas conseguirás un 30% de descuento en su tienda deportiva.',
    affiliate_link: 'http://campuscanvas.net',
    discount_code: '',
    terms_and_conds: `<p>Set inner HTML. Allow p-tags and ul-tags only</p>`,
    creation_date: new Date(),
    valid_from: new Date(),
    valid_till: new Date(),
    type: 'affiliate_link',
    action_btn_phrase: '',
    likes: 0,
    dislikes: 0,
    status: 'available',
  },
  {
    discount_id: 3,
    discount_external_key: '8452s',
    title: '15% de descuento en la tienda de ASOS',
    SEO_meta_title: '15% descuento en ASOS',
    brand: {
      brand_name: 'ASOS',
      brand_description:
        'ASOS es una tienda especializada en artículos de Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    },
    category: 'fashion',
    brand_logo: brand_logo_3.src,
    banner: banner3.src,
    description:
      'Gracias al cupón de descuento para estudiantes en ASOS conseguirás un 15% de descuento en su tienda de ropa juvenil.',
    affiliate_link: 'http://campuscanvas.net',
    discount_code: 'discount_code',
    terms_and_conds: `<p>Set inner HTML. Allow p-tags and ul-tags only</p>`,
    creation_date: new Date(),
    valid_from: new Date(),
    valid_till: new Date(),
    type: 'discount_code',
    action_btn_phrase: 'Ir a la tienda de ASOS',
    likes: 0,
    dislikes: 0,
    status: 'available',
  },
  {
    discount_id: 4,
    discount_external_key: '8153ds',
    title: 'Rebajas del 60% + 10% descuento en Efeee',
    SEO_meta_title: 'Rebajas del 60% + 10% descuento en Efeee',
    brand: {
      brand_name: 'Efeee',
      brand_description:
        'Efeee es una tienda especializada en artículos de Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    },
    category: 'eat&drink',
    brand_logo: brand_logo_4.src,
    banner: banner4.src,
    description:
      'Gracias al cupón de descuento para estudiantes en Efeee conseguirás un 15% de descuento en su tienda de ropa juvenil.',
    affiliate_link: 'http://youtube.com',
    discount_code: '',
    terms_and_conds: `<p>Set inner HTML. Allow p-tags and ul-tags only</p>`,
    creation_date: new Date(),
    valid_from: new Date(),
    valid_till: new Date(),
    type: 'affiliate_link',
    action_btn_phrase: 'Ir al sitio web de Efeee',
    likes: 0,
    dislikes: 0,
    status: 'available',
  },
];
