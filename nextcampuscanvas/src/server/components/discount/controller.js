import {
  s3Uploadv3_brand_logos,
  s3Uploadv3_discount_banners,
  s3Uploadv3_big_home_slider_images,
  s3Uploadv3_small_home_slider_images,
  s3Deletev3_discount_banners,
  s3Deletev3_big_home_slider_images,
  s3Deletev3_small_home_slider_images,
  s3Deletev3_brand_logos,
} from '@server/services/AWS3/s3Service';

//Stores
import brandInfo_Store from '@server/components/discount/brand_info/store';
import discountInfo_Store from '@server/components/discount/discount_info/store';
import homeSliderBanner_Store from '@server/components/discount/home_slider_banner/store';
import Card_Store from '@server/components/discount/card/store';

//Service functions
import { shuffleArray } from '@server/services/shuffleArray';

const createNewBrand = async ({
  brand_name,
  brand_logo,
  sponsors_box,
  brand_description,
  created_by,
}) => {
  if (!brand_name || !brand_logo || !brand_description || !created_by) {
    console.log(
      '[discount controller error] Información insuficiente para crear marca'
    );
    throw new Error('Información insuficiente para crear marca');
  }

  try {
    //Check if brand name already exists in DB
    const brand_name_exists = await brandInfo_Store.brandAlreadyExists(
      brand_name
    );
    if (brand_name_exists) {
      console.log(
        '[discount controller error] Esta marca ya ha sido creada, utiliza otro nombre'
      );
      throw new Error('Esta marca ya ha sido creada, utiliza otro nombre');
    }

    //Uploading logo to AWS3
    const uploaded_logo_url = await s3Uploadv3_brand_logos(brand_logo);

    const brand = {
      brand_name,
      brand_logo: {
        name: uploaded_logo_url[0].name,
        URL: uploaded_logo_url[0].URL,
      },
      sponsors_box,
      brand_description,
      created_by,
      updated_by: created_by,
      created_at: new Date(),
      updated_at: new Date(),
    };

    //Saving brand in DB
    await brandInfo_Store.add(brand);
  } catch (error) {
    console.log('[discount controller error]' + error.message);
    throw new Error(error.message);
  }
};

const getBrands = async () => {
  try {
    const brands = await brandInfo_Store.getBrands();
    return brands;
  } catch (error) {
    console.log('[discount controller error]' + error.message);
    throw new Error(error.message);
  }
};

