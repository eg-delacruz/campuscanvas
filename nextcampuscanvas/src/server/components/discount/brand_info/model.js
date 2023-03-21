let mongoose = require('mongoose');

const BrandInfoSchema = new mongoose.Schema({
  brand_name: {
    type: String,
    required: [true, 'El nombre de la marca es necesario'],
    unique: true,
    immutable: true,
  },
  brand_logo: {
    name: {
      type: String,
      required: [true, 'El nombre del logo de la marca es necesario'],
    },
    URL: {
      type: String,
      required: [true, 'La URL del logo de la marca es necesario'],
    },
  },
  sponsors_box: {
    type: Boolean,
    required: [true, 'La caja de patrocinadores es necesaria'],
    default: false,
  },
  brand_description: {
    type: String,
    required: [true, 'La descripción de la marca es necesaria'],
  },
  affiliate_program: {
    type: String,
  },
  notes: {
    type: String,
  },
  created_by: {
    type: String,
    required: [true, 'El creador de la marca es necesario'],
  },
  updated_by: {
    type: String,
    required: [true, 'El actualizador de la marca es necesario'],
  },
  created_at: {
    type: Date,
    immutable: true,
  },
  updated_at: {
    type: Date,
  },
});

export default mongoose.models.BrandInfo ||
  mongoose.model('BrandInfo', BrandInfoSchema);
