import store from '@server/components/admin/admin_settings/store';

const getAdminSettings = async (userID) => {
  try {
    const settings = await store.get(userID);
    return settings;
  } catch (error) {
    console.error(
      '[admin_settings controller | getAdminSettings function error]' +
        error.message
    );
    throw new Error(error.message);
  }
};

const updateAdminSettings = async (
  userID,
  settings_to_update,
  update_value
) => {
  //Check if required parameters were received
  if (!userID || !settings_to_update || !update_value) {
    console.error(
      '[admin_settings controller | updateAdminSettings function error] No se recibieron los parámetros requeridos'
    );
    throw new Error('No se recibieron los parámetros requeridos');
  }

  let updated_settings;

  //Check if admin settings exist
  const adminSettings = await store.get(userID);

  //If not, create them with the incoming settings
  if (adminSettings === null) {
    const settingsObj = {};
    settingsObj[settings_to_update] = update_value;

    updated_settings = await store.add(userID, settingsObj);
  } else {
    adminSettings.settings[settings_to_update] = update_value;
    updated_settings = await store.update(adminSettings);
  }

  //Return updated admin settings
  return updated_settings;
};

module.exports = {
  getAdminSettings,
  updateAdminSettings,
};
