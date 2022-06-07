let mongoose = require('mongoose');

const usersSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'El correo es necesario'],
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: [true, 'Por favor, ingresa una contraseña'],
    minlength: [6, 'La contraseña debe tener al menos 6 caracteres'],
    //No incluir maxlength porque el hash del password es más largo que eso
  },
  name: {
    type: String,
    default: '',
  },
  gender: {
    type: String,
    default: '',
  },
  stu_verified: {
    type: Boolean,
    default: false,
  },
  stu_email: {
    type: String,
    default: '',
    lowercase: true,
  },
  stu_id: {
    type: String,
    default: '',
  },
  stu_data: {
    university: {
      type: String,
      lowercase: true,
      default: '',
    },
    faculty: {
      type: String,
      lowercase: true,
      default: '',
    },
  },
  role: {
    type: String,
    default: 'user',
  },
  createdAt: {
    type: Date,
    immutable: true,
  },
  updatedAt: {
    type: Date,
  },
});

export default mongoose.models.user || mongoose.model('user', usersSchema);
