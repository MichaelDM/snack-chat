import { firebaseAuth, firebaseApp, firebaseDB } from '../../firebase';

const defaultVotes = 3;

export const SIGN_IN = 'SIGN_IN';
export function signIn() {
  return dispatch => {
    console.log('in sign in action');
    var provider = new firebase.auth.GoogleAuthProvider();
    firebaseAuth.signInWithPopup(provider)
    .then(result => {
      console.log('result is ', result);
      let token = result.credential.accessToken,
            user = result.user;
      let auth = {
        profile : {
          fullname: user.displayName,
          email: user.email,
          profile_picture: user.photoURL,
        },
        logedIn: true
      };
      let localStorageInfo = {
        uid: user.uid,
        fullname: user.displayName,
        profile_picture: user.photoURL,
        email: user.email,
        emailVerified: user.emailVerified,
        apiKey: user.v,
        accessToken: result.credential.accessToken,
        refreshToken: user.refreshToken,
        // expirationTime:
      };
      firebaseDB.ref(`/users/${user.uid}/vote_count`).once('value').then( votesRemaining => {
        auth.profile.vote_count = votesRemaining.val();
        localStorage.setItem('snackChatCredentials', JSON.stringify(localStorageInfo));
        return dispatch({
          type: SIGN_IN,
          payload: auth
        });
      });
    })
    .catch(error => {
      console.log(`errorCode is: ${error.code}
                   errorMessage is : ${error.message}
                   email and credntial used: ${error.email} and ${error.credential}`);
    });
  }
}

export const SIGN_OUT = 'SIGN_OUT';
export function signOut() {
  if(gapi.auth2){
    const auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
    });
  }
  localStorage.removeItem('snackChatCredentials');
  firebase.auth().signOut()
  .catch(error => console.log('error on signout is ', err));
  return { type: SIGN_OUT }
}

export function authenticateUser() {
  return dispatch => {
    const localStorageInfo = JSON.parse(localStorage.getItem('snackChatCredentials'));
    if(localStorageInfo){
      const auth = {
        profile : {
          fullname: localStorageInfo.fullname,
          email: localStorageInfo.email,
          profile_picture: localStorageInfo.profile_picture,
        },
        logedIn: true
      };
      firebaseDB.ref(`/users/${localStorageInfo.uid}/vote_count`).once('value').then( votesRemaining => {
        auth.profile.vote_count = votesRemaining.val();
        localStorage.setItem('snackChatCredentials', JSON.stringify(localStorageInfo));
        return dispatch({
          type: SIGN_IN,
          payload: auth
        });
      });
    }
  }
}

export const UPDATE_VOTE_COUNT_USER_PROFILE = 'UPDATE_VOTE_COUNT_USER_PROFILE';
export function updateVoteCountUserProfile() {
  return dispatch => {
    const userID = firebaseAuth.currentUser.uid;
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
