// import React, { useCallback, useEffect, useRef, useState } from "react";

// import { useUserContext } from "../../../../common/components/UserProvider/UserProvider";
// import { VoteForm } from "../VoteForm";
//import { VoteTable } from "../VoteTable";
// import { useVoteTable } from "../VoteTable/hooks";
// import { IVoteRow } from "../VoteTable/hooks/useVoteTable.types";

// import { SetStateAction } from "react";
import { capitalize } from "lodash";

import { VoteForm, VoteTable } from "..";
import { useVoting } from "../../../hooks";
// import { VoteRow } from "../../../types";

import * as Styled from "./VoteTab.styled";

type Props = {
  voteType: string;
  //   loading: boolean;
  //   isVotesChanged: boolean;
  //   localApprovedVotes: VoteRow[];
  //   localNotApprovedVotes: VoteRow[];
  //   isPassModalVisible: boolean;
  //   submittingPassword: boolean;
  //   approveVote: (voteId: string) => void;
  //   removeVote: (voteId: string) => void;
  //   handleVoteSearch: (name: string) => void;
  //   resetChanges: () => void;
  //   confirm: () => void;
  //   publishChanges: (name: string, info: { values: any; forms: any }) => void;
  //   setIsPassModalVisible: (value: SetStateAction<boolean>) => void;
};

export const VoteTab = ({
  voteType,
}: // loading,
// isVotesChanged,
// isPassModalVisible,
// submittingPassword,
// localApprovedVotes,
// localNotApprovedVotes,
// approveVote,
// removeVote,
// handleVoteSearch,
// resetChanges,
// confirm,
// publishChanges,
// setIsPassModalVisible,
Props): JSX.Element => {
  //console.log("isVotedchanged", isVotesChanged);
  const {
    loading,
    isVotesChanged,
    isPassModalVisible,
    submittingPassword,
    localApprovedVotes,
    localNotApprovedVotes,
    voteSearchValue,
    approveVote,
    removeVote,
    handleVoteSearch,
    resetChanges,
    confirm,
    publishChanges,
    setIsPassModalVisible,
    filterLocalVotes,
  } = useVoting(voteType);
  return (
    <Styled.Container>
      <Styled.VoteTabCard>
        <Styled.Title>Vote for {capitalize(voteType)}</Styled.Title>
        <Styled.VoteSearch
          size="large"
          placeholder="Search account"
          onSearch={handleVoteSearch}
          loading={loading}
        />
        <VoteForm
          voteType={voteType}
          loading={loading}
          isVotesChanged={isVotesChanged}
          isPassModalVisible={isPassModalVisible}
          submittingPassword={submittingPassword}
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
          votes={filterLocalVotes(localApprovedVotes, voteSearchValue)}
          approveVote={approveVote}
          removeVote={removeVote}
        />
        <VoteTable
          type="notApproved"
          loading={loading}
          votes={filterLocalVotes(localNotApprovedVotes, voteSearchValue)}
          //   voteSearchValue === ""
          //     ? allMembersVotes
          //         .filter((vote) => vote.type === voteType)
          //         .filter(
          //           (vote) =>
          //             !localApprovedVotes
          //               .map((approvedVote) => approvedVote.id)
          //               .includes(vote.id)
          //         )
          //     : allMembersVotes
          //         .filter((vote) => vote.type === voteType)
          //         .filter(
          //           (vote) =>
          //             !localApprovedVotes
          //               .map((approvedVote) => approvedVote.id)
          //               .includes(vote.id)
          //         )
          //         .filter((notApprovedVote) =>
          //           notApprovedVote.name
          //             .toLowerCase()
          //             .startsWith(voteSearchValue.toLowerCase())
          //         )
          // }
          approveVote={approveVote}
          removeVote={removeVote}
        />
      </Styled.VoteTabCard>
    </Styled.Container>
  );
};
