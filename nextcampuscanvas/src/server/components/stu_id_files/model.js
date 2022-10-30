let mongoose = require('mongoose');
const Schema = mongoose.Schema;

const stuIdFilesSchema = new mongoose.Schema({
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
});

export default mongoose.models.stuIdFiles ||
  mongoose.model('stuIdFiles', stuIdFilesSchema);
