import React, { Fragment, useState, useCallback } from "react";
import styled from "styled-components";
import { withRouter } from "react-router-dom";
import Burger from "../Burger";
import Menu from "../Menu";

const MenuContainer = styled.div`
  width: 100%;
  height: 6rem;
  padding: 0 1rem;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

function MenuBar({ dispatch, location, ...rest }) {
  if (
    location.pathname === "/" ||
    location.pathname === "/login" ||
    location.pathname === "/register"
  ) {
    return null;
  }

  const [menuVisible, setMenuVisible] = useState(false);
  const toggleMenu = useCallback(() => setMenuVisible(v => !v), []);

  return (
    <Fragment>
      <MenuContainer {...rest}>
        <Burger toggleMenu={toggleMenu} menuVisible={menuVisible} />
      </MenuContainer>
      <Menu isVisible={menuVisible} dispatch={dispatch} close={toggleMenu} />
    </Fragment>
  );
}

export default React.memo(withRouter(MenuBar));
