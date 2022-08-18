import { OPEN, CLOSE } from '@reduxtypes/globalStateTypes';

const INITIAL_STATE = {
  openSidebar: '',
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case OPEN:
      return {
        ...state,
        openSidebar: action.payload,
      };
    case CLOSE:
      return {
        ...state,
        openSidebar: action.payload,
      };
    default:
      return state;
  }
};
