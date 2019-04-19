import React from "react";
import styled from "styled-components";

const Component = styled.form`
  width: 30rem;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #ddd;
  min-height: 25rem;
`;

function Form({ children, ...props }) {
  return <Component {...props}>{children}</Component>;
}

export default Form;
