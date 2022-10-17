import { USER, LOADING, ERROR } from '@reduxtypes/usersTypes';

//Endpoints
import endPoints from '@services/api';

export const getUser = (id) => async (dispatch) => {
  dispatch({
    type: LOADING,
  });
  try {
    const respuesta = await fetch(endPoints.user.getUser(id), {
      method: 'GET',
      headers: {
        accept: '*/*',
        'Content-Type': 'application/json',
        app_secret_key: process.env.NEXT_PUBLIC_MAIN_NEXT_WEB_APP_SECRET_KEY,
      },
    });
    const data = await respuesta.json();

    dispatch({
      type: USER,
      payload: data.body,
    });
  } catch (error) {
    dispatch({
      type: ERROR,
      payload: 'Error al traer usuario' + error.message,
    });
  }
};
