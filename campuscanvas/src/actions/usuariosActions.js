import { TRAER_TODOS } from '../reduxtypes/usuariosTypes';

export const traerTodos = () => (dispatch) => {
  //Aquí iría la lógica por ejemplo de pedir info a una api
  //Dispatch envía lo que se guardará en almacenamiento
  dispatch({
    type: TRAER_TODOS,
    payload: [4, 5, 6],
  });
};
