import dbConnect from '@server/dbConnect';
import config from '@server/config';
dbConnect(config.dbURL);

//Model
import StuIdFiles from '@server/components/stu_id_files/model';

/////////////////////Save stuIdFiles in AWS//////////////////////////////
const createStuIdFiles = async (stuIdFilesData) => {
  //Since the userID has to be unique, Mongo does not let
  //a user upload twice, unles its files are deleted
  return await StuIdFiles.create(stuIdFilesData);
};

/////////////Check if user already uploaded any files//////////////////////
const userAlreadyHasStuIdFiles = async (userID) => {
  const exists = await StuIdFiles.exists({
    userID: userID,
  });
  if (exists) {
    return true;
  }
  return false;
};

/////////////Delete stuIdFiles from DB//////////////////////
const deleteStuIdFiles = async (userID) => {
  let erased_files;
  const files = await StuIdFiles.findOne({
    userID,
  });
  if (files) {
    erased_files = await files.deleteOne();
  }
  return erased_files;
};

module.exports = {
  add: createStuIdFiles,
  userAlreadyHasStuIdFiles,
  delete: deleteStuIdFiles,
};
