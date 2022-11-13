let mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pendingStuIdAccValidationSchema = new mongoose.Schema({
  userID: {
    type: Schema.ObjectId,
    required: [true, 'El ID del usuario es necesario'],
    unique: true,
  },
  account_email: {
    type: String,
    required: [true, 'El correo de la cuenta es necesario'],
  },
  nickname: {
    type: String,
    default: '',
  },
  university: {
    type: String,
    lowercase: true,
    required: [true, 'La universidad es necesaria'],
  },
  createdAt: {
    type: Date,
    immutable: true,
  },
  stu_id_files: {
    type: Schema.ObjectId,
    ref: 'stuidfile',
  },
});
//IMPORTANT: to populate, all schema names have to be with capital letter!!!
export default mongoose.models.PendingStuIdAccValidation ||
  mongoose.model('PendingStuIdAccValidation', pendingStuIdAccValidationSchema);
