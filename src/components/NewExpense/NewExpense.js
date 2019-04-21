import React, { useState } from "react";
import styled from "styled-components";
import posed from "react-pose";

import Content from "./Content";

const pose = posed.div({
  visible: {
    opacity: 1,
    height: "400px",
    width: window.innerWidth - 40,
    x: -(window.innerWidth - 40) / 2 + 30,
    y: -400,
    borderRadius: "20px",
    backgroundColor: "#ede7f6",
    transition: { type: "spring", stiffness: 200, damping: 17 }
  },
  hidden: {
    opacity: 0,
    height: 0,
    width: 0,
    x: 30,
    y: -30,
    borderRadius: "100px",
    backgroundColor: "#673ab7",
    transition: { duration: 250 }
  }
});

const Component = styled(pose)`
  position: absolute;
`;

const ButtonPose = posed.button({
  pressable: true,
  init: { scale: 1, backgroundColor: "#673ab7" },
  press: { scale: 0.8, backgroundColor: "#b39ddb" },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring", stiffness: 200, damping: 17 }
  },
  hidden: {
    opacity: 0,
    scale: 0,
    transition: { type: "spring", stiffness: 200, damping: 20 }
  }
});

const Button = styled(ButtonPose)`
  width: 6rem;
  height: 6rem;
  border-radius: 50%;
  outline: none;
  border: none;

  svg {
    width: 100%;
    height: 100%;
  }
`;

function AddModal(props) {
  const [visible, setVisible] = useState(false);
  return (
    <div>
      <Button
        key="button"
        pose={visible ? "hidden" : "visible"}
        onClick={() => setVisible(true)}
      >
        <svg viewBox="0 0 60 60">
          <line
            fill="none"
            stroke="#fff"
            strokeWidth="4"
            x1="10"
            y1="30"
            x2="50"
            y2="30"
          />
          <line
            fill="none"
            stroke="#fff"
            strokeWidth="4"
            x1="30"
            y1="10"
            x2="30"
            y2="50"
          />
        </svg>
      </Button>
      <Component
        visible={visible}
        key="box"
        pose={visible ? "visible" : "hidden"}
      >
        {visible ? <Content close={() => setVisible(false)} /> : null}
      </Component>
    </div>
  );
}

export default AddModal;
