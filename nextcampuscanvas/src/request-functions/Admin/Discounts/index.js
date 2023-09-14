//Services
import axiosFetcher from '@services/axiosFetcher';

//Endpoints
import endPoints from '@services/api';

////////////////////////////
//    Genersl functions   //
////////////////////////////

////////////////////////////
//   Discounts functions  //
////////////////////////////
const addDiscount = async (formdata) => {
  const response = await axiosFetcher({
    url: endPoints.admin.discounts.index,
    method: 'post',
    payload: formdata,
    extraHeaders: {
      'Content-Type': 'multipart/form-data',
    },
  });

  if (response.error) {
    console.log(response.error);
    throw new Error(response.error);
  }

  return response.body;
};

const getMostLikedDiscounts = async () => {
  const response = await axiosFetcher({
    url: endPoints.admin.discounts.index,
    method: 'get',
    extraHeaders: {
      required_info: 'most_liked_discounts',
    },
  });

  if (response.error) {
    console.log(response.error);
    throw new Error(response.error);
  }

  return response.body;
};

const getMostDislikedDiscounts = async () => {
  const response = await axiosFetcher({
    url: endPoints.admin.discounts.index,
    method: 'get',
    extraHeaders: {
      required_info: 'most_disliked_discounts',
    },
  });

  if (response.error) {
    console.log(response.error);
    throw new Error(response.error);
  }

  return response.body;
};

const getShowFirstInAllDiscountsCount = async () => {
  const response = await axiosFetcher({
    url: endPoints.admin.discounts.getShowFirstInAllDiscountsCount,
    method: 'get',
    extraHeaders: { required_info: 'show_first_in_all_discounts_count' },
  });

  if (response.error) {
    console.log(response.error);
    throw new Error(response.error);
  }

  return response.body;
};

const getShowInRecommendationsSearchbarCount = async () => {
  const response = await axiosFetcher({
    url: endPoints.admin.discounts.getShowInRecommendationsSearchbarCount,
    method: 'get',
    extraHeaders: { required_info: 'show_in_recommendations_searchbar_count' },
  });

  if (response.error) {
    console.log(response.error);
    throw new Error(response.error);
  }

  return response.body;
};

const getAllDiscounts = async () => {
  const response = await axiosFetcher({
    url: endPoints.discounts.index,
    method: 'get',
    extraHeaders: {
      needed_info: 'all_discounts',
    },
  });

  if (response.error) {
    console.log(response.error);
    throw new Error(response.error);
  }

  return response.body;
};

////////////////////////////
//    Brands functions   //
////////////////////////////

const getBrands = async () => {
  const response = await axiosFetcher({
    url: endPoints.discounts.brands,
    method: 'get',
    extraHeaders: {
      required_info: 'all_brands',
    },
  });

  if (response.error) {
    console.log(response.error);
    throw new Error(response.error);
  }

  return response.body;
};

const updateLastTimeChecked = async (brand_id) => {
  const response = await axiosFetcher({
    url: endPoints.admin.discounts.brands,
    method: 'patch',
    extraHeaders: {
      brand_id,
      required_info: 'update_last_time_checked',
    },
  });

  if (response.error) {
    console.log(response.error);
    throw new Error(response.error);
  }

  return response.body;
};

////////////////////////////
//     Cards functions    //
////////////////////////////

const getCardByDiscountId = async (discount_id) => {
  const response = await axiosFetcher({
    url: endPoints.discounts.getCardByDiscountId(discount_id),
    method: 'get',
  });

  if (response.error) {
    console.log(response.error);
    throw new Error(response.error);
  }

  return response.body;
};

////////////////////////////
//    Banner functions   //
////////////////////////////
const getHomeBannersInfo = async () => {
  const response = await axiosFetcher({
    url: endPoints.admin.discounts.getHomeSliderBannersInfo,
    method: 'get',
  });

  if (response.error) {
    console.log(response.error);
    throw new Error(response.error);
  }

  return response.body;
};

const getHomeBannerByDiscountId = async (discount_id) => {
  const response = await axiosFetcher({
    url: endPoints.admin.discounts.getHomeSliderBannerByDiscountId(discount_id),
    method: 'get',
    extraHeaders: {
      required_info: 'banner_by_discount_id',
    },
  });

  if (response.error) {
    console.log(response.error);
    throw new Error(response.error);
  }

  return response.body;
};

export default {
  //General funtions

  //Discount functions
  addDiscount,
  getMostLikedDiscounts, //used in Dashboard
  getMostDislikedDiscounts, // used in Dashboard
  getShowFirstInAllDiscountsCount,
  getShowInRecommendationsSearchbarCount, //used in Admin sections
  getAllDiscounts,

  //Brand functions
  getBrands,
  updateLastTimeChecked,

  //Cards funtions
  getCardByDiscountId,

  //Banner functions
  getHomeBannersInfo,
  getHomeBannerByDiscountId,
};
