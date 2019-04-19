import React, { useContext } from "react";
import { Redirect } from "react-router-dom";

import { MenuBar, Container } from "../../components";

import { State } from "../../App";

import { logOut } from "../../firebase/authActions";

function Main() {
  const { dispatch, authState } = useContext(State);

  if (!authState.isAuthenticated || !authState.uid) {
    return <Redirect to="/" />;
  }

  return (
    <Container justify="space-between">
      <Container>
        Main Page <button onClick={() => logOut(dispatch)}>Log out</button>
      </Container>
      <MenuBar />
    </Container>
  );
}

export default Main;
