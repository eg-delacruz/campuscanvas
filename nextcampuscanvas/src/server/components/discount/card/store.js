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

module.exports = {
  add: createCard,
  getAllAvailableCards,
  getByCategory,
  getBySection,
  deleteByDiscountId,
};
