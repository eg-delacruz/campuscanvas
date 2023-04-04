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
  //WARNING: Although this is stored as nickname, since before it was
  //called "name", it returns it as "name", and not as nickname!!
  nickname: {
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
    academic_degree: {
      type: String,
      lowercase: true,
      default: '',
    },
    last_uni_semester: {
      type: String,
      lowercase: true,
      default: '',
    },
    last_uni_year: {
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
  birthdate: {
    type: String,
    default: '',
  },
  phone: {
    type: String,
    default: '',
  },
  delivery_address: {
    street: {
      type: String,
      default: '',
    },
    city: {
      type: String,
      default: '',
    },
    house_number: {
      type: String,
      default: '',
    },
    postal_code: {
      type: String,
      default: '',
    },
    observations: {
      type: String,
      default: '',
    },
    country: {
      type: String,
      default: '',
    },
  },
  admin_settings_created: {
    type: Boolean,
    default: false,
  },
});

export default mongoose.models.user || mongoose.model('user', usersSchema);
