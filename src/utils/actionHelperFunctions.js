
export function getIdFromLocalStorage() {
  return JSON.parse(localStorage.getItem('snackChatCredentials')).uid
}
