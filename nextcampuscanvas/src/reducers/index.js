import { combineReducers } from 'redux';
import jobsReducer from '@reducers/jobsReducer';
import postsReducer from '@reducers/postsReducer';
import usersReducer from '@reducers/usersReducer';
import globalStateReducer from '@reducers/globalStateReducer';

export default combineReducers({
  jobsReducer,
  postsReducer,
  usersReducer,
  globalStateReducer,
});
