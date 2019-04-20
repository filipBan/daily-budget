import React, { useState } from "react";
import styled from "styled-components";
import posed from "react-pose";
import { Select } from "grommet";

const categories = [];

const Component = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;

  svg {
  }
`;

const IconPose = posed.button({
  pressable: true,
  init: { scale: 1 },
  press: { scale: 0.7 }
});

const Icon = styled(IconPose)`
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 34px;
  height: 34px;
`;

function CloseIcon(props) {
  return (
    <Icon {...props}>
      <svg viewBox="0 0 24 24">
        <line
          fill="none"
          stroke="#000"
          strokeWidth="3"
          x1="0"
          y1="0"
          x2="24"
          y2="24"
        />
        <line
          fill="none"
          stroke="#000"
          strokeWidth="3"
          x1="0"
          y1="24"
          x2="24"
          y2="0"
        />
      </svg>
    </Icon>
  );
}

function Content({ close }) {
  const [select, setSelect] = useState("");
  return (
    <Component>
      {/* <Select
        options={["small", "medium", "large"]}
        value={select}
        onChange={({ option }) => setSelect(option)}
      /> */}
      <CloseIcon onClick={() => close()} />
    </Component>
  );
}

export default Content;
