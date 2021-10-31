import { GET_ALL, LOADING, ERROR } from '../reduxtypes/jobsTypes';
import { JOBS } from '../Databases/jobsDatabase';

export const getJobs = () => (dispatch) => {
  dispatch({
    type: LOADING,
  });

  try {
    setTimeout(function() {
      dispatch({
        type: GET_ALL,
        payload: JOBS,
      });
    }, 800);
  } catch (error) {
    dispatch({
      type: ERROR,
      payload:
        'Ha ocurrido un problema al cargar los puestos de trabajo. Inténtalo más tarde.',
    });
  }
};
