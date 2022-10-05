import { Dispatch, SetStateAction } from "react";

import { SignerKey } from "../../../../../../common/types";
import { VoteRow } from "../../../../types";

export type UseVoteTabResult = {
  name: string;
  loading: boolean;
  allMembersRows: VoteRow[];
  serverApprovedRows: VoteRow[];
  isVotesChanged: boolean;
  addChange: (voteId: string) => void;
  cancelChange: (voteId: string) => void;
  resetChanges: () => void;
  updateAccountFee: number;
  transactionErrorMessage: string;
  transactionSuccessMessage: string;
  setTransactionErrorMessage: Dispatch<SetStateAction<string>>;
  setTransactionSuccessMessage: Dispatch<SetStateAction<string>>;
  handlePublishChanges: (signerKey: SignerKey) => Promise<void>;
  loadingTransaction: boolean;
  pendingChanges: VoteRow[];
};
