import {
  SIGN_IN,
  SIGN_OUT,
  UPDATE_VOTE_COUNT_USER_PROFILE
} from '../actions/authActions';

const INITIAL_STATE = { profile: { vote_count: null }, logedIn: false }

export default function authReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SIGN_IN:
      return { ...state, ...action.payload };
    case SIGN_OUT:
      return { ...state, ...INITIAL_STATE };
    case UPDATE_VOTE_COUNT_USER_PROFILE:
    console.log('updatevotecount reducer with payload: ', action.payload);
      let profile = { ...state.profile };
      profile.vote_count = action.payload;
      return { ...state, profile };
    default:
      return state;
  }
}
