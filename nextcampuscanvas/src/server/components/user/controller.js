import store from '@server/components/user/store';
import { hashPassword, verifyPassword } from '@server/services/passEncript';
import jwt from 'jsonwebtoken';

//Sendinblue api (for email marketing)
import sendinblue from '@server/services/sendinblue/sendinblue';

//clientEndpoints
import clientEndPoints from '@server/clientEndPoints';

//Other controllers
//Add/delete accounts from unverified student accounts collection in DB
import unfinished_verif_process_emails_Controller from '@server/components/unfinished_verif_process_emails/controller';
import unhandledEmailsController from '@server/components/unhandledEmails/controller';

//Stores (imported becaus controllers cannot be imported inside eachother)
import pendingStuIdAccValidationStore from '@server/components/pending_stu_id_acc_validation/store';
import stuIdFilesStore from '@server/components/stu_id_files/store';

//Mailer
import {
  sendAccValidatedByStuIdMail,
  sendRejectedAccValidationByStuId,
} from '@server/services/mailer/CC_info@google';

//AWS3
import { s3Deletev3_stu_id_files } from '@server/services/AWS3/s3Service';

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

const registerUser = (
  email,
  user_name,
  password,
  newsletter,
  IP_Address,
  browserName
) => {
  return new Promise(async (resolve, reject) => {
    if (!email || !user_name || !password || !email.includes('@')) {
      console.error('[userController] No hay email, nickname o password');
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
      nickname: user_name,
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

      //Adding user to unverified accounts collection for retarget email sending
      //in case the user leaves verification process
      await unfinished_verif_process_emails_Controller.createUnverifAccEntry(
        addedUser.email
      );

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
  gender,
  university,
  faculty,
  academic_degree,
  browserName,
  IP_Address
) => {
  try {
    const user = await store.getById(id);

    user.gender = gender.toLowerCase();
    user.stu_data.university = university.toLowerCase();
    user.stu_data.faculty = faculty.toLowerCase();
    user.stu_data.academic_degree = academic_degree.toLowerCase();
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
    console.error(error);
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
      stu_email.includes('@live') ||
      //In the long run, erase this (@lacasa.es)
      stu_email.includes('@lacasa.es')
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
      user.stu_data.university === 'universitat rovira i virgili urv'
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

    //Deleting user from unverified accounts collection to avoid sending
    //an email to finish verification process, since student already verified
    await unfinished_verif_process_emails_Controller.deleteUnverifAccEntry(
      user.email
    );

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

    const responses = await Promise.all([
      //Delete user
      store.deleteUser(user),
      //Erase from unverifAccs collection (if applies)
      unfinished_verif_process_emails_Controller.deleteUnverifAccEntry(
        user.email
      ),
      //Erase stu id files
      stuIdFilesStore.delete(id),

      //Erase user from pending validations (if applies)
      pendingStuIdAccValidationStore.delete(id),
    ]);

    const [
      deleted_user,
      unverif_acc_coll_response,
      erased_files,
      pendingStuIdValidationsStoreResponse,
    ] = responses;

    if (erased_files) {
      const erased_files_array = erased_files.stu_id_files;

      //Erase files from AWS3
      await s3Deletev3_stu_id_files(erased_files_array);
    }

    return deleted_user;
  } catch (error) {
    console.log('[Use controller error]', error);
    throw new Error('[Use controller error]', error);
  }
};

const checkIfUserExists = async (userID) => {
  const userExists = await store.userExists(userID);
  //returns true or false
  return userExists;
};

//To create an admin, an account needs to be created first
const createAdmin = async (master_id, new_admin_email, master_password) => {
  const masterAdmin = await getUserByEmail('eg.cruzvalle@gmail.com');
  const masterAdminId = masterAdmin._id.toString();

  //Avoid revoking master admin
  if (new_admin_email === masterAdmin.email) {
    throw new Error('[Use controller error] Action not allowed');
  }

  //Checking if Master admin is opperating
  if (masterAdminId != master_id) {
    throw new Error('[Use controller error] Forbidden user');
  }

  //Checking if master password is correct
  const checkPassword = await verifyPassword(
    master_password,
    masterAdmin.password
  );
  if (!checkPassword) {
    throw new Error('[Use controller error] Password incorrecto');
  }

  //Create new admin
  try {
    const new_admin = await getUserByEmail(new_admin_email);
    new_admin.role = 'admin';
    await store.update(new_admin);
  } catch (error) {
    throw new Error('[Use controller error]', error);
  }
};

const revokeAdmin = async (
  master_id,
  to_revoke_admin_email,
  master_password
) => {
  const masterAdmin = await getUserByEmail('eg.cruzvalle@gmail.com');
  const masterAdminId = masterAdmin._id.toString();

  //Avoid revoking master admin
  if (to_revoke_admin_email === masterAdmin.email) {
    throw new Error('[Use controller error] Action not allowed');
  }

  //Checking if Master admin is opperating
  if (masterAdminId != master_id) {
    throw new Error('[Use controller error] Forbidden user');
  }

  //Checking if master password is correct
  const checkPassword = await verifyPassword(
    master_password,
    masterAdmin.password
  );
  if (!checkPassword) {
    throw new Error('[Use controller error] Password incorrecto');
  }

  try {
    //Revoke admin
    const admin_to_revoke = await getUserByEmail(to_revoke_admin_email);
    admin_to_revoke.role = 'user';
    await store.update(admin_to_revoke);
  } catch (error) {
    throw new Error('[User controller error]', error);
  }
};

const getAllAdmins = async (master_id) => {
  const masterAdmin = await getUserByEmail('eg.cruzvalle@gmail.com');
  const masterAdminId = masterAdmin._id.toString();

  //Checking if Master admin is opperating
  if (masterAdminId != master_id) {
    throw new Error('[Use controller error] Forbidden user');
  }

  //Getting all admins
  try {
    const admins = await store.getAdmins();
    return admins;
  } catch (error) {
    throw new Error('[User controller error]', error);
  }
};

const manuallyVerifyStuAccByStuId = async (userID, stu_id, IP_Address) => {
  try {
    const user = await getUserById(userID);
    //Check if student hasn´t been validated before
    //If this function is implemented in a Network.js, handle this error and respond accordingly
    if (user.stu_verified) {
      console.log(
        '[User controller] Esta cuenta ya ha sido verificada anteriormente'
      );
      return 'Already verified';
    }

    //If this function is implemented in a Network.js, handle this error and respond accordingly
    if (user.stu_data.university === '') {
      console.log('[User controller error] Register step 2 missing');
      return 'Register step 2 missing';
    }

    //Check if student id has already been used for that uni
    const IDLegitimacy = await store.verifyStuIdLegitimacy(user, stu_id);

    //If this function is implemented in a Network.js, handle this error and respond accordingly
    if (IDLegitimacy === 'Invalid ID') {
      console.log('[User controller error] Invalid ID');
      return 'Invalid ID';
    }

    //Validate user
    user.stu_id = stu_id;
    user.stu_verified = true;
    user.updatedAt = new Date();

    await store.update(user);

    //Erase user from pending validations (if applies)
    await pendingStuIdAccValidationStore.delete(userID);

    //Erase from unverifAccs collection (if applies)
    await unfinished_verif_process_emails_Controller.deleteUnverifAccEntry(
      user.email
    );

    //Send FB Conversions API info here (Start)
    last_step_successful_stu_validation(IP_Address, user);
    //Send FB Conversions API info here (end)

    //Send confirmation email to user
    await sendAccValidatedByStuIdMail(user.email);
  } catch (error) {
    console.log('[User controller]', error);
    throw new Error(error);
  }
};

const manuallyRejectAccVerifByStuId = async (
  userID,
  user_email,
  reject_reason
) => {
  try {
    //Erase user from pending validations (if applies)
    await pendingStuIdAccValidationStore.delete(userID);

    //Erase files from stuidfiles collection in DB (if applies)
    const erased_files = await stuIdFilesStore.delete(userID);
    const erased_files_array = erased_files.stu_id_files;

    //Erase files from AWS3
    await s3Deletev3_stu_id_files(erased_files_array);

    //Send email depending on reject reason
    let body_reason;
    if (reject_reason === 'Error al abrir documento') {
      body_reason =
        'Al intentar abrir los archivos, no hemos podido visualizarlos.';
    }
    if (reject_reason === 'El documento no es un ID de estudiante') {
      body_reason =
        'El documento que nos has enviado no es un ID de estudiante.';
    }
    if (reject_reason === 'Documento no valido') {
      body_reason = 'El documento que nos has enviado no es válido.';
    }

    await sendRejectedAccValidationByStuId(user_email, body_reason);
  } catch (error) {
    console.log('[User controller]', error);
    throw new Error(error);
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
  editProfile,
  changePassword,
  deleteUser,
  checkIfUserExists,
  createAdmin,
  revokeAdmin,
  getAllAdmins,
  manuallyVerifyStuAccByStuId,
  manuallyRejectAccVerifByStuId,
};
