import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import snackListReducer from './snackListReducer';
import votesReducer from './votesReducer';
import authReducer from './authReducer';

const rootReducer = combineReducers({
  snackList: snackListReducer,
  votes: votesReducer,
  auth: authReducer,
  form: formReducer,
});

export default rootReducer;
