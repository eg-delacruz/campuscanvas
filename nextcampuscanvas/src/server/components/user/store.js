import dbConnect from '@server/dbConnect';
import config from '@server/config';
dbConnect(config.dbURL);

//Model
import User from '@server/components/user/model';

/////////////////////Add user//////////////////////////////

const addUser = async (user) => {
  return await User.create(user);
};

/////////////////////Get users//////////////////////////////

const getUsers = async () => {
  return await User.find({});
};

/////////////////////Get user//////////////////////////////

const userExists = async (id) => {
  const exists = await User.exists({
    _id: id,
  });
  return exists;
};

const getUserById = async (id) => {
  const exists = await userExists(id);
  if (exists) {
    const user = await User.findOne({ _id: id });
    return user;
  } else if (!exists) {
    throw new Error('[Store] Usuario no encontrado');
  }
};

const getUserByEmail = async (email) => {
  const user = await User.findOne({
    email,
  });
  if (!user) {
    console.log('[db] Usuario no encontrado');
    throw new Error('Usuario no encontrado');
  }
  return user;
};

const resetPassword = async (id, newPassword) => {
  const modifiedUser = await User.findById(id, function (error, user) {
    if (error) {
      console.log('[db] Error al modificar password', error);
      throw new Error('Error al modificar password');
    }
    user.password = newPassword;
    user.save();
    return user;
  }).clone();
};

module.exports = {
  add: addUser,
  getAll: getUsers,
  getById: getUserById,
  getByEmail: getUserByEmail,
  resetPassword,
};
