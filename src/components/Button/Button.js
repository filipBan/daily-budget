import React from "react";
import styled from "styled-components";

const Component = styled.button`
  min-width: 10rem;
  padding: 0 1rem;
  height: 3rem;
  border: 1px solid;
  border-color: ${props => (props.disabled ? "#bbb" : "black")};
  border-radius: 3px;
  outline: none;
  font-size: 1.4rem;
`;

function Button({ children, ...props }) {
  return <Component {...props}>{children}</Component>;
}

export default Button;
