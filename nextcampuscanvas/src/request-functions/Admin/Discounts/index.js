//Services
import axiosFetcher from '@services/axiosFetcher';

//Endpoints
import endPoints from '@services/api';

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

export default {
  getMostLikedDiscounts,
  getMostDislikedDiscounts,
};
