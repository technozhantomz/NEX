import { Dispatch, SetStateAction } from "react";

import { VoteRow } from "../../../../types";

export type UseVoteTabResult = {
  name: string;
  loading: boolean;
  allMembersRows: VoteRow[];
  serverApprovedRows: VoteRow[];
  localApprovedRows: VoteRow[];
  isVotesChanged: boolean;
  approveVote: (voteId: string) => void;
  removeVote: (voteId: string) => void;
  resetChanges: () => void;
  updateAccountFee: number;
  transactionErrorMessage: string;
  transactionSuccessMessage: string;
  setTransactionErrorMessage: Dispatch<SetStateAction<string>>;
  setTransactionSuccessMessage: Dispatch<SetStateAction<string>>;
  handlePublishChanges: (password: string) => Promise<void>;
  loadingTransaction: boolean;
  pendingChanges: VoteRow[];
};
