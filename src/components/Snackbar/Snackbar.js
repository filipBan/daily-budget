import React from "react";
import styled from "styled-components";
import posed from "react-pose";

const Animation = posed.div({
  visible: {
    y: 0,
    opacity: 1,
    delay: 300,
    transition: {
      y: { type: "spring", stiffness: 700, damping: 20 },
      default: { duration: 200 }
    }
  },
  hidden: {
    y: 50,
    opacity: 0,
    transition: { duration: 150 }
  }
});

const Component = styled(Animation)`
  position: absolute;
  bottom: 5rem;
  height: 10rem;
  width: 30rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.4rem;
  background-color: ${props => (props.type === "error" ? "red" : "green")};
  color: white;
  border-radius: 3px;
`;

function Snackbar(props) {
  return (
    <Component {...props} pose={props.value ? "visible" : "hidden"}>
      <span>{props.value}</span>
    </Component>
  );
}

export default Snackbar;
