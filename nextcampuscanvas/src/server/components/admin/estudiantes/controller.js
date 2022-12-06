//Controllers
import userCotroller from '@server/components/user/controller';
import box_orderController from '@server/components/box_order/controller';

//Stores
import stu_id_filesStore from '@server/components/stu_id_files/store';

//Function used to erase sensitive data
const cleanUserForClient = (user) => {
  let userClean = user.toObject();
  delete userClean.password;
  delete userClean.__v;
  return userClean;
};

const getAllUserDataByAccEmail = async (accEmail) => {
  try {
    const user = await userCotroller.getUserByEmail(accEmail);
    if (user.role === 'admin' || user.role === 'super_admin') {
      throw new Error('No tienes acceso a los datos de esta cuenta');
    }
    //Returns object
    const cleanUser = cleanUserForClient(user);

    const userID = cleanUser._id.toString();

    //Returns object, empty if no files. If files, go to response.stuIdFiles, this contains array with stuIdFiles
    const stuIdFiles = await stu_id_filesStore.getStuIdFilesByUserID(userID);

    //Returns array, empty if no orders
    const boxOrders = await box_orderController.getBoxOrdersByUser(userID);

    const userData = {
      user: cleanUser,
      stuIdFiles,
      boxOrders,
    };
    return userData;
  } catch (error) {
    console.log('[Admin estudiantes controller]', error);
    throw new Error(error);
  }
};

module.exports = {
  getAllUserDataByAccEmail,
};
