import React, { Component, useEffect, useRef } from "react";
import { TimelineLite } from "gsap/all";
import posed from "react-pose";
import styled from "styled-components";

const MenuButtonPose = posed.div({
  pressable: true,
  init: { scale: 1 },
  press: { scale: 0.7 }
});

const MenuButton = styled(MenuButtonPose)`
  width: 5rem;
  height: 5rem;
  border-radius: 50%;
  z-index: 21;
  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    width: 100%;
    height: 100%;
  }
`;

function Burger({ menuVisible, toggleMenu }) {
  const menuOpen = useRef(new TimelineLite({ paused: true, reversed: true }));

  useEffect(() => {
    menuOpen.current
      .to(".line-two", 0.125, { scaleX: 0, opacity: 0 }, "toggle")
      .to(
        ".line-one",
        0.2,
        {
          rotation: 45,
          stroke: "#fff",
          transformOrigin: "50% 50%",
          y: 8
        },
        "cross"
      )
      .to(
        ".line-three",
        0.2,
        {
          rotation: -45,
          stroke: "#fff",
          transformOrigin: "50% 50%",
          y: -8
        },
        "cross"
      )
      .to(
        ".hamburger",
        0.35,
        { rotation: 90, ease: "Power1.easeInOut" },
        "cross"
      );

    const animate = () => {
      if (menuVisible) {
        menuOpen.current.restart();
      }

      if (!menuVisible) {
        menuOpen.current.reverse();
      }
    };

    animate();
  }, [menuVisible]);

  return (
    <MenuButton
      className="menu-button"
      onClick={toggleMenu}
      pose={menuVisible ? "hidden" : "visible"}
    >
      <div className="icon-container">
        <svg
          className="hamburger"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 60 60"
        >
          <line
            className="line-one"
            x1="10"
            y1="22"
            x2="50"
            y2="22"
            fill="none"
            stroke="#000"
            strokeMiterlimit="10"
            strokeWidth="4"
          />
          <line
            className="line-two"
            x1="10"
            y1="30"
            x2="50"
            y2="30"
            fill="none"
            stroke="#000"
            strokeMiterlimit="10"
            strokeWidth="4"
          />
          <line
            className="line-three"
            x1="10"
            y1="38"
            x2="50"
            y2="38"
            fill="none"
            stroke="#000"
            strokeMiterlimit="10"
            strokeWidth="4"
          />
        </svg>
      </div>
    </MenuButton>
  );
}

export default React.memo(Burger);
