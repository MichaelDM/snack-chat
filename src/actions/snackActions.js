import { firebaseDB, firebaseAuth } from '../../firebase';

import * as fbUtil from '../utils/fbUtilityFunctions';


export const GET_INITIAL_SNACKS = 'GET_INITIAL_SNACKS';
export function fetchSnacks() {
  return dispatch => {
    const initialSnacks = fbUtil.attachEventListenerOnPath('snacks/');
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
  let updateValue = {};
  updateValue[`snacks/${newSnack}`] = 0;
  fbUtil.updateValueFirebase(updateValue)
  .catch(err => console.log('error in addSnack Action ', err));
  return { type: null };
}


export const DELETE_SNACK = 'DELETE_SNACK';
export function deleteSnack(snackToDelete) {
  console.log('snack delete is ', snackToDelete);
  const deletePath = `snacks/${snackToDelete}`;
  fbUtil.deleteValueFirebase(deletePath)
  .catch( err => console.log('error in deleteSnack Action ', err));;
  return { type: null };
}
