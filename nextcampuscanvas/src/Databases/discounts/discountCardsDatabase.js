//Assets
import banner1 from '@assets/PagesImages/Prueba/banner1.jpg';
import banner2 from '@assets/PagesImages/Prueba/banner2.jpg';
import banner3 from '@assets/PagesImages/Prueba/banner3.jpg';
import banner4 from '@assets/PagesImages/Prueba/banner4.jpg';

import brand_logo_1 from '@assets/PagesImages/Prueba/brand1.svg';
import brand_logo_2 from '@assets/PagesImages/Prueba/brand2.svg';
import brand_logo_3 from '@assets/PagesImages/Prueba/brand3.svg';
import brand_logo_4 from '@assets/PagesImages/Prueba/brand4.svg';

export const DISCOUNT_CARDS = [
  {
    //The generated one by Mongo DB
    discount_id: 1,
    //Not longer than 40 characters. Has to include Brand Name for better SEO
    title: '5% de descuento en Grover',
    brand_logo: brand_logo_1.src,
    banner: banner1.src,
    //travel | fashion | beauty | eat & drink | entertainment | technology | others
    category: 'beauty',
    brand_name: 'Grover',
    location: {
      country: 'Spain',
      state: ['Madrid'],
    },
    click_count: 1,
    // suggested | new | most_sold | home_featured |
    display_as: '',
    exclusiv_tag: false,
  },
  {
    discount_id: 2,
    title: '30% descuento en tiendas físicas Adidas',
    brand_name: 'Adidas',
    brand_logo: brand_logo_2.src,
    banner: banner2.src,
    category: 'travel',
    location: {
      country: 'Spain',
      state: ['Madrid'],
    },
    click_count: 1,
    display_as: '',
    exclusiv_tag: false,
  },
  {
    discount_id: 3,
    title: '15% descuento en ASOS',
    brand_name: 'ASOS',
    brand_logo: brand_logo_3.src,
    banner: banner3.src,
    category: 'fashion',
    location: {
      country: 'Spain',
      state: ['Madrid'],
    },
    click_count: 1,
    display_as: '',
    exclusiv_tag: false,
  },
  {
    discount_id: 4,
    title: 'Rebajas del 60% + 10% descuento en Efeee',
    brand_name: 'Efeee',
    brand_logo: brand_logo_4.src,
    banner: banner4.src,
    category: 'eat&drink',
    location: {
      country: 'Spain',
      state: ['Madrid'],
    },
    click_count: 1,
    display_as: '',
    exclusiv_tag: false,
  },
];
