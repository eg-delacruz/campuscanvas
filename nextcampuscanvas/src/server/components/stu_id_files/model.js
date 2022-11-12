let mongoose = require('mongoose');
const Schema = mongoose.Schema;

const stuIdFileSchema = new mongoose.Schema({
  //Account id
  userID: {
    type: Schema.ObjectId,
    required: [true, 'El ID del usuario es necesario'],
    unique: true,
  },
  stu_id_files: {
    type: Array,
    required: true,
  },
  createdAt: {
    type: Date,
    immutable: true,
  },
});

export default mongoose.models.StuIdFile ||
  mongoose.model('StuIdFile', stuIdFileSchema);
