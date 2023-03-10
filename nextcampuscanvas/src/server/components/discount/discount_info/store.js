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

/////////////////////Get discount by id without population ////////////////////////
const getDiscountByIdWithoutPopulation = async (id) => {
  const discount = await Discount.findOne({ _id: id });
  if (!discount) {
    console.log('[db] Descuento no encontrado');
    throw new Error('Descuento no encontrado');
  }
  return discount;
};

/////////////////////Delete discount by id////////////////////////
const deleteById = async (id) => {
  const discount = await Discount.findOne({ _id: id });
  if (discount) {
    await discount.deleteOne();
  }
  return discount;
};

/////////////////////Get all discounts by brand////////////////////////
const getByBrand = async (brandId) => {
  return await Discount.find({
    brand: brandId,
  })
    //The path is the name of the field in the Discount object to be populated
    .populate({ path: 'brand', model: BrandInfo })
    .exec();
};

/////////////////////Get all available discounts by brand////////////////////////
const getAvailableByBrand = async (brandId) => {
  return await Discount.find({
    brand: brandId,
    status: 'available',
  })
    //The path is the name of the field in the Discount object to be populated
    .populate({ path: 'brand', model: BrandInfo })
    .exec();
};

/////////////////////Get discounts count by brand////////////////////////
const getDiscountsCountByBrandId = async (brandId) => {
  return await Discount.countDocuments({
    brand: brandId,
  });
};

///////////////////// Update discount ////////////////////////
const updateDiscount = async (discount) => {
  const updatedDiscount = await discount.save();
  return updatedDiscount;
};

///////////////////// Get total discounts count ////////////////////////
const getTotalDiscountsCount = async () => {
  return await Discount.estimatedDocumentCount();
};

module.exports = {
  add: createDiscount,
  getDiscounts,
  getDiscountById,
  getDiscountByIdWithoutPopulation,
  deleteById,
  getByBrand,
  getAvailableByBrand,
  getDiscountsCountByBrandId,
  update: updateDiscount,
  getTotalDiscountsCount,
};
