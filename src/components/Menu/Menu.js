import React from "react";
import posed, { PoseGroup } from "react-pose";
import styled from "styled-components";
import { withRouter } from "react-router-dom";

const MenuItemPose = posed.button({
  pressable: true,
  init: { scale: 1 },
  press: { scale: 0.7 },
  enter: {
    opacity: 1,
    y: 0
  },
  exit: {
    opacity: 0,
    y: 30
  }
});

const MenuPose = posed.div({
  enter: {
    opacity: 1,
    beforeChildren: true,
    staggerChildren: 50,
    transition: {
      duration: 300,
      ease: "circOut"
    }
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 300
    }
  }
});

const MenuItem = styled(MenuItemPose)`
  width: 50%;
  height: 7rem;
  margin: 2rem;
  color: #e2e2e2;
  font-size: 3.5rem;
  background-color: rgba(0, 0, 0, 0);
  border: none;

  &:active,
  &:focus {
    outline: none;
  }
`;

const Menu = styled(MenuPose)`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: #272727;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 15;
`;

function MenuOverlay({ isVisible, close, logOut, location, history }) {
  const handleRedirect = path => {
    if (path !== location.pathname) {
      history.push(path);
    }
    close();
  };

  return (
    <PoseGroup>
      {isVisible && (
        <Menu key="menuOverlay">
          <MenuItem onClick={() => handleRedirect("/main")}>Main</MenuItem>
          <MenuItem onClick={() => handleRedirect("/budget")}>Budget</MenuItem>
          <MenuItem onClick={() => handleRedirect("/profile")}>
            Profile
          </MenuItem>
          <MenuItem onClick={logOut}>Log out</MenuItem>
        </Menu>
      )}
    </PoseGroup>
  );
}

export default React.memo(withRouter(MenuOverlay));
