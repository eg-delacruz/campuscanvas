import { GET_ALL, LOADING, ERROR } from '../reduxtypes/jobsTypes';
import { JOBS } from '../Databases/jobsDatabase';

export const getJobs = () => (dispatch) => {
  dispatch({
    type: LOADING,
  });

  try {
    setTimeout(function() {
      if (JOBS.length === 0) {
        dispatch({
          type: GET_ALL,
          payload: 'no_jobs',
        });
      } else {
        dispatch({
          type: GET_ALL,
          payload: JOBS,
        });
      }
    }, 800);
  } catch (error) {
    dispatch({
      type: ERROR,
      payload:
        'Ha ocurrido un problema al cargar los puestos de trabajo. Inténtalo más tarde.',
    });
  }
};
