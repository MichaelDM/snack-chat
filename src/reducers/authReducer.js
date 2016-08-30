import { USER_PROFILE, SIGN_IN, SIGN_OUT, SIGN_IN_ON_RELOAD } from '../actions/authActions';

const INITIAL_STATE = { profile: {}, logedIn: false }

export default function authReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case USER_PROFILE:
      return { ...state, profile: action.payload };
    case SIGN_IN:
      return { ...state, logedIn: true };
    case SIGN_OUT:
      return { ...state, ...INITIAL_STATE };
    case SIGN_IN_ON_RELOAD:
      console.log('signinOnreload reducer', { ...state, profile : action.payload });
      return { ...state, profile : action.payload, logedIn: true };
    default:
      return state;
  }
}
