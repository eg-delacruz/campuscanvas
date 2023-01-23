import { s3Uploadv3_brand_logos } from '@server/services/AWS3/s3Service';
import store from '@server/components/discount/store';

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
    const brand_name_exists = await store.brandAlreadyExists(brand_name);
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
      brand_logo: uploaded_logo_url[0].URL,
      sponsors_box,
      brand_description,
      created_by,
      created_at: new Date(),
      updated_at: new Date(),
    };

    //Saving brand in DB
    await store.add(brand);
  } catch (error) {
    console.log('[discount controller error]' + error.message);
    throw new Error(error.message);
  }
};

const getBrands = async () => {
  try {
    const brands = await store.getBrands();
    return brands;
  } catch (error) {
    console.log('[discount controller error]' + error.message);
    throw new Error(error.message);
  }
};

const createNewDiscount = async (discountInfo, files) => {
  const {
    title,
    description,
    brand,
    category,
    type,
    discount_code,
    dynamically_generated,
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
  } = discountInfo;

  //Transforming boolean strings to pure boolean
  const DYNAMICALLY_GENERATED_CODE = dynamically_generated === 'true';
  const SHOW_IN_HOME_SLIDER = show_in_home_slider === 'true';

  console.log(DYNAMICALLY_GENERATED_CODE);
  console.log(SHOW_IN_HOME_SLIDER);

  //console.log(files);
};

module.exports = {
  createNewBrand,
  getBrands,
  createNewDiscount,
};
