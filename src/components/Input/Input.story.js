import React from "react";
import { storiesOf } from "@storybook/react";
import Input from "./Input";

storiesOf("Input", module)
  .add("default", () => <Input value="Test input" />)
  .add("with placeholder", () => (
    <Input value="" placeholder="Placeholder text" />
  ));
