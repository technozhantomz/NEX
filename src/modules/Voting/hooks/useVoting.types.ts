import { VoteRow } from "../types";

export type UseVotingResult = {
  loading: boolean;
  serverApprovedVotes: VoteRow[];
  localApprovedVotes: VoteRow[];
  allMembersVotes: VoteRow[];
  isVotesChanged: boolean;
  voteSearchValue: string;
  approveVote: (voteId: string) => void;
  removeVote: (voteId: string) => void;
  resetChanges: () => void;
  handleVoteSearch: (name: string) => void;
};
