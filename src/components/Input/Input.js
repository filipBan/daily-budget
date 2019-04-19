import React from "react";
import styled from "styled-components";

const Component = styled.input`
  width: 20rem;
  height: 3rem;
  margin: 1rem;
  padding: 1rem;
  border-radius: 3px;
  border: 1px solid #ddd;
  text-align: center;
  font-size: 1.5rem;
`;

function Input(props) {
  return <Component {...props} />;
}

export default Input;
