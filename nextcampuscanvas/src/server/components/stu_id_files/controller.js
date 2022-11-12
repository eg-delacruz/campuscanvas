import { s3Uploadv3_stu_id_files } from '@server/services/AWS3/s3Service';
import store from '@server/components/stu_id_files/store';
import pending_stu_id_acc_validation_Controller from '@server/components/pending_stu_id_acc_validation/controller';

const uploadStudentIdFiles = async (files, user_acc_id, account_email) => {
  if (!user_acc_id) {
    console.log(
      '[stu_id_files controller error] El id de usuario es necesario'
    );
    throw new Error('El id de usuario es necesario');
  }

  //Checking if user already uploaded files before
  try {
    const userAlreadyHasFiles = await store.userAlreadyHasStuIdFiles(
      user_acc_id
    );
    if (userAlreadyHasFiles) {
      throw new Error(
        'El usuario ya ha subido su identificación anteriormente.'
      );
    }

    //Uploading files to AWS3
    const uploaded_files = await s3Uploadv3_stu_id_files(files);

    const stuIdFilesData = {
      userID: user_acc_id,
      stu_id_files: uploaded_files,
      createdAt: new Date(),
    };

    //Saving file URLs in DB
    const stu_id_files = await store.add(stuIdFilesData);

    //Creating new pending validation entry
    await pending_stu_id_acc_validation_Controller.createNewStuIdAccPendingValidationEntry(
      user_acc_id,
      account_email,
      stu_id_files
    );
  } catch (error) {
    console.log('[stu_id_files controller error]' + error.message);
    throw new Error(error.message);
  }
};

module.exports = { uploadStudentIdFiles };
