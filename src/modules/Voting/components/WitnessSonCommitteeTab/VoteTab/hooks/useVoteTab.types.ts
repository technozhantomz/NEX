import { Dispatch, SetStateAction } from "react";

import { SignerKey } from "../../../../../../common/types";
import { VoteRow } from "../../../../types";

export type UseVoteTabResult = {
  name: string;
  confirmed: boolean;
  tableRows: VoteRow[];
  localApprovedVotesIds: string[];
  isVotesChanged: boolean;
  resetChanges: () => void;
  addVote: (voteId: string) => void;
  removeVote: (voteId: string) => void;
  handleVoting: (signerKey: SignerKey) => Promise<void>;
  transactionErrorMessage: string;
  transactionSuccessMessage: string;
  setTransactionErrorMessage: Dispatch<SetStateAction<string>>;
  setTransactionSuccessMessage: Dispatch<SetStateAction<string>>;
  loadingTransaction: boolean;
  updateAccountFee: number | undefined;
  afterSuccessTransactionModalClose: (() => void) | undefined;
};
