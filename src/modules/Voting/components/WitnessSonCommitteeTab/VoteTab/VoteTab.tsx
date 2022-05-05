// import React, { useCallback, useEffect, useRef, useState } from "react";

// import { useUserContext } from "../../../../common/components/UserProvider/UserProvider";
// import { VoteForm } from "../VoteForm";
//import { VoteTable } from "../VoteTable";
// import { useVoteTable } from "../VoteTable/hooks";
// import { IVoteRow } from "../VoteTable/hooks/useVoteTable.types";

import { SetStateAction } from "react";

import { VoteForm, VoteTable } from "..";
import { VoteRow } from "../../../types";

import * as Styled from "./VoteTab.styled";

type Props = {
  tab: string;
  loading: boolean;
  isVotesChanged: boolean;
  localApprovedVotes: VoteRow[];
  localNotApprovedVotes: VoteRow[];
  isPassModalVisible: boolean;
  submittingPassword: boolean;
  approveVote: (voteId: string) => void;
  removeVote: (voteId: string) => void;
  handleVoteSearch: (name: string) => void;
  resetChanges: () => void;
  confirm: () => void;
  publishChanges: (name: string, info: { values: any; forms: any }) => void;
  setIsPassModalVisible: (value: SetStateAction<boolean>) => void;
};

export const VoteTab = ({
  tab,
  loading,
  isVotesChanged,
  isPassModalVisible,
  submittingPassword,
  localApprovedVotes,
  localNotApprovedVotes,
  approveVote,
  removeVote,
  handleVoteSearch,
  resetChanges,
  confirm,
  publishChanges,
  setIsPassModalVisible,
}: Props): JSX.Element => {
  console.log("isVotedchanged", isVotesChanged);
  return (
    <Styled.Container>
      <Styled.VoteTabCard>
        <VoteForm
          tab={tab}
          loading={loading}
          isVotesChanged={isVotesChanged}
          isPassModalVisible={isPassModalVisible}
          submittingPassword={submittingPassword}
          handleVoteSearch={handleVoteSearch}
          resetChanges={resetChanges}
          confirm={confirm}
          publishChanges={publishChanges}
          setIsPassModalVisible={setIsPassModalVisible}
          //isChangeTableEmpty={isChangeTableEmpty.current}
          // doAction={doAction}
          // doSearch={doSearch}
          // modalData={modalData}
          // isModalVisible={isModalVisible}
          // setIsModalVisible={setIsModalVisible}
          // sendVotes={sendVotes}
        />
        <VoteTable
          type="approved"
          loading={loading}
          votes={localApprovedVotes}
          approveVote={approveVote}
          removeVote={removeVote}
        />
        <VoteTable
          type="notApproved"
          loading={loading}
          votes={localNotApprovedVotes}
          approveVote={approveVote}
          removeVote={removeVote}
        />
      </Styled.VoteTabCard>
    </Styled.Container>
  );
};
