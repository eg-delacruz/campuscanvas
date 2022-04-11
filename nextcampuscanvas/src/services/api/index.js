//Aquí manejaremos todos los puntos de entrada de la API desde el FRONT!!

const API = process.env.NEXT_PUBLIC_API_URL;
const VERSION = process.env.NEXT_PUBLIC_API_URL_VERSION;

const endPoints = {
  auth: {
    login: `${API}/api/auth/signup`,
  },
  user: {
    getProfile: (id) => `${API}/api/${VERSION}/user/${id}`,
  },
};

export default endPoints;
