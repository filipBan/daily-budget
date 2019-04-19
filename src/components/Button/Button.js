import React from "react";
import styled from "styled-components";

const Component = styled.button`
  width: 10rem;
  height: 3rem;
  border: 1px solid black;
  border-radius: 3px;
  outline: none;
`;

function Button({ children, ...props }) {
  return <Component {...props}>{children}</Component>;
}

export default Button;
