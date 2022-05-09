import { FullAccount, Vote } from "../../../common/types";

export type UseVotingResult = {
  loading: boolean;
  serverApprovedVotes: Vote[];
  allMembers: Vote[];
  fullAccount: FullAccount | undefined;
  getVotes: () => Promise<void>;
  allMembersIds: [string, string][];
  totalGpos: number;
  //localApprovedVotes: VoteRow[];
  //isVotesChanged: boolean;
  //voteSearchValue: string;
  //approveVote: (voteId: string) => void;
  //removeVote: (voteId: string) => void;
  //resetChanges: () => void;
  //handleVoteSearch: (name: string) => void;
};

export type Proxy = {
  name: string;
  id: string;
};
