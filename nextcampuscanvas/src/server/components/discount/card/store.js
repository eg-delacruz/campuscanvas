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
  const responses = await Promise.all([
    Card.find({ status: 'available', category, show_first_in_category: true })
      .populate({ path: 'brand_logo', model: BrandInfo, select: 'brand_logo' })
      .exec(),
    Card.find({ status: 'available', category, show_first_in_category: false })
      .populate({ path: 'brand_logo', model: BrandInfo, select: 'brand_logo' })
      .exec(),
  ]);

  return [...responses[0], ...responses[1]];
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
      .exec(),
    Card.find({
      status: 'available',
      show_first_in_home_section: false,
      display_in_section: section,
    })
      .populate({ path: 'brand_logo', model: BrandInfo, select: 'brand_logo' })
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
