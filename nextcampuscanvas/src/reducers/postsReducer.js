import { GET_ALL, LOADING, ERROR } from '../reduxtypes/postsTypes';

const INITIAL_STATE = {
  posts: [],
  loading: false,
  error: '',
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_ALL:
      return {
        ...state,
        posts: action.payload,
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
