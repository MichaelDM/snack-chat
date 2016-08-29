import { firebaseAuth, firebaseDB } from '../../firebase';

function pushHelper(times, array, snack) {
  for ( let i = 0; i <times; i++ ) {
    array.push(snack);
  }
}

export const GET_INITIAL_VOTES = 'GET_INITIAL_VOTES';
export function fetchVotes() {
  return dispatch => {
    const initialSnacks = firebaseDB.ref('snacks/');
    initialSnacks.on('value', snapshot => {
      const payload = [];
      const data = snapshot.val();
      for (let snack in data) {
        let times = data[snack];
        pushHelper(times, payload, snack);
      }
      dispatch({ type: GET_INITIAL_VOTES, payload });
    });
  }
}

export const VOTE = 'VOTE';
export function snackVote(item)  {
  return dispatch => {
    const userID = firebaseAuth.currentUser.uid;
    firebaseDB.ref(`/snacks/${item}`).once('value')
    .then( snapshot => {
      const count = snapshot.val();
      let updateValue = {};
      updateValue[`snacks/${item}`] = count + 1;
      firebaseDB.ref().update(updateValue)
      return dispatch({
        type: VOTE,
      });
    });
  }
}
