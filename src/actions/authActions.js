export function userProfile() {
  return dispatch => {
    const googleAuth = gapi.auth2.getAuthInstance();
    googleAuth.currentUser.listen( googleUser => {
      if(googleUser.isSignedIn()){
        const profile = googleUser.getBasicProfile();
        dispatch({ type: USER_PROFILE, payload: profile });
      }
    });
  }
}
export const USER_PROFILE = 'USER_PROFILE';

export function signIn() {
  return { type: SIGN_IN, payload: true };
}
export const SIGN_IN = 'SIGN_IN';

export function signOut() {
  if(gapi.auth2){
    const auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });
  }
  return { type: SIGN_OUT }
}
export const SIGN_OUT = 'SIGN_OUT';










// gapi.auth2.getAuthInstance().then( googleAuth => {
//   console.log('googleAuth is', googleAuth);
//   const googleUser = googleAuth.currentUser.get();
//   console.log('googleUser is', googleUser);
//   const profile = googleUser.getBasicProfile();
//   console.log('profile is', profile);
// });
