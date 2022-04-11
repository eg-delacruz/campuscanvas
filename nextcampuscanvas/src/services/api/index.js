//Aquí manejaremos todos los puntos de entrada de la API desde el FRONT!!

//const API = process.env.NEXT_PUBLIC_API_URL;
//const VERSION = process.env.NEXT_PUBLIC_API_VERSION;

const API = process.env.NEXT_PUBLIC_API_URL_CC;
const VERSION = process.env.NEXT_PUBLIC_API_URL_CC_VERSION;

const endPoints = {
  auth: {
    //TODO: borrar ruta de prueba
    //login: `${API}/api/${VERSION}/auth/login`,
    login: `${API}/api/auth/signup`,
  },
  user: {
    getProfile: (id) => `${API}/api/${VERSION}/user/${id}`,
  },
};

export default endPoints;
