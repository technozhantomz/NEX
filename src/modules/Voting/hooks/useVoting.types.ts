import { VoteRow } from "../types";

export type UseVotingResult = {
  isModalVisible: boolean;
  isPassModalVisible: boolean;
  loading: boolean;
  serverApprovedVotes: VoteRow[];
  localApprovedVotes: VoteRow[];
  allMembersVotes: VoteRow[];
  isVotesChanged: boolean;
  approveVote: (voteId: string) => void;
  removeVote: (voteId: string) => void;
  resetChanges: () => void;
};
