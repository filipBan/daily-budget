import React, { useContext, useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import styled from "styled-components";

import { NewExpense, Container, Day, DayContent } from "../../components";

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
  const { dispatch, auth } = useContext(State);
  const [active, setActive] = useState("today");
  const { data, error, loading, getRecords } = getRecordsTodayYesterday();

  console.log({ data });

  if (!auth.isAuthenticated || !auth.uid) {
    return <Redirect to="/" />;
  }

  useEffect(() => {
    console.log("About to get records");
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
        >
          <DayContent
            active={active === "yesterday"}
            data={data.yesterday || []}
            day="Yesterday"
          />
        </Yesterday>
        <Today active={active === "today"} onClick={() => setActive("today")}>
          <DayContent
            active={active === "today"}
            data={data.today || []}
            day="Today"
          />
        </Today>
        <Tomorrow
          active={active === "tomorrow"}
          onClick={() => setActive("tomorrow")}
        >
          <DayContent active={active === "tomorrow"} data={[]} day="Tomorrow" />
        </Tomorrow>
      </MainPage>
      <AddNewContainer>
        <NewExpense />
      </AddNewContainer>
    </Container>
  );
}

export default Main;
