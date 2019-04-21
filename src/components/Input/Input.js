import React from "react";
import styled from "styled-components";

const Component = styled.input`
  width: 20rem;
  height: 4rem;
  margin: 1rem;
  padding: 1rem;
  border-radius: 5px;
  border: 1px solid #aaa;
  /* text-align: center; */
  font-size: 1.6rem;
`;

function Input(props) {
  return <Component {...props} />;
}

export default Input;
