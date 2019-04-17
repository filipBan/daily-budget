import React from "react";
import { Redirect } from "react-router-dom";

function AuthCheck({ auth }) {
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
