//Aquí manejaremos todos los puntos de entrada de la API desde el FRONT!!
//Ver: https://api.escuelajs.co/docs/#/
//Cuando tenga mi propia api, hacer cambios pertinentes

//No olvidar que en Vercel se pueden añadir allá las variables de entorno
const API = process.env.NEXT_PUBLIC_API_URL;
const VERSION = process.env.NEXT_PUBLIC_API_VERSION;

const endPoints = {
  auth: {
    login: `${API}/api/${VERSION}/auth/login`,
    profile: `${API}/api/${VERSION}/auth/profile`,
  },
};

export default endPoints;
