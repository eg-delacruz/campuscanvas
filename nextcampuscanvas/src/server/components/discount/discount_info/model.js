let mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DiscountSchema = new mongoose.Schema({
  discount_external_key: {
    type: String,
  },
  title: {
    type: String,
    required: [true, 'El título es necesario'],
  },
  //The same as the card_title. Not longer than 40 characters
  SEO_meta_title: {
    type: String,
    required: [true, 'El título SEO es necesario'],
  },
  brand: {
    type: Schema.ObjectId,
    required: [true, 'El ID del usuario es necesario'],
    ref: 'BrandInfo',
  },
  //travel | fashion | beauty | eat or drink | entertainment | technology | others
  category: {
    type: String,
    required: [true, 'La categoría es necesaria'],
  },
  banner: {
    name: {
      type: String,
      required: [true, 'El banner es necesario'],
    },
    URL: {
      type: String,
      required: [true, 'La URL del banner es necesaria'],
    },
  },
  description: {
    type: String,
    required: [true, 'La descripción es necesaria'],
  },
  affiliate_link: {
    type: String,
  },
  discount_code: {
    code: {
      type: String,
    },
  },
  available_for: {
    type: String,
    required: [
      true,
      'Es necesario especificar quien puede acceder al descuento',
    ],
  },
  terms_and_conds: {
    type: String,
  },
  createdAt: {
    type: Date,
    immutable: true,
    required: [true, 'La fecha de creación es necesaria'],
  },
  //If dynamically_generated, send the needed info to the required API to generate the code and put it in a state
  valid_from: {
    type: Date,
  },
  expiration_date: {
    type: Date,
    default: null,
  },
  type: {
    type: String,
    required: [true, 'El tipo de descuento es necesario'],
  },
  //Only for affiliate_links, since for disc. code, same call to action needed
  action_btn_phrase: {
    type: String,
  },
  //Clean likes/dislikes before sending to client
  likes: {
    type: Number,
    default: 0,
  },
  dislikes: {
    type: Number,
    default: 0,
  },
  // available | unavailable
  status: {
    type: String,
    required: [true, 'El status es necesario'],
  },
  created_by: {
    type: String,
    required: [true, 'El creador es necesario'],
  },
  updated_at: {
    type: Date,
  },
  modified_last_time_by: {
    type: String,
    required: [true, 'El último modificador es necesario'],
  },
});

export default mongoose.models.Discount ||
  mongoose.model('Discount', DiscountSchema);
