//DB connection
import dbConnect from '@server/dbConnect';
import config from '@server/config';
dbConnect(config.dbURL);

//Model
import User from '@server/components/auth/model';

/////////////////////Add users//////////////////////////////

const addUser = async (user) => {
  return await User.create(user);
};

const getUsers = async () => {
  return await User.find({});
};

module.exports = {
  add: addUser,
  get: getUser,
  users: getUsers,
};
