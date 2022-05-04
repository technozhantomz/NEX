import { SetStateAction } from "react";

import { VoteRow } from "../types";

export type UseVotingResult = {
  loading: boolean;
  serverApprovedVotes: VoteRow[];
  localApprovedVotes: VoteRow[];
  allMembersVotes: VoteRow[];
  isVotesChanged: boolean;
  voteSearchValue: string;
  isPassModalVisible: boolean;
  submittingPassword: boolean;
  confirm: () => void;
  publishChanges: (name: string, info: { values: any; forms: any }) => void;
  approveVote: (voteId: string) => void;
  removeVote: (voteId: string) => void;
  resetChanges: () => void;
  handleVoteSearch: (name: string) => void;
  setIsPassModalVisible: (value: SetStateAction<boolean>) => void;
};
