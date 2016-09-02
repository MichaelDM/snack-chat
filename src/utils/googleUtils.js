export function signOut() {
  const auth2 = gapi.auth2.getAuthInstance();
  return auth2.signOut().then(function () {
    console.log('user signed out');
  });
}
