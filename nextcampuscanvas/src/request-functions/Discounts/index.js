//Services
import axiosFetcher from '@services/axiosFetcher';

//Endpoints
import endPoints from '@services/api';

const countLikesDislikes = async ({ discount_id, like, dislike }) => {
  const response = await axiosFetcher({
    url: endPoints.discounts.countLikesDislikes(discount_id),
    method: 'patch',
    payload: {
      discount_id,
      like,
      dislike,
    },
  });

  if (response.error) {
    console.log(response.error);
    throw new Error(response.error);
  }

  return response.body;
};

const getDiscountsOfBrand = async (brand_id) => {
  const response = await axiosFetcher({
    url: endPoints.discounts.index,
    method: 'get',
    extraHeaders: {
      needed_info: 'discounts_by_brand',
      brand_id,
    },
  });

  if (response.error) {
    console.log(response.error);
    throw new Error(response.error);
  }

  return response.body;
};

export default { countLikesDislikes, getDiscountsOfBrand };
