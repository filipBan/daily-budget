import React, { useContext } from "react";
import { Redirect } from "react-router-dom";

import { State } from "../../App";

import { logOut } from "../../firebase/authActions";

function Main() {
  const { dispatch, authState } = useContext(State);

  if (!authState.isAuthenticated || !authState.uid) {
    return <Redirect to="/" />;
  }

  return (
    <div>
      Main Page <button onClick={() => logOut(dispatch)}>Log out</button>
    </div>
  );
}

export default Main;