const createNewDiscount = async (discountInfo, files, created_by) => {
  const {
    title,
    description,
    brand,
    category,
    type,
    discount_code,
    discount_external_key,
    affiliate_link,
    action_btn_phrase,
    available_for,
    valid_from,
    expiration_date,
    show_in_home_slider,
    card_title,
    card_tag,
    display_card_in_section,
    terms_and_conds,
    show_first_in_category,
  } = discountInfo;

  if (
    !title ||
    !description ||
    !brand ||
    !category ||
    !type ||
    !valid_from ||
    !card_title ||
    !available_for ||
    files.banner.length === 0
  ) {
    console.log(
      '[discount controller error] Información insuficiente para crear descuento'
    );
    throw new Error('Información insuficiente para crear descuento');
  }

  //Transforming boolean strings to pure boolean
  const SHOW_IN_HOME_SLIDER = show_in_home_slider === 'true';

  //Transforming dates to Date objects
  const VALID_FROM_DATE = new Date(valid_from);

  const EXPIRATION_DATE =
    expiration_date === 'null' ? null : new Date(expiration_date);

  try {
    let routesToUpdateSSG = [];
    //Store banner in AWS
    const uploaded_banner_url = await s3Uploadv3_discount_banners(files.banner);

    //Get brand info to re-use its data
    const brand_info = await brandInfo_Store.getById(brand);

    //Create discount
    const discount = {
      discount_external_key,
      title,
      SEO_meta_title: card_title,
      brand,
      category,
      banner: {
        name: uploaded_banner_url[0].name,
        URL: uploaded_banner_url[0].URL,
      },
      description,
      affiliate_link,
      discount_code: {
        code: discount_code,
      },
      type,
      action_btn_phrase,
      //Available for doesn't affect the card, so only modify it here
      available_for,
      likes: 0,
      dislikes: 0,
      //Modify status here and in Card if needed
      status: 'available',
      terms_and_conds,
      createdAt: new Date(),
      valid_from: VALID_FROM_DATE,
      expiration_date: EXPIRATION_DATE,
      created_by,
      modified_last_time_by: created_by,
      updated_at: new Date(),
    };

    const CREATED_DISCOUNT = await discountInfo_Store.add(discount);

    //Updating SSG routes
    if (CREATED_DISCOUNT.status === 'available') {
      //Updating all discounts route (since all available discounts allways appear here)
      routesToUpdateSSG.push('/descuentos/todos');

      //Updating discount route
      //In case /student/descuentos is also SSG, uptade that route here as well
      routesToUpdateSSG.push(`/descuentos/${CREATED_DISCOUNT._id.toString()}`);

      //Updating category route
      switch (CREATED_DISCOUNT.category) {
        case 'travel':
          routesToUpdateSSG.push('/descuentos/viajar');
          break;
        case 'fashion':
          routesToUpdateSSG.push('/descuentos/moda');
          break;
        case 'beauty':
          routesToUpdateSSG.push('/descuentos/belleza');
          break;
        case 'eatordrink':
          routesToUpdateSSG.push('/descuentos/alimentacion');
          break;
        case 'entertainment':
          routesToUpdateSSG.push('/descuentos/entretenimiento');
          break;
        case 'technology':
          routesToUpdateSSG.push('/descuentos/tecnologia');
          break;
        case 'others':
          routesToUpdateSSG.push('/descuentos/otros');
          break;
        default:
          break;
      }
    }

    //Store home slider banners in AWS (if applies)
    if (SHOW_IN_HOME_SLIDER) {
      const uploaded_images_urls = await Promise.allSettled([
        s3Uploadv3_big_home_slider_images(files.big_home_slider_image),
        s3Uploadv3_small_home_slider_images(files.small_home_slider_image),
      ]);

      const big_slider_img = uploaded_images_urls[0];
      const small_slider_img = uploaded_images_urls[1];

      if (
        big_slider_img.status === 'rejected' ||
        small_slider_img.status === 'rejected'
      ) {
        console.log(
          '[discount controller error] Error al subir imágenes de home slider a AWS'
        );
        throw new Error('Error al subir imágenes de home slider');
      }

      const HOME_BANNER_AFF_LINK =
        available_for === 'publico' && type === 'affiliate_link_only'
          ? affiliate_link
          : '';

      const slide = {
        discount_id: CREATED_DISCOUNT._id.toString(),
        slider_banner_big_screen: {
          name: big_slider_img.value[0].name,
          URL: big_slider_img.value[0].URL,
        },
        slider_banner_small_screen: {
          name: small_slider_img.value[0].name,
          URL: small_slider_img.value[0].URL,
        },
        available_for,
        affiliate_link: HOME_BANNER_AFF_LINK,
        type,
        created_at: new Date(),
        created_by,
      };

      //Create home slider banner document in Mongo DB
      await homeSliderBanner_Store.add(slide);

      //Adding home route
      routesToUpdateSSG.push('/');
    }

    //Create card
    const card = {
      discount_id: CREATED_DISCOUNT._id.toString(),
      title: card_title,
      brand_logo: brand,
      banner: {
        name: uploaded_banner_url[0].name,
        URL: uploaded_banner_url[0].URL,
      },
      category,
      brand_name: brand_info.brand_name,
      click_count: 0,
      display_in_section: display_card_in_section,
      card_tag,
      status: 'available',
      valid_from: VALID_FROM_DATE,
      expiration_date: EXPIRATION_DATE,
      createdAt: new Date(),
      show_first_in_category,
      updated_at: new Date(),
      created_by,
      modified_last_time_by: created_by,
    };

    const CREATED_CARD = await Card_Store.add(card);

    //Revalidating home if needed
    //TODO: evaluate this and also if status is available to revalidate home or not
    if (CREATED_CARD.display_in_section) {
      if (!routesToUpdateSSG.includes('/')) {
        routesToUpdateSSG.push('/');
      }
    }

    return routesToUpdateSSG;
  } catch (error) {
    console.log('[discount controller error]' + error.message);
    throw new Error(error.message);
  }
};

const getDiscounts = async () => {
  try {
    const discounts = await discountInfo_Store.getDiscounts();
    return discounts;
  } catch (error) {
    console.log('[discount controller error]' + error.message);
    throw new Error(error.message);
  }
};

const getAllAvailableDiscountCards = async () => {
  try {
    const cards = await Card_Store.getAllAvailableCards();
    return cards;
  } catch (error) {
    console.log('[discount controller error]' + error.message);
    throw new Error(error.message);
  }
};

const getAvailableDiscountCardsByCategory = async (category) => {
  try {
    const cards = await Card_Store.getByCategory(category);
    return cards;
  } catch (error) {
    console.log('[discount controller error]' + error.message);
    throw new Error(error.message);
  }
};

async function getHomeSliderBanners() {
  try {
    const banners = await homeSliderBanner_Store.getBanners();
    return banners;
  } catch (error) {
    console.log('[discount controller error]' + error.message);
    throw new Error(error.message);
  }
}

const getHomeSectionsCards = async () => {
  try {
    const cards = await Promise.allSettled([
      Card_Store.getBySection('sugeridos'),
      Card_Store.getBySection('nuevos'),
      Card_Store.getBySection('descubre_ofertas'),
      Card_Store.getBySection('mas_descuentos_estudiantes'),
    ]);
    const [SUGGESTED, NEW, DESCUBRE_OFERTAS, MAS_DESCUENTOS_ESTUDIANTES] =
      cards;

    const SECTION_CARDS = {
      sugeridos: SUGGESTED.value,
      nuevos: NEW.value,
      descubre_ofertas: DESCUBRE_OFERTAS.value,
      mas_descuentos_estudiantes: MAS_DESCUENTOS_ESTUDIANTES.value,
    };
    return SECTION_CARDS;
  } catch (error) {
    console.log('[discount controller error]' + error.message);
    throw new Error(error.message);
  }
};

