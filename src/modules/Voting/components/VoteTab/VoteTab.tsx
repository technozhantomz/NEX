import React, { useCallback, useEffect, useRef, useState } from "react";

import { useUserContext } from "../../../../common/components/UserProvider/UserProvider";
import { VoteForm } from "../VoteForm";
import { VoteTable } from "../VoteTable";
import { useVoteTable } from "../VoteTable/hooks";
import { IVoteRow } from "../VoteTable/hooks/useVoteTable.types";

import * as Styled from "./VoteTab.styled";

type Props = { tab: string };

export const VoteTab = ({ tab }: Props): JSX.Element => {
  const { localStorageAccount } = useUserContext();
  const {
    tableVotes,
    tableNotVotes,
    tableChanges,
    loading,
    doAction,
    modalData,
    isModalVisible,
    setIsModalVisible,
    isPassModalVisible,
    setIsPassModalVisible,
    sendVotes,
  } = useVoteTable(tab);
  const [localVotes, setLocalVotes] = useState<IVoteRow[]>(tableVotes);
  const [localNotVotes, setLocalNotVotes] = useState<IVoteRow[]>(tableNotVotes);
  const [localChanges, setLocalChanges] = useState<IVoteRow[]>(tableChanges);
  const [filterVote, setFilterVote] = useState<string>("");
  const isChangeTableEmpty = useRef<boolean>(true);
  const [, updateState] = useState();
  const forceUpdate = useCallback(() => updateState({}), []);
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
  }, [tableNotVotes, filterVote]);
  useEffect(() => {
    const t = tableChanges.map((x) => {
      return x;
    });
    setLocalChanges(t);
    isChangeTableEmpty.current = t.length <= 0;
  }, [tableChanges]);
  useEffect(() => {
    forceUpdate();
  }, [filterVote]);
  function doSearch(searchInput: string) {
    setFilterVote(searchInput);
  }
  return (
    <Styled.Container>
      <Styled.VoteTabCard>
        {/* <VoteForm
          isChangeTableEmpty={isChangeTableEmpty.current}
          tab={tab}
          doAction={doAction}
          doSearch={doSearch}
          modalData={modalData}
          isModalVisible={isModalVisible}
          setIsModalVisible={setIsModalVisible}
          isPassModalVisible={isPassModalVisible}
          setIsPassModalVisible={setIsPassModalVisible}
          sendVotes={sendVotes}
        /> */}
        {/* {localChanges.length ? (
          <VoteTable
            table={localChanges}
            tab={tab}
            tableType="changes"
            account={localStorageAccount}
            filterVote={filterVote}
            loading={loading}
            doAction={doAction}
          />
        ) : (
          ""
        )} */}
        <VoteTable
          table={localVotes}
          tab={tab}
          tableType="approved"
          account={localStorageAccount}
          filterVote={filterVote}
          loading={loading}
          doAction={doAction}
        />
        <VoteTable
          table={localNotVotes}
          tab={tab}
          tableType="notapproved"
          account={localStorageAccount}
          filterVote={filterVote}
          loading={loading}
          doAction={doAction}
        />
      </Styled.VoteTabCard>
    </Styled.Container>
  );
};
