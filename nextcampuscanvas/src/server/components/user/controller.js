import store from '@server/components/user/store';

function cleanUser(user) {
  let userClean = user.toObject();
  delete userClean.password;
  delete userClean.createdAt;
  delete userClean.updatedAt;
  delete userClean._id;
  delete userClean.__v;
  return userClean;
}

const getUser = async (id) => {
  try {
    const requiredUser = await store.get(id);
    return cleanUser(requiredUser);
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  getUser,
};
