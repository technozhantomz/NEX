import { AccountOptions, Transaction } from "../../types";

export type IVoteTransactionBuilder = {
  buildVoteTransaction: (
    voteExtensions: VoteExtensions,
    voteOptions: AccountOptions,
    accountId: string
  ) => Transaction;
};

export type VoteExtensions = {
  value: {
    update_last_voting_time: boolean;
  };
};
