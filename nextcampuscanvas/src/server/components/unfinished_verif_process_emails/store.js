import dbConnect from '@server/dbConnect';
import config from '@server/config';
dbConnect(config.dbURL);

//Model
import UnverifAcc from '@server/components/unfinished_verif_process_emails/model';

/////////////////////Add UnverifAcc//////////////////////////////
//TODO: first check if user already exists
// -> Not sure if this es needed, test it before
const addUnverifAcc = async (unverifAcc) => {
  return await UnverifAcc.create(unverifAcc);
};

const getUnverifAccByEmail = async (email) => {
  const unverifAcc = await UnverifAcc.findOne({
    email,
  });
  //Uncomment this if errors, or erase if everything ok
  // if (!unverifAcc) {
  //   console.log('[db] Usuario no encontrado');
  //   throw new Error('Usuario no encontrado');
  // }
  return unverifAcc;
};

/////////////////////Eliminate UnverifAcc//////////////////////////////

const deleteUnverifAcc = async (unverifAcc) => {
  const deletedUnverifAcc = await unverifAcc.deleteOne();
  return deletedUnverifAcc;
};

module.exports = {
  add: addUnverifAcc,
  getByEmail: getUnverifAccByEmail,
  delete: deleteUnverifAcc,
};
