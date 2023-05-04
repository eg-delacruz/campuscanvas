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

/////////////////////Check if user exists//////////////////////////////

const userExists = async (id) => {
  const exists = await User.exists({
    _id: id,
  });
  if (exists) {
    return true;
  }
  return false;
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

/////////////////////Check if stu_email already used before//////////////////////////////
const checkStuEmail = async (stu_email) => {
  const user = await User.findOne({
    stu_email,
  });
  return user;
};

/////////////////////Eliminate user//////////////////////////////

const deleteUser = async (user) => {
  const deletedUser = await user.deleteOne();
  return deletedUser;
};

/////////////////////Getting all admins//////////////////////////////
const getAdmins = async () => {
  try {
    const admins = await User.find({
      $or: [{ role: 'super_admin' }, { role: 'admin' }],
    });
    return admins;
  } catch (error) {
    throw new Error('[User store error]', error);
  }
};

/////////////////////Verify stu_id legitimacy//////////////////////////////
const verifyStuIdLegitimacy = async (user, stu_id) => {
  try {
    const found = await User.find({
      'stu_data.university': user.stu_data.university,
      stu_id: stu_id,
    });
    //If this error string gets changed, also change in controller and network
    if (found.length >= 1) {
      return 'Invalid ID';
    }
  } catch (error) {
    throw new Error('[User store]', error);
  }
};

/////////////////////Get verifyed students count//////////////////////////////
const getVerifyedStudentsCount = async () => {
  try {
    const count = await User.countDocuments({
      stu_verified: true,
    });
    return count;
  } catch (error) {
    throw new Error('[User store]', error);
  }
};

/////////////////////Getting all master admins//////////////////////////////
const getMasterAdmins = async () => {
  try {
    return await User.find({
      role: 'super_admin',
    });
  } catch (error) {
    throw new Error('[User store error]', error?.message);
  }
};

module.exports = {
  add: addUser,
  getAll: getUsers,
  getById: getUserById,
  getByEmail: getUserByEmail,
  update: updateUser,
  checkStuEmail,
  deleteUser,
  userExists,
  getAdmins,
  verifyStuIdLegitimacy,
  getVerifyedStudentsCount,
  getMasterAdmins,
};
