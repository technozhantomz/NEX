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

export interface VoteRow {
  id: string;
  type: "witnesses" | "sons" | "committees";
  name: string;
  webpage: string;
  votes: string;
  action: "add" | "remove" | "";
}
