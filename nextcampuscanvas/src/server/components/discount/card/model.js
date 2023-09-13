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
    type: Schema.ObjectId,
    required: [true, 'El logo de la marca es necesario'],
    ref: 'BrandInfo',
  },
  brand_slug: {
    type: Schema.ObjectId,
    required: [true, 'El slug de la marca es necesario'],
    ref: 'BrandInfo',
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
  // Existing home sections
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
  discount_keywords: {
    type: Array,
    required: [true, 'Las palabras clave son necesarias'],
  },
  createdAt: {
    type: Date,
    immutable: true,
    required: [true, 'La fecha de creación es necesaria'],
  },
  show_first_in_category: {
    type: Boolean,
    default: false,
  },
  show_first_in_home_section: {
    type: Boolean,
    default: false,
  },
  show_first_in_all_discounts: {
    type: Boolean,
    default: false,
  },
  show_in_recommendations_searchbar: {
    type: Boolean,
    default: false,
  },
  updated_at: {
    type: Date,
  },
  created_by: {
    type: String,
    required: [true, 'El creador es necesario'],
  },
  modified_last_time_by: {
    type: String,
  },
});

export default mongoose.models.Card || mongoose.model('Card', CardSchema);
