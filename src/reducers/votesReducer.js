import { VOTE } from '../actions/voteAction';
import { DELETE_SNACK } from '../actions/snackActions';

const INITIAL_STATE = []

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case VOTE:
      return [...state, action.payload];
    case DELETE_SNACK:
      return state.filter( snack => {
        return snack !== action.payload;
      });
    default:
      return state;
  }
}
