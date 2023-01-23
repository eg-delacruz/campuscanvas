let mongoose = require('mongoose');
const Schema = mongoose.Schema;

const HomeBannerSlideSchema = new mongoose.Schema({
  discount_id: {
    type: Schema.Types.ObjectId,
    ref: 'Discount',
    required: [true, 'El ID del descuento es necesario'],
  },
  slider_banner_big_screen: {
    type: String,
    required: [true, 'El banner grande es necesario'],
  },
  slider_banner_small_screen: {
    type: String,
    required: [true, 'El banner pequeño es necesario'],
  },
});

export default mongoose.models.HomeBannerSlide ||
  mongoose.model('HomeBannerSlide', HomeBannerSlideSchema);
