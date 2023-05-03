import dbConnect from '@server/dbConnect';
import config from '@server/config';
dbConnect(config.dbURL);

//Model
import UnhandledEmailEntry from '@server/components/unhandledEmails/model';

/////////////////////Add entry//////////////////////////////

const addunhandledEmailEntry = async (unhandledEmailEntry) => {
  return await UnhandledEmailEntry.create(unhandledEmailEntry);
};

/////////////////////Get all entries//////////////////////////////
const getAll = async () => {
  return await UnhandledEmailEntry.find();
};

module.exports = {
  add: addunhandledEmailEntry,
  getAll,
};
