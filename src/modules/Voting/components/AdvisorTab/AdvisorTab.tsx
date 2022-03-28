import React from "react";

import { VoteForm } from "../VoteForm";
import { VoteTable } from "../VoteTable";

import * as Styled from "./AdvisorTab.styled";

export const AdvisorTab = (props: { tab: string }): JSX.Element => {
  return (
    <Styled.Container>
      <Styled.AdvisorTabCard>
        <VoteForm tab={props.tab} />
        <VoteTable tab={props.tab} approved={true} />
        <VoteTable tab={props.tab} approved={false} />
      </Styled.AdvisorTabCard>
    </Styled.Container>
  );
};
