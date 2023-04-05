//Services
import axiosFetcher from '@services/axiosFetcher';

//Endpoints
import endPoints from '@services/api';

const getAdminSettings = async () => {
  const response = await axiosFetcher({
    url: endPoints.admin.getAdminSettings,
    method: 'get',
  });

  if (response.error) {
    console.log(response.error);
    throw new Error(response.error);
  }

  return response.body;
};

const updateAdminSettings = async ({ settings_to_update, update_value }) => {
  const response = await axiosFetcher({
    url: endPoints.admin.updateAdminSettings,
    method: 'patch',
    payload: {
      settings_to_update,
      update_value,
    },
  });

  if (response.error) {
    console.log(response.error);
    throw new Error(response.error);
  }

  return response.body;
};

export default {
  getAdminSettings,
  updateAdminSettings,
};
