import axios from 'axios';
import { hashPassword } from '@server/services/passEncript';

const axiosFetcher = async ({ url, method, payload, extraHeaders }) => {
  //Handling headers
  const defaultHeaders = {
    accept: '*/*',
    'Content-Type': 'application/json',
    app_secret_key: await hashPassword(
      process.env.NEXT_PUBLIC_MAIN_NEXT_WEB_APP_SECRET_KEY
    ),
  };

  let headers;
  if (extraHeaders) {
    headers = { ...defaultHeaders, ...extraHeaders };
  } else {
    headers = { ...defaultHeaders };
  }

  try {
    const response = await axios({
      data: payload,
      method,
      url,
      headers,
    });
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export default axiosFetcher;
