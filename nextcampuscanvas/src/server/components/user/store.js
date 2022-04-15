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

const getUser = async (id) => {
  const exists = await userExists(id);
  if (exists) {
    const user = await User.findOne({ _id: id });
    return user;
  } else if (!exists) {
    throw new Error('[Store] Usuario no encontrado');
  }
};

module.exports = {
  add: addUser,
  users: getUsers,
  get: getUser,
};
