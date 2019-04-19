import firebase from "./firebaseConfig";

export const AUTH_START = "AUTH_START";
export const AUTH_SUCCESS = "AUTH_SUCCESS";
export const AUTH_FAIL = "AUTH_FAIL";
export const LOG_IN = "LOG_IN";
export const LOG_OUT = "LOG_OUT";

export function logIn(email, password, dispatch) {
  dispatch({ type: AUTH_START });
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .catch(error => {
      console.error("Could not log in");
      dispatch({ type: AUTH_FAIL, error: error.message });
    });
}

export function createUser(email, password, dispatch) {
  dispatch({ type: AUTH_START });
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .catch(error => {
      console.error("Could not register");
      dispatch({ type: AUTH_FAIL, error: error.message });
    });
}

export function logOut(dispatch) {
  dispatch({ type: AUTH_START });
  firebase
    .auth()
    .signOut()
    .catch(error => {
      console.error("Could not log out");
      dispatch({ type: AUTH_FAIL, error: error.message });
    });
}

export function checkLoginStatus(dispatch) {
  dispatch({ type: AUTH_START });
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      dispatch({ type: LOG_IN, user });
      console.log("Logged in: ", user);
    } else {
      dispatch({ type: LOG_OUT });
      console.log("Logged out");
    }
  });
}
