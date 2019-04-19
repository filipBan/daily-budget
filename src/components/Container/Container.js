import React from "react";
import styled from "styled-components";

const Component = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: ${props => (props.justify ? props.justify : "center")};
  align-items: center;
  position: relative;
`;

function Container(props) {
  return <Component {...props} />;
}

export default Container;
