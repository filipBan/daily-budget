import React, { useContext, useCallback, useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import styled from "styled-components";
import { getTime, startOfToday, startOfYesterday } from "date-fns";

import { NewExpense, Container, Day, MenuBar } from "../../components";

import { State } from "../../App";

import {
  addExpense,
  getRecordsTodayYesterday
} from "../../firebase/databseActions";

import { logOut } from "../../firebase/authActions";

const MainPage = styled.div`
  margin: 1rem;
  display: grid;
  width: 100%;
  max-width: 600px;
  grid-template-columns: 2rem 1fr 2rem;
  grid-template-rows: repeat(3, min-content);
  grid-row-gap: 1rem;
`;

const AddNewContainer = styled.div`
  width: 100%;
  height: 10rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MenuContainer = styled.div`
  width: 100%;
  height: 8rem;
  padding: 0 1rem;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

function Main() {
  const { dispatch, auth, records } = useContext(State);

  if (!auth.isAuthenticated || !auth.uid) {
    return <Redirect to="/" />;
  }

  const [active, setActive] = useState("Today");

  const { error: addExpError, loading, saveExpense } = addExpense();
  const { error, getRecords } = getRecordsTodayYesterday();

  const saveNewExpense = useCallback(async props => {
    await saveExpense(props);
    dispatch({ type: "ADD_EXPENSE", data: props, id: props.id });
  }, []);

  const handleLogOut = useCallback(() => logOut(dispatch), []);

  useEffect(() => {
    const fetchRecords = async () => {
      const result = await getRecords(auth.uid);

      dispatch({ type: "FETCH_RECORDS", payload: result });
    };

    fetchRecords();
  }, []);

  const yesterday = getTime(startOfYesterday());
  const today = getTime(startOfToday());

  return (
    <Container justify="space-between" page>
      <MainPage>
        <Day
          active={active === "Yesterday"}
          handleClick={setActive}
          data={records[yesterday]}
          day="Yesterday"
        />
        <Day
          active={active === "Today"}
          handleClick={setActive}
          data={records[today]}
          day="Today"
        />
        <Day
          active={active === "Tomorrow"}
          handleClick={setActive}
          day="Tomorrow"
        />
      </MainPage>
      <AddNewContainer>
        <NewExpense
          addExpError={addExpError}
          loading={loading}
          saveExpense={saveNewExpense}
        />
      </AddNewContainer>
    </Container>
  );
}

export default React.memo(Main);