async function getDiscountById(id) {
  try {
    const discount = await discountInfo_Store.getDiscountById(id);
    return discount;
  } catch (error) {
    console.log('[discount controller error]' + error.message);
    throw new Error(error.message);
  }
}

const eliminateDiscountData = async (id, bannerName) => {
  try {
    let routesToUpdateSSG = [];
    const responses = await Promise.allSettled([
      //Delete discount
      discountInfo_Store.deleteById(id),

      //Delete card
      Card_Store.deleteByDiscountId(id),

      //Delete home slider banner
      homeSliderBanner_Store.deleteByDiscountId(id),

      //AWS Data
      s3Deletev3_discount_banners([bannerName]),
    ]);

    const [
      deleted_discount,
      deleted_card,
      deleted_home_slider_banner,
      deleted_banner,
    ] = responses;

    if (deleted_discount.value?.status === 'available') {
      //Updating all discounts route (since all available discounts allways appear here)
      routesToUpdateSSG.push('/descuentos/todos');

      //Updating discount route
      //In case /student/descuentos is also SSG, uptade that route here as well
      routesToUpdateSSG.push(`/descuentos/${id}`);

      //Upadting home if needed
      if (deleted_card.value.display_in_section) {
        routesToUpdateSSG.push(`/`);
      }

      //Updating category route
      switch (deleted_card.value.category) {
        case 'travel':
          routesToUpdateSSG.push('/descuentos/viajar');
          break;
        case 'fashion':
          routesToUpdateSSG.push('/descuentos/moda');
          break;
        case 'beauty':
          routesToUpdateSSG.push('/descuentos/belleza');
          break;
        case 'eatordrink':
          routesToUpdateSSG.push('/descuentos/alimentacion');
          break;
        case 'entertainment':
          routesToUpdateSSG.push('/descuentos/entretenimiento');
          break;
        case 'technology':
          routesToUpdateSSG.push('/descuentos/tecnologia');
          break;
        case 'others':
          routesToUpdateSSG.push('/descuentos/otros');
          break;
        default:
          break;
      }
    }

    if (deleted_home_slider_banner.value) {
      const responses = await Promise.allSettled([
        s3Deletev3_big_home_slider_images([
          deleted_home_slider_banner.value.slider_banner_big_screen.name,
        ]),
        s3Deletev3_small_home_slider_images([
          deleted_home_slider_banner.value.slider_banner_small_screen.name,
        ]),
      ]);

      //Adding home route if not already added
      if (!routesToUpdateSSG.includes('/')) {
        routesToUpdateSSG.push('/');
      }
    }
    return routesToUpdateSSG;
  } catch (error) {
    console.log('[discount controller error]' + error.message);
    throw new Error(error.message);
  }
};

const getHomeData = async () => {
  try {
    //get home banners
    const banners = await getHomeSliderBanners();
    //Shuffle home banners
    const home_banners = shuffleArray(banners);

    //get home sections cards
    const home_sections_cards = await getHomeSectionsCards();

    return { home_banners, home_sections_cards };
  } catch (error) {
    console.log('[discount controller error]' + error.message);
    throw new Error(error.message);
  }
};

const getBrandById = async (id) => {
  try {
    const brand = await brandInfo_Store.getById(id);
    return brand;
  } catch (error) {
    console.log('[discount controller error]' + error.message);
    throw new Error(error.message);
  }
};

const getDiscountsByBrand = async (brandID) => {
  try {
    const discounts = await discountInfo_Store.getByBrand(brandID);
    return discounts;
  } catch (error) {
    console.log('[discount controller error]' + error.message);
    throw new Error(error.message);
  }
};

