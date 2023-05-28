//Diferencias de v2 respecto a v1:
//1. Endpoints utilizados aquí centan con la nueva forma de asegurar y de evitar el error de CORS (mas compacta), y la secret key se hashea al enviarla
//2. En los casos en que se pedía una website location, ahora se pide un required_info, para que sea agnóstico al lugar donde se use

//Next api (start)
const LOCAL_API = process.env.NEXT_PUBLIC_API_LOCAL;
const PRODUCTION_API = process.env.NEXT_PUBLIC_API_URL;
const VERSION = process.env.NEXT_PUBLIC_API_URL_VERSION_2;

//Befor sending to production and npm build, change the API URL to the production one
const API = LOCAL_API;
//Next api (end)

//Aquí se podría agregar la api del node server (ver api/index.js)

const endPoints = {
  admin: {
    students: {
      checkIfPendingValidationsAvailable: `${API}/api/${VERSION}/admin/estudiantes/verify_by_stu_id`,
      getVerifiedStudentsCount: `${API}/api/${VERSION}/admin/estudiantes/verified_students_count`,
      index: `${API}/api/${VERSION}/admin/estudiantes`,
    },
  },
};

export default endPoints;
