const mongoose = require('mongoose');

const UsersSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'El correo es necesario'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Por favor, ingresa una contraseña'],
    minlength: [6, 'Password must be at least 8 characters long'],
    maxlength: [16, 'Password must be at most 16 characters long'],
    // validate: {
    //   validator: function (value) {
    //     return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}/.test(
    //       value
    //     );
    //   },
    // },
  },
});

module.exports = mongoose.models.Users || mongoose.model('Users', UsersSchema);