const updateBrand = async ({
  id,
  brand_logo,
  sponsors_box,
  brand_description,
  updated_by,
}) => {
  try {
    //Check if data is valid
    if (!id || !updated_by) {
      console.error(
        '[discount controller error] Información insuficiente para crear marca'
      );
      throw new Error('Información insuficiente para crear marca');
    }

    //Get brand from DB to be modifyed
    const brand = await brandInfo_Store.getById(id);

    let routesToUpdateSSG = [];
    let updated_Brand;

    if (brand) {
      //Get all available cards to revalidate affected routes
      const all_available_discount_cards = await getAllAvailableDiscountCards();

      //Get all cards linked to this brand
      const available_cards_linked_to_brand =
        all_available_discount_cards.filter((card) => {
          return card.brand_name === brand.brand_name;
        });

      //Update and revalidate only if there is a new logo
      if (brand_logo.length > 0) {
        const responses = await Promise.allSettled([
          //Upload new logo to AWS
          s3Uploadv3_brand_logos(brand_logo),

          //Erase old logo from AWS
          s3Deletev3_brand_logos([brand.brand_logo.name]),
        ]);

        const [uploaded_logo, deleted_logo] = responses;

        //Update logo in DB
        brand.brand_logo = {
          name: uploaded_logo.value[0].name,
          URL: uploaded_logo.value[0].URL,
        };

        //Revalidate all discounts route
        routesToUpdateSSG.push('/descuentos/todos');

        //Check if any card currently appears in home section and revalidate home if true
        const revalidate_home = available_cards_linked_to_brand.some(
          (card) => card.display_in_section
        );
        if (revalidate_home) {
          routesToUpdateSSG.push('/');
        }

        //Revalidate category routes of all discounts affected by the change
        available_cards_linked_to_brand.forEach((card) => {
          switch (card.category) {
            case 'travel':
              if (!routesToUpdateSSG.includes('/descuentos/viajes')) {
                routesToUpdateSSG.push('/descuentos/viajar');
              }
              break;
            case 'fashion':
              if (!routesToUpdateSSG.includes('/descuentos/moda')) {
                routesToUpdateSSG.push('/descuentos/moda');
              }
              break;
            case 'beauty':
              if (!routesToUpdateSSG.includes('/descuentos/belleza')) {
                routesToUpdateSSG.push('/descuentos/belleza');
              }
              break;
            case 'eatordrink':
              if (!routesToUpdateSSG.includes('/descuentos/alimentacion')) {
                routesToUpdateSSG.push('/descuentos/alimentacion');
              }
              break;
            case 'entertainment':
              if (!routesToUpdateSSG.includes('/descuentos/entretenimiento')) {
                routesToUpdateSSG.push('/descuentos/entretenimiento');
              }
              break;
            case 'technology':
              if (!routesToUpdateSSG.includes('/descuentos/tecnologia')) {
                routesToUpdateSSG.push('/descuentos/tecnologia');
              }
              break;
            case 'others':
              if (!routesToUpdateSSG.includes('/descuentos/otros')) {
                routesToUpdateSSG.push('/descuentos/otros');
              }
              break;
            default:
              break;
          }
        });

        //Revalidate affected discount routes
        //In case /student/descuentos is also SSG, uptade that route here as well
        available_cards_linked_to_brand.forEach((card) => {
          routesToUpdateSSG.push(`/descuentos/${card.discount_id}`);
        });
      }

      //Update and revalidate if there is a new description
      if (brand_description) {
        brand.brand_description = brand_description;

        //Revalidate affected discount routes
        //In case /student/descuentos is also SSG, uptade that route here as well
        available_cards_linked_to_brand.forEach((card) => {
          if (!routesToUpdateSSG.includes(`/descuentos/${card.discount_id}`)) {
            routesToUpdateSSG.push(`/descuentos/${card.discount_id}`);
          }
        });
      }

      brand.sponsors_box = sponsors_box;
      brand.updated_by = updated_by;
      brand.updated_at = new Date();

      updated_Brand = await brandInfo_Store.update(brand);
    }

    return { updated_Brand, routesToUpdateSSG };
  } catch (error) {
    console.log('[discount controller error]' + error.message);
    throw new Error(error.message);
  }
};

const deleteBrand = async (id, brandLogoFileName) => {
  try {
    //Check if required info has been received
    if (!id || !brandLogoFileName) {
      console.error(
        '[discount controller | deleteBrand function error] Información insuficiente para eliminar marca'
      );
      throw new Error('Información insuficiente para eliminar marca');
    }

    //Get associated discounts count of brand and not allow to erase if there are any
    const discountsCount = await discountInfo_Store.getDiscountsCountByBrandId(
      id
    );

    if (discountsCount > 0) {
      console.error(
        '[discount controller | deleteBrand function error] No se puede eliminar marca porque tiene descuentos asociados'
      );
      throw new Error(
        'No se puede eliminar marca porque tiene descuentos asociados'
      );
    }

    const responses = await Promise.allSettled([
      //Delete brand logo from aws
      s3Deletev3_brand_logos([brandLogoFileName]),

      //Delete brand info from DB
      brandInfo_Store.delete(id),
    ]);

    const [deleted_logo, deleted_brand] = responses;

    if (
      deleted_logo.status === 'rejected' ||
      deleted_brand.status === 'rejected'
    ) {
      console.error(
        '[discount controller | deleteBrand function error] Error al eliminar logo de AWS o al eliminar marca de la DB' +
          deleted_logo.reason +
          deleted_brand.reason
      );
      throw new Error('Error al eliminar marca');
    }
  } catch (error) {
    console.error(
      '[discount controller | deleteBrand function error]' + error.message
    );
    throw new Error(error.message);
  }
};

async function getDiscountsCountByBrandId(brandID) {
  try {
    //Check if required info has been received
    if (!brandID) {
      console.error(
        '[discount controller | getDiscountsCountByBrandId function error] Información insuficiente para obtener datos'
      );
      throw new Error('Información insuficiente para obtener datos');
    }

    const discountCount = await discountInfo_Store.getDiscountsCountByBrandId(
      brandID
    );

    return discountCount;
  } catch (error) {
    console.error(
      '[discount controller | getDiscountsCountByBrandId function error]' +
        error.message
    );
    throw new Error(error.message);
  }
}

