let mongoose = require('mongoose');

const usersSchema = new mongoose.Schema({
  number: {
    type: Number,
    required: true,
    unique: true,
  },
  client_name: {
    type: String,
    required: true,
    lowercase: true,
  },
  client_type: {
    type: String,
    required: true,
    lowercase: true,
  },
  client_DNI: {
    type: String,
    required: true,
    lowercase: true,
  },
  company: {
    type: String,
    default: '',
  },
  campaign_type: {
    type: String,
    lowercase: true,
    required: true,
  },
  creation_place: {
    type: String,
    lowercase: true,
    required: true,
  },
  creation_date: {
    type: Date,
    immutable: true,
  },
});

export default mongoose.models.contract ||
  mongoose.model('contract', usersSchema);
