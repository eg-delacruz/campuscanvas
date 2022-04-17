const LOCAL_API = process.env.NEXT_PUBLIC_API_LOCAL;
const PRODUCTION_API = process.env.NEXT_PUBLIC_API_URL;

//change this to production URL when uploading to server
const API = PRODUCTION_API;

const endPoints = {
  user: {
    forgotPassword: (id, token) =>
      `${API}/api/${process.env.NEXT_PUBLIC_API_URL_VERSION}/user/pass_reset/${id}/${token}`,
    resetPassword: (id, token, email) =>
      `${API}/auth/reset-password/${id}/${token}/${email}`,
  },
};

export default endPoints;
