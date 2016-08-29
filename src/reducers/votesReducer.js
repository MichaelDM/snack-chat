import { VOTE, GET_INITIAL_VOTES } from '../actions/voteAction';
import { DELETE_SNACK } from '../actions/snackActions';

const INITIAL_STATE = { data: [] };

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_INITIAL_VOTES:
      return { ...state, data: action.payload };
    case VOTE:
      return state;
    case DELETE_SNACK:
      return state.data.filter( snack => {
        return snack !== action.payload;
      });
    default:
      return state;
  }
}
