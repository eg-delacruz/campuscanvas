let mongoose = require('mongoose');
const Schema = mongoose.Schema;

const boxOrdersSchema = new mongoose.Schema({
  //eventhoug this is called "userID" and not only "user", this will populate the user (keep in mind)
  userID: {
    type: Schema.ObjectId,
    required: [true, 'El ID del usuario es necesario'],
    ref: 'user',
  },
  season: {
    type: String,
    required: [true, 'La temporada es necesaria'],
  },
  account_email: {
    type: String,
    required: [true, 'El correo de la cuenta es necesario'],
  },
  stu_id: {
    type: String,
    default: '',
  },
  stu_email: {
    type: String,
    default: '',
  },
  shopify_order_number: {
    type: String,
    required: [true, 'El número de orden es necesario'],
  },
  description: {
    type: String,
    required: [true, 'La descripción es necesaria'],
  },
  total_paid: {
    type: String,
  },
  status_URL: {
    type: String,
    required: [true, 'El status URL es necesario'],
  },
  createdAt: {
    type: Date,
    immutable: true,
  },
  order_created_in_shopify_at: {
    type: Date,
  },
});

export default mongoose.models.boxOrder ||
  mongoose.model('boxOrder', boxOrdersSchema);
