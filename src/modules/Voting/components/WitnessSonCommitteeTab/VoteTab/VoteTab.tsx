// import React, { useCallback, useEffect, useRef, useState } from "react";

// import { useUserContext } from "../../../../common/components/UserProvider/UserProvider";
// import { VoteForm } from "../VoteForm";
//import { VoteTable } from "../VoteTable";
// import { useVoteTable } from "../VoteTable/hooks";
// import { IVoteRow } from "../VoteTable/hooks/useVoteTable.types";

import { VoteForm, VoteTable } from "..";
import { VoteRow } from "../../../types";

import * as Styled from "./VoteTab.styled";

type Props = {
  tab: string;
  localApprovedVotes: VoteRow[];
  localNotApprovedVotes: VoteRow[];
  loading: boolean;
  approveVote: (voteId: string) => void;
  removeVote: (voteId: string) => void;
  handleVoteSearch: (name: string) => void;
  isVotesChanged: boolean;
  resetChanges: () => void;
};

export const VoteTab = ({
  localApprovedVotes,
  localNotApprovedVotes,
  loading,
  approveVote,
  removeVote,
  tab,
  handleVoteSearch,
  isVotesChanged,
  resetChanges,
}: Props): JSX.Element => {
  console.log("isVotedchanged", isVotesChanged);
  return (
    <Styled.Container>
      <Styled.VoteTabCard>
        <VoteForm
          tab={tab}
          handleVoteSearch={handleVoteSearch}
          loading={loading}
          isVotesChanged={isVotesChanged}
          resetChanges={resetChanges}
          //isChangeTableEmpty={isChangeTableEmpty.current}
          // doAction={doAction}
          // doSearch={doSearch}
          // modalData={modalData}
          // isModalVisible={isModalVisible}
          // setIsModalVisible={setIsModalVisible}
          // isPassModalVisible={isPassModalVisible}
          // setIsPassModalVisible={setIsPassModalVisible}
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