async function getHomeSliderBannersInfoForAdmin() {
  try {
    const banners = await getHomeSliderBanners();

    const bannersInfo = await Promise.all(
      banners.map(async (banner) => {
        const discount = await discountInfo_Store.getDiscountById(
          banner.discount_id
        );

        return {
          id: banner._id,
          discount_id: banner.discount_id,
          slider_banner_big_screen: banner.slider_banner_big_screen,
          slider_banner_small_screen: banner.slider_banner_small_screen,
          created_by: banner.created_by,
          created_at: banner.created_at,
          brand_logo: discount.brand.brand_logo,
          brand_name: discount.brand.brand_name,
          discount_title: discount.title,
          discount_category: discount.category,
          discount_status: discount.status,
        };
      })
    );

    return bannersInfo;
  } catch (error) {
    console.error(
      '[discount controller | getHomeSliderBannersInfoForAdmin function error]' +
        error.message
    );
    throw new Error(error.message);
  }
}

async function deleteHomeSliderBanner(
  banner_id,
  slider_banner_big_screen_name,
  slider_banner_small_screen_name
) {
  try {
    //Check if required info has been received
    if (
      !banner_id ||
      !slider_banner_big_screen_name ||
      !slider_banner_small_screen_name
    ) {
      console.error(
        '[discount controller | deleteHomeSliderBanner function error] Información insuficiente para eliminar banner'
      );
      throw new Error('Información insuficiente para eliminar banner');
    }

    let routesToUpdateSSG = [];

    const responses = await Promise.allSettled([
      //Delete banner images from aws
      s3Deletev3_big_home_slider_images([slider_banner_big_screen_name]),

      s3Deletev3_small_home_slider_images([slider_banner_small_screen_name]),

      //Delete banner info from DB
      homeSliderBanner_Store.deleteById(banner_id),
    ]);

    const [deleted_big_image, deleted_small_image, deleted_banner] = responses;

    //Checking for errors
    if (
      deleted_big_image.status === 'rejected' ||
      deleted_small_image.status === 'rejected' ||
      deleted_banner.status === 'rejected'
    ) {
      console.error(
        '[discount controller | deleteHomeSliderBanner function error] Error al eliminar imágenes de AWS o al eliminar banner de la DB' +
          deleted_big_image.reason +
          deleted_small_image.reason +
          deleted_banner.reason
      );
      throw new Error('Error al eliminar banner');
    }

    //If banner was deleted successfully, update SSG
    routesToUpdateSSG.push('/');

    return routesToUpdateSSG;
  } catch (error) {
    console.error(
      '[discount controller | deleteHomeSliderBanner function error]' +
        error.message
    );
    throw new Error(error.message);
  }
}

async function getHomeSliderBannerByDiscountId(discount_id) {
  try {
    //Check if required info has been received
    if (!discount_id) {
      console.error(
        '[discount controller | getHomeSliderBannerByDiscountId function error] Información insuficiente para obtener datos'
      );
      throw new Error('Información insuficiente para obtener datos');
    }

    let object_banner = {};
    const banner = await homeSliderBanner_Store.getByDiscountId(discount_id);
    if (banner) {
      object_banner = banner;
    }
    return object_banner;
  } catch (error) {
    console.error(
      '[discount controller | getHomeSliderBannerByDiscountId function error]' +
        error.message
    );
    throw new Error(error.message);
  }
}

async function getCardByDiscountId(discount_id) {
  try {
    if (!discount_id) {
      console.error(
        '[discount controller | getCardByDiscountId function error] Información insuficiente para obtener datos'
      );
      throw new Error('Información insuficiente para obtener datos');
    }

    const card = await Card_Store.getByDiscountId(discount_id);

    return card;
  } catch (error) {
    console.error(
      '[discount controller | getCardByDiscountId function error]' +
        error.message
    );
    throw new Error(error.message);
  }
}

const getHomeSectionsCardsCount = async () => {
  try {
    //If new sections are created, update this array as well
    const SECTIONS = [
      'sugeridos',
      'nuevos',
      'descubre_ofertas',
      'mas_descuentos_estudiantes',
    ];
    const count = await Promise.all(
      SECTIONS.map(async (section) => {
        const sectionCount = await Card_Store.getHomeSectionsCardsCount(
          section
        );
        return {
          section: section,
          count: sectionCount,
        };
      })
    );

    return count;
  } catch (error) {
    console.error(
      '[discount controller | getHomeSectionsCardsCount function error]' +
        error.message
    );
    throw new Error(error.message);
  }
};

async function getShowFirstInCategoryCount() {
  try {
    //If new categories added, also add them in this array
    const CATEGORIES = [
      'travel',
      'fashion',
      'beauty',
      'eatordrink',
      'entertainment',
      'technology',
      'others',
    ];

    const count = await Promise.all(
      CATEGORIES.map(async (category) => {
        const categoryCount = await Card_Store.getShowFirstInCategoryCount(
          category
        );
        return {
          category: category,
          count: categoryCount,
        };
      })
    );

    return count;
  } catch (error) {
    console.error(
      '[discount controller | getShowFirstInCategoryCount function error]' +
        error.message
    );
    throw new Error(error.message);
  }
}

