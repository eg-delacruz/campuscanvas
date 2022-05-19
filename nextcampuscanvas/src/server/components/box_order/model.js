let mongoose = require('mongoose');
const Schema = mongoose.Schema;

const boxOrdersSchema = new mongoose.Schema({
  userID: {
    type: Schema.ObjectId,
    required: [true, 'El ID del usuario es necesario'],
  },
  season: {
    type: String,
    required: [true, 'La temporada es necesaria'],
  },
  shopify_order_number: {
    type: Number,
    required: [true, 'El número de orden es necesario'],
  },
  createdAt: {
    type: Date,
    immutable: true,
  },
});

export default mongoose.models.boxOrder ||
  mongoose.model('boxOrder', boxOrdersSchema);
