import { useReducer } from "react";

import {
  AUTH_START,
  AUTH_FAIL,
  LOG_IN,
  LOG_OUT
} from "../firebase/authActions";

function authReducer() {
  const initialState = {
    loading: false,
    error: null,
    isAuthenticated: false,
    uid: ""
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case AUTH_START:
        return {
          ...state,
          loading: true,
          error: null
        };
      case AUTH_FAIL:
        return {
          ...state,
          loading: false,
          error: action.error
        };
      case LOG_IN:
        return {
          ...state,
          loading: false,
          error: null,
          uid: action.user.uid,
          isAuthenticated: true
        };
      case LOG_OUT:
        return initialState;
      case "CLEAR_AUTH_ERRORS":
        return {
          ...state,
          error: null
        };
      default:
        return state;
    }
  };

  return useReducer(reducer, initialState);
}

export default authReducer;
