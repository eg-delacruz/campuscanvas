import dbConnect from '@server/dbConnect';
import config from '@server/config';
dbConnect(config.dbURL);

//Model
import Slide from '@server/components/discount/home_slider_banner/model';

///////////////////// Create slide //////////////////////////////
const createSlide = async (slide) => {
  return await Slide.create(slide);
};

///////////////////// Get all banners //////////////////////////////
const getBanners = async () => {
  return await Slide.find({});
};

///////////////////// Delete slide by discount id //////////////////////////////
const deleteByDiscountId = async (discount_id) => {
  let erased_files;
  const slide = await Slide.findOne({ discount_id });
  if (slide) {
    erased_files = await slide.deleteOne();
  }
  return erased_files;
};

///////////////////// Delete slide by id //////////////////////////////
const deleteById = async (id) => {
  let erased_files;
  const slide = await Slide.findById(id);
  if (slide) {
    erased_files = await slide.deleteOne();
  }
  return erased_files;
};

///////////////////// Get banner by discount id //////////////////////////////
const getByDiscountId = async (discount_id) => {
  return await Slide.findOne({ discount_id });
};

module.exports = {
  add: createSlide,
  getBanners,
  deleteByDiscountId,
  deleteById,
  getByDiscountId,
};
