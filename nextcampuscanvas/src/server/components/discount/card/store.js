import dbConnect from '@server/dbConnect';
import config from '@server/config';
dbConnect(config.dbURL);

//Model
import Card from '@server/components/discount/card/model';

///////////////////// Create card //////////////////////////////
const createCard = async (card) => {
  return await Card.create(card);
};

///////////////////// Get all available cards //////////////////////////////
const getAllAvailableCards = async () => {
  return await Card.find({ status: 'available' });
};

///////////////////// Get available cards by category //////////////////////////////
const getByCategory = async (category) => {
  return await Card.find({ status: 'available', category });
};

///////////////////// Get available cards by section //////////////////////////////
const getBySection = async (section) => {
  return await Card.find({ status: 'available', display_in_section: section });
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
