import React, { useContext, useState } from "react";
import styled from "styled-components";
import posed from "react-pose";

import Form from "../Form";
import Button from "../Button";
import Input from "../Input";
import Select from "../Select";
import { State } from "../../App";

import { addExpense } from "../../firebase/databseActions";

const categories = [
  "eating out",
  "work",
  "books",
  "courses",
  "games",
  "groceries",
  "bill",
  "entertainment",
  "other"
];

const Component = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const Error = styled.span`
  color: red;
`;

const Actions = styled.div`
  margin-top: 2rem;
  display: flex;
  justify-content: space-evenly;
  width: 100%;
`;

const IconPose = posed.button({
  pressable: true,
  init: { scale: 1 },
  press: { scale: 0.7 }
});

const Icon = styled(IconPose)`
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 34px;
  height: 34px;
  border: none;
  outline: none;
  background: none;
`;

function CloseIcon(props) {
  return (
    <Icon {...props}>
      <svg viewBox="0 0 24 24">
        <line
          fill="none"
          stroke="#000"
          strokeWidth="3"
          x1="0"
          y1="0"
          x2="24"
          y2="24"
        />
        <line
          fill="none"
          stroke="#000"
          strokeWidth="3"
          x1="0"
          y1="24"
          x2="24"
          y2="0"
        />
      </svg>
    </Icon>
  );
}

function Content({ close, addExpError, loading, saveExpense }) {
  const { auth } = useContext(State);
  const [category, setCategory] = useState(categories[0]);
  const [amount, setAmount] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = async e => {
    e.preventDefault();

    await saveExpense({
      name,
      amount: parseFloat(amount),
      category,
      uid: auth.uid
    });

    close();
  };

  return (
    <Component>
      <Form justify="space-around" onSubmit={handleSubmit}>
        <Input
          placeholder="Name"
          value={name}
          onChange={e => setName(e.target.value)}
          required
        />
        <Input
          placeholder="Amount"
          type="number"
          value={amount}
          onChange={e => setAmount(e.target.value)}
          required
        />
        <Select
          placeholder="Category"
          options={categories}
          value={category}
          onChange={e => setCategory(e.target.value)}
        />
        <Actions>
          <Button
            type="button"
            secondary
            onClick={() => close()}
            disabled={loading}
          >
            Cancel
          </Button>
          <Button type="submit" primary disabled={loading}>
            Save
          </Button>
        </Actions>
      </Form>
      {addExpError ? <Error>{addExpError}</Error> : null}
      <CloseIcon onClick={() => close()} />
    </Component>
  );
}

export default Content;
