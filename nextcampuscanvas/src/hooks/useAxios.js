//https://blog.openreplay.com/integrating-axios-with-react-hooks/
//https://www.npmjs.com/package/axios

//Create an axios custom hook
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

//TODO: explore the functionallity of this hook. Also investigate the type of the method, which I think should be a string and lowercase.
//TODO: encrypt the app_secret_key
const useAxios = (url, method, payload, extraHeaders) => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

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

  //Allow users to cancel the request
  const controllerRef = useRef(new AbortController());
  const cancel = () => {
    controllerRef.current.abort();
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await axios.request({
          data: payload,
          signal: controllerRef.current.signal,
          method,
          url,
          headers,
        });
        setResponse(res.data);
      } catch (error) {
        setError(error.message);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  return { response, error, loading, cancel };
};

export default useAxios;

useAxios.propTypes = {
  url: PropTypes.string.isRequired,
  method: PropTypes.string.isRequired,
  payload: PropTypes.object,
  extraHeaders: PropTypes.object,
};
