import { VoteForm, VoteTable } from "..";
import { VoteRow } from "../../../types";

import * as Styled from "./VoteTab.styled";

type Props = {
  tab: string;
  loading: boolean;
  isVotesChanged: boolean;
  localApprovedVotes: VoteRow[];
  localNotApprovedVotes: VoteRow[];
  approveVote: (voteId: string) => void;
  removeVote: (voteId: string) => void;
  handleVoteSearch: (name: string) => void;
  resetChanges: () => void;
};

export const VoteTab = ({
  tab,
  loading,
  isVotesChanged,
  localApprovedVotes,
  localNotApprovedVotes,
  approveVote,
  removeVote,
  handleVoteSearch,
  resetChanges,
}: Props): JSX.Element => {
  return (
    <Styled.Container>
      <Styled.VoteTabCard>
        <VoteForm
          tab={tab}
          loading={loading}
          isVotesChanged={isVotesChanged}
          handleVoteSearch={handleVoteSearch}
          resetChanges={resetChanges}
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
