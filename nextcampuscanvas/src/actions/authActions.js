import { AUTH_USER, LOADING, ERROR } from '@reduxtypes/authTypes';
import Cookie from 'js-cookie';
import { signIn } from 'next-auth/react';

//Endpoints
import endPoints from '@services/api';
//TODO: cambiar en función register al endpoint register
const localAPI = process.env.NEXT_PUBLIC_SIGNUP;

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
    //Aunque posiblemente podría hacerse desde [...nextAuth].js, investigar options

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
