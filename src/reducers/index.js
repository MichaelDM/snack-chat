import { combineReducers } from 'redux';
import snackListReducer from './snackListReducer';
import votesReducer from './votesReducer';

const rootReducer = combineReducers({
  snackList: snackListReducer,
  votes: votesReducer,
});

export default rootReducer;
