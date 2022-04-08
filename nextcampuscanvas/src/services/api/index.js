//Aquí manejaremos todos los puntos de entrada de la API desde el FRONT!!
//Ver: https://api.escuelajs.co/docs/#/
//Cuando tenga mi propia api, hacer cambios pertinentes

//No olvidar que en Vercel se pueden añadir allá las variables de entorno
const API = process.env.NEXT_PUBLIC_API_URL;
const VERSION = process.env.NEXT_PUBLIC_API_VERSION;

const API_CC = process.env.NEXT_PUBLIC_API_URL_CC;
const VERSION_CC = process.env.NEXT_PUBLIC_API_URL_CC_VERSION;

const endPoints = {
  auth: {
    login: `${API}/api/${VERSION}/auth/login`,
    //Ruta para obtener perfil de usuario luego de haber iniciado sesión
    profile: `${API}/api/${VERSION}/auth/profile`,
    register: `${API_CC}/api/auth/signup`,
  },
};

export default endPoints;
