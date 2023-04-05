//This controller handles all pending student validations by
//student ids, by creating new entries that are displayed in the
//client to manually validate all pending student requests
import store from '@server/components/pending_stu_id_acc_validation/store';

import user_Controller from '@server/components/user/controller';

const createNewStuIdAccPendingValidationEntry = async (
  user_acc_id,
  account_email,
  stu_id_files
) => {
  if (!user_acc_id || !account_email || !stu_id_files) {
    console.log(
      '[pending_stu_id_acc_validation controller error] Datos insuficientes'
    );
    throw new Error('Los datos son insuficientes');
  }

  try {
    const user = await user_Controller.getUserById(user_acc_id);
    const userData = {
      userID: user_acc_id,
      account_email,
      nickname: user.nickname,
      university: user.stu_data.university,
      createdAt: new Date(),
      stu_id_files: stu_id_files._id.toString(),
    };

    const added_entry = await store.add(userData);
  } catch (error) {
    console.log(
      '[pending_stu_id_acc_validation controller error]' + error.message
    );
    throw new Error(error.message);
  }
};

const getOldestEntries = async () => {
  const oldest_entries = await store.getFifteenOldest();
  return oldest_entries;
};

//Check if there are pending validatins (returns true/false)
const getPendingValidationsAvailavility = async () => {
  try {
    const validationsAvailable = await store.validationsAvailable();
    return { validationsAvailable };
  } catch (error) {
    console.log(
      '[pending_stu_id_acc_validation controller error]' + error.message
    );
    throw new Error(error.message);
  }
};

const deleteValidationEntry = async (userID) => {
  try {
    await store.delete(userID);
  } catch (error) {
    console.log(
      '[pending_stu_id_acc_validation controller error]' + error.message
    );
    throw new Error(error.message);
  }
};

module.exports = {
  createNewStuIdAccPendingValidationEntry,
  getOldestEntries,
  getPendingValidationsAvailavility,
  deleteValidationEntry,
};
