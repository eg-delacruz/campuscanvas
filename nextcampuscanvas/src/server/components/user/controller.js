import store from '@server/components/user/store';
import { hashPassword } from '@server/services/passEncript';
import jwt from 'jsonwebtoken';
import unhandledEmailsController from '@server/components/unhandledEmails/controller';

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

    //TODO:uncomment this
    // if (
    //   stu_email.includes('@hotmail') ||
    //   stu_email.includes('@gmail') ||
    //   stu_email.includes('@outlook') ||
    //   stu_email.includes('@yahoo') ||
    //   stu_email.includes('@live')
    // ) {
    //   throw new Error(
    //     '[Controller] La dirección de correo no pertenece a tu universidad'
    //   );
    // }

    //Generating validation link
    const secret = process.env.JWT_SECRET + user.password;
    const payload = {
      id: user.id,
      stu_email: stu_email,
    };
    const token = jwt.sign(payload, secret, { expiresIn: '15m' });
    const link = clientEndPoints.user.verifyStuEmail(user.id, token);

    //TODO:Uncomment Handled uni_email structures. If uniname is here,
    //shouldn't be in the following else if!!

    // if (
    //   user.stu_data.university === 'universidad rey juan carlos urjc' &&
    //   stu_email.includes('@urjc.edu.com')
    // ) {
    //   //Return link
    // }

    //TODO:Uncomment Unhandled uni_email structures. If uniname is here,
    //shuldn't be in handled uni_email structures -if above !!!
    //else if (
    //user.stu_data.university === 'unhandledUniName1' ||
    //user.stu_data.university === 'unhandledUniName2' ||
    //user.stu_data.university === 'unhandledUniName3'
    //) {
    //TODO:save university and unhandled uni_email structure in another collection
    await unhandledEmailsController.createUnhandledEmailEntry(
      user.stu_data.university,
      stu_email
    );
    return link;
    //}
    //else{
    // throw new Error(
    //   '[Controller] La dirección de correo no pertenece a tu universidad'
    // );
    //}
  } catch (error) {
    throw new Error(error.message);
  }
};

//Updates stu_email and stu_verified to true
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
