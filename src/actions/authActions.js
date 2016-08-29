import { firebaseAuth, firebaseApp } from '../../firebase';


export const USER_PROFILE = 'USER_PROFILE';
export function userProfile() {
  return dispatch => {
    const googleAuth = gapi.auth2.getAuthInstance();
    googleAuth.currentUser.listen( googleUser => {
      if(googleUser.isSignedIn()){
        const profile = googleUser.getBasicProfile();
        const id_token = googleUser.getAuthResponse().id_token;
        const credential = firebase.auth.GoogleAuthProvider.credential(id_token);
        firebaseAuth.signInWithCredential(credential)
        .then( () => {
          dispatch({ type: USER_PROFILE, payload: profile });
        }).catch( err => {
          const errorCode = err.code,
                errorMessage = err.message,
                email = err.email,
                credential = err.credential;
          console.log('error from signInWithCredential', errorCode, errorMessage, email, credential);
        });
      }
    });
  }
}

export const SIGN_IN = 'SIGN_IN';
export function signIn() {
  return { type: SIGN_IN, payload: true };
}


export const SIGN_OUT = 'SIGN_OUT';
export function signOut() {
  if(gapi.auth2){
    const auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('Google signout successful.');
    });
  }
  firebase.auth().signOut().then( () => {
    console.log('firebase signout successful');
  }, err => {
    console.log('firebase signOut Uncusessful');
  });
  return { type: SIGN_OUT }
}



// gapi.auth2.getAuthInstance().then( googleAuth => {
//   console.log('googleAuth is', googleAuth);
//   const googleUser = googleAuth.currentUser.get();
//   console.log('googleUser is', googleUser);
//   const profile = googleUser.getBasicProfile();
//   console.log('profile is', profile);
// });
