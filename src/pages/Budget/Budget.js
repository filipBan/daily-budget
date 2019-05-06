import React, { useCallback, useState } from "react";
import styled from "styled-components";

import { Container, MenuBar } from "../../components";

function Budget(props) {
  const [menuVisible, setMenuVisible] = useState(false);

  const toggleMenu = useCallback(() => setMenuVisible(v => !v), []);

  return (
    <Container justify="space-between" page>
      Budget page
    </Container>
  );
}

export default Budget;
