import store from '@server/components/user/store';
import { hashPassword } from '@server/services/passEncript';
import jwt from 'jsonwebtoken';

//clientEndpoints
import clientEndPoints from '@server/clientEndPoints';

//Function used to erase sensitive data
const cleanUserForClient = (user) => {
  let userClean = user.toObject();
  delete userClean.password;
  delete userClean.createdAt;
  delete userClean.updatedAt;
  delete userClean._id;
  delete userClean.__v;
  return userClean;
};

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
      stu_email: '',
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

const updateStuData = async (id, name, gender, university, faculty) => {
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

//Esta función no se usa, sin embargo, dejarla para casos futuros
const getUsers = () => {
  return new Promise((resolve, reject) => {
    resolve(store.getAll());
  });
};

const verifyStuEmail = async (user, stu_email) => {
  try {
    const user_with_same_stu_email = await store.checkStuEmail(stu_email);
    if (user_with_same_stu_email) {
      throw new Error(
        '[Controller] Este email ya ha sido utilizado para verificar una cuenta'
      );
    }

    if (user.stu_data.university === '') {
      //Al modificar errores, modificar en verif_email también
      throw new Error('[Controller] No has ingresado tu universidad');
    }
    if (user.stu_verified) {
      throw new Error('[Controller] Ya has sido verificado anteriormente');
    }

    //TODO: create logic to discard hotmail, google, etc here,
    //throw email if contains those

    //Generating validation link
    const secret = process.env.JWT_SECRET + user.password;
    const payload = {
      id: user.id,
      stu_email: stu_email,
    };
    const token = jwt.sign(payload, secret, { expiresIn: '15m' });
    const link = clientEndPoints.user.verifyStuEmail(user.id, token);

    //TODO:Este if contendrá toda la lógica que permitirá
    //enviar el enlace
    // if (
    //   user.stu_data.university === 'complu' &&
    //   stu_email.includes('@hotmail.com')
    // ) {
    //   //Return validation link
    // }
    return link;

    //TODO: aquí crear if con unhandled email structures
    //to also send the verif email but save their emails
    //in a different collection to analyze later
  } catch (error) {
    throw new Error(error.message);
  }
};

const verifyStudentAccount = async (user, stu_email) => {
  try {
    user.stu_email = stu_email;
    user.stu_verified = true;
    user.updatedAt = new Date();

    const verified_student = await store.update(user);
    return verified_student;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  getUserById,
  registerUser,
  getUsers,
  getUserByEmail,
  resetPassword,
  updateStuData,
  cleanUserForClient,
  verifyStuEmail,
  verifyStudentAccount,
};
