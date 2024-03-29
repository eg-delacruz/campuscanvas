import dbConnect from '@server/dbConnect';
import config from '@server/config';
dbConnect(config.dbURL);

//Model
import BrandInfo from '@server/components/discount/brand_info/model';

///////////////////// Create brand //////////////////////////////
const createBrand = async (brand) => {
  //Since the userID has to be unique, Mongo does not let
  //a user upload twice, unles its files are deleted
  return await BrandInfo.create(brand);
};

/////////////////////Check if brand name already exists////////////////////////
const brandAlreadyExists = async (brand_name) => {
  const exists = await BrandInfo.exists({
    brand_name: brand_name,
  });
  if (exists) {
    return true;
  }
  return false;
};

/////////////////////Check if brand slug already exists////////////////////////
const brandSlugAlreadyExists = async (brand_slug) => {
  const exists = await BrandInfo.exists({
    brand_slug: brand_slug,
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

/////////////////////Get all brands alphabetically////////////////////////
const getBrandsAlphabetically = async () => {
  return await BrandInfo.find({}).sort({ brand_name: 1 });
};

/////////////////////Get brand by id////////////////////////
const getBrandById = async (id) => {
  const brand = await BrandInfo.findOne({
    _id: id,
  });
  if (!brand) {
    console.log('[db] Brand not found');
    throw new Error('Brand not found');
  }
  return brand;
};

/////////////////////Get brand by slug////////////////////////
const getBrandBySlug = async (slug) => {
  const brand = await BrandInfo.findOne({
    brand_slug: slug,
  });
  if (!brand) {
    console.log('[db] Brand not found');
    throw new Error('Brand not found');
  }
  return brand;
};

///////////////////// Update brand ////////////////////////
const updateBrand = async (brand) => {
  const updatedBrand = await brand.save();
  return updatedBrand;
};

///////////////////// Delete brand ////////////////////////
const deleteBrand = async (id) => {
  const brand = await getBrandById(id);
  await brand.deleteOne();
  return brand;
};

///////////////////// Get count ////////////////////////
const getCount = async () => {
  return await BrandInfo.estimatedDocumentCount();
};

module.exports = {
  add: createBrand,
  brandAlreadyExists,
  brandSlugAlreadyExists,
  getBrands,
  getBrandsAlphabetically,
  getById: getBrandById,
  getBySlug: getBrandBySlug,
  update: updateBrand,
  delete: deleteBrand,
  getCount,
};
