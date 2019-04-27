import React from "react";
import posed, { PoseGroup } from "react-pose";
import styled from "styled-components";

const ComponentPose = posed.div({
  active: {
    width: "25rem",
    height: "25rem",
    borderRadius: "50px",
    backgroundColor: "#ede7f6",
    transition: { type: "spring", stiffness: 200, damping: 17 }
  },
  inactive: {
    width: "12rem",
    height: "12rem",
    borderRadius: "100px",
    backgroundColor: "#9575cd",
    transition: { type: "spring", stiffness: 200, damping: 17 }
  }
});

const Details = posed.div({
  enter: {
    opacity: 1,
    transition: { duration: 200 }
  },
  exit: {
    opacity: 0,
    transition: { duration: 10 }
  }
});

const DayTitle = posed.span({
  active: {
    fontSize: "2.4rem"
  },
  inactive: {
    fontSize: "1.6rem"
  }
});

const Component = styled(ComponentPose)`
  /* border: 2px solid #311b92; */

  align-self: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 3rem;
  font-family: "Roboto", sans-serif;
`;

function Day({ active, day, data, ...rest }) {
  console.log("Day data: ", day, { data });

  return (
    <Component pose={active ? "active" : "inactive"} {...rest}>
      <DayTitle pose={active ? "active" : "inactive"}>{day}</DayTitle>

      <Details key="expTotal" id="expTotal">
        {data.reduce((a, b) => a + b.amount, 0)}
      </Details>
      {active ? (
        <Details key="expNumber" id="expNumber">
          {data.expensesNumber}
        </Details>
      ) : null}
    </Component>
  );
}

export default Day;
