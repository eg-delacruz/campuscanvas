import dbConnect from '@server/dbConnect';
import config from '@server/config';
dbConnect(config.dbURL);

//Model
import Card from '@server/components/discount/card/model';
import BrandInfo from '@server/components/discount/brand_info/model';

///////////////////// Create card //////////////////////////////
const createCard = async (card) => {
  return await Card.create(card);
};

///////////////////// Get all available cards //////////////////////////////
const getAllAvailableCards = async () => {
  return await Card.find({ status: 'available' })
    //Populate the Brand logo from the brand object. The path is the property of card that we want to populate, the model is from which we get the info and the select selects the specific fields of the brand model that we want to populate
    .populate({ path: 'brand_logo', model: BrandInfo, select: 'brand_logo' })
    .exec();
};

///////////////////// Get available cards by category //////////////////////////////
const getByCategory = async (category) => {
  return await Card.find({ status: 'available', category })
    .populate({ path: 'brand_logo', model: BrandInfo, select: 'brand_logo' })
    .exec();
};

///////////////////// Get available cards by section //////////////////////////////
const getBySection = async (section) => {
  return await Card.find({ status: 'available', display_in_section: section })
    .populate({ path: 'brand_logo', model: BrandInfo, select: 'brand_logo' })
    .exec();
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
    .populate({ path: 'brand_logo', model: BrandInfo, select: 'brand_logo' })
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

///////////////////// Update card //////////////////////////////
const updateCard = async (card) => {
  const updatedCard = await card.save();
  return updatedCard;
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
};
