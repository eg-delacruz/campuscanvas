import dbConnect from '@server/dbConnect';
import config from '@server/config';
dbConnect(config.dbURL);

//Model
import BrandInfo from '@server/components/discount/model';

///////////////////// Create brand //////////////////////////////
const createBrand = async (brand) => {
  //Since the userID has to be unique, Mongo does not let
  //a user upload twice, unles its files are deleted
  return await BrandInfo.create(brand);
};

/////////////////////Check if brand already exists////////////////////////
const brandAlreadyExists = async (brand_name) => {
  const exists = await BrandInfo.exists({
    brand_name: brand_name,
  });
  if (exists) {
    return true;
  }
  return false;
};

/////////////////////Get all brands////////////////////////
const getBrands = async () => {
  return await BrandInfo.find({});
};

module.exports = {
  add: createBrand,
  brandAlreadyExists,
  getBrands,
};
