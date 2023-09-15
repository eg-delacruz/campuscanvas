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

const getMiniCardsRecommendations = async () => {
  const response = await axiosFetcher({
    url: endPoints.discounts.getCards,
    method: 'get',
    extraHeaders: {
      required_cards: 'searchbar_recommendations',
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

const getCardsByBrandId = async (brand_id) => {
  const response = await axiosFetcher({
    url: endPoints.discounts.getCards,
    method: 'get',
    extraHeaders: {
      required_cards: 'all_available_by_brand',
      brand_id: brand_id,
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
  getMiniCardsRecommendations, //used in searchbar recommendations
  getCardsByCategory,
  getCardsByBrandId,
};
