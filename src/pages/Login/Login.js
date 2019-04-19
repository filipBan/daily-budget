import React, { useContext, useEffect, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { State } from "../../App";

import {
  Button,
  Input,
  Form,
  Container,
  Snackbar,
  Spinner
} from "../../components";

import { logIn } from "../../firebase/authActions";

function Login() {
  const { dispatch, authState } = useContext(State);
  const { loading } = authState;
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
    <Container>
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
        <Button disabled={loading}>{loading ? <Spinner /> : "Log in"}</Button>
      </Form>
      <Link to="/register">Register</Link>
      <Snackbar
        value={authState.error}
        type="error"
        onClose={() => dispatch({ type: "CLEAR_AUTH_ERRORS" })}
      />
    </Container>
  );
}

export default Login;
