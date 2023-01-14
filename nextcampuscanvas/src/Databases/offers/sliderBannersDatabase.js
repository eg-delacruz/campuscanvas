//assets
import banner1 from '@assets/GeneralUse/UsedInComponents/HomeSlider/banner1.jpeg';
import banner2 from '@assets/GeneralUse/UsedInComponents/HomeSlider/banner2.jpeg';
import banner3 from '@assets/GeneralUse/UsedInComponents/HomeSlider/banner3.jpg';
import banner4 from '@assets/GeneralUse/UsedInComponents/HomeSlider/banner4.jpg';

import banner1_small from '@assets/GeneralUse/UsedInComponents/HomeSlider/banner1_small.jpg';
import banner2_small from '@assets/GeneralUse/UsedInComponents/HomeSlider/banner2_small.jpg';
import banner3_small from '@assets/GeneralUse/UsedInComponents/HomeSlider/banner3_small.jpg';
import banner4_small from '@assets/GeneralUse/UsedInComponents/HomeSlider/banner4_small.jpg';

//Max 8 banners
export const SLIDER_BANNERS = [
  {
    offer_id: 1,
    offer_brand: 'Grover',
    slider_banner_big_screen: banner1.src,
    slider_banner_small_screen: banner1_small.src,
  },
  {
    offer_id: 2,
    offer_brand: 'Adidas',
    slider_banner_big_screen: banner2.src,
    slider_banner_small_screen: banner2_small.src,
  },
  {
    offer_id: 3,
    offer_brand: 'ASOS',
    slider_banner_big_screen: banner3.src,
    slider_banner_small_screen: banner3_small.src,
  },
  {
    offer_id: 4,
    offer_brand: 'Apple',
    slider_banner_big_screen: banner4.src,
    slider_banner_small_screen: banner4_small.src,
  },
];
