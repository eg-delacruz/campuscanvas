import { USER, LOADING, ERROR } from '@reduxtypes/usersTypes';

const INITIAL_STATE = {
  user: null,
  loading: false,
  error: '',
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case USER:
      return {
        ...state,
        user: action.payload,
        loading: false,
        error: '',
      };

    case LOADING:
      return { ...state, loading: true };

    case ERROR:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};
