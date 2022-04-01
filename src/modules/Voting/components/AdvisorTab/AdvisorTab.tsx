import React, { useEffect, useState } from "react";

import { useUserContext } from "../../../../common/components/UserProvider/UserProvider";
import { VoteForm } from "../VoteForm";
import { VoteTable } from "../VoteTable";
import { useVoteTable } from "../VoteTable/hooks";
import { IVoteRow } from "../VoteTable/hooks/useVoteTable.types";

import * as Styled from "./AdvisorTab.styled";

type Props = { tab: string };

export const AdvisorTab = ({ tab }: Props): JSX.Element => {
  const { localStorageAccount } = useUserContext();
  const { tableVotes, tableNotVotes, tableChanges, loading, doAction } =
    useVoteTable();
  const [localVotes, setLocalVotes] = useState<IVoteRow[]>(tableVotes);
  const [localNotVotes, setLocalNotVotes] = useState<IVoteRow[]>(tableNotVotes);
  const [localChanges, setLocalChanges] = useState<IVoteRow[]>(tableChanges);
  useEffect(() => {
    const t = tableVotes.map((x) => {
      return x;
    });
    setLocalVotes(t);
  }, [tableVotes]);
  useEffect(() => {
    const t = tableNotVotes.map((x) => {
      return x;
    });
    setLocalNotVotes(t);
  }, [tableNotVotes]);
  useEffect(() => {
    const t = tableChanges.map((x) => {
      return x;
    });
    setLocalChanges(t);
  }, [tableChanges]);
  return (
    <Styled.Container>
      <Styled.AdvisorTabCard>
        <VoteForm tab={tab} account={localStorageAccount} doAction={doAction} />
        {localChanges.length ? (
          <VoteTable
            table={localChanges}
            tab={tab}
            tableType="changes"
            account={localStorageAccount}
            filterVote=""
            loading={loading}
            doAction={doAction}
          />
        ) : (
          ""
        )}
        <VoteTable
          table={localVotes}
          tab={tab}
          tableType="approved"
          account={localStorageAccount}
          filterVote=""
          loading={loading}
          doAction={doAction}
        />
        <VoteTable
          table={localNotVotes}
          tab={tab}
          tableType="notapproved"
          account={localStorageAccount}
          filterVote=""
          loading={loading}
          doAction={doAction}
        />
      </Styled.AdvisorTabCard>
    </Styled.Container>
  );
};
