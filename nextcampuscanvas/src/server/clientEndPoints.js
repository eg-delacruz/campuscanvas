const LOCAL_API = process.env.NEXT_PUBLIC_API_LOCAL;
const PRODUCTION_API = process.env.NEXT_PUBLIC_API_URL;

const VERSION = process.env.NEXT_PUBLIC_API_URL_VERSION;

//change this to production URL when uploading to server
const API = LOCAL_API;

const endPoints = {
  user: {
    //Creates link to reset password
    forgotPassword: (id, token) =>
      `${API}/api/${VERSION}/user/pass_reset/${id}/${token}`,
    //Creates link to verify student account
    verifyStuEmail: (id, token) =>
      `${API}/api/${VERSION}/user/verify_stu_acc/${id}/${token}`,
    resetPassword: (id, token, email) =>
      `${API}/auth/reset-password/${id}/${token}/${email}`,
  },
};

export default endPoints;
