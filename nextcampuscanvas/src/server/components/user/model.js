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
    //No incluir maxlength porque el hash es más largo
    // validate: {
    //   validator: function (value) {
    //     return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}/.test(
    //       value
    //     );
    //   },
    // },
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
