import { AUTH_USER, LOADING, ERROR } from '@reduxtypes/authTypes';
import Cookie from 'js-cookie';
import { signIn } from 'next-auth/react';

//Endpoints
import endPoints from '@services/api';

const localAPI = process.env.NEXT_PUBLIC_API_PROFILE;

export const login = (email, password) => async (dispatch) => {
  dispatch({
    type: LOADING,
  });
  try {
    const auth = await signIn('credentials', {
      redirect: false,
      email: email,
      password: password,
    });
    if (auth.error) {
      return dispatch({
        type: ERROR,
        payload: 'Usuario o contraseña incorrectos',
      });
    }

    //TODO: aquí hay que pedir al usuario, pues aquí ya está autenticado!!!
    // const response = await fetch(localAPI, {
    //   method: 'GET',
    //   headers: {
    //     accept: '*/*',
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({ email }),
    // });
    // const user = await response.json();
    // console.log(user);
    // dispatch({
    //   type: AUTH_USER,
    //   payload: user,
    // });

    // TODO: asignar tiempo de expiración de sesión

    //TODO: Investigar para qué es el bearer y si hay algo como eso en next auth
    // const response = await fetch(endPoints.auth.login, {
    //   method: 'GET',
    //   headers: {
    //     authorization: `Bearer ${access_token}`,
    //   },
    // });
    // const user = await response.json();

    // dispatch({
    //   type: AUTH_USER,
    //   payload: user,
    // });

    //If error on response.
    //TODO: Al hacer api, enviar un error de respuesta para provar este manejo de error
  } catch (error) {
    dispatch({
      type: ERROR,
      payload: 'Error al iniciar sesión' + error.message,
    });
  }
};

export const signOut = () => {};

export const register = (email, password) => async (dispatch) => {
  dispatch({
    type: LOADING,
  });

  try {
    const respuesta = await fetch(localAPI, {
      method: 'POST',
      headers: {
        accept: '*/*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: email, password: password }),
    });
    const data = await respuesta.json();

    //If user already exists
    if (data.error === 'El email ya existe') {
      return dispatch({
        type: ERROR,
        payload: data.error,
      });
    }

    //TODO: hacer manejo de guardado de token

    return dispatch({
      type: AUTH_USER,
      payload: data,
    });

    //If error on response.
  } catch (error) {
    dispatch({
      type: ERROR,
      payload: 'Error al registrar usuario ' + error.message,
    });
  }
};
