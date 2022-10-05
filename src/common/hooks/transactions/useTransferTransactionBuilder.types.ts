import { Account, Asset, Transaction } from "../../types";

export type UseTransferTransactionBuilderResult = {
  buildTransferTransaction: (
    from: Account,
    to: Account,
    asset: Asset,
    amount: string,
    memo?: string | undefined
  ) => Transaction;
};
