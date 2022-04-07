//DB connection
import dbConnect from '@server/dbConnect';
import config from '@server/config';

dbConnect(config.dbURL);

//Model
import User from '@server/components/user/model';
console.log('Holas');

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
