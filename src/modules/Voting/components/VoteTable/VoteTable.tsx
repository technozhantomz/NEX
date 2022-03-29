import React from "react";

import * as Styled from "./VoteTable.styled";

export const VoteTable = (props: {
  tab: string;
  approved: boolean;
  account: string;
}): JSX.Element => {
  const getApproved = () => {
    const row = [];
    for (let i = 0; i < 5; i++) {
      row.push(
        <Styled.Row>
          <Styled.Col>Name</Styled.Col>
          <Styled.Col>Webpage</Styled.Col>
          <Styled.Col>Votes</Styled.Col>
          <Styled.Col>Action</Styled.Col>
        </Styled.Row>
      );
    }
    return row;
  };

  const getCandidates = (approved: boolean) => {
    const row = [];
    for (let i = 0; i < 5; i++) {
      row.push(
        <Styled.Row key={i}>
          <Styled.Col>Name {i}</Styled.Col>
          <Styled.Col>Webpage</Styled.Col>
          <Styled.Col>Votes</Styled.Col>
          <Styled.Col>Action</Styled.Col>
        </Styled.Row>
      );
    }
    if (row.length < 1 && approved) {
      row.push(
        <Styled.RowMessage key={0}>
          No {props.tab.toLowerCase()} are approved by {props.account}.
        </Styled.RowMessage>
      );
    }
    if (row.length < 1 && !approved) {
      row.push(
        <Styled.RowMessage key={0}>
          There are no unapproved {props.tab.toLowerCase()} by {props.account}.
        </Styled.RowMessage>
      );
    }
    return row;
  };

  return (
    <>
      <Styled.Title>
        {props.approved
          ? `Approved by ${props.account} `
          : `Not approved by ${props.account} `}
        {props.approved ? <Styled.Check /> : <Styled.Xmark />}
      </Styled.Title>
      <Styled.Container>
        <Styled.Row>
          <Styled.ColHeader>Name</Styled.ColHeader>
          <Styled.ColHeader>Webpage</Styled.ColHeader>
          <Styled.ColHeader>Votes</Styled.ColHeader>
          <Styled.ColHeader>Action</Styled.ColHeader>
        </Styled.Row>
        {getCandidates(props.approved)}
      </Styled.Container>
    </>
  );
};
