import dbConnect from '@server/dbConnect';
import config from '@server/config';
dbConnect(config.dbURL);

//Model
import UnhandledEmailEntry from '@server/components/unhandledEmails/model';

/////////////////////Add user//////////////////////////////

const addunhandledEmailEntry = async (unhandledEmailEntry) => {
  return await UnhandledEmailEntry.create(unhandledEmailEntry);
};

module.exports = {
  add: addunhandledEmailEntry,
};
