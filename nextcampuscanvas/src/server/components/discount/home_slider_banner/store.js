import dbConnect from '@server/dbConnect';
import config from '@server/config';
dbConnect(config.dbURL);

//Model
import Slide from '@server/components/discount/home_slider_banner/model';

///////////////////// Create slide //////////////////////////////
const createSlide = async (slide) => {
  return await Slide.create(slide);
};

module.exports = {
  add: createSlide,
};
