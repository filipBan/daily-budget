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

import { createUser } from "../../firebase/authActions";

function Register() {
  const { dispatch, auth } = useContext(State);
  const { loading } = auth;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");

  useEffect(() => {
    return () => {
      dispatch({ type: "CLEAR_AUTH_ERRORS" });
    };
  }, []);

  const submitRegister = e => {
    e.preventDefault();

    createUser(email, password, dispatch);
  };

  if (auth.isAuthenticated && auth.uid) {
    return <Redirect to="/main" />;
  }

  return (
    <Container>
      <Form onSubmit={submitRegister}>
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
        <Input
          value={confPassword}
          placeholder="Confirm password"
          type="password"
          required
          onChange={e => setConfPassword(e.target.value)}
        />
        <Button disabled={loading}>{loading ? <Spinner /> : "Register"}</Button>
      </Form>
      <Link to="/login">Login</Link>
      <Snackbar
        value={auth.error}
        type="error"
        onClose={() => dispatch({ type: "CLEAR_AUTH_ERRORS" })}
      />
    </Container>
  );
}

export default Register;
