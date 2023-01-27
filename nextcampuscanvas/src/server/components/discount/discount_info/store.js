import dbConnect from '@server/dbConnect';
import config from '@server/config';
dbConnect(config.dbURL);

//Models
import Discount from '@server/components/discount/discount_info/model';
import BrandInfo from '@server/components/discount/brand_info/model';

///////////////////// Create discount //////////////////////////////
const createDiscount = async (discount) => {
  return await Discount.create(discount);
};

/////////////////////Get all discounts////////////////////////
const getDiscounts = async () => {
  return await Discount.find()
    //The path is the name of the field in the Discount object to be populated
    .populate({ path: 'brand', model: BrandInfo })
    .exec();
};

/////////////////////Get discount by id////////////////////////
const getDiscountById = async (id) => {
  const discount = await Discount.findOne({ _id: id })
    .populate({ path: 'brand', model: BrandInfo })
    .exec();
  if (!discount) {
    console.log('[db] Descuento no encontrado');
    throw new Error('Descuento no encontrado');
  }
  return discount;
};

module.exports = {
  add: createDiscount,
  getDiscounts,
  getDiscountById,
};