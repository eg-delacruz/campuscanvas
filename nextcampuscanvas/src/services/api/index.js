//Aquí manejaremos todos los puntos de entrada de la API desde el FRONT!!

const API = process.env.NEXT_PUBLIC_API_URL;
const VERSION = process.env.NEXT_PUBLIC_API_URL_VERSION;

//Befor sending to production and npm build, change the API URL to the production one
const LOCAL_API = process.env.NEXT_PUBLIC_API_LOCAL;

const endPoints = {
  auth: {
    login: `${LOCAL_API}/api/auth/signup`,
  },
  user: {
    getProfile: (id) => `${LOCAL_API}/api/${VERSION}/user/${id}`,
  },
};

export default endPoints;
