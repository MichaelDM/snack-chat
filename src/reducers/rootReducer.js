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

{/* <div>
  <input type='text'
  placeholder='new snack'
  name='new_snack'
  value={this.state.new_snack}
  onChange={this.handleInput}/>
  <button type='button'
  onClick={() => this.props.addSnack(this.state.new_snack)}>
  Submit New Snack
  </button>
</div> */}
