import { ADD_SNACK, DELETE_SNACK, GET_INITIAL_SNACKS } from '../actions/snackActions';

const INITIAL_STATE = { data : [] };

export default function snackListReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_INITIAL_SNACKS:
      return { ...state, data: action.payload };
    default:
      return state;
  }
}
