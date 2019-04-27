import { useReducer } from "react";
import { getTime, startOfToday } from "date-fns";

function recordsReducer() {
  const initialState = {};

  const reducer = (state, action) => {
    switch (action.type) {
      case "ADD_EXPENSE":
        console.log("Reducer - add expense", action);
        return {
          ...state,
          [getTime(startOfToday())]: [
            ...state[getTime(startOfToday())],
            {
              ...action.data,
              date: getTime(startOfToday())
            }
          ]
        };
      case "FETCH_RECORDS":
        console.log("Reducer - fetch records", action);
        return {
          ...state,
          ...action.payload
        };
      default:
        return state;
    }
  };

  return useReducer(reducer, initialState);
}

export default recordsReducer;