async function createHomeSliderBanner(
  discount_id,
  big_home_slider_image,
  small_home_slider_image,
  available_for,
  affiliate_link,
  type,
  created_by
) {
  try {
    let routesToUpdateSSG = [];

    //Check if required info has been received
    if (!discount_id || !big_home_slider_image || !small_home_slider_image) {
      console.error(
        '[discount controller | createHomeSliderBanner function error] Información insuficiente para crear banner'
      );
      throw new Error('Información insuficiente para crear banner');
    }

    const uploaded_images_urls = await Promise.allSettled([
      s3Uploadv3_big_home_slider_images(big_home_slider_image),
      s3Uploadv3_small_home_slider_images(small_home_slider_image),
    ]);

    const big_slider_img = uploaded_images_urls[0];
    const small_slider_img = uploaded_images_urls[1];

    if (
      big_slider_img.status === 'rejected' ||
      small_slider_img.status === 'rejected'
    ) {
      console.log(
        '[discount controller | createHomeSliderBanner function error] Error al subir imágenes de home slider a AWS'
      );
      throw new Error('Error al subir imágenes de home slider');
    }

    const HOME_BANNER_AFF_LINK =
      available_for === 'publico' && type === 'affiliate_link_only'
        ? affiliate_link
        : '';

    const slide = {
      discount_id,
      slider_banner_big_screen: {
        name: big_slider_img.value[0].name,
        URL: big_slider_img.value[0].URL,
      },
      slider_banner_small_screen: {
        name: small_slider_img.value[0].name,
        URL: small_slider_img.value[0].URL,
      },
      available_for,
      type,
      affiliate_link: HOME_BANNER_AFF_LINK,
      created_at: new Date(),
      created_by,
    };

    //Create home slider banner document in Mongo DB
    await homeSliderBanner_Store.add(slide);

    routesToUpdateSSG.push('/');

    return routesToUpdateSSG;
  } catch (error) {
    console.error(
      '[discount controller | createHomeSliderBanner function error]' +
        error.message
    );
    throw new Error(error.message);
  }
}

