import { firebaseAuth, firebaseApp, firebaseDB } from '../../firebase';

const provider = new firebase.auth.GoogleAuthProvider();

export function signInWithPopup() {
  return firebaseAuth.signInWithPopup(provider);
}

export function getFirebaseDBSnapshot(path){
  return firebaseDB.ref(path).once('value')
}

export function createDataInFirebase(path, object) {
  return firebaseDB.ref(`/users/${path}`).set({
    fullname: object.displayName,
    email: object.email,
    profile_picture: object.photoURL,
    admin: false,
    vote_count: 3,
  });
}

export function updateValueFirebase(updateValue) {
  firebaseDB.ref().update(updateValue);
}

export function firebaseSignout() {
  return firebase.auth().signOut();
}

export function catchError(error) {
  console.log(`errorCode is: ${error.code}
               errorMessage is : ${error.message}
               email and credential used: ${error.email} and ${error.credential}`);
}
