//DB connection
import dbConnect from '@server/dbConnect';
import config from '@server/config';

dbConnect(config.dbURL);

//Model
let User = require('@server/components/user/model');

/////////////////////Add users//////////////////////////////

const addUser = async (user) => {
  return await User.create(user);
};

const getUsers = async () => {
  return await User.find({});
};
module.exports = {
  add: addUser,
  users: getUsers,
};
