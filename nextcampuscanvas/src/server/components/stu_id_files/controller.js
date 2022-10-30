import { s3Uploadv3_stu_id_files } from '@server/services/AWS3/s3Service';
import store from '@server/components/stu_id_files/store';

const uploadStudentIdFiles = async (files, user_acc_id) => {
  if (!user_acc_id) {
    throw new Error('El id de usuario es necesario');
  }
  try {
    const userAlreadyHasFiles = await store.userAlreadyHasStuIdFiles(
      user_acc_id
    );
    if (userAlreadyHasFiles) {
      throw new Error(
        'El usuario ya ha subido su identificación anteriormente.'
      );
    }

    const uploaded_files = await s3Uploadv3_stu_id_files(files);

    const stuIdFilesData = {
      userID: user_acc_id,
      stu_id_files: uploaded_files,
    };

    const files_from_DB = await store.add(stuIdFilesData);
  } catch (error) {
    console.log('[stu_id_files controller error]' + error.message);
    throw new Error(error.message);
  }
};

module.exports = { uploadStudentIdFiles };