async function updateDiscount(data, new_banner, updated_by) {
  try {
    const {
      //Discount id
      discount_id,

      //Vars to know what to update and revalidate
      EXCLUSIVE_DISCOUNT_INFORMATION_WAS_MODIFIED,
      EXCLUSIVE_CARD_INFORMATION_WAS_MODIFIED,
      SHARED_CARD_DISCOUNT_INFORMATION_WAS_MODIFIED,
      HAS_HOME_BANNER_ATTACHED,

      //Discount information
      title,
      description,
      affiliate_link,
      discount_code,
      discount_external_key,
      available_for,
      terms_and_conds,

      //Card information
      card_title,
      card_tag,
      display_in_section,
      show_first_in_category,

      //Shared information
      expiration_date,
      status,
    } = data;

    if (!updated_by || !discount_id) {
      console.error(
        '[discount controller | updateDiscount function error] Información insuficiente para actualizar descuento'
      );
      throw new Error('Información insuficiente para actualizar descuento');
    }

    //Transforming boolean strings to pure boolean
    const exclusive_discount_information_was_modified =
      EXCLUSIVE_DISCOUNT_INFORMATION_WAS_MODIFIED === 'true';
    const exclusive_card_information_was_modified =
      EXCLUSIVE_CARD_INFORMATION_WAS_MODIFIED === 'true';
    const shared_card_discount_information_was_modified =
      SHARED_CARD_DISCOUNT_INFORMATION_WAS_MODIFIED === 'true';
    const has_home_banner_attached = HAS_HOME_BANNER_ATTACHED === 'true';

    let routesToUpdateSSG = [];

    if (exclusive_discount_information_was_modified) {
      //Get discount to be updated
      const discount =
        await discountInfo_Store.getDiscountByIdWithoutPopulation(discount_id);

      const PREVIOUS_DISCOUNT = {
        ...discount.toObject(),
      };
      if (discount) {
        //Update discount
        discount.title = title;
        discount.description = description;
        discount.affiliate_link = affiliate_link;
        discount.discount_code.code = discount_code;
        discount.discount_external_key = discount_external_key;
        discount.available_for = available_for;
        discount.terms_and_conds = terms_and_conds;
        discount.updated_at = new Date();
        discount.modified_last_time_by = updated_by;

        const updated_discount = await discountInfo_Store.update(discount);

        //Revalidate home if discount has a home slider banner and the available_for changed
        if (
          has_home_banner_attached &&
          updated_discount.available_for !== PREVIOUS_DISCOUNT.available_for
        ) {
          routesToUpdateSSG.push('/');
        }

        //Revalidating discount route
        //In case /student/descuentos is also SSG, uptade that route here as well
        routesToUpdateSSG.push(`/descuentos/${discount_id}`);
      }
    }

    if (exclusive_card_information_was_modified) {
      const card = await Card_Store.getByDiscountIdWithoutPopulation(
        discount_id
      );

      if (card) {
        const original_card = {
          ...card.toObject(),
        };

        //Update card
        card.title = card_title;
        card.card_tag = card_tag;
        card.display_in_section = display_in_section;
        card.show_first_in_category = show_first_in_category;
        card.updated_at = new Date();
        card.modified_last_time_by = updated_by;

        const updated_card = await Card_Store.update(card);

        //Revalidate affected routes (only evaluate available discounts, since the rest are not shown in the frontend, and if the status is modified in the same request, it will be handled in the next if statement)
        if (updated_card.status === 'available') {
          if (
            original_card.title !== updated_card.title ||
            original_card.card_tag !== updated_card.card_tag
          ) {
            routesToUpdateSSG.push('/descuentos/todos');

            if (updated_card.display_in_section) {
              if (!routesToUpdateSSG.includes('/')) {
                routesToUpdateSSG.push('/');
              }
            }

            //Revalidating category route
            switch (updated_card.category) {
              case 'travel':
                routesToUpdateSSG.push('/descuentos/viajar');
                break;
              case 'fashion':
                routesToUpdateSSG.push('/descuentos/moda');
                break;
              case 'beauty':
                routesToUpdateSSG.push('/descuentos/belleza');
                break;
              case 'eatordrink':
                routesToUpdateSSG.push('/descuentos/alimentacion');
                break;
              case 'entertainment':
                routesToUpdateSSG.push('/descuentos/entretenimiento');
                break;
              case 'technology':
                routesToUpdateSSG.push('/descuentos/tecnologia');
                break;
              case 'others':
                routesToUpdateSSG.push('/descuentos/otros');
                break;
              default:
                break;
            }
          }

          //Revalidate category route if the show first in category value changes
          if (
            updated_card.show_first_in_category !==
            original_card.show_first_in_category
          ) {
            switch (updated_card.category) {
              case 'travel':
                if (!routesToUpdateSSG.includes('/descuentos/viajes')) {
                  routesToUpdateSSG.push('/descuentos/viajar');
                }
                break;
              case 'fashion':
                if (!routesToUpdateSSG.includes('/descuentos/moda')) {
                  routesToUpdateSSG.push('/descuentos/moda');
                }
                break;
              case 'beauty':
                if (!routesToUpdateSSG.includes('/descuentos/belleza')) {
                  routesToUpdateSSG.push('/descuentos/belleza');
                }
                break;
              case 'eatordrink':
                if (!routesToUpdateSSG.includes('/descuentos/alimentacion')) {
                  routesToUpdateSSG.push('/descuentos/alimentacion');
                }
                break;
              case 'entertainment':
                if (
                  !routesToUpdateSSG.includes('/descuentos/entretenimiento')
                ) {
                  routesToUpdateSSG.push('/descuentos/entretenimiento');
                }
                break;
              case 'technology':
                if (!routesToUpdateSSG.includes('/descuentos/tecnologia')) {
                  routesToUpdateSSG.push('/descuentos/tecnologia');
                }
                break;
              case 'others':
                if (!routesToUpdateSSG.includes('/descuentos/otros')) {
                  routesToUpdateSSG.push('/descuentos/otros');
                }
                break;
              default:
                break;
            }
          }

          //Revalidate home route if the display in section value changes
          if (
            updated_card.display_in_section !==
              original_card.display_in_section ||
            (original_card.card_tag !== updated_card.card_tag &&
              updated_card.display_in_section)
          ) {
            if (!routesToUpdateSSG.includes('/')) {
              routesToUpdateSSG.push('/');
            }
          }
        }
      }
    }

    if (shared_card_discount_information_was_modified) {
      //Transforming dates to Date objects
      const FORMATED_EXP_DATE =
        expiration_date === 'null' ? null : new Date(expiration_date);
      const responses = await Promise.allSettled([
        //Get the discount to be updated
        discountInfo_Store.getDiscountByIdWithoutPopulation(discount_id),

        //Get the card to be updated
        Card_Store.getByDiscountIdWithoutPopulation(discount_id),
      ]);

      const [discount, card] = responses;

      if (discount.status === 'fulfilled' && card.status === 'fulfilled') {
        const DISCOUNT = discount.value;
        const CARD = card.value;
        const ORIGINAL_CARD = {
          ...CARD.toObject(),
        };

        //Update banner
        if (new_banner) {
          const responses = await Promise.allSettled([
            //Upload new banner to AWS
            s3Uploadv3_discount_banners(new_banner),

            //Delete old banner from AWS
            s3Deletev3_discount_banners([DISCOUNT.banner.name]),
          ]);

          const [uploaded_banner, deleted_banner] = responses;

          if (
            uploaded_banner.status === 'fulfilled' &&
            deleted_banner.status === 'fulfilled'
          ) {
            const UPLOADED_BANNER = uploaded_banner.value[0];

            //Update discount
            DISCOUNT.banner = {
              name: UPLOADED_BANNER.name,
              URL: UPLOADED_BANNER.URL,
            };

            //Update card
            CARD.banner = {
              name: UPLOADED_BANNER.name,
              URL: UPLOADED_BANNER.URL,
            };
          }
        }

        //Update status and expiration date
        //Discount
        DISCOUNT.status = status;
        DISCOUNT.expiration_date = FORMATED_EXP_DATE;
        DISCOUNT.updated_at = new Date();
        DISCOUNT.modified_last_time_by = updated_by;

        //Card
        CARD.status = status;
        CARD.expiration_date = FORMATED_EXP_DATE;
        CARD.updated_at = new Date();
        CARD.modified_last_time_by = updated_by;

        //Update in DB
        const responses = await Promise.allSettled([
          //Update discount
          discountInfo_Store.update(DISCOUNT),

          //Update card
          Card_Store.update(CARD),
        ]);

        const [updated_discount, updated_card] = responses;

        if (
          updated_discount.status === 'fulfilled' &&
          updated_card.status === 'fulfilled'
        ) {
          const UPDATED_CARD = updated_card.value;

          //Revalidate affected routes
          //Don´t revalidate if discount keeps the unavailable status
          if (
            ORIGINAL_CARD.status === 'unavailable' &&
            UPDATED_CARD.status === 'unavailable'
          )
            return routesToUpdateSSG;

          if (
            ORIGINAL_CARD.status !== UPDATED_CARD.status ||
            ORIGINAL_CARD.expiration_date !== UPDATED_CARD.expiration_date ||
            new_banner
          ) {
            //Allways update the "/descuentos/todos" route
            if (!routesToUpdateSSG.includes('/descuentos/todos')) {
              routesToUpdateSSG.push('/descuentos/todos');
            }

            //Allways update the discount
            if (!routesToUpdateSSG.includes(`/descuentos/${discount_id}`)) {
              routesToUpdateSSG.push(`/descuentos/${discount_id}`);
            }

            //Update home if the card appears there or doesn´t appear anymore
            if (UPDATED_CARD.display_in_section) {
              if (!routesToUpdateSSG.includes('/')) {
                routesToUpdateSSG.push('/');
              }
            }

            //Allways update the category
            switch (UPDATED_CARD.category) {
              case 'travel':
                if (!routesToUpdateSSG.includes('/descuentos/viajes')) {
                  routesToUpdateSSG.push('/descuentos/viajar');
                }
                break;
              case 'fashion':
                if (!routesToUpdateSSG.includes('/descuentos/moda')) {
                  routesToUpdateSSG.push('/descuentos/moda');
                }
                break;
              case 'beauty':
                if (!routesToUpdateSSG.includes('/descuentos/belleza')) {
                  routesToUpdateSSG.push('/descuentos/belleza');
                }
                break;
              case 'eatordrink':
                if (!routesToUpdateSSG.includes('/descuentos/alimentacion')) {
                  routesToUpdateSSG.push('/descuentos/alimentacion');
                }
                break;
              case 'entertainment':
                if (
                  !routesToUpdateSSG.includes('/descuentos/entretenimiento')
                ) {
                  routesToUpdateSSG.push('/descuentos/entretenimiento');
                }
                break;
              case 'technology':
                if (!routesToUpdateSSG.includes('/descuentos/tecnologia')) {
                  routesToUpdateSSG.push('/descuentos/tecnologia');
                }
                break;
              case 'others':
                if (!routesToUpdateSSG.includes('/descuentos/otros')) {
                  routesToUpdateSSG.push('/descuentos/otros');
                }
                break;
              default:
                break;
            }
          }
        }
      }
    }

    return routesToUpdateSSG;
  } catch (error) {
    console.error(
      '[discount controller | updateDiscount function error]' + error.message
    );
    throw new Error(error.message);
  }
}

