let mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CardSchema = new mongoose.Schema({
  discount_id: {
    type: Schema.Types.ObjectId,
    ref: 'Discount',
    required: [true, 'El ID del descuento es necesario'],
  },
  //Should include Brand Name for better SEO
  title: {
    type: String,
    required: [true, 'El título es necesario'],
  },
  brand_logo: {
    type: String,
    required: [true, 'El logo de la marca es necesario'],
  },
  banner: {
    type: String,
    required: [true, 'El banner es necesario'],
  },
  //travel | fashion | beauty | eat & drink | entertainment | technology | others
  category: {
    type: String,
    required: [true, 'La categoría es necesaria'],
  },
  brand_name: {
    type: String,
    required: [true, 'El nombre de la marca es necesario'],
  },
  click_count: {
    type: Number,
    required: [true, 'El contador de clicks es necesario'],
    default: 0,
  },
  // suggested | new | most_searched | home_featured
  display_in_section: {
    type: String,
  },
  card_tag: {
    type: String,
    default: '',
  },
  status: {
    type: String,
    required: [true, 'El estado es necesario'],
  },
  valid_from: {
    type: Date,
  },
  expiration_date: {
    type: Date,
  },
  createdAt: {
    type: Date,
    immutable: true,
    required: [true, 'La fecha de creación es necesaria'],
  },
});

export default mongoose.models.Card || mongoose.model('Card', CardSchema);
