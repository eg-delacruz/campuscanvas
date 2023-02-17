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
        created_at: new Date(),
        created_by,
      };

      //Create home slider banner document in Mongo DB
      await homeSliderBanner_Store.add(slide);

      //Adding home route if not already there
      if (!routesToUpdateSSG.includes('/')) {
        routesToUpdateSSG.push('/');
      }
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
      tag: card_tag,
      status: 'available',
      valid_from: VALID_FROM_DATE,
      expiration_date: EXPIRATION_DATE,
      createdAt: new Date(),
      show_first_in_category,
    };

    const CREATED_CARD = await Card_Store.add(card);

    //Revalidating home if needed
    if (CREATED_CARD.display_in_section) {
      routesToUpdateSSG.push('/');
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
      Card_Store.getBySection('suggested'),
      Card_Store.getBySection('new'),
      //TODO: in the future, get by 'home_featured' instead of all
      Card_Store.getAllAvailableCards(),
    ]);
    const [SUGGESTED, NEW, HOME_FEATURED] = cards;

    const SECTION_CARDS = {
      suggested: SUGGESTED.value,
      new: NEW.value,
      home_featured: HOME_FEATURED.value,
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
    const home_banners = await getHomeSliderBanners();

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

        // //Update logo in DB
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

    let array_banner = [];
    const banner = await homeSliderBanner_Store.getByDiscountId(discount_id);
    if (banner) {
      array_banner = banner;
    }
    return array_banner;
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
    const SECTIONS = ['suggested', 'new', 'most_searched', 'home_featured'];
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

module.exports = {
  //Brand functions
  createNewBrand,
  getBrands,
  getBrandById,
  updateBrand,
  deleteBrand,

  //Discount functions
  createNewDiscount,
  getDiscounts,
  getDiscountById,
  getDiscountsByBrand,
  getDiscountsCountByBrandId,

  //Cards functions
  getAllAvailableDiscountCards,
  getAvailableDiscountCardsByCategory,
  getHomeSectionsCards,
  getCardByDiscountId,
  getHomeSectionsCardsCount,
  getShowFirstInCategoryCount,

  //Home slider functions
  getHomeSliderBanners,
  getHomeSliderBannersInfoForAdmin,
  deleteHomeSliderBanner,
  getHomeSliderBannerByDiscountId,

  //General
  eliminateDiscountData,
  getHomeData,
};
