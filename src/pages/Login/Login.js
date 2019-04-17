import React, { useContext } from "react";
import { Redirect } from "react-router-dom";
import { Dispatch } from "../../App";

import { logIn } from "../../firebase/authActions";

function Login({ auth }) {
  const { dispatch } = useContext(Dispatch);

  if (auth.isAuthenticated) {
    return <Redirect to="/main" />;
  }

  return (
    <div>
      Login page <button onClick={() => logIn(dispatch)}>Log in</button>
    </div>
  );
}

export default Login;
