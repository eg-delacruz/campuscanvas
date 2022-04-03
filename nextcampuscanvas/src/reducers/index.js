import { combineReducers } from 'redux';
import jobsReducer from '@reducers/jobsReducer';
import postsReducer from '@reducers/postsReducer';
import authReducer from '@reducers/authReducer';

export default combineReducers({
  jobsReducer,
  postsReducer,
  authReducer,
});
