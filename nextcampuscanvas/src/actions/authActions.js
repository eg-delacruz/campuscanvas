import { AUTH_USER, LOADING, ERROR } from '@reduxtypes/authTypes';
import Cookie from 'js-cookie';

//Endpoints
import endPoints from '@services/api';

export const signIn = (email, password) => async (dispatch) => {
  dispatch({
    type: LOADING,
  });
  try {
    const respuesta = await fetch(endPoints.auth.login, {
      method: 'POST',
      headers: {
        accept: '*/*',
        'Content-Type': 'application/json',
      },
      //stingify convierte un objeto en un string
      body: JSON.stringify({ email: email, password: password }),
    });
    const data = await respuesta.json();

    //If response is invalid
    if (data.statusCode === 401) {
      return dispatch({
        type: ERROR,
        payload: 'Usuario o contraseña incorrectos',
      });
    }

    //If access approved
    const { access_token } = data;
    //Guardamos el token en el navegador. Expira en 5 días
    Cookie.set('token', access_token, { expires: 5 });

    const response = await fetch(endPoints.auth.profile, {
      method: 'GET',
      headers: {
        authorization: `Bearer ${access_token}`,
      },
    });
    const user = await response.json();

    dispatch({
      type: AUTH_USER,
      payload: user,
    });

    //If error on response.
    //TODO: Al hacer api, enviar un error de respuesta para provar este manejo de error
  } catch (error) {
    dispatch({
      type: ERROR,
      payload: 'Error al iniciar sesión' + error.message,
    });
  }
};
