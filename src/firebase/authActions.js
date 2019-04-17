import firebase from "./firebaseConfig";

export const AUTH_START = "AUTH_START";
export const AUTH_SUCCESS = "AUTH_SUCCESS";
export const AUTH_FAIL = "AUTH_FAIL";
export const LOG_IN = "LOG_IN";
export const LOG_OUT = "LOG_OUT";

export async function logIn(dispatch) {
  try {
    dispatch({ type: AUTH_START });
    await firebase.auth().signInAnonymously();
  } catch (error) {
    console.error("Could not log in");
    dispatch({ type: AUTH_FAIL, error });
  }
}

export async function logOut(dispatch) {
  try {
    dispatch({ type: AUTH_START });
    await firebase.auth().signOut();
  } catch (error) {
    console.error("Could not log out");
    dispatch({ type: AUTH_FAIL, error });
  }
}

export function checkLoginStatus(dispatch) {
  dispatch({ type: AUTH_START });
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      dispatch({ type: LOG_IN, user });
    } else {
      dispatch({ type: LOG_OUT });
    }
  });
}
