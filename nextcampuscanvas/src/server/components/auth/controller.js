import store from '@server/components/auth/store';
import { hash } from 'bcryptjs';

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
    const hashPassword = await hash(password, 12);

    const fullUser = {
      email,
      password: hashPassword,
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

const getUsers = () => {
  return new Promise((resolve, reject) => {
    resolve(store.users());
  });
};

module.exports = {
  registerUser,
  getUsers,
};
