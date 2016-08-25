export const ADD_SNACK = 'ADD_SNACK';
export function addSnack(newSnack) {
  return{
    type: ADD_SNACK,
    payload: newSnack
  }
}

export const DELETE_SNACK = 'DELETE_SNACK';
export function deleteSnack(snackToDelete) {
  return {
    type: DELETE_SNACK,
    payload: snackToDelete
  }
}
