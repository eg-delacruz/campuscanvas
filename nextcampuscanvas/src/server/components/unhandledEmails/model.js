let mongoose = require('mongoose');

const usersSchema = new mongoose.Schema({
  university: {
    type: String,
    lowercase: true,
  },
  stu_email: {
    type: String,
    lowercase: true,
  },
  createdAt: {
    type: Date,
    immutable: true,
  },
  updatedAt: {
    type: Date,
  },
});

export default mongoose.models.unhandledStuEmail ||
  mongoose.model('unhandledStuEmail', usersSchema);
