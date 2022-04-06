import store from '@server/components/user/store';

const addUser = (email, password) => {
  return new Promise(async (resolve, reject) => {
    if (!email || !password) {
      console.error('[userController] No hay email o password');
      //Usamos return para parar ejecución
      return reject('Los datos son incorrectos');
    }

    const fullUser = {
      email,
      password,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    store.add(fullUser);
    resolve(fullUser);
  });
};

const getUsers = () => {
  return new Promise((resolve, reject) => {
    resolve(store.users());
  });
};

module.exports = {
  addUser,
  getUsers,
};
