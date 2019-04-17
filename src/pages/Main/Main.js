import React, { useContext } from "react";
import { Redirect } from "react-router-dom";

import { Dispatch } from "../../App";

import { logOut } from "../../firebase/authActions";

function Main({ auth }) {
  const { dispatch } = useContext(Dispatch);

  if (!auth.isAuthenticated) {
    return <Redirect to="/" />;
  }

  return (
    <div>
      Main Page <button onClick={() => logOut(dispatch)}>Log out</button>
    </div>
  );
}

export default Main;
