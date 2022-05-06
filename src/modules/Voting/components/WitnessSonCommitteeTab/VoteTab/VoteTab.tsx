import { capitalize } from "lodash";

import { VoteForm, VoteTable } from "..";
import { useVoting } from "../../../hooks";

import * as Styled from "./VoteTab.styled";

type Props = {
  voteType: string;
};

export const VoteTab = ({ voteType }: Props): JSX.Element => {
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
          approveVote={approveVote}
          removeVote={removeVote}
        />
      </Styled.VoteTabCard>
    </Styled.Container>
  );
};
