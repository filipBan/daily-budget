import React from "react";
import styled from "styled-components";

const Component = styled.form`
  width: 26rem;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: ${props => props.justify || "center"};
  align-items: center;
  min-height: 25rem;
`;

function Form({ children, ...props }) {
  return <Component {...props}>{children}</Component>;
}

export default Form;
