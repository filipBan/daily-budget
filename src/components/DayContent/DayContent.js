import React from "react";
import styled from "styled-components";
import posed, { PoseGroup } from "react-pose";

import { Container } from "../../components";

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

function DayContent({ active, data, day }) {
  return (
    <Container>
      <DayTitle pose={active ? "active" : "inactive"}>{day}</DayTitle>
      <span id="amount">{data.amount}</span>
      <PoseGroup>
        {active && [
          <Details key="expTotal" id="expTotal">
            {data.expensesTotal}
          </Details>,
          <Details key="expNumber" id="expNumber">
            {data.expensesNumber}
          </Details>
        ]}
      </PoseGroup>
    </Container>
  );
}

export default DayContent;
