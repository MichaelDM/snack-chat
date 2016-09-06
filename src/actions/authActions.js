import * as fbUtil from '../utils/fbUtilityFunctions';
import * as googleUtil from '../utils/googleUtils';
import * as actionHelperfc from '../utils/actionHelperFunctions';

const defaultVotes = 3;

export const SIGN_IN = 'SIGN_IN';
export function signIn() {
  return dispatch => {
    const userLogedIn = JSON.parse(localStorage.getItem('snackChatCredentials'));
    //if user already loged in, ignore action
    if(!userLogedIn){
      fbUtil.signInWithPopup()
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
        const path = `/users/${user.uid}`;
        fbUtil.getFirebaseDBSnapshot(path)
        .then(snapshot => {
          console.log('snapshot is ', snapshot.val());
          // user doesn't exist - create new user
          if (!snapshot.val()){
           // create user
           fbUtil.createDataInFirebase(user.uid, user);
           auth.profile.vote_count = defaultVotes;
          } else {
            // return user info
            auth.profile.vote_count = snapshot.val().vote_count;
          }
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
}

export const SIGN_OUT = 'SIGN_OUT';
export function signOut() {
  if(gapi.auth2){
    googleUtil.signOut();
  }
  localStorage.removeItem('snackChatCredentials');
  fbUtil.firebaseSignout()
  .catch(error => console.log('error on signout is ', err));
  return { type: SIGN_OUT }
}

export function authenticateUser() {
  return dispatch => {
    console.log('sign in reload');
    const localStorageInfo = JSON.parse(localStorage.getItem('snackChatCredentials'));
    if(localStorageInfo){
      let auth = {
        profile : {
          fullname: localStorageInfo.fullname,
          email: localStorageInfo.email,
          profile_picture: localStorageInfo.profile_picture,
        },
        logedIn: true
      };
      const path = `/users/${localStorageInfo.uid}/vote_count`;
      fbUtil.getFirebaseDBSnapshot(path)
      .then( votesRemaining => {
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
    const userID = actionHelperfc.getIdFromLocalStorage();
    console.log('userID is ', userID);
    const path = `/users/${userID}/vote_count`;
    fbUtil.getFirebaseDBSnapshot(path)
    .then( votesRemaining => {
      let updateValue = {};
      const votes = votesRemaining.val() - 1;
      updateValue[`/users/${userID}/vote_count`] = votes;
      fbUtil.updateValueFirebase(updateValue);
      return dispatch({
        type: UPDATE_VOTE_COUNT_USER_PROFILE,
        payload: votes });
    });
  }
}
