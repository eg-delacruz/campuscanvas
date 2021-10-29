import { GET_ALL } from '../reduxtypes/jobsTypes';

export const traerTodos = () => (dispatch) => {
  //Aquí iría la lógica por ejemplo de pedir info a una api
  //Dispatch envía lo que se guardará en almacenamiento
  dispatch({
    type: GET_ALL,
    payload: [4, 5, 6],
  });
};
