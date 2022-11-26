import dbConnect from '@server/dbConnect';
import config from '@server/config';
dbConnect(config.dbURL);

//Model
import pendingStuIdAccValidation from '@server/components/pending_stu_id_acc_validation/model';
//This model will be populated
import StuIdFile from '@server/components/stu_id_files/model';

/////////////////////Create new pending validation//////////////////////////////
const createNewPendingValidation = async (userData) => {
  //Since the userID has to be unique, Mongo does not let
  //a user upload twice, unles its files are deleted
  return await pendingStuIdAccValidation.create(userData);
};

/////////////////////Get the 15 oldest entries//////////////////////////////

const getFifteenOldest = async () => {
  try {
    const responses = await Promise.all([
      pendingStuIdAccValidation
        //Gets all documents
        .find()
        //Get the oldest documents first
        .sort({ _id: 1 })
        .limit(15)
        .populate({ path: 'stu_id_files', model: StuIdFile })
        .exec(),
      pendingStuIdAccValidation.estimatedDocumentCount(),
    ]);

    const response = {
      OldestEntries: responses[0],
      EntriesCount: responses[1],
    };

    return response;
  } catch (error) {
    console.log('[Pending validation store error]', error);
    throw new Error(error);
  }
};

const validationsAvailable = async () => {
  try {
    const validationsAvailable =
      await pendingStuIdAccValidation.estimatedDocumentCount();

    if (validationsAvailable == 0) {
      return false;
    }
    return true;
  } catch (error) {
    console.log('[Pending validation store error]', error);
    throw new Error(error);
  }
};

const deletePendingValidation = async (userID) => {
  const entry = await pendingStuIdAccValidation.findOne({
    userID,
  });
  if (entry) {
    await entry.deleteOne();
  }
};

module.exports = {
  add: createNewPendingValidation,
  getFifteenOldest,
  validationsAvailable,
  delete: deletePendingValidation,
};
