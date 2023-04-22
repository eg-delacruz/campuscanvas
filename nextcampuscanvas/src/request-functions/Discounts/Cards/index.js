//Services
import axiosFetcher from '@services/axiosFetcher';

//Endpoints
import endPoints from '@services/api';

const getMiniCardsSearchbarResults = async (query) => {
  const response = await axiosFetcher({
    url: endPoints.discounts.getMiniCardsSearchbarResults(query),
    method: 'get',
    extraHeaders: {
      page: 1,
      limit: 12,
    },
  });

  if (response.error) {
    console.log(response.error);
    throw new Error(response.error);
  }
  return response.body;
};

export default {
  getMiniCardsSearchbarResults,
};