async function getBrandsCount() {
  try {
    const brandsCount = await brandInfo_Store.getCount();
    return brandsCount;
  } catch (error) {
    console.error(
      '[discount controller | getBrandsCount function error]' + error.message
    );
    throw new Error(error.message);
  }
}

async function getTotalDiscuntsCount() {
  try {
    const discountsCount = await discountInfo_Store.getTotalDiscountsCount();
    return discountsCount;
  } catch (error) {
    console.error(
      '[discount controller | getTotalDiscuntsCount function error]' +
        error.message
    );
    throw new Error(error.message);
  }
}

module.exports = {
  //Brand functions
  createNewBrand,
  getBrands,
  getBrandById,
  updateBrand,
  deleteBrand,
  getBrandsCount,

  //Discount functions
  createNewDiscount,
  getDiscounts,
  getDiscountById,
  getDiscountsByBrand,
  getDiscountsCountByBrandId,
  updateDiscount,
  getTotalDiscuntsCount,

  //Cards functions
  getAllAvailableDiscountCards,
  getAvailableDiscountCardsByCategory,
  getHomeSectionsCards,
  getCardByDiscountId,
  getHomeSectionsCardsCount,
  getShowFirstInCategoryCount,

  //Home slider functions
  createHomeSliderBanner,
  getHomeSliderBanners,
  getHomeSliderBannersInfoForAdmin,
  deleteHomeSliderBanner,
  getHomeSliderBannerByDiscountId,

  //General
  eliminateDiscountData,
  getHomeData,
};
