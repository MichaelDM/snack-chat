import { combineReducers } from 'redux';
import snackListReducer from './snackListReducer';
import votesReducer from './votesReducer';
import authReducer from './authReducer';

const rootReducer = combineReducers({
  snackList: snackListReducer,
  votes: votesReducer,
  auth: authReducer,
});

export default rootReducer;
