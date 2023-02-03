import {
  s3Uploadv3_brand_logos,
  s3Uploadv3_discount_banners,
  s3Uploadv3_big_home_slider_images,
  s3Uploadv3_small_home_slider_images,
  s3Deletev3_discount_banners,
  s3Deletev3_big_home_slider_images,
  s3Deletev3_small_home_slider_images,
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
      brand_logo: brand_info.brand_logo.URL,
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
      show_first_in_category,
    };

    const CREATED_DISCOUNT = await discountInfo_Store.add(discount);

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
      };

      //Create home slider banner document in Mongo DB
      await homeSliderBanner_Store.add(slide);
    }

    //Create card
    const card = {
      discount_id: CREATED_DISCOUNT._id.toString(),
      title: card_title,
      brand_logo: brand_info.brand_logo.URL,
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
    };

    await Card_Store.add(card);
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

const getHomeSliderBanners = async () => {
  try {
    const banners = await homeSliderBanner_Store.getBanners();
    return banners;
  } catch (error) {
    console.log('[discount controller error]' + error.message);
    throw new Error(error.message);
  }
};

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

const getDiscountById = async (id) => {
  try {
    const discount = await discountInfo_Store.getDiscountById(id);
    return discount;
  } catch (error) {
    console.log('[discount controller error]' + error.message);
    throw new Error(error.message);
  }
};

const eliminateDiscountData = async (id, bannerName) => {
  console.log('El id', id);
  console.log('El banner', bannerName);
  try {
    const responses = await Promise.allSettled([
      //Mongo Data

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

    console.log('deleted_discount', deleted_discount);
    console.log('deleted_card', deleted_card);
    console.log('deleted_home_slider_banner', deleted_home_slider_banner);
    console.log('deleted_banner', deleted_banner);

    if (deleted_home_slider_banner) {
      const responses = await Promise.allSettled([
        s3Deletev3_big_home_slider_images([
          deleted_home_slider_banner.value.slider_banner_big_screen.name,
        ]),
        s3Deletev3_small_home_slider_images([
          deleted_home_slider_banner.value.slider_banner_small_screen.name,
        ]),
      ]);
      console.log('Las responses', responses);
    }
  } catch (error) {
    console.log('[discount controller error]' + error.message);
    throw new Error(error.message);
  }
};

module.exports = {
  //Brand functions
  createNewBrand,
  getBrands,

  //Discount functions
  createNewDiscount,
  getDiscounts,
  getDiscountById,

  //Cards functions
  getAllAvailableDiscountCards,
  getAvailableDiscountCardsByCategory,
  getHomeSectionsCards,

  //Home slider functions
  getHomeSliderBanners,

  //General
  eliminateDiscountData,
};
