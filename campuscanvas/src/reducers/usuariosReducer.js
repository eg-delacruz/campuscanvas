import { TRAER_TODOS } from '../reduxtypes/usuariosTypes';

const INITIAL_STATE = {
  usuarios: [1, 2, 3],
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TRAER_TODOS:
      return { ...state, usuarios: action.payload };

    default:
      return state;
  }
};
