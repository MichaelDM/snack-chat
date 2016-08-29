import { ADD_SNACK, DELETE_SNACK, GET_INITIAL_SNACKS } from '../actions/snackActions';

const INITIAL_STATE = { data : [] };

export default function snackListReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_INITIAL_SNACKS:
      return { ...state, data: action.payload };
    // case ADD_SNACK:
    // console.log('gettign to reducer ');
    //   // return [...state, action.payload];
    //   return [...state];
    // case DELETE_SNACK:
    //   // return state.filter(snack => snack !== action.payload);
    //   return [...state];
    default:
      return state;
  }
}
