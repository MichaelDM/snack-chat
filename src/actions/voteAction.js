export const VOTE = 'VOTE';
export function snackVote(item)  {
  console.log('item to vote on is ', item);
  return{
    type: VOTE,
    payload: item
  }
}
