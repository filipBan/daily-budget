import React, { useContext, useState } from "react";
import { Redirect } from "react-router-dom";
import styled from "styled-components";

import { Container, Day } from "../../components";

import { State } from "../../App";

import { logOut } from "../../firebase/authActions";

const MainPage = styled.div`
  display: grid;
  height: 100%;
  width: 100%;
  grid-template-columns: 2rem 1fr 2rem;
  grid-template-rows: 5rem 1fr 1fr 1fr 2fr;
  grid-row-gap: 1rem;
`;

const Yesterday = styled(Day)`
  grid-column: 2;
  grid-row: 2;
`;

const Today = styled(Day)`
  grid-column: 2;
  grid-row: 3;
  justify-self: center;
`;

const Tomorrow = styled(Day)`
  grid-column: 2;
  grid-row: 4;
  justify-self: end;
`;

const AddNew = styled.div`
  width: 6rem;
  height: 6rem;
  background-color: #aaa;
  border-radius: 50%;
  grid-column: 2;
  grid-row: 5;
  justify-self: center;
  align-self: start;
`;

const Menu = styled.div`
  width: 5rem;
  height: 5rem;
  background-color: #ddd;
  justify-self: end;
  grid-column: 2;
  grid-row: 1;
`;

function Main() {
  const { dispatch, auth } = useContext(State);
  const [active, setActive] = useState("today");

  if (!auth.isAuthenticated || !auth.uid) {
    return <Redirect to="/" />;
  }

  return (
    <Container>
      <MainPage>
        <Menu />
        <Yesterday
          active={active === "yesterday"}
          onClick={() => setActive("yesterday")}
        >
          +10
        </Yesterday>
        <Today active={active === "today"} onClick={() => setActive("today")}>
          +15
        </Today>
        <Tomorrow
          active={active === "tomorrow"}
          onClick={() => setActive("tomorrow")}
        >
          +15
        </Tomorrow>
        <AddNew />
      </MainPage>
    </Container>
  );
}

export default Main;
