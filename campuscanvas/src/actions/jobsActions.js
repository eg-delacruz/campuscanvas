import { GET_ALL } from '../reduxtypes/jobsTypes';
import { JOBS } from '../Databases/jobsDatabase';

export const getJobs = () => (dispatch) => {
  dispatch({
    type: GET_ALL,
    payload: JOBS,
  });
};
