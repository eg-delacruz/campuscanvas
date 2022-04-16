import { AUTH_USER, LOADING, ERROR } from '@reduxtypes/authTypes';
import { signIn } from 'next-auth/react';

//Endpoints
import endPoints from '@services/api';

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

    dispatch({
      type: AUTH_USER,
      payload: null,
    });

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
  } catch (error) {
    dispatch({
      type: ERROR,
      payload: 'Error al iniciar sesión' + error.message,
    });
  }
};

export const register = (email, password) => async (dispatch) => {
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
      body: JSON.stringify({ email: email, password: password }),
    });
    const data = await respuesta.json();

    //If user already exists
    if (data.error === 'Este email ya ha sido registrado anteriormente') {
      return dispatch({
        type: ERROR,
        payload: data.error,
      });
    }

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

    return dispatch({
      type: AUTH_USER,
      payload: null,
    });

    //If error on response.
  } catch (error) {
    dispatch({
      type: ERROR,
      payload: 'Error al registrar usuario ' + error.message,
    });
  }
};
