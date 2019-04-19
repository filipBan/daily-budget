import React from "react";
import styled from "styled-components";

const Component = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #aaa;
  position: relative;
`;

function PageContainer(props) {
  return <Component {...props} />;
}

export default PageContainer;
