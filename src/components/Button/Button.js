import React from "react";
import styled from "styled-components";
import posed from "react-pose";

function getBorder(props) {
  if (props.disabled) {
    return "2px solid #ddd";
  } else if (props.primary || props.secondary) {
    return `2px solid ${props.theme.primary}`;
  }

  return "none";
}

function getBackground(props) {
  if (props.disabled) {
    return "#ddd";
  } else if (props.primary) {
    return props.theme.primary;
  } else if (props.secondary) {
    return "white";
  }
  return "rgba(0,0,0,0)";
}

function getColor(props) {
  if (props.disabled) {
    return "#aaa";
  } else if (props.primary) {
    return "white";
  }
  return "#272727";
}

const pose = posed.button({
  pressable: true,
  init: { scale: 1 },
  press: {
    scale: ({ disabled }) => (disabled ? 1 : 0.8)
  }
});

const Component = styled(pose)`
  min-width: 10rem;
  width: ${props => (props.fill ? "100%" : "auto")};
  padding: 0 1rem;
  height: 3.6rem;
  border: ${props => getBorder(props)};
  background-color: ${props => getBackground(props)};
  border-radius: 25px;
  outline: none;
  font-size: 1.8rem;
  line-height: 1.8rem;
  font-weight: 400;
  font-family: "Raleway", sans-serif;
  color: ${props => getColor(props)};
`;

function Button({ children, ...props }) {
  return <Component {...props}>{children}</Component>;
}

export default Button;
