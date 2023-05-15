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

const getAdminUsers = async (master_admin_id) => {
  const response = await axiosFetcher({
    url: endPoints.admin.manageAdmins,
    method: 'get',
    extraHeaders: {
      master_admin_id,
    },
  });

  if (response.error) {
    console.log(response.error);
    throw new Error(response.error);
  }

  return response.body;
};

const createNewAdmin = async ({
  master_id,
  new_admin_email,
  master_password,
}) => {
  const response = await axiosFetcher({
    url: endPoints.admin.manageAdmins,
    method: 'post',
    payload: {
      master_id,
      new_admin_email,
      master_password,
    },
  });

  if (response.error) {
    console.log(response.error);
    throw new Error(response.error);
  }

  return response.body;
};

const revokeAdmin = async ({
  master_id,
  master_password,
  new_admin_email: to_revoke_admin_email,
}) => {
  const response = await axiosFetcher({
    url: endPoints.admin.manageAdmins,
    method: 'delete',
    payload: {
      master_id,
      to_revoke_admin_email,
      master_password,
    },
  });

  if (response.error) {
    console.log(response.error);
    throw new Error(response.error);
  }

  return response.body;
};

//Don´t use with react query, since the sintax is different from the rest of the functions
const revalidateRoute = async ({ route }) => {
  const response = await axiosFetcher({
    url: endPoints.admin.revalidateRoute,
    method: 'post',
    payload: {
      route,
    },
  });

  if (response.error) {
    console.log(response.error);
    return response;
  }

  return response.body;
};

export default {
  getAdminSettings,
  updateAdminSettings,
  getAdminUsers,
  createNewAdmin,
  revokeAdmin,
  revalidateRoute,
};
