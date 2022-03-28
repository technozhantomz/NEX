import React from "react";

import * as Styled from "./VoteTable.styled";

export const VoteTable = (props: {
  tab: string;
  approved: boolean;
}): JSX.Element => {
  return (
    <>
      {props.tab} {props.approved ? <Styled.Check /> : <Styled.Xmark />}
    </>
  );
};
