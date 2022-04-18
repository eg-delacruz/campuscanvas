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

/////////////////////Chack if user exists//////////////////////////////

const userExists = async (id) => {
  const exists = await User.exists({
    _id: id,
  });
  return exists;
};

/////////////////////Get user by id//////////////////////////////

const getUserById = async (id) => {
  const exists = await userExists(id);
  if (exists) {
    const user = await User.findOne({ _id: id });
    return user;
  } else if (!exists) {
    throw new Error('[Store] Usuario no encontrado');
  }
};

/////////////////////Get user by email//////////////////////////////

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

/////////////////////Update user//////////////////////////////

const updateUser = async (user) => {
  const updatedUser = await user.save();
  return updatedUser;
};

module.exports = {
  add: addUser,
  getAll: getUsers,
  getById: getUserById,
  getByEmail: getUserByEmail,
  update: updateUser,
};
