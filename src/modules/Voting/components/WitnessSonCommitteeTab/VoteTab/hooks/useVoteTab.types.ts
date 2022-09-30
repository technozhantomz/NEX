import { ChangeEvent, Dispatch, SetStateAction } from "react";

import { SignerKey } from "../../../../../../common/types";
import { VoteRow } from "../../../../types";

export type UseVoteTabResult = {
  name: string;
  loading: boolean;
  allMembersRows: VoteRow[];
  serverApprovedRows: VoteRow[];
  localApprovedRows: VoteRow[];
  isVotesChanged: boolean;
  handleVoteSearch: (name: string) => void;
  voteSearchValue: string;
  approveVote: (voteId: string) => void;
  removeVote: (voteId: string) => void;
  resetChanges: () => void;
  updateAccountFee: number;
  transactionErrorMessage: string;
  transactionSuccessMessage: string;
  setTransactionErrorMessage: Dispatch<SetStateAction<string>>;
  setTransactionSuccessMessage: Dispatch<SetStateAction<string>>;
  handlePublishChanges: (signerKey: SignerKey) => Promise<void>;
  loadingTransaction: boolean;
  searchError: boolean;
  searchChange: (inputEvent: ChangeEvent<HTMLInputElement>) => void;
};
