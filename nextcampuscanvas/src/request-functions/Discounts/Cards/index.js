//Services
import axiosFetcher from '@services/axiosFetcher';

//Endpoints
import endPoints from '@services/api';

const getMiniCardsSearchbarResults = async ({ query, page, limit }) => {
  const response = await axiosFetcher({
    url: endPoints.discounts.getMiniCardsSearchbarResults(query),
    method: 'get',
    extraHeaders: {
      page,
      limit,
    },
  });

  if (response.error) {
    console.log(response.error);
    throw new Error(response.error);
  }
  return response.body;
};

const getCardsByCategory = async ({ category, requiredPage, limit }) => {
  const response = await axiosFetcher({
    url: endPoints.discounts.getCards,
    method: 'get',
    extraHeaders: {
      required_cards: category,
      page: requiredPage,
      limit: limit,
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
  getCardsByCategory,
};
