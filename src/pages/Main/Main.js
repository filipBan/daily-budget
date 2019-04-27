import React, { useContext, useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import styled from "styled-components";
import { getTime, startOfToday, startOfYesterday } from "date-fns";

import { NewExpense, Container, Day } from "../../components";

import { State } from "../../App";

import {
  addExpense,
  getRecordsTodayYesterday
} from "../../firebase/databseActions";

const MainPage = styled.div`
  margin: 1rem;
  display: grid;
  width: 100%;
  max-width: 600px;
  grid-template-columns: 2rem 1fr 2rem;
  grid-template-rows: repeat(3, min-content);
  grid-row-gap: 1rem;
`;

const Yesterday = styled(Day)`
  grid-column: 2;
  grid-row: 1;
`;

const Today = styled(Day)`
  grid-column: 2;
  grid-row: 2;
  justify-self: center;
`;

const Tomorrow = styled(Day)`
  grid-column: 2;
  grid-row: 3;
  justify-self: end;
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
  height: 5rem;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const Menu = styled.div`
  width: 5rem;
  height: 5rem;
  background-color: #ddd;
`;

function Main() {
  const { dispatch, auth, records } = useContext(State);

  if (!auth.isAuthenticated || !auth.uid) {
    return <Redirect to="/" />;
  }

  const [active, setActive] = useState("today");
  const { error: addExpError, loading, saveExpense } = addExpense();
  const { error, getRecords } = getRecordsTodayYesterday();

  const saveNewExpense = async props => {
    await saveExpense(props);
    dispatch({ type: "ADD_EXPENSE", data: props, id: props.id });
  };

  const yesterday = getTime(startOfYesterday());
  const today = getTime(startOfToday());

  useEffect(() => {
    const fetchRecords = async () => {
      const result = await getRecords(auth.uid);

      dispatch({ type: "FETCH_RECORDS", payload: result });
    };

    fetchRecords();
  }, []);

  return (
    <Container justify="space-between" page>
      <MenuContainer>
        <Menu />
      </MenuContainer>
      <MainPage>
        <Yesterday
          active={active === "yesterday"}
          onClick={() => setActive("yesterday")}
          data={records[yesterday] || []}
          day="Yesterday"
        />
        <Today
          active={active === "today"}
          onClick={() => setActive("today")}
          data={records[today] || []}
          day="Today"
        />

        <Tomorrow
          active={active === "tomorrow"}
          onClick={() => setActive("tomorrow")}
          data={[]}
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

export default Main;
