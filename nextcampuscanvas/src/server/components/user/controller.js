import store from '@server/components/user/store';
import { hashPassword } from '@server/services/auth';

const registerUser = (email, password) => {
  return new Promise(async (resolve, reject) => {
    if (!email || !password || !email.includes('@')) {
      console.error('[userController] No hay email o password');
      //Usamos return para parar ejecución
      return reject({ message: 'Los datos son incorrectos' });
    }

    //Admin user
    let role = 'user';
    if (email === 'eg.cruzvalle@gmail.com') {
      role = 'admin';
    }

    //Hashing password
    const encPass = await hashPassword(password, 12);

    const fullUser = {
      email,
      password: encPass,
      role: role,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    try {
      const addedUser = await store.add(fullUser);
      resolve(addedUser);
    } catch (error) {
      return reject(error);
    }
  });
};

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

//Esta función no se usa, sin embargo, dejarla para ejemplos futuros
const getUsers = () => {
  return new Promise((resolve, reject) => {
    resolve(store.users());
  });
};

module.exports = {
  getUser,
  registerUser,
  getUsers,
};
