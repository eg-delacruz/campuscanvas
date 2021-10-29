import { GET_ALL } from '../reduxtypes/jobsTypes';

const INITIAL_STATE = {
  jobs: [],
  loading: false,
  error: '',
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_ALL:
      return { ...state, jobs: action.payload };

    default:
      return state;
  }
};
