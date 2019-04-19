import React, { useContext, useEffect, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { State } from "../../App";

import { Button, Input, Form, PageContainer, Snackbar } from "../../components";

import { createUser } from "../../firebase/authActions";

function Register() {
  const { dispatch, authState } = useContext(State);
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

  if (authState.isAuthenticated && authState.uid) {
    return <Redirect to="/main" />;
  }

  return (
    <PageContainer>
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
        <Button>Register</Button>
      </Form>
      <Link to="/login">Login</Link>
      <Snackbar
        value={authState.error}
        type="error"
        onClose={() => dispatch({ type: "CLEAR_AUTH_ERRORS" })}
      />
    </PageContainer>
  );
}

export default Register;
