import React from "react";

import { useUserContext } from "../../../../common/components/UserProvider/UserProvider";
import { VoteForm } from "../VoteForm";
import { VoteTable } from "../VoteTable";

import * as Styled from "./AdvisorTab.styled";

export const AdvisorTab = (props: { tab: string }): JSX.Element => {
  const { localStorageAccount } = useUserContext();
  return (
    <Styled.Container>
      <Styled.AdvisorTabCard>
        <VoteForm tab={props.tab} account={localStorageAccount} />
        <VoteTable
          tab={props.tab}
          approved={true}
          account={localStorageAccount}
          filterVote=""
        />
        <VoteTable
          tab={props.tab}
          approved={false}
          account={localStorageAccount}
          filterVote=""
        />
      </Styled.AdvisorTabCard>
    </Styled.Container>
  );
};
