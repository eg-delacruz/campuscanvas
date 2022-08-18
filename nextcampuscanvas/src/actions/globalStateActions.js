import { OPEN, CLOSE } from '@reduxtypes/globalStateTypes';

export const open_sidebar = () => (dispatch) => {
  dispatch({
    type: OPEN,
    payload: true,
  });
};

export const close_sidebar = () => (dispatch) => {
  dispatch({
    type: CLOSE,
    payload: false,
  });
};
