import { firebaseAuth, firebaseApp, firebaseDB } from '../../firebase';

const defaultVotes = 3;

export const USER_PROFILE = 'USER_PROFILE';
export function userProfile() {
  return dispatch => {
    const googleAuth = gapi.auth2.getAuthInstance();
    googleAuth.currentUser.listen( googleUser => {
      if(googleUser.isSignedIn()){
        const id_token = googleUser.getAuthResponse().id_token;
        const credential = firebase.auth.GoogleAuthProvider.credential(id_token);
        firebaseAuth.signInWithCredential(credential)
        .then( user => {
          const profile = {
            fullname: user.displayName,
            email: user.email,
            profile_picture: user.photoURL,
          };
          const uid = user.uid;

          //does user exist?
          firebaseDB.ref(`/users/${uid}`).once('value').then(snapshot => {
            if (!snapshot.val()){
              // create user
              firebaseDB.ref(`/users/${uid}`).set({
                fullname: user.displayName,
                email: user.email,
                profile_picture: user.photoURL,
                admin: false,
                vote_count: 3,
              });
              profile.admin = false;
              profile.vote_count = defaultVotes;
              return dispatch({ type: USER_PROFILE, payload: profile });
            } else {
              // return user info
              profile.admin = snapshot.val().admin;
              profile.vote_count = snapshot.val().vote_count;
              dispatch({ type: USER_PROFILE, payload: profile });
            }
          });
        }).catch( err => {
          const errorCode = err.code,
                errorMessage = err.message,
                email = err.email,
                credential = err.credential;
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
    });
  }
  firebase.auth().signOut().then( () => {
  }, err => {
    console.log('error on signout is ', err);
  });
  return { type: SIGN_OUT }
}

export const SIGN_IN_ON_RELOAD = "SIGN_IN_ON_RELOAD"
export function authenticateUser() {
  return dispatch => {
    if (firebaseAuth.onAuthStateChanged(user => {
      if (user) {
        firebaseDB.ref(`/users/${user.uid}`).once('value').then( snapshot => {
          dispatch({ type: SIGN_IN_ON_RELOAD, payload: snapshot.val() });
        });
      } else {
        dispatch({ type: SIGN_OUT });
      }
    }));
  }
}

export const UPDATE_VOTE_COUNT_USER_PROFILE = 'UPDATE_VOTE_COUNT_USER_PROFILE';
export function updateVoteCountUserProfile() {
  return dispatch => {
    const userID = firebaseAuth.currentUser.uid;
    console.log('user ID is ', userID);
    firebaseDB.ref(`/users/${userID}/vote_count`).once('value').then( votesRemaining => {
      let updateValue = {};
      const votes = votesRemaining.val() - 1;
      updateValue[`/users/${userID}/vote_count`] = votes;
      firebaseDB.ref().update(updateValue);
      return dispatch({
        type: UPDATE_VOTE_COUNT_USER_PROFILE,
        payload: votes });
    });
  }
}
