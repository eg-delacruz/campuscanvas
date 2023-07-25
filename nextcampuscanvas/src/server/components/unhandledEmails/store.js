import dbConnect from "@server/dbConnect";
import config from "@server/config";
dbConnect(config.dbURL);

//Model
import UnhandledEmailEntry from "@server/components/unhandledEmails/model";

/////////////////////Add entry//////////////////////////////

const addunhandledEmailEntry = async (unhandledEmailEntry) => {
  return await UnhandledEmailEntry.create(unhandledEmailEntry);
};

/////////////////////Get all entries//////////////////////////////
const getAll = async () => {
  return await UnhandledEmailEntry.find();
};

/////////////////////Get by email//////////////////////////////
const getByEmail = async (stu_email) => {
  return await UnhandledEmailEntry.findOne({ stu_email });
};

module.exports = {
  add: addunhandledEmailEntry,
  getAll,
  getByEmail,
};
