//Component used to upload account emails to DB, so that the cc_nodeserver
//sends an email and erases them from DB if student hasn't validated
//its student account after 24h

import store from '@server/components/unfinished_verif_process_emails/store';

const createUnverifAccEntry = async (email) => {
  try {
    const Acc = {
      email: email,
      creation_date: new Date(),
    };
    const addedAccEntry = await store.add(Acc);
    return addedAccEntry;
  } catch (error) {
    console.error('[unfinished_verif_process_emails]', error);
    throw new Error(error.message);
  }
};

const deleteUnverifAccEntry = async (email) => {
  try {
    const account = await store.getByEmail(email);
    if (!account) {
      throw new Error('Account not found');
    }
    if (account) {
      await store.delete(account);
      return 'Account erased successfully';
    }
  } catch (error) {
    console.error('[unfinished_verif_process_emails]', error);
    throw new Error(error.message);
  }
};

module.exports = {
  createUnverifAccEntry,
  deleteUnverifAccEntry,
};
