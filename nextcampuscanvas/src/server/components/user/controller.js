import store from '@server/components/user/store';
import { hashPassword } from '@server/services/passEncript';

//Function used to erase sensitive data, currently not being used
function cleanUser(user) {
  let userClean = user.toObject();
  delete userClean.password;
  delete userClean.createdAt;
  delete userClean.updatedAt;
  delete userClean._id;
  delete userClean.__v;
  return userClean;
}

const registerUser = (email, password) => {
  return new Promise(async (resolve, reject) => {
    if (!email || !password || !email.includes('@')) {
      console.error('[userController] No hay email o password');
      //Usamos return para parar ejecución
      return reject({ message: 'Los datos son incorrectos' });
    }

    //Setting admin user
    let role = 'user';
    if (email === 'eg.cruzvalle@gmail.com') {
      role = 'admin';
    }

    //Hashing password
    const encPass = await hashPassword(password, 12);

    const fullUser = {
      email,
      password: encPass,
      name: '',
      gender: '',
      stu_verified: false,
      stu_data: {
        university: '',
        faculty: '',
      },
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

const getUserById = async (id) => {
  try {
    const requiredUser = await store.getById(id);
    return requiredUser;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getUserByEmail = async (email) => {
  try {
    const user = await store.getByEmail(email);
    return user;
    //return cleanUser(requiredUser);
  } catch (error) {
    throw new Error(error.message);
  }
};

const updateStuData = async ({ id, name, gender, university, faculty }) => {
  try {
    const user = await store.getById(id);

    user.name = name;
    user.gender = gender.toLowerCase();
    user.stu_data.university = university.toLowerCase();
    user.stu_data.faculty = faculty.toLowerCase();
    user.updatedAt = new Date();

    const modifiedUser = await store.update(user);
    return modifiedUser;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

//We need to pass a mongo object!!
const resetPassword = async (newPassword, user) => {
  try {
    //Hashing password
    const encPass = await hashPassword(newPassword, 12);

    user.password = encPass;
    user.updatedAt = new Date();

    const modifiedUser = await store.update(user);
    return modifiedUser;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

//Esta función no se usa, sin embargo, dejarla para ejemplos futuros
const getUsers = () => {
  return new Promise((resolve, reject) => {
    resolve(store.getAll());
  });
};

module.exports = {
  getUserById,
  registerUser,
  getUsers,
  getUserByEmail,
  resetPassword,
  updateStuData,
};
