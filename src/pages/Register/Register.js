import React, { useContext, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import styled from "styled-components";
import { State } from "../../App";

import { createUser } from "../../firebase/authActions";

function Register({ auth }) {
  const { dispatch, authState } = useContext(State);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitLogin = e => {
    e.preventDefault();

    createUser(email, password, dispatch);
  };

  if (authState.isAuthenticated && authState.uid) {
    return <Redirect to="/main" />;
  }

  return (
    <div>
      <form onSubmit={submitLogin}>
        <input
          value={email}
          placeholder="Email"
          onChange={e => setEmail(e.target.value)}
        />
        <input
          value={password}
          placeholder="Password"
          onChange={e => setPassword(e.target.value)}
        />
        <button>Register</button>
      </form>
      <Link to="/login">Login</Link>
      {authState.error ? <span>{authState.error}</span> : null}
    </div>
  );
}

export default Register;
