import { useReducer } from "react";

import { getTime, startOfToday, startOfYesterday } from "date-fns";

import firebase from "./firebaseConfig";

export const FETCH_INIT = "FETCH_INIT";
export const FETCH_FAILURE = "FETCH_FAILURE";
export const FETCH_SUCCESS = "FETCH_SUCCESS";

const dataFetchReducer = (state, action) => {
  switch (action.type) {
    case FETCH_INIT:
      return {
        ...state,
        loading: true,
        error: false
      };
    case FETCH_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        payload: action.payload
      };
    case FETCH_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    default:
      throw new Error();
  }
};

export function addExpense() {
  const [state, dispatch] = useReducer(dataFetchReducer, {
    loading: false,
    loading: false
  });

  const saveExpense = async expense => {
    try {
      const newRecord = {
        ...expense,
        date: getTime(startOfToday())
      };

      dispatch({ type: FETCH_INIT });

      await firebase
        .firestore()
        .collection("records")
        .add(newRecord);

      dispatch({ type: FETCH_SUCCESS });
    } catch (error) {
      console.error(error);
      dispatch({ type: FETCH_FAILURE, error: error.message });
    }
  };

  return { ...state, saveExpense };
}

export function getRecordsTodayYesterday() {
  const [state, dispatch] = useReducer(dataFetchReducer, {
    loading: false,
    loading: false,
    payload: {}
  });

  const getRecords = async uid => {
    try {
      dispatch({ type: FETCH_INIT });

      const allRecords = await firebase
        .firestore()
        .collection("records")
        .where("uid", "==", uid)
        .where("date", ">=", getTime(startOfYesterday()))
        .get()
        .then(snapshot => {
          const yesterday = getTime(startOfYesterday());
          const today = getTime(startOfToday());
          const results = {
            [yesterday]: [],
            [today]: []
          };
          snapshot.forEach(doc => {
            const record = doc.data();
            if (record.date === getTime(startOfYesterday())) {
              results[yesterday].push(record);
            } else if (record.date === getTime(startOfToday())) {
              results[today].push(record);
            }
          });

          return results;
        });

      dispatch({ type: FETCH_SUCCESS, payload: allRecords });

      return allRecords;
    } catch (error) {
      console.error({ error });
      dispatch({ type: FETCH_FAILURE, error: error.message });
    }
  };

  return { ...state, getRecords };
}
