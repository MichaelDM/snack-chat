//to do:

//additional features: add price, link to amazon to buy it, ability to change link and name 
// 1) make api calls to firebase using Redux Thunk
// 2) Transfer to Koa server and Postgress DB (sequelize)
// 3) build own postregress db?

import fetch from 'isomorphic-fetch';

export const GET_SNACKS_REQUEST = 'GET_SNACKS_REQUEST';
export const GET_SNACKS_SUCCESS = 'GET_SNACKS_SUCCESS';
export const GET_SNACKS_FAILURE = 'GET_SNACKS_FAILURE';

export function getSnacks() {
  return async dispatch => {

    dispatch({
      type: GET_SNACKS_REQUEST,
    });

    try {
      let result = await fetch('firebase.com/api/snacks/get');

      dispatch({
        type: GET_SNACKS_SUCCESS,
        payload: result,
      });
    } catch (err) {
      dispatch({
        type: GET_SNACKS_FAILURE,
        error: err,
      });
    }
  };
}
