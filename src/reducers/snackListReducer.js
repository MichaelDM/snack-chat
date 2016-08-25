import { ADD_SNACK } from '../actions/snackActions';
import { DELETE_SNACK } from '../actions/snackActions';

const INITIAL_STATE = [
  'bananas',
  'milk yogurt',
  'fried cheetos',
  'cows tongue',
  'red-ant ice-cream',
  'cookie-dough dough',
];

export default function snackListReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case ADD_SNACK:
      return [...state, action.payload];
    case DELETE_SNACK:
      return state.filter(snack => snack !== action.payload);
    default:
      return state;
  }
}
