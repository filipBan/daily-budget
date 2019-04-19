import React, { useContext } from "react";
import { Redirect } from "react-router-dom";

import { State } from "../../App";

function AuthCheck() {
  const { auth } = useContext(State);
  const { loading, isAuthenticated } = auth;

  if (loading) {
    return <div>Checking auth state...</div>;
  }

  if (!loading && !isAuthenticated) {
    return <Redirect to="/login" />;
  } else if (!loading && isAuthenticated) {
    return <Redirect to="/main" />;
  }

  return null;
}

export default AuthCheck;
