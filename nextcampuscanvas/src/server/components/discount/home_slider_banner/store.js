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

module.exports = {
  add: createSlide,
  getBanners,
};
