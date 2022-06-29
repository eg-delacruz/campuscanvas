//Aquí manejaremos todos los puntos de entrada de la API desde el FRONT!!

const LOCAL_API = process.env.NEXT_PUBLIC_API_LOCAL;
const PRODUCTION_API = process.env.NEXT_PUBLIC_API_URL;

const VERSION = process.env.NEXT_PUBLIC_API_URL_VERSION;

//Befor sending to production and npm build, change the API URL to the production one
const API = PRODUCTION_API;

const endPoints = {
  auth: {
    forgotPassword: `${API}/api/${VERSION}/user/pass-forgot`,
    resetPassword: (id, token) =>
      `${API}/api/${VERSION}/user/pass_reset/${id}/${token}`,
    verifyStuEmail: `${API}/api/${VERSION}/user/verif_email`,
  },
  user: {
    create: `${API}/api/v1/user/create_user`,
    getUser: (id) => `${API}/api/${VERSION}/user/${id}`,
    updateStuInfo: `${API}/api/${VERSION}/user/index`,
    deleteUser: (id) => `${API}/api/${VERSION}/user/${id}`,
    changePassword: `${API}/api/${VERSION}/user/index`,
  },
  orders: {
    isAllowedToOrder: (userID, account_email, stu_id, stu_email) =>
      `${API}/api/${VERSION}/box_order/${userID}/${account_email}/${stu_id}/${stu_email}`,
  },
};

export default endPoints;
