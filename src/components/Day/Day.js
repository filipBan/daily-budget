import React from "react";
import posed from "react-pose";
import styled from "styled-components";

const Pose = posed.div({
  active: {
    width: "100%",
    height: "25rem",
    borderRadius: "20px",
    transition: { type: "spring", stiffness: 200, damping: 20 }
  },
  inactive: {
    width: "12rem",
    height: "12rem",
    borderRadius: "100px",
    transition: { type: "spring", stiffness: 200, damping: 20 }
  }
});

const Component = styled(Pose)`
  background-color: #aaa;

  align-self: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

function Day({ active, children, ...rest }) {
  return (
    <Component pose={active ? "active" : "inactive"} {...rest}>
      {children}
    </Component>
  );
}

export default Day;
