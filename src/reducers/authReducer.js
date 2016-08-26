import { USER_PROFILE, SIGN_IN, SIGN_OUT } from '../actions/authActions';

const INITIAL_STATE = { profile: {}, logedIn: false }

export default function authReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case USER_PROFILE:
      return { ...state, profile: action.payload };
    case SIGN_IN:
      return { ...state, logedIn: true };
    case SIGN_OUT:
      return { ...state, ...INITIAL_STATE };
    default:
      return state;
  }
}
