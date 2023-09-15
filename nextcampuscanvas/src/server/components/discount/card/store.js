import dbConnect from '@server/dbConnect';
import config from '@server/config';
dbConnect(config.dbURL);

//Model
import Card from '@server/components/discount/card/model';
import BrandInfo from '@server/components/discount/brand_info/model';

//Services
import paginationData from '@server/services/paginationData';

///////////////////// Create card //////////////////////////////
const createCard = async (card) => {
  return await Card.create(card);
};

///////////////////// Get all available cards //////////////////////////////
const getAllAvailableCards = async (page, limit) => {
  const totalEntries = await Card.countDocuments({ status: 'available' });
  const pagination_data = paginationData(totalEntries, page, limit);
  const result = await Card.find({ status: 'available' })
    .sort({
      show_first_in_all_discounts: -1,
      brand_name: 1,
    })
    .limit(pagination_data.LIMIT)
    //Skip the first x results and return from that point on
    .skip(pagination_data.startIndex)
    //Populate the Brand logo from the brand object. The path is the property of card that we want to populate, the model is from which we get the info and the select selects the specific fields of the brand model that we want to populate
    .populate({ path: 'brand_logo', model: BrandInfo, select: 'brand_logo' })
    .populate({ path: 'brand_slug', model: BrandInfo, select: 'brand_slug' })
    .exec();

  const data = {
    previous: pagination_data.previous,
    next: pagination_data.next,
    cards: result,
  };

  return data;
};

///////////////////// Get available cards by category //////////////////////////////
const getByCategory = async (category, page, limit) => {
  const totalEntries = await Card.countDocuments({
    status: 'available',
    category,
  });
  const pagination_data = paginationData(totalEntries, page, limit);
  const result = await Card.find({ status: 'available', category })
    // Put the cards that have show_first_in_category true first in the array
    .sort({
      show_first_in_category: -1,
      brand_name: 1,
    })
    .limit(pagination_data.LIMIT)
    //Skip the first x results and return from that point on
    .skip(pagination_data.startIndex)
    .populate({ path: 'brand_logo', model: BrandInfo, select: 'brand_logo' })
    .exec();

  const data = {
    previous: pagination_data.previous,
    next: pagination_data.next,
    cards: result,
  };

  return data;
};

///////////////////// Get available cards by home section //////////////////////////////
const getBySection = async (section) => {
  const responses = await Promise.all([
    Card.find({
      status: 'available',
      show_first_in_home_section: true,
      display_in_section: section,
    })
      .populate({ path: 'brand_logo', model: BrandInfo, select: 'brand_logo' })
      .populate({ path: 'brand_slug', model: BrandInfo, select: 'brand_slug' })
      .exec(),
    Card.find({
      status: 'available',
      show_first_in_home_section: false,
      display_in_section: section,
    })
      .populate({ path: 'brand_logo', model: BrandInfo, select: 'brand_logo' })
      .populate({ path: 'brand_slug', model: BrandInfo, select: 'brand_slug' })
      .exec(),
  ]);

  return [...responses[0], ...responses[1]];
};

///////////////////// Delete card //////////////////////////////
const deleteByDiscountId = async (discount_id) => {
  const card = await Card.findOne({ discount_id });
  if (card) {
    await card.deleteOne();
  }
  return card;
};

///////////////////// Get card by discount id //////////////////////////////
const getByDiscountId = async (discount_id) => {
  return await Card.findOne({ discount_id })
    //We populate the brand_logo and brand_slug fields of the card with the brand_logo and brand_slug fields of the brand_info model
    .populate({ path: 'brand_logo', model: BrandInfo, select: 'brand_logo' })
    .populate({ path: 'brand_slug', model: BrandInfo, select: 'brand_slug' })
    .exec();
};

///////////////////// Get card by discount id without population//////////////////////////////
const getByDiscountIdWithoutPopulation = async (discount_id) => {
  return await Card.findOne({ discount_id });
};

///////////////////// Get home sections cards count //////////////////////////////
const getHomeSectionsCardsCount = async (section) => {
  return await Card.countDocuments({
    status: 'available',
    display_in_section: section,
  });
};

///////////////////// Get count of cards being shown first in its category //////////////////////////////
const getShowFirstInCategoryCount = async (category) => {
  return await Card.countDocuments({
    status: 'available',
    category,
    show_first_in_category: true,
  });
};

///////////////////// Get count of cards being shown first in the /discounts route (among all discounts) //////////////////////////////
const getShowFirstInAllDiscountsCount = async () => {
  return await Card.countDocuments({
    status: 'available',
    show_first_in_all_discounts: true,
  });
};
///////////////////// Get count of cards being shown in the recommendations of the searchbar (used in admin panel) //////////////////////////////
const getShowInRecommendationsSearchbarCount = async () => {
  return await Card.countDocuments({
    status: 'available',
    show_in_recommendations_searchbar: true,
  });
};

///////////////////// Update card //////////////////////////////
const updateCard = async (card) => {
  const updatedCard = await card.save();
  return updatedCard;
};

///////////////////// Get mini cards searchbar results //////////////////////////////

const getMiniCardsSearchbarResults = async (searchTerm, page, limit) => {
  //Pass things to lowercase
  const totalEntries = await Card.countDocuments({
    status: 'available',
    //Search for the term in the brand name or in the discount keywords
    $or: [
      { brand_name: { $regex: searchTerm, $options: 'i' } },
      {
        'discount_keywords.label': {
          $regex: searchTerm,
          $options: 'i',
        },
      },
    ],
  });
  const pagination_data = paginationData(totalEntries, page, limit);

  const result = await Card.find({
    status: 'available',
    //Search for the term in the brand name or in the discount keywords
    $or: [
      { brand_name: { $regex: searchTerm, $options: 'i' } },
      {
        'discount_keywords.label': {
          $regex: searchTerm,
          $options: 'i',
        },
      },
    ],
  })
    .limit(pagination_data.LIMIT)
    .skip(pagination_data.startIndex)
    .populate({ path: 'brand_logo', model: BrandInfo, select: 'brand_logo' })
    .populate({ path: 'brand_slug', model: BrandInfo, select: 'brand_slug' })
    .exec();

  const data = {
    previous: pagination_data.previous,
    next: pagination_data.next,
    cards: result,
  };

  return data;
};

///////////////////// Get mini cards searchbar recommendations //////////////////////////////

const getMiniCardsRecommendations = async () => {
  const result = await Card.find({
    status: 'available',
    show_in_recommendations_searchbar: true,
  })
    .populate({ path: 'brand_logo', model: BrandInfo, select: 'brand_logo' })
    .populate({ path: 'brand_slug', model: BrandInfo, select: 'brand_slug' })
    .exec();

  return result;
};

///////////////////// Get available cards by brand id //////////////////////////////

const getAvailableCardsByBrandId = async (brand_id) => {
  return await Card.find({ status: 'available', brand_logo: brand_id })
    .populate({ path: 'brand_logo', model: BrandInfo, select: 'brand_logo' })
    .populate({ path: 'brand_slug', model: BrandInfo, select: 'brand_slug' })
    .exec();
};

module.exports = {
  add: createCard,
  getAllAvailableCards,
  getByCategory,
  getBySection,
  deleteByDiscountId,
  getByDiscountId,
  getByDiscountIdWithoutPopulation,
  getHomeSectionsCardsCount,
  getShowFirstInCategoryCount,
  update: updateCard,
  getShowFirstInAllDiscountsCount,
  getShowInRecommendationsSearchbarCount,
  getMiniCardsSearchbarResults,
  getMiniCardsRecommendations,
  getAvailableCardsByBrandId,
};
