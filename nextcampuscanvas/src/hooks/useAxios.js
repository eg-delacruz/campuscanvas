//https://blog.openreplay.com/integrating-axios-with-react-hooks/
//https://www.npmjs.com/package/axios

//Create an axios custom hook
import { useRef } from 'react';
import axios from 'axios';

//TODO: encrypt the app_secret_key
const useAxios = () => {
  //Allow users to cancel the request
  const controllerRef = useRef(new AbortController());
  const cancel = () => {
    controllerRef.current.abort();
  };

  const fetchData = async (url, method, payload, extraHeaders) => {
    //Handling headers
    const defaultHeaders = {
      accept: '*/*',
      'Content-Type': 'application/json',
      app_secret_key: process.env.NEXT_PUBLIC_MAIN_NEXT_WEB_APP_SECRET_KEY,
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
        signal: controllerRef.current.signal,
        method,
        url,
        headers,
      });
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  };

  return { cancel, fetchData };
};

export default useAxios;
