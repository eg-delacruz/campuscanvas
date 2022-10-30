//Aquí manejaremos todos los puntos de entrada de la API desde el FRONT!!

//Next api (start)
const LOCAL_API = process.env.NEXT_PUBLIC_API_LOCAL;
const PRODUCTION_API = process.env.NEXT_PUBLIC_API_URL;
const VERSION = process.env.NEXT_PUBLIC_API_URL_VERSION;

//Befor sending to production and npm build, change the API URL to the production one
const API = PRODUCTION_API;
//Next api (end)

//Node server api (start)
const LOCAL_NODE_SERVER_API = process.env.NEXT_PUBLIC_NODE_SERVER_API_LOCAL;
const PRODUCTION_NODE_SERVER_API =
  process.env.NEXT_PUBLIC_PRODUCTION_NODE_SERVER_API;
const NODE_SERVER_VERSION = process.env.NEXT_PUBLIC_NODE_SERVER_API_URL_VERSION;

const NODE_SERVER_API = LOCAL_NODE_SERVER_API;
//Node server api (end)

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
    getUserOrders: (userID) =>
      `${API}/api/${VERSION}/box_order/orders/${userID}`,
  },
  admin: {
    createPdfContract: `${API}/api/${VERSION}/admin/clientes/contract/contract`,
    manageAdmins: `${API}/api/${VERSION}/admin/master/manage_admins`,
  },
  file_management: {
    student_acc_files: {
      stu_id_files: `${API}/api/${VERSION}/file_management/student_acc_files/stu_id_files`,
    },
  },
};

export default endPoints;
