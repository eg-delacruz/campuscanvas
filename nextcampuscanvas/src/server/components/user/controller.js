import store from '@server/components/user/store';
import { hashPassword, verifyPassword } from '@server/services/passEncript';
import jwt from 'jsonwebtoken';
import unhandledEmailsController from '@server/components/unhandledEmails/controller';

//Sendinblue api (for email marketing)
import sendinblue from '@server/services/sendinblue/sendinblue';

//clientEndpoints
import clientEndPoints from '@server/clientEndPoints';

//FB Conversions API
import { successful_step_1_register_process } from '@server/services/fbConversionsAPI/step_1_register_process';
import { successful_step_2_register_process } from '@server/services/fbConversionsAPI/step_2_register_process';
import { successful_step_3_register_process } from '@server/services/fbConversionsAPI/step_3_register_process';
import { last_step_successful_stu_validation } from '@server/services/fbConversionsAPI/last_step_successful_stu_validation';

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

const registerUser = (email, password, newsletter, IP_Address, browserName) => {
  return new Promise(async (resolve, reject) => {
    if (!email || !password || !email.includes('@')) {
      console.error('[userController] No hay email o password');
      //Usamos return para parar ejecución
      return reject({ message: 'Los datos son incorrectos' });
    }

    //Subscribing to newsletter if newsletter = true
    if (newsletter) {
      sendinblue.createContact(email);
    }

    //Setting super_admin user
    let role = 'user';
    if (email === 'eg.cruzvalle@gmail.com') {
      role = 'super_admin';
    }

    //Hashing password
    const encPass = await hashPassword(password, 12);

    const fullUser = {
      email,
      password: encPass,
      nickname: '',
      gender: '',
      stu_verified: false,
      stu_email: '',
      stu_id: '',
      stu_data: {
        university: '',
        faculty: '',
        academic_degree: '',
        last_uni_semester: '',
        last_uni_year: '',
      },
      birthdate: '',
      phone: '',
      delivery_address: {
        street: '',
        city: '',
        house_number: '',
        postal_code: '',
        observations: '',
        country: 'España',
      },
      role: role,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    try {
      const addedUser = await store.add(fullUser);

      //Send FB Conversions API info here (Start)
      successful_step_1_register_process(
        IP_Address,
        email,
        addedUser,
        browserName
      );
      //Send FB Conversions API info here (End)

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

const updateStuData = async (
  id,
  nickname,
  gender,
  university,
  faculty,
  browserName,
  IP_Address
) => {
  try {
    const user = await store.getById(id);

    user.nickname = nickname;
    user.gender = gender.toLowerCase();
    user.stu_data.university = university.toLowerCase();
    user.stu_data.faculty = faculty.toLowerCase();
    user.updatedAt = new Date();

    const modifiedUser = await store.update(user);

    //Send FB Conversions API info here (Start)
    successful_step_2_register_process(IP_Address, modifiedUser, browserName);
    //Send FB Conversions API info here (End)
    return modifiedUser;
  } catch (error) {
    throw new Error('[Use controller error]', error);
  }
};

const editProfile = async (
  id,
  gender,
  nickname,
  birthdate,
  phone,
  street,
  city,
  house_number,
  postal_code,
  observations,
  country,
  faculty,
  university,
  last_uni_year,
  last_uni_semester,
  academic_degree
) => {
  try {
    const user = await store.getById(id);

    user.gender = gender.toLowerCase();
    user.nickname = nickname;
    user.birthdate = birthdate;
    user.phone = phone;
    //Stu_data
    user.stu_data.university = university.toLowerCase();
    user.stu_data.faculty = faculty.toLowerCase();
    user.stu_data.last_uni_semester = last_uni_semester.toLowerCase();
    user.stu_data.last_uni_year = last_uni_year;
    user.stu_data.academic_degree = academic_degree.toLowerCase();
    //Delivery_address
    user.delivery_address.street = street;
    user.delivery_address.city = city;
    user.delivery_address.house_number = house_number;
    user.delivery_address.postal_code = postal_code;
    user.delivery_address.observations = observations;
    user.delivery_address.country = country;
    user.updatedAt = new Date();

    const modifiedUser = await store.update(user);
    return modifiedUser;
  } catch (error) {
    throw new Error('[Use controller error]', error);
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

const verifyStuEmail = async (user, stu_email, IP_Address, browserName) => {
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

    //Deny access if generic email/not university email
    if (
      stu_email.includes('@hotmail') ||
      stu_email.includes('@gmail') ||
      stu_email.includes('@outlook') ||
      stu_email.includes('@yahoo') ||
      stu_email.includes('@live')
    ) {
      throw new Error(
        '[Controller] La dirección de correo no pertenece a tu universidad'
      );
    }

    //Generating validation link
    const secret = process.env.JWT_SECRET + user.password;
    const payload = {
      id: user.id,
      stu_email: stu_email,
    };
    const token = jwt.sign(payload, secret, { expiresIn: '15m' });
    const link = clientEndPoints.user.verifyStuEmail(user.id, token);

    //Send FB Conversions API info here (Start)
    successful_step_3_register_process(IP_Address, user, browserName);
    //Send FB Conversions API info here (end)

    //If stu_email structure is handled here, it shouldn't be in the if below!!
    if (stu_email.includes('@ejemplo.com')) {
      return link;
    }

    //If uniname is here, its corresponding stu_email shuldn't
    //be in handled uni_email structures (if above !!!)
    //If a new university is added in the university array of the studentInfoDatabase.js
    //add it here as well, but in lowercase!!!
    if (
      user.stu_data.university === 'centro de estudios financieros cef' ||
      user.stu_data.university === 'cesine centro universitario' ||
      user.stu_data.university ===
        'colegio universitario de estudios financieros cunef' ||
      user.stu_data.university === 'deusto business school' ||
      user.stu_data.university === 'eada business school' ||
      user.stu_data.university === 'eae business school' ||
      user.stu_data.university === 'esade law & business school' ||
      user.stu_data.university === 'esci-upf' ||
      user.stu_data.university ===
        'escola d art i superior de disseny de les illes balears' ||
      user.stu_data.university === 'escola superior de disseny esdi' ||
      user.stu_data.university ===
        'escola universitària d hoteleria i turisme cett' ||
      user.stu_data.university ===
        'escuela autónoma de dirección de empresas eade' ||
      user.stu_data.university === 'escuela de organización industrial eoi' ||
      user.stu_data.university ===
        'escuela europea de dirección y empresa eude' ||
      user.stu_data.university ===
        'escuela superior de administración y dirección de empresas esade' ||
      user.stu_data.university ===
        'escuela superior de gestion comercial y marketing esic' ||
      user.stu_data.university ===
        'escuela superior de música de cataluña esmuc' ||
      user.stu_data.university ===
        'escuela superior politécnica del tecnocampus' ||
      user.stu_data.university ===
        'escuela técnica superior de ingeniería aeronáutica y del espacio' ||
      user.stu_data.university ===
        'escuela técnica superior de ingeniería de montes, forestal y del medio natural' ||
      user.stu_data.university ===
        'escuela técnica superior de ingenieros agronomos' ||
      user.stu_data.university ===
        'escuela técnica superior de ingenieros navales' ||
      user.stu_data.university ===
        'escuela universitaria de diseño, innovación y tecnología' ||
      user.stu_data.university ===
        'escuela universitaria de fisioterapia once' ||
      user.stu_data.university === 'florida centro de formación' ||
      user.stu_data.university === 'fundació universitària del bages fub' ||
      user.stu_data.university === 'ie universidad' ||
      user.stu_data.university === 'imf business school' ||
      user.stu_data.university === 'iqs institut químic de sarrià' ||
      user.stu_data.university === 'mondragon unibertsitatea' ||
      user.stu_data.university === 'saint louis university' ||
      user.stu_data.university === 'unir, universidad en internet' ||
      user.stu_data.university === 'universidad alfonso x el sabio uax' ||
      user.stu_data.university === 'universidad antonio de nebrija' ||
      user.stu_data.university === 'universidad autónoma de madrid uam' ||
      user.stu_data.university === 'universidad camilo josé cela ucjc' ||
      user.stu_data.university === 'universidad cardenal herrera ceu' ||
      user.stu_data.university === 'universidad carlos iii de madrid uc3m' ||
      user.stu_data.university ===
        'universidad católica de valencia san vicente mártir' ||
      user.stu_data.university === 'universidad católica san antonio ucam' ||
      user.stu_data.university === 'universidad ceu san pablo' ||
      user.stu_data.university === 'universidad complutense de madrid ucm' ||
      user.stu_data.university === 'universidad de alcalá de henares uah' ||
      user.stu_data.university === 'universidad de alicante ua' ||
      user.stu_data.university === 'universidad de almería ual' ||
      user.stu_data.university === 'universidad de barcelona ub' ||
      user.stu_data.university === 'universidad de burgos ubu' ||
      user.stu_data.university === 'universidad de cádiz uca' ||
      user.stu_data.university === 'universidad de cantabria unican' ||
      user.stu_data.university === 'universidad de castilla-la mancha' ||
      user.stu_data.university === 'universidad de córdoba uco' ||
      user.stu_data.university === 'universidad de extremadura unex' ||
      user.stu_data.university === 'universidad de granada ugr' ||
      user.stu_data.university === 'universidad de huelva uhu' ||
      user.stu_data.university === 'universidad de jaén ujaen' ||
      user.stu_data.university === 'universidad de la laguna ull' ||
      user.stu_data.university === 'universidad de la rioja unirioja' ||
      user.stu_data.university === 'universidad de las hespérides' ||
      user.stu_data.university ===
        'universidad de las palmas de gran canaria ulpgc' ||
      user.stu_data.university === 'universidad de león unileon' ||
      user.stu_data.university === 'universidad de málaga' ||
      user.stu_data.university === 'universidad de marbella' ||
      user.stu_data.university === 'universidad de murcia um' ||
      user.stu_data.university === 'universidad de oviedo' ||
      user.stu_data.university === 'universidad de salamanca usal' ||
      user.stu_data.university === 'universidad de santiago de compostela' ||
      user.stu_data.university === 'universidad de sevilla us' ||
      user.stu_data.university === 'universidad de valladolid uva' ||
      user.stu_data.university === 'universidad de zaragoza unizar' ||
      user.stu_data.university === 'universidad del atlántico medio' ||
      user.stu_data.university ===
        'universidad del país vasco / euskal herriko unibertsitatea' ||
      user.stu_data.university === 'universidad eclesiástica san dámaso' ||
      user.stu_data.university === 'universidad europea de canarias' ||
      user.stu_data.university === 'universidad europea de madrid uem' ||
      user.stu_data.university === 'universidad europea del atlántico' ||
      user.stu_data.university === 'universidad fernando pessoa canarias' ||
      user.stu_data.university === 'universidad francisco de vitoria ufv' ||
      user.stu_data.university ===
        'universidad internacional de andalucía unia' ||
      user.stu_data.university === 'universidad internacional de la rioja' ||
      user.stu_data.university === 'universidad internacional de valencia' ||
      user.stu_data.university ===
        'universidad internacional isabel i de castilla' ||
      user.stu_data.university ===
        'universidad internacional menéndez pelayo uimp' ||
      user.stu_data.university === 'universidad loyola andalucía' ||
      user.stu_data.university ===
        'universidad miguel hernández de elche umh' ||
      user.stu_data.university ===
        'universidad nacional de educación a distancia uned' ||
      user.stu_data.university === 'universidad pablo de olavide upo' ||
      user.stu_data.university ===
        'universidad politécnica de cartagena upct' ||
      user.stu_data.university === 'universidad politécnica de madrid upm' ||
      user.stu_data.university === 'universidad pontificia comillas' ||
      user.stu_data.university === 'universidad pontificia de salamanca' ||
      user.stu_data.university === 'universidad pública de navarra unavarra' ||
      user.stu_data.university === 'universidad rey juan carlos urjc' ||
      user.stu_data.university === 'universidad san jorge usj' ||
      user.stu_data.university === 'universidad villanueva uv' ||
      user.stu_data.university === 'universidade da coruña udc' ||
      user.stu_data.university === 'universidade de vigo uvigo' ||
      user.stu_data.university === 'universitat abat oliba ceu uao' ||
      user.stu_data.university === 'universitat autónoma de barcelona uab' ||
      user.stu_data.university === 'universitat de girona udg' ||
      user.stu_data.university === 'universitat de les illes balears uib' ||
      user.stu_data.university === 'universitat de lleida udl' ||
      user.stu_data.university === 'universitat de valencia uv' ||
      user.stu_data.university === 'universitat de vic uvic' ||
      user.stu_data.university ===
        'universitat internacional de catalunya uic' ||
      user.stu_data.university === 'universitat jaume i uji' ||
      user.stu_data.university === 'universitat politécnica de catalunya upc' ||
      user.stu_data.university === 'universitat politécnica de valencia upv' ||
      user.stu_data.university === 'universitat pompeu fabra upf' ||
      user.stu_data.university === 'universitat ramon llull url' ||
      user.stu_data.university === 'universitat rovira i virgilu urv'
    ) {
      //Save university and unhandled uni_email structure in another collection
      await unhandledEmailsController.createUnhandledEmailEntry(
        user.stu_data.university,
        stu_email
      );
      return link;
    } else {
      throw new Error(
        '[Controller] La dirección de correo no pertenece a tu universidad'
      );
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

//Updates stu_email and stu_verified to true
const verifyStudentAccount = async (user, stu_email, IP_Address) => {
  try {
    user.stu_email = stu_email;
    user.stu_verified = true;
    user.updatedAt = new Date();

    const verified_student = await store.update(user);

    //Send FB Conversions API info here (Start)
    last_step_successful_stu_validation(IP_Address, user);
    //Send FB Conversions API info here (end)

    return verified_student;
  } catch (error) {
    throw new Error(error.message);
  }
};

const changePassword = async (userID, currentPassword, newPassword) => {
  if (!userID || !currentPassword || !newPassword) {
    throw new Error('[user Controller] Faltan datos');
  }

  try {
    const user = await store.getById(userID);

    //Checking if current password is correct
    const checkCurrentPassword = await verifyPassword(
      currentPassword,
      user.password
    );
    if (!checkCurrentPassword) {
      throw new Error('[user Controller] El password actual es incorrecto');
    }

    //Hashing new password
    const encPass = await hashPassword(newPassword, 12);

    user.password = encPass;

    const modifiedUser = await store.update(user);
    return modifiedUser;
  } catch (error) {
    throw new Error(error.message);
  }
};

const deleteUser = async (id) => {
  try {
    const user = await store.getById(id);
    const deleted_user = await store.deleteUser(user);
    return deleted_user;
  } catch (error) {
    throw new Error('[Use controller error]', error);
  }
};

const checkIfUserExists = async (userID) => {
  const userExists = await store.userExists(userID);
  //returns true or false
  return userExists;
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
  editProfile,
  changePassword,
  deleteUser,
  checkIfUserExists,
};
