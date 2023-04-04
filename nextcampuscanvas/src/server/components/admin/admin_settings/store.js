import dbConnect from '@server/dbConnect';
import config from '@server/config';
dbConnect(config.dbURL);

//Model
import AdminSettings from '@server/components/admin/admin_settings/model';

///////////////////// Create admin settings //////////////////////////////
const createAdminSettings = async (userID, adminSettings) => {
  return await AdminSettings.create({ userID, settings: adminSettings });
};
///////////////////// Get admin settings //////////////////////////////
const getAdminSettings = async (userID) => {
  return await AdminSettings.findOne({ userID });
};
///////////////////// Update admin settings //////////////////////////////
const updateAdminSettings = async (settings) => {
  settings.markModified('settings');
  const updatedSettings = await settings.save();
  return updatedSettings;
};

module.exports = {
  add: createAdminSettings,
  update: updateAdminSettings,
  get: getAdminSettings,
};
