import dbConnect from '@server/dbConnect';
import config from '@server/config';
dbConnect(config.dbURL);

//Model
import Discount from '@server/components/discount/discount_info/model';

///////////////////// Create discount //////////////////////////////
const createDiscount = async (discount) => {
  return await Discount.create(discount);
};

/////////////////////Get all discounts////////////////////////
const getDiscounts = async () => {
  return await Discount.find({});
};

module.exports = {
  add: createDiscount,
  getDiscounts,
};
