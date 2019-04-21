import React from "react";
import styled from "styled-components";

const Component = styled.div`
  background-color: #ddd;
  height: 6rem;
  width: 100%;
`;

const Tab = styled.button`
  height: 6rem;
  width: calc(100% / 3);
  outline: none;
  border: none;

  &:active {
    background-color: #aaa;
  }
`;

function MenuBar(props) {
  console.log("Menubar props", props);
  return (
    <Component {...props}>
      <Tab>1</Tab>
      <Tab>2</Tab>
      <Tab>3</Tab>
    </Component>
  );
}

export default MenuBar;
