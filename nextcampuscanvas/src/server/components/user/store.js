import dbConnect from '@server/dbConnect';
import config from '@server/config';
dbConnect(config.dbURL);

//Model
import User from '@server/components/user/model';

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
  get: getUser,
};
