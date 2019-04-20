import React, { useContext, useState } from "react";
import { Redirect } from "react-router-dom";
import styled from "styled-components";

import { Container, Day } from "../../components";

import { State } from "../../App";

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

const AddNew = styled.div`
  width: 6rem;
  height: 6rem;
  background-color: #aaa;
  border-radius: 50%;
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

  if (!auth.isAuthenticated || !auth.uid) {
    return <Redirect to="/" />;
  }

  return (
    <Container justify="space-between">
      <MenuContainer>
        <Menu />
      </MenuContainer>
      <MainPage>
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
      </MainPage>
      <AddNewContainer>
        <AddNew />
      </AddNewContainer>
    </Container>
  );
}

export default Main;
