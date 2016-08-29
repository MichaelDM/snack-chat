import { firebaseDB, firebaseAuth } from '../../firebase';

export const GET_INITIAL_SNACKS = 'GET_INITIAL_SNACKS';
export function fetchSnacks() {
  return dispatch => {
    const initialSnacks = firebaseDB.ref('snacks/');
    initialSnacks.on('value', snapshot => {
      const payload = [];
      const data = snapshot.val();
      for (let snack in data) {
        payload.push(snack);
      }
      dispatch({ type: GET_INITIAL_SNACKS, payload });
    });
  }
}

export const ADD_SNACK = 'ADD_SNACK';
export function addSnack(newSnack) {
  console.log('in snack action with ', newSnack);
  const userID = firebaseAuth.currentUser.uid;
  let updateValue = {};
  updateValue[`snacks/${newSnack}`] = 0;
  firebaseDB.ref().update(updateValue)
  .catch(err => console.log('error in addSnack Action ', err));
  return { type: null };
  // return {
  //   type: ADD_SNACK,
  //   payload: newSnack
  // }
}


export const DELETE_SNACK = 'DELETE_SNACK';
export function deleteSnack(snackToDelete) {
  const userID = firebaseAuth.currentUser.uid;
  firebaseDB.ref(`snacks/${snackToDelete}`).remove()
  .catch( err => console.log('error in deleteSnack Action ', err));;
  return { type: null };
  // return {
  //   type: DELETE_SNACK,
  //   payload: snackToDelete
  // }
}
