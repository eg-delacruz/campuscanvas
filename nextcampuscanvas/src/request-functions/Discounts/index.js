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

export default { countLikesDislikes };
