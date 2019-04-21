import React, { useContext, useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import styled from "styled-components";

import { NewExpense, Container, Day } from "../../components";

import { State } from "../../App";

import { getRecordsTodayYesterday } from "../../firebase/databseActions";

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
  const { auth } = useContext(State);
  const [active, setActive] = useState("today");
  const { data, error, getRecords } = getRecordsTodayYesterday();

  if (!auth.isAuthenticated || !auth.uid) {
    return <Redirect to="/" />;
  }

  useEffect(() => {
    getRecords(auth.uid);
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
          data={data.yesterday || []}
          day="Yesterday"
        />
        <Today
          active={active === "today"}
          onClick={() => setActive("today")}
          data={data.today || []}
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
        <NewExpense />
      </AddNewContainer>
    </Container>
  );
}

export default Main;
