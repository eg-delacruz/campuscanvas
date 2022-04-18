//Aquí manejaremos todos los puntos de entrada de la API desde el FRONT!!

const LOCAL_API = process.env.NEXT_PUBLIC_API_LOCAL;
const PROD_API = process.env.NEXT_PUBLIC_API_URL;

const VERSION = process.env.NEXT_PUBLIC_API_URL_VERSION;

//Befor sending to production and npm build, change the API URL to the production one
const API = LOCAL_API;

const endPoints = {
  auth: {
    login: `${API}/api/v1/user`,
    forgotPassword: `${API}/api/${VERSION}/user/pass-forgot`,
    resetPassword: (id, token) =>
      `${API}/api/${VERSION}/user/pass_reset/${id}/${token}`,
  },
  user: {
    getProfile: (id) => `${API}/api/${VERSION}/user/${id}`,
  },
};

export default endPoints;
