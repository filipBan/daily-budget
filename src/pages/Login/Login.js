import React, { useContext, useEffect, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { State } from "../../App";

import { Button, Input, Form, PageContainer, Snackbar } from "../../components";

import { logIn } from "../../firebase/authActions";

function Login() {
  const { dispatch, authState } = useContext(State);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    return () => {
      dispatch({ type: "CLEAR_AUTH_ERRORS" });
    };
  }, []);

  const submitLogin = e => {
    e.preventDefault();

    logIn(email, password, dispatch);
  };

  if (authState.isAuthenticated && authState.uid) {
    return <Redirect to="/main" />;
  }

  return (
    <PageContainer>
      <Form onSubmit={submitLogin}>
        <Input
          value={email}
          placeholder="Email"
          type="email"
          required
          onChange={e => setEmail(e.target.value)}
        />
        <Input
          value={password}
          placeholder="Password"
          type="password"
          required
          onChange={e => setPassword(e.target.value)}
        />
        <Button>Login</Button>
      </Form>
      <Link to="/register">Register</Link>
      <Snackbar
        value={authState.error}
        type="error"
        onClose={() => dispatch({ type: "CLEAR_AUTH_ERRORS" })}
      />
    </PageContainer>
  );
}

export default Login;
