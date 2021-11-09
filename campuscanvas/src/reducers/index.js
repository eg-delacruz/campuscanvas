import { combineReducers } from 'redux';
import jobsReducer from './jobsReducer';
import postsReducer from './postsReducer';

export default combineReducers({
  jobsReducer,
  postsReducer,
});
