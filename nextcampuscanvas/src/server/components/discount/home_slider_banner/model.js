let mongoose = require('mongoose');
const Schema = mongoose.Schema;

const HomeBannerSlideSchema = new mongoose.Schema({
  discount_id: {
    type: Schema.Types.ObjectId,
    ref: 'Discount',
    required: [true, 'El ID del descuento es necesario'],
  },
  slider_banner_big_screen: {
    name: {
      type: String,
      required: [true, 'El banner grande es necesario'],
    },
    URL: {
      type: String,
      required: [true, 'La URL del banner grande es necesaria'],
    },
  },
  slider_banner_small_screen: {
    name: {
      type: String,
      required: [true, 'El banner pequeño es necesario'],
    },
    URL: {
      type: String,
      required: [true, 'La URL del banner pequeño es necesaria'],
    },
  },
  available_for: {
    type: String,
    required: [
      true,
      'Es necesario especificar quien puede acceder al descuento',
    ],
  },
  type: {
    type: String,
  },
  affiliate_link: {
    type: String,
  },
  created_at: {
    type: Date,
    immutable: true,
  },
  created_by: {
    type: String,
    required: [true, 'El creador de la marca es necesario'],
  },
});

export default mongoose.models.HomeBannerSlide ||
  mongoose.model('HomeBannerSlide', HomeBannerSlideSchema);
